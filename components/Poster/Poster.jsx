import { useRouter } from 'next/router';
import { FaPlay, FaPlus } from 'react-icons/fa';
import config from '../../config';
import useGenreConversion from '../../hooks/useGenreConversion';
import { getFallBackTitle } from '../../utils/utils';
import rowposter from '../RowPoster/rowposter.module.css';
import styles from './poster.module.css';

const { BACKDROP_URL, FALLBACK_URL } = config;

function Poster({ result, type }) {
  const { genre_ids, backdrop_path, id } = result;
  const router = useRouter();
  const fallBackTitle = getFallBackTitle(result);
  const genresConverted = useGenreConversion(genre_ids);

  const handleRedirect = () => {
    if (type === 'all') {
      router.push(`/${type}/${id}`);
    } else router.push(`/${type}/${id}`);
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
          <button className={`${rowposter.icon} flex ml-[2px] items-center justify-center`}>
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
