import axios from 'axios';
import { useRef } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { BsArrowClockwise, BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { useQuery } from 'react-query';
import YouTube from 'react-youtube';
import useVideoBanner from '../../hooks/useVideoBanner';
import useViewport from '../../hooks/useViewport';
import fetcher from '../../query/fetcher';
import requests from '../../query/requests';
import { getFallBackTitle, truncate } from '../../utils/utils';
import Button from '../Button/Button';
import SkeletonBanner from '../SkeletonBanner/SkeletonBanner';
import styles from './VideoBanner.module.css';
import { getMaturityRating } from '../../utils/utils';

const fanart = process.env.fanart;
const FEATURED_URL = process.env.FEATURED_URL;

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

function VideoBanner({ children, data, type }) {
  const playerRef = useRef();
  const { width } = useViewport();
  const {
    isMuted,
    hasVideoEnded,
    isPlaying,
    transitionStyles,
    toggleMute,
    onPlay,
    onEnd,
    replay,
  } = useVideoBanner(playerRef);

  let fallBackTitle;
  let description;
  let id;
  let backdrop_path;
  if (data) {
    fallBackTitle = getFallBackTitle(data);
    description = truncate(data?.overview, 150);
    id = data.id;
    backdrop_path = data.backdrop_path;
  }

  const url =
    type === 'movie'
      ? `/movie/${id}${requests.movieDetails}`
      : `/tv/${id}${requests.tvDetails}`;

  // fetch only if videos[] not in data and width > 1024 (trailers for desktop only)
  const {
    data: trailer,
    error: trailerError,
    isLoading,
  } = useQuery([type, id], () => fetcher(url), {
    enabled: !data?.videos && width > 1024,
  });

  let videoKey;
  let trailersList;
  let maturityRating;
  if (trailer || data?.videos) {
    trailersList = trailer ? trailer?.videos?.results : data?.videos?.results;
    trailersList = trailersList.filter((video) => video.type === 'Trailer');
    videoKey = trailersList ? trailersList[0]?.key : undefined;

    maturityRating = getMaturityRating(trailer ? trailer : data);
  }

  // fetch title logo only for desktop view;
  const {
    data: image,
    error: imageError,
    isLoading: isLoadingImage,
  } = useQuery(
    ['fanart', id],
    async () => {
      const { data } = await axios.get(
        `https://webservice.fanart.tv/v3/${
          type === 'movie' ? 'movies' : 'tv'
        }/${id}?api_key=${fanart}`
      );
      return data;
    },
    {
      enabled: width > 1024,
    }
  );
  let imageUrl;
  if (image) {
    const check = image?.hdmovielogo;
    if (check) imageUrl = check[0].url;
  }

  return (
    <>
      <div className='banner relative w-full h-[90vh] 2xl:h-[56.25vw] max-w-full'>
        {(isLoading || isLoadingImage || !data) && <SkeletonBanner />}

        {!isLoading && !isLoadingImage && (
          <div className='wrapper absolute w-full overflow-hidden items-end h-[90vh] 2xl:h-[56.25vw] max-w-full'>
            <div className='fill-container absolute top-0 left-0 right-0 bottom-0'>
              {width > 1024 && videoKey && (
                <div
                  className={`${styles.frame_container} ${
                    (hasVideoEnded || !isPlaying) && 'hidden'
                  }`}
                >
                  <YouTube
                    ref={playerRef}
                    className={type === 'movie' && styles.movie}
                    videoId={videoKey}
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
                    {width > 1024 && imageUrl ? (
                      <div className='titleLogo min-h-[13.2vw]  relative mb-[1.8vw]'>
                        <img
                          className='transform origin-bottom-left w-[35.68125vw]'
                          src={imageUrl}
                          alt='cool'
                          loading='eager'
                        />
                      </div>
                    ) : (
                      <h1 className={`${styles.title} mb-4`}>
                        {fallBackTitle}
                      </h1>
                    )}
                  </div>
                  <div
                    className='info_wrapper'
                    style={transitionStyles.infoWrapper}
                  >
                    <div className={`fade `} style={transitionStyles.infoFade}>
                      <div className={styles.description}>{description}</div>
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
            {(width <= 1024 || hasVideoEnded || !isPlaying || !videoKey) && (
              <img
                className='max-w-full absolute top-0 z-0 object-cover h-[99%] w-full'
                src={`${FEATURED_URL}${backdrop_path}`}
                alt='backdrop'
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
                    <Button
                      onClick={toggleMute}
                      type='circular'
                      variant='white'
                    >
                      {isMuted && <BsVolumeMute size='1.8rem' />}
                      {!isMuted && <BsVolumeUp size='1.8rem' />}
                    </Button>
                  )}
                </span>
                <span className={styles.maturity_rating}>{maturityRating}</span>
              </div>
            )}
          </div>
        )}
        <div className='absolute left-0 z-[2] right-0 bottom-[2%]'>
          {children}
        </div>
      </div>
    </>
  );
}

export default VideoBanner;
