import { useRef, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { BsArrowClockwise, BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import YouTube from 'react-youtube';
import useViewport from '../../hooks/useViewport';
import Button from '../Button/Button';
import styles from './VideoBanner.module.css';

const playerOptions = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    cc_lang_pref: 'en',
    cc_load_policy: '1',
    rel: 0,
    loop: 1,
    mute: 1,
    modestbranding: 1,
    disablekb: 1,
  },
};

function VideoBanner({ data, type }) {
  const playerRef = useRef();
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const [transitionStyles, setTransitionStyles] = useState({
    titleWrapper: {},
    infoWrapper: {},
    infoFade: {},
  });
  const { width } = useViewport();

  const toggleMute = (e) => {
    const player = playerRef.current.getInternalPlayer();
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const replay = () => {
    const player = playerRef.current.getInternalPlayer();
    if (hasVideoEnded) {
      player.playVideo();
    }
  };

  const onPlay = () => {
    setIsPlaying(true);
    setHasVideoEnded(false);
    setTransitionStyles({
      ...transitionStyles,
      titleWrapper: {
        transformOrigin: 'left bottom',
        transform: 'scale(0.6) translate3d(0px, 13vw, 0px)',
        transitionDuration: '1300ms',
        transitionDelay: '5000ms',
      },
      infoWrapper: {
        transform: 'translate3d(0px, 100px, 0px)',
        transitionDuration: '1300ms',
        transitionDelay: '5000ms',
        opacity: 1,
      },
      infoFade: {
        opacity: 0,
        transitionDuration: '500ms',
        transitionDelay: '5000ms',
      },
    });
  };

  const onEnd = () => {
    setTransitionStyles({
      ...transitionStyles,
      titleWrapper: {
        transformOrigin: 'left bottom',
        transform: 'scale(1) translate3d(0px, 0px, 0px)',
        transitionDuration: '1300ms',
        transitionDelay: '0ms',
      },
      infoWrapper: {
        transform: 'translate3d(0px, 0px, 0px)',
        transitionDuration: '1300ms',
        transitionDelay: '0ms',
        opacity: 1,
      },
      infoFade: {
        opacity: 1,
        transitionDuration: '600ms',
        transitionDelay: '200ms',
      },
    });
    setIsPlaying(false);
    setHasVideoEnded(true);
  };

  return (
    <>
      <div className='banner relative w-full h-[90vh] 2xl:h-[56.25vw] max-w-full'>
        <div className='wrapper absolute w-full overflow-hidden items-end h-[90vh] 2xl:h-[56.25vw] max-w-full'>
          <div className='fill-container absolute top-0 left-0 right-0 bottom-0'>
            {width > 1024 && (
              <div
                className={`${styles.frame_container} ${
                  (hasVideoEnded || !isPlaying) && 'hidden'
                }`}
              >
                <YouTube
                  ref={playerRef}
                  className={type === 'movie' && styles.movie}
                  videoId='XZG1FzyB8DI'
                  opts={playerOptions}
                  onPlay={onPlay}
                  onEnd={onEnd}
                />
              </div>
            )}
            <div className='info absolute bottom-[15%] text-center md:text-left items-center left-[4%] md:bottom-[36.5%] 2xl:left-[60px] z-[2] flex md:justify-end flex-col'>
              <div className={`${styles.logo_text} w-full`}>
                <div
                  className='titleWrapper'
                  style={transitionStyles.titleWrapper}
                >
                  {width > 1024 ? (
                    <div className='titleLogo min-h-[13.2vw]  relative mb-[1.8vw]'>
                      <img
                        className='transform origin-bottom-left w-[35.68125vw]'
                        src='https://fanart.tv/fanart/movies/299534/hdmovielogo/avengers-infinity-war---part-ii-5c12c9cb63356.png'
                        alt='cool'
                      />
                    </div>
                  ) : (
                    <h1 className={styles.title}>Avengers</h1>
                  )}
                </div>
                <div
                  className='info_wrapper'
                  style={transitionStyles.infoWrapper}
                >
                  <div className={`fade `} style={transitionStyles.infoFade}>
                    <div className={styles.description}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ullam pariatur labore vitae distinctio rerum in voluptatum
                      quos laborum voluptate id.
                    </div>
                  </div>
                </div>
                <div className='buttons justify-center md:justify-start mt-[0.55vw] whitespace-nowrap flex line-height: 88%'>
                  <Button text='Play' variant='white'>
                    <FaPlay />
                    <div className='w-[1.2rem]'></div>
                  </Button>
                  <Button text='More Info'>
                    <BiInfoCircle className='text-[1.5rem] lg:text-[2vw] xl:text-[1.75vw]' />
                    <div className='w-[1rem]'></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.banner_vignette}></div>
          <div className={styles.banner_panel}></div>
          {(width <= 1024 || hasVideoEnded || !isPlaying) && (
            <img
              className='max-w-full absolute top-0 z-0 object-cover h-[99%] w-full'
              src='https://image.tmdb.org/t/p/w1280/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg'
              alt='ok'
            />
          )}
          {width >= 1024 && (
            <div className={styles.maturity}>
              <span className='action_button w-[2.9vw] relative lg:mr-[1.5rem] xl:mr-[1.1vw]'>
                {hasVideoEnded && !isPlaying ? (
                  <Button onClick={replay} type='circular' variant='white'>
                    <BsArrowClockwise size='1.75vw' />
                  </Button>
                ) : (
                  <Button onClick={toggleMute} type='circular' variant='white'>
                    {isMuted && <BsVolumeMute size='1.8rem' />}
                    {!isMuted && <BsVolumeUp size='1.8rem' />}
                  </Button>
                )}
              </span>
              <span className={styles.maturity_rating}>13+</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoBanner;
