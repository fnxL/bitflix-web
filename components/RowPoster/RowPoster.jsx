import { encode } from 'js-base64';
import { useRouter } from 'next/router';
import { FaChevronDown, FaPlay } from 'react-icons/fa';
import config from '../../config';
import useGenreConversion from '../../hooks/useGenreConversion';
import requests from '../../query/requests';
import axios from '../../query/tmdbAxiosInstance';
import { dateToYearOnly, getFallBackTitle } from '../../utils/utils';
import styles from './rowposter.module.css';

const { BACKDROP_URL, POSTER_URL, FALLBACK_URL } = config;

function RowPoster(result) {
  const router = useRouter();

  const {
    item,
    item: { id, genre_ids, poster_path, backdrop_path, media_type, release_date },
    isLarge,
    type,
  } = result;

  const fallbackTitle = getFallBackTitle(item);
  const genresConverted = useGenreConversion(genre_ids);

  const handleRedirect = () => {
    if (type === 'all') {
      router.push('/[type]/[id]', `/${media_type}/${id}`);
    } else router.push('/[type]/[id]', `/${type}/${id}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    const reducedDate = dateToYearOnly(release_date);

    const url =
      type === 'movie'
        ? `/movie/${id}${requests.movieDetails}`
        : type === 'tv'
        ? `/tv/${id}${requests.tvDetails}`
        : `/${media_type}/${id}${requests.tvDetails}`;

    axios.get(url).then((res) => {
      const imdb_id = res.data?.external_ids?.imdb_id;
      const metadata = encode(
        JSON.stringify({
          title: fallbackTitle,
          imdb_id,
          year: reducedDate,
          type: type === 'all' ? media_type : type,
          episode_number: (type === 'tv' && 1) || (media_type === 'tv' && 1),
          season_number: (type === 'tv' && 1) || (media_type === 'tv' && 1),
          episode_name: 'Pilot',
        })
      );
      router.push({
        pathname: '/watch',
        query: { id, metadata },
      });
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.row_poster} relative cursor-pointer`}
      onClick={handleRedirect}
    >
      {isLarge ? (
        poster_path ? (
          <img loading="lazy" src={`${POSTER_URL}${poster_path}`} alt={fallbackTitle} />
        ) : (
          ''
        )
      ) : backdrop_path ? (
        <img loading="lazy" src={`${BACKDROP_URL}${backdrop_path}`} alt={fallbackTitle} />
      ) : (
        <img loading="lazy" src={FALLBACK_URL} alt={fallbackTitle} />
      )}

      <div className={`${styles.poster_info}`}>
        <div className={`${styles.icon_wrapper}`}>
          <button className={`${styles.icon}`}>
            <div onClick={handlePlay} className="flex ml-[2px] items-center justify-center">
              <FaPlay />
            </div>
          </button>
          <button className={`${styles.icon}`}>
            <FaChevronDown />
          </button>
        </div>
        <div className={`${styles.poster_title}`}>
          <h3>{fallbackTitle}</h3>
        </div>
        <div className={`${styles.poster_genres}`}>
          {genresConverted &&
            genresConverted.map((genre) => (
              <span key={`Genre--id_${genre}`} className={`${styles.genre}`}>
                {genre}
              </span>
            ))}
        </div>
      </div>
      {/* <div
        className={`${styles.info_container} info_container absolute  w-full bg-[#181818] p-[1em] text-[#fff] cursor-pointer`}
      >
        <div className='buttons flex mb-[0.5em]'>
          <div className='left flex space-x-2'>
            <Button type='circular'>
              <FaPlay size='0.8rem' />
            </Button>
            <Button type='circular'>
              <BiPlus size='0.8rem' />
            </Button>
          </div>

          <div className='right ml-auto'>
            <Button type='circular'>
              <FaChevronDown size='0.8rem' />
            </Button>
          </div>
        </div>
        <div className='videometadata my-[0.8em] space-x-3 text-[12px]'>
          <span className='mx-[0.25em] mb-[0.5em] font-bold text-[#46d369]'>
            98% Match
          </span>
          <span className='mr-[0.5em] uppercase border border-solid border-[rgba(255,255,255,0.4] px-[0.4em]'>
            TV-MA
          </span>
          <span className='mr-[0.5em]'>2h 24m</span>
        </div>
        <div className='genre text-[12px] flex justify-start flex-wrap'>
          <div className='item pr-[0.5vw]'>Action</div>
          <div className='item pr-[0.5vw]'>
            <span className='separator'></span>Adventure
          </div>
          <div className='item pr-[0.5vw]'>
            <span className='separator'></span>Comedy
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default RowPoster;
