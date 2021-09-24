import axios from 'axios';
import { encode } from 'js-base64';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { BsArrowClockwise, BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { useQuery } from 'react-query';
import YouTube from 'react-youtube';
import config from '../../config';
import useVideoBanner from '../../hooks/useVideoBanner';
import useViewport from '../../hooks/useViewport';
import fetcher from '../../query/fetcher';
import requests from '../../query/requests';
import {
  dateToYearOnly,
  getFallBackTitle,
  getMaturityRating,
  getSearchTerm,
  truncate,
} from '../../utils/utils';
import Button from '../Button/Button';
import SkeletonBanner from '../SkeletonBanner/SkeletonBanner';
import styles from './VideoBanner.module.css';

const { FANART, FEATURED_URL } = config;

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

function VideoBanner({ children, id, type }) {
  const router = useRouter();
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
    onReady,
  } = useVideoBanner(playerRef);
  const url =
    type === 'movie' ? `/movie/${id}${requests.movieDetails}` : `/tv/${id}${requests.tvDetails}`;

  const { data, isLoading } = useQuery([type, id], () => fetcher(url), {
    enabled: !!id,
  });

  let fallBackTitle;
  let description;
  let backdrop_path;
  let release_date;
  let videoKey;
  let trailersList;
  let maturityRating;
  let tvdb_id;
  let imdb_id;
  let imageUrl;

  if (data) {
    fallBackTitle = getFallBackTitle(data);
    description = truncate(data?.overview, 150);
    backdrop_path = data?.backdrop_path;
    release_date = data?.release_date;
    trailersList = data?.videos?.results.filter((video) => video.type === 'Trailer');
    videoKey = trailersList ? trailersList[0]?.key : undefined;
    maturityRating = getMaturityRating(data, type);
    tvdb_id = data?.external_ids?.tvdb_id;
    imdb_id = data?.external_ids?.imdb_id;
  }

  // fetch title logo only for desktop view;
  const { data: image, isLoading: isLoadingImage } = useQuery(
    ['fanart', id],
    async () => {
      const { data } = await axios.get(
        `https://webservice.fanart.tv/v3/${type === 'movie' ? 'movies' : 'tv'}/${
          type === 'movie' ? id : tvdb_id
        }?api_key=${FANART}`
      );
      return data;
    },
    { enabled: !!(data && type) }
  );

  // check & get image Logo
  if (image) {
    if (type === 'movie') {
      const check = image?.hdmovielogo;
      if (check?.length) imageUrl = check[0]?.url;
    } else {
      const check = image?.hdtvlogo;
      if (check?.length) imageUrl = check[0]?.url;
    }
  }

  const handlePlay = () => {
    const reducedDate = dateToYearOnly(release_date);

    const searchTerm = getSearchTerm(fallBackTitle, type, {
      date: reducedDate,
      season_number: 1,
      episode_number: 1,
    });
    console.log(release_date);
    const metadata = encode(
      JSON.stringify({ fileName: searchTerm, title: fallBackTitle, imdb_id })
    );

    router.push({
      pathname: '/watch/[id]',
      query: { id, metadata },
    });
  };

  return (
    <>
      <div className="banner relative w-full h-[90vh] 2xl:h-[56.25vw] max-w-full">
        {(isLoading || isLoadingImage || !data) && <SkeletonBanner />}

        {!isLoading && !isLoadingImage && (
          <div className="wrapper absolute w-full overflow-hidden items-end h-[90vh] 2xl:h-[56.25vw] max-w-full">
            <div className="fill-container absolute top-0 left-0 right-0 bottom-0">
              {width > 1024 && videoKey && (
                <div
                  className={`${styles.frame_container} ${
                    (hasVideoEnded || !isPlaying) && 'hidden'
                  }`}
                >
                  <YouTube
                    ref={playerRef}
                    className={`${type === 'movie' && styles.movie}`}
                    videoId={videoKey}
                    opts={playerOptions}
                    onPlay={onPlay}
                    onEnd={onEnd}
                    onReady={onReady}
                  />
                </div>
              )}
              <div className="info absolute bottom-[15%] text-center md:text-left items-center left-[4%] md:bottom-[36.5%] 2xl:left-[60px] z-[2] flex md:justify-end flex-col">
                <div className={`${styles.logo_text} w-full`}>
                  <div className="titleWrapper" style={transitionStyles.titleWrapper}>
                    {width > 1024 && imageUrl ? (
                      <div className="titleLogo min-h-[13.2vw]  relative mb-[1.8vw]">
                        <img
                          className="transform origin-bottom-left w-[35.68125vw]"
                          src={imageUrl}
                          alt="cool"
                          loading="eager"
                        />
                      </div>
                    ) : (
                      <h1 className={`${styles.title} mb-4`}>{fallBackTitle}</h1>
                    )}
                  </div>
                  <div className="info_wrapper" style={transitionStyles.infoWrapper}>
                    <div className={`fade `} style={transitionStyles.infoFade}>
                      <div className={styles.description}>{description}</div>
                    </div>
                  </div>
                  <div className="buttons justify-center md:justify-start mt-[0.55vw] whitespace-nowrap flex line-height: 88%">
                    <Button text="Play" onClick={handlePlay} variant="white">
                      <FaPlay />
                      <div className="w-[1.2rem]" />
                    </Button>
                    <Button text="More Info">
                      <BiInfoCircle className="text-[1.5rem] lg:text-[2vw] xl:text-[1.75vw]" />
                      <div className="w-[1rem]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.banner_vignette} />
            <div className={styles.banner_panel} />
            {(width <= 1024 || hasVideoEnded || !isPlaying || !videoKey) && (
              <img
                className="max-w-full absolute top-0 z-0 object-cover h-[99%] w-full"
                src={backdrop_path && `${FEATURED_URL}${backdrop_path}`}
                alt="backdrop"
              />
            )}
            {width >= 1024 && (
              <div className={styles.maturity}>
                <span className="action_button w-[2.9vw] relative lg:mr-[1.5rem] xl:mr-[1.1vw]">
                  {hasVideoEnded && !isPlaying ? (
                    <Button onClick={replay} type="circular" variant="white">
                      <BsArrowClockwise size="1.75vw" />
                    </Button>
                  ) : (
                    <Button onClick={toggleMute} type="circular" variant="white">
                      {isMuted && <BsVolumeMute size="1.8rem" />}
                      {!isMuted && <BsVolumeUp size="1.8rem" />}
                    </Button>
                  )}
                </span>
                <span className={styles.maturity_rating}>{maturityRating}</span>
              </div>
            )}
          </div>
        )}
        <div className="absolute left-0 z-[2] right-0 bottom-[2%]">{children}</div>
      </div>
    </>
  );
}

export default VideoBanner;
