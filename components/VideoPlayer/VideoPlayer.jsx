/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { Back } from './Icons';
import PlaybackControls from './PlaybackControls';
import PlaybackNotification from './PlaybackNotification';
import VideoElement from './VideoElement';

let count = 0;

function VideoPlayer() {
  const playerRef = useRef();
  const fullscreenRef = useRef();
  const controlsRef = useRef();

  const [
    fullscreen,
    toggleFullscreen,
    playing,
    togglePlaying,
    muted,
    notification,
    setNotification,
  ] = useVideoPlayerStore(
    (state) => [
      state.fullscreen,
      state.toggleFullscreen,
      state.playing,
      state.togglePlaying,
      state.muted,
      state.notification,
      state.setNotification,
    ],
    shallow
  );

  const handlePlayback = () => {
    togglePlaying();
    setNotification(playing ? 'play' : 'pause');
  };

  const handleFullscreen = () => {
    if (fullscreen) {
      document.exitFullscreen();
      toggleFullscreen();
    } else {
      fullscreenRef.current.requestFullscreen();
      toggleFullscreen();
    }
  };

  const handleVisiblity = () => {
    controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 2) {
        controlsRef.current.style.visibility = 'hidden';
        count = 0;
      }

      if (controlsRef.current.style.visibility === 'visible') {
        count += 1;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={fullscreenRef}
      onMouseMove={handleVisiblity}
      className="video_player w-[100vw] h-[100vh]"
    >
      <div className="video_container w-full h-full left-0 absolute m-0 overflow-hidden p-0 top-0">
        <VideoElement
          ref={playerRef}
          source="https://storage.googleapis.com/324014/X286237RLYQN/st23_black-clover-tv-dub-episode-11631792507-1080.mp4"
          playing={playing}
          muted={muted}
        />
      </div>
      <div className="parentContainer z-10 w-full h-full">
        <div
          ref={controlsRef}
          className="controls_container flex flex-end relative flex-col h-full w-full"
        >
          <div
            onClick={handlePlayback}
            className="back_button min-h-0 min-w-0 px-[19.8px] pt-[19.8px] lg:px-[24px] lg:pt-[24px] xl:px-[30px] xl:pt-[30px] items-start justify-start flex-grow"
          >
            <div className="div">
              <button className="h-[44px] w-[44px]">
                <Back />
              </button>
            </div>
          </div>

          <PlaybackControls ref={{ playerRef, controlsRef }} handleFullscreen={handleFullscreen} />
          <PlaybackNotification state={notification} />
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
}

export default VideoPlayer;
