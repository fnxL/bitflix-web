import { encode } from 'js-base64';
import { useRouter } from 'next/router';
import { FaPlay, FaPlus } from 'react-icons/fa';
import config from '../../config';
import useGenreConversion from '../../hooks/useGenreConversion';
import { dateToYearOnly, getFallBackTitle } from '../../utils/utils';
import rowposter from '../RowPoster/rowposter.module.css';
import styles from './poster.module.css';
import axios from '../../query/tmdbAxiosInstance';
import requests from '../../query/requests';

const { BACKDROP_URL, FALLBACK_URL } = config;

function Poster({ result, type }) {
  const { genre_ids, backdrop_path, id, release_date } = result;
  const router = useRouter();
  const fallBackTitle = getFallBackTitle(result);
  const genresConverted = useGenreConversion(genre_ids);

  const handleRedirect = () => {
    if (type === 'all') {
      router.push(`/${type}/${id}`);
    } else router.push(`/${type}/${id}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();

    const reducedDate = dateToYearOnly(release_date);

    const url =
      type === 'movie' ? `/movie/${id}${requests.movieDetails}` : `/tv/${id}${requests.tvDetails}`;

    axios.get(url).then((res) => {
      const imdb_id = res.data?.external_ids?.imdb_id;
      const metadata = encode(
        JSON.stringify({
          title: fallBackTitle,
          imdb_id,
          year: reducedDate,
          type,
          episode_number: type === 'tv' && 1,
          season_number: type === 'tv' && 1,
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
    <div onClick={handleRedirect} className={styles.poster}>
      {backdrop_path ? (
        <img src={`${BACKDROP_URL}${backdrop_path}`} alt={fallBackTitle} />
      ) : (
        <>
          <img src={FALLBACK_URL} alt={fallBackTitle} />
          <div className="Poster__fallback">
            <span>{fallBackTitle}</span>
          </div>
        </>
      )}
      <div className={styles.poster_info}>
        <div className="icon_wrap flex items-center justify-center">
          <button
            onClick={handlePlay}
            className={`${rowposter.icon} flex ml-[2px] items-center justify-center`}
          >
            <FaPlay />
          </button>

          <button className={rowposter.icon}>
            <FaPlus />
          </button>
        </div>
        <div className={rowposter.poster_title}>
          <h3>{fallBackTitle}</h3>
        </div>
        <div className={rowposter.poster_genres}>
          {genresConverted &&
            genresConverted.map((genre) => (
              <span key={`Genre--id_${genre}`} className={rowposter.genre}>
                {genre}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Poster;
