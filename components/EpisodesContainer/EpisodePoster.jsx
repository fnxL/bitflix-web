import { encode } from 'js-base64';
import { useRouter } from 'next/router';
import config from '../../config';
import { getSearchTerm } from '../../utils/utils';
import styles from './EpisodePoster.module.css';

const { BACKDROP_URL } = config;

function EpisodePoster({ data, season, title, imdb_id }) {
  const router = useRouter();
  const { still_path, episode_number, name, overview, id } = data;

  const handleClick = () => {
    const searchTerm = getSearchTerm(title, 'tv', {
      season_number: season,
      episode_number,
    });
    console.log(searchTerm);

    const metadata = encode(
      JSON.stringify({
        fileName: searchTerm,
        title: `${searchTerm}: ${name}`,
        episode_number,
        season_number: season,
        imdb_id,
      })
    );

    router.push({
      pathname: '/watch/[id]',
      query: {
        id,
        metadata,
      },
    });
  };

  return (
    <div className={`${styles.poster_container}`}>
      <div className={styles.number}>{episode_number}</div>
      <div onClick={handleClick} className={styles.imageWrapper}>
        <div className={styles.imagediv}>
          <img src={`${BACKDROP_URL}${still_path}`} alt="ok" />
        </div>
        <div className={styles.playIcon}>
          <svg viewBox="0 0 24 24" className={styles.playSVG}>
            <path d="M6 4l15 8-15 8z" fill="currentColor" />
          </svg>
        </div>
        {/* to do ! <progress
          className={styles.progress}
          max='1'
          value='0.0880408086151521'
        ></progress> */}
      </div>
      <div className={styles.metadataWrapper}>
        <div className="title p-[1em] pb-[0.5em] flex justify-between">
          <span className={`${styles.title_text} text-white text-[1em] font-bold`}>{name}</span>
        </div>
        <p className={styles.description}>{overview}</p>
      </div>
    </div>
  );
}

export default EpisodePoster;
