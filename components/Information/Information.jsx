import {
  dateToYearOnly,
  getRuntime,
  getFallBackTitle,
  getMaturityRating,
} from '../../utils/utils';

import styles from './Information.module.css';

function Information({ data, type }) {
  const {
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    overview,
    number_of_seasons,
    genres,
    credits: { cast },
  } = data;

  const title = getFallBackTitle(data);

  const maturityRating = getMaturityRating(data, type);

  const reduceCast =
    cast?.length > 10
      ? cast?.slice(0, 10).map((item) => item.name)
      : cast?.map((item) => item.name);

  const getThreeCast =
    reduceCast.length > 3
      ? reduceCast.slice(0, 3).join(', ') + ', more'
      : reduceCast.join(', ');

  const genresString = genres
    ? genres.map((item) => item.name).join(', ')
    : 'Not available';

  const reducedDate = release_date
    ? dateToYearOnly(release_date)
    : first_air_date
    ? dateToYearOnly(first_air_date)
    : 'Not Available';

  return (
    <div className='px-[4%] mt-10'>
      <div className='grid grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-8 xl:gap-x-96	'>
        <div className='left'>
          <div className={`${styles.title} mb-3`}>{title}</div>
          <div className='metadata space-x-2'>
            <span className='year'>{reducedDate}</span>
            <span className={styles.maturity_rating}>
              <span className={styles.maturity_number}>{maturityRating}</span>
            </span>
            {number_of_seasons && <span>{number_of_seasons} Seasons</span>}
            <span className='duration'>
              {getRuntime(type == 'movie' ? runtime : episode_run_time[0])}
            </span>
            {/* quality/sound/hdr */}
          </div>
          <div className='overview mt-6'>{overview}</div>
        </div>
        <div className='right'>
          <div className='cast'>
            <span className='text-[#777]'>Cast: </span>
            {getThreeCast}
          </div>
          <div className='genres'>
            <span className='text-[#777]'>Genres: </span>
            {genresString}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
