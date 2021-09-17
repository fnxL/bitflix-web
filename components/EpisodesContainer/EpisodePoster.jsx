import styles from './EpisodePoster.module.css';

const BACKDROP_URL = process.env.BACKDROP_URL;

function EpisodePoster({ data }) {
  const { still_path, episode_number, name, overview } = data;
  return (
    <div className={`${styles.poster_container}`}>
      <div className={styles.number}>{episode_number}</div>
      <div className={styles.imageWrapper}>
        <div className={styles.imagediv}>
          <img src={`${BACKDROP_URL}${still_path}`} alt='ok' />
        </div>
        <div className={styles.playIcon}>
          <svg viewBox='0 0 24 24' className={styles.playSVG}>
            <path d='M6 4l15 8-15 8z' fill='currentColor'></path>
          </svg>
        </div>
        {/* to do ! <progress
          className={styles.progress}
          max='1'
          value='0.0880408086151521'
        ></progress> */}
      </div>
      <div className={styles.metadataWrapper}>
        <div className='title p-[1em] pb-[0.5em] flex justify-between'>
          <span
            className={`${styles.title_text} text-white text-[1em] font-bold`}
          >
            {name}
          </span>
        </div>
        <p className={styles.description}>{overview}</p>
      </div>
    </div>
  );
}

export default EpisodePoster;
