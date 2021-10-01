/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import shallow from 'zustand/shallow';
import { Spinner } from '..';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { formatTime } from '../../utils/utils';
import { Back } from './Icons';
import PlaybackControls from './PlaybackControls';
import PlaybackNotification from './PlaybackNotification';

let count = 0;

const VideoPlayer = ({ onError }) => {
  const [playing, muted, volume, currentSource, currentTime, buffering, vttURL, error] =
    useVideoPlayerStore(
      (state) => [
        state.playing,
        state.muted,
        state.volume,
        state.currentSource,
        state.currentTime,
        state.buffering,
        state.vttURL,
        state.error,
      ],
      shallow
    );

  const router = useRouter();
  const playerRef = useRef();
  const controlsRef = useRef();
  const fullscreenRef = useRef();

  const handleProgress = ({ played, loaded }) => {
    // Update CurrentTime;
    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const elapsedTime = formatTime(currentTime);

    useVideoPlayerStore.setState({ elapsedTime, currentTime });

    if (count > 3) {
      controlsRef.current.style.visibility = 'hidden';
      document.body.style.cursor = 'none';
      count = 0;
    }

    if (controlsRef.current.style.visibility === 'visible') {
      count += 1;
    }

    if (!useVideoPlayerStore.getState().seeking) {
      useVideoPlayerStore.setState({
        played,
        loaded,
      });
    }
  };

  const handleDuration = (duration) => {
    useVideoPlayerStore.setState({ duration, sourceLoaded: true });
  };

  const handleVisibility = () => {
    controlsRef.current.style.visibility = 'visible';
    document.body.style.cursor = 'default';

    count = 0;
  };

  const toggleFullscreen = () => {
    screenfull.toggle(fullscreenRef.current);
  };

  const ref = {
    playerRef,
    fullscreenRef,
  };

  // update track visibility
  useEffect(() => {
    const videoElement = playerRef.current?.getInternalPlayer();
    if (videoElement) {
      if (videoElement?.textTracks[0]) videoElement.textTracks[0].mode = 'hidden';
    }

    const timeout = setTimeout(() => {
      if (videoElement)
        if (videoElement?.textTracks[0]) videoElement.textTracks[0].mode = 'showing';
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentSource, vttURL]);

  useEffect(() => {
    if (playerRef.current && currentTime !== 0) playerRef.current?.seekTo(currentTime);
  }, [currentSource]);

  return (
    <div
      ref={fullscreenRef}
      onMouseMove={handleVisibility}
      className="video_player w-[100vw] h-[100vh]"
    >
      {buffering && <Spinner />}
      <div className="video_container w-full h-full left-0 absolute m-0 overflow-hidden p-0 top-0">
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}

        {currentSource && !vttURL && (
          <ReactPlayer
            className="video"
            ref={playerRef}
            url={currentSource?.url}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'use-credentials',
                },
              },
            }}
            playing={playing}
            muted={muted}
            width="100%"
            height="100%"
            volume={volume}
            onBuffer={() => useVideoPlayerStore.setState({ buffering: true })}
            onBufferEnd={() => useVideoPlayerStore.setState({ buffering: false })}
            onDuration={handleDuration}
            onError={onError}
            onProgress={handleProgress}
          />
        )}

        {currentSource && vttURL && (
          <ReactPlayer
            className="video"
            ref={playerRef}
            url={currentSource?.url}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'use-credentials',
                },
                tracks: [
                  {
                    kind: 'subtitles',
                    src: `${vttURL}`,
                    srcLang: 'en',
                    default: true,
                  },
                ],
              },
            }}
            playing={playing}
            muted={muted}
            width="100%"
            height="100%"
            volume={volume}
            onBuffer={() => useVideoPlayerStore.setState({ buffering: true })}
            onBufferEnd={() => useVideoPlayerStore.setState({ buffering: false })}
            onDuration={handleDuration}
            onError={onError}
            onProgress={handleProgress}
          />
        )}
      </div>
      <div className="parentContainer z-10 w-full h-full">
        <div
          ref={controlsRef}
          className="controls_container flex flex-end relative flex-col h-full w-full"
        >
          <div
            onClick={useVideoPlayerStore.getState().togglePlayback}
            className="back_button min-h-0 min-w-0 px-[19.8px] pt-[19.8px] lg:px-[24px] lg:pt-[24px] xl:px-[30px] xl:pt-[30px] items-start justify-start flex-grow"
          >
            <div className="div">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.back();
                }}
                className="h-[44px] w-[44px]"
              >
                <Back />
              </button>
            </div>
          </div>

          <PlaybackControls
            ref={ref}
            onToggleFullscreen={toggleFullscreen}
            onProgress={handleProgress}
          />
          <PlaybackNotification />
        </div>
      </div>

      <style jsx>{`
        button {
          transition: transform 150ms ease 0s;
          border-radius: 2px;
        }
        button:hover {
          transform: scale(1.3);
        }

        .back_button {
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 20%);
        }
      `}</style>
    </div>
  );
};

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
