/* eslint-disable object-shorthand */
import moment from 'moment';

export const getOneMonthAgoReleaseDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const formattedDate = date.toJSON().slice(0, 10);

  return formattedDate;
};

export const dateToYearOnly = (date) => {
  if (date) return date.slice(0, 4);
  return undefined;
};

export const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const randomize = (data) => Math.floor(Math.random() * data?.length);

export const truncate = (text, n) => (text?.length > n ? `${text.substr(0, n - 1)}...` : text);

export const getRuntime = (n) => {
  if (n <= 60) return `${n}m`;
  return `${`${(n / 60) ^ 0}`.slice(-2)}h ${`0${n % 60}`.slice(-2)}m`;
};

export const getFallBackTitle = (data) => data?.title || data?.name || data?.original_name;

export const getMaturityRating = (data, type) => {
  if (type === 'movie') {
    const releases = data?.releases?.countries;
    if (!releases.length) return;

    const filterUS = releases.filter((item) => item?.iso_3166_1 === 'US' && item?.certification);
    const filterGB = releases.filter((item) => item?.iso_3166_1 === 'GB' && item?.certification);
    if (filterUS.length) return filterUS[0].certification;
    if (filterGB.length) return filterGB[0].certification;
  }
  if (type === 'tv') {
    const origin_country = data?.origin_country;
    let country;
    if (origin_country.length) country = origin_country[0];

    if (country) {
      const filter = data?.content_ratings?.results.filter(
        (item) => item?.iso_3166_1 === country && item?.rating
      );

      if (filter.length) return filter[0].rating;
    }
    if (data?.content_ratings?.results.length) return data?.content_ratings?.results[0]?.rating;
  }
};

export const formatTime = (seconds) => {
  if (Number.isNaN(seconds)) return '00:00';
  return moment
    .utc(seconds * 1000)
    .format('HH:mm:ss')
    .replace(/^0(?:0:0?)?/, '');
};

export const watchProviders = {
  netflix: 8,
  hotstar: 122,
  primeVideo: 119,
  voot: 121,
  disneyPlus: 337,
};

export const VolumeSliderStyles = {
  color: 'red',
  paddingLeft: '11.25px',
  paddingRight: '11.25px',
  borderRadius: 0,
  width: '11.25px',
  '& .MuiSlider-thumb': {
    height: '22.5px',
    width: '22.5px',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
    '& .Mui-active': {
      boxShadow: 'none',
    },
  },
};

export const getSearchTerm = (title, type, options = {}) => {
  const { date, season_number, episode_number } = options;
  if (type === 'tv')
    return `${title} S${season_number < 10 ? `0${season_number}` : season_number}E${
      episode_number < 10 ? `0${episode_number}` : episode_number
    }`;
  return `${title} ${date}`;
};

export const ProgressBarStyles = {
  borderRadius: '0px',
  color: 'red',
  transition: 'height 0.2s ease 0s',
  height: '3.75px',
  '&:hover': {
    height: '7.5px',
  },
  '& .MuiSlider-rail': {
    color: 'lightgray',
  },
  '& .MuiSlider-track': {
    transition:
      'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,height 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
  },
  '& .MuiSlider-thumb': {
    height: '15px',
    width: '15px',
    '&:hover, &.Mui-focusVisible': {
      height: '18px',
      width: '18px',
      boxShadow: 'none',
    },
    '&.Mui-active': {
      boxShadow: 'none',
    },
  },
};

export function formatBytes(bytes, decimals = 2) {
  if (!bytes) return undefined;

  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
