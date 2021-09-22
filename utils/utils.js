export const getOneMonthAgoReleaseDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const formattedDate = date.toJSON().slice(0, 10);

  return formattedDate;
};

export const dateToYearOnly = (date) => date.slice(0, 4);

export const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const randomize = (data) => Math.floor(Math.random() * data.length);

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
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  // eslint-disable-next-line prefer-template
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
};

export const watchProviders = {
  netflix: 8,
  hotstar: 122,
  primeVideo: 119,
  voot: 121,
  disneyPlus: 337,
};
