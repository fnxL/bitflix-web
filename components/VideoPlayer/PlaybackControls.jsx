/* eslint-disable no-sparse-arrays */
import Slider from '@mui/material/Slider';
import { forwardRef, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import useEventListener from '../../hooks/useEventListener';
import useStore from '../../store/store';
import { formatTime } from '../../utils/utils';
import {
  FullScreen,
  Pause,
  Play,
  PlaybackSpeed,
  SeekBack,
  SeekForward,
  Subtitles,
  VolumeFull,
  VolumeMuted,
} from './Icons';
import Spacing from './Spacing';
import useVideoPlayerStore from '../../store/videoPlayerStore';

const PlaybackControls = forwardRef(({ handleFullscreen }, ref) => {
  const { playerRef, controlsRef } = ref;
  const [seeked, setSeeked] = useState(0);
  const [buffered, setBuffered] = useState('0%');
  const [timeLeft, setTimeLeft] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');

  const [playing, togglePlaying, muted, toggleMute, setNotification, pause] = useVideoPlayerStore(
    (state) => [
      state.playing,
      state.togglePlaying,
      state.muted,
      state.toggleMute,
      state.setNotification,
      state.pause,
    ],
    shallow
  );

  const handlePlayback = () => {
    togglePlaying();
    setNotification(playing ? 'play' : 'pause');
  };

  const handleSeekBack = () => {
    playerRef.current.currentTime -= 10;
    const notif = useStore.getState().notification;
    let value;
    if (typeof notif === 'string') {
      value = -1;
    }
    if (notif > 0) {
      value = -1;
    }
    if (notif < 0) {
      value = notif - 1;
    }
    setNotification(value);
  };
  const handleSeekForward = () => {
    playerRef.current.currentTime += 10;
    const notif = useStore.getState().notification;
    let value;
    if (typeof notif === 'string') {
      value = 1;
    }
    if (notif < 0) {
      value = 1;
    }
    if (notif > 0) {
      value = notif + 1;
    }
    setNotification(value);
  };

  const handleKeyDown = ({ keyCode }) => {
    switch (Number(keyCode)) {
      case 70: // F
        handleFullscreen();
        break;
      case 32: // Space Bar
        handlePlayback();
        break;
      case 37: // Left Arrow
        handleSeekBack();
        break;
      case 39: // Right Arrow
        handleSeekForward();
        break;
      default:
        break;
    }
  };

  const handleTimeUpdate = () => {
    const seekWidth = (100 / playerRef.current.duration) * playerRef.current.currentTime;
    setSeeked(seekWidth);
  };

  const handleBuffer = () => {
    const { duration } = playerRef.current;

    if (duration > 0) {
      for (let i = 0; i < playerRef.current.buffered.length; i++) {
        if (
          playerRef.current.buffered.start(playerRef.current.buffered.length - 1 - i) <
          playerRef.current.currentTime
        ) {
          const bufferedPercent =
            (playerRef.current.buffered.end(playerRef.current.buffered.length - 1 - i) / duration) *
            100;
          setBuffered(`${bufferedPercent}%`);
          break;
        }
      }
    }
  };

  const handleSeek = (e) => {
    pause();
    const videoDuration = playerRef.current.duration;
    playerRef.current.currentTime = (videoDuration * e.target.value) / 100;
    setSeeked(e.target.value);
  };

  useEventListener('keydown', handleKeyDown);
  useEventListener('timeupdate', handleTimeUpdate, playerRef.current);
  useEventListener('progress', handleBuffer, playerRef.current);

  useEffect(() => {
    setTimeLeft(formatTime(Math.floor(playerRef.current.duration)));
  }, [playerRef]);

  useEffect(() => {
    setTimeLeft(formatTime(Math.floor(playerRef.current.duration - playerRef.current.currentTime)));

    const interval = setInterval(() => {
      if (playing) {
        setTimeLeft(
          formatTime(Math.floor(playerRef.current.duration - playerRef.current.currentTime))
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [, playing, playerRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime(Math.floor(playerRef.current.currentTime)));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="watch-video--bottom-controls-container elative w-full flex min-h-0 min-w-0 items-end justify-center">
      <div
        className="h-full m-0 pointer-events-auto relative w-full px-[20px]"
        data-uia="controls-standard"
      >
        <div className=" relative">
          <div className="flex h-full relative w-full">
            <div className="  flex min-h-0 min-w-0 relative items-center flex-grow">
              <div
                aria-orientation="horizontal"
                className="horizontal h-[22.5px] cursor-pointer flex justify-center items-center relative w-full"
                data-uia="timeline"
                max="8158191"
                min="0"
              >
                <span className="buffer_bar absolute left-0 z-0 top-auto" />

                <span className="time_range h-full w-full flex items-center">
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    valueLabelDisplay="auto"
                    getAriaValueText={() => currentTime}
                    valueLabelFormat={() => currentTime}
                    sx={{
                      borderRadius: '0px',
                      color: 'red',
                      transition: 'height 0.2s ease 0s',
                      height: '3.75px',
                      '&:hover': {
                        height: '7.5px',
                      },
                      '& .MuiSlider-rail': {
                        color: 'lightgray',
                      },
                      '& .MuiSlider-track': {
                        transition:
                          'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,height 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
                      },
                      '& .MuiSlider-thumb': {
                        height: '15px',
                        width: '15px',
                        '&:hover, &.Mui-focusVisible': {
                          height: '18px',
                          width: '18px',
                          boxShadow: 'none',
                        },
                        '& .Mui-active': {
                          boxShadow: 'none',
                        },
                      },
                    }}
                    steps={0.01}
                    value={seeked}
                    onChange={handleSeek}
                    scale={(x) => x + 1}
                  />
                </span>

                {/* <div
                  data-uia="timeline-bar"
                  className="timeline_bar h-[3.75px] relative w-full flex items-center"
                  style={{ backgroundColor: 'gray', transition: 'height 0.2s ease 0s' }}
                >
                  <div
                    className="buffered_bar absolute h-full top-0"
                    style={{ backgroundColor: 'lightgray', width: buffered }}
                  />
                  <div
                    className="seeked_bar ltr-1c4ubff h-full left-0 top-0 absolute"
                    style={{ backgroundColor: 'red', width: seeked }}
                  />

                  <div
                    aria-label="Seek time scrubber"
                    style={{
                      transform: 'translateY(-50%)',
                      backgroundColor: 'red',
                      transition: 'transform 0.2s ease 0s',
                      left: `calc(${seeked} - 7.5px)`,
                    }}
                    className="w-[15px] h-[15px] rounded-full absolute top-[50%]"
                  />
                </div> */}
              </div>
            </div>
            <div className="duration items-center justify-center flex min-h-0 min-w-0 relative pl-[10px]">
              <span className="text-white text-[16px]">{timeLeft}</span>
            </div>
          </div>

          <Spacing type="vertical" />

          <div className="relative">
            <div className="h-full w-full relative flex">
              <div className="flex min-h-0 min-w-0 relative">
                <div className="h-[52px] w-[52px] relative">
                  <button
                    aria-label="Play/Pause"
                    onClick={handlePlayback}
                    className="border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                  >
                    {playing ? <Pause /> : <Play />}
                  </button>
                </div>
                <Spacing />

                <div className="h-[52px] w-[52px] relative">
                  <button
                    aria-label="Seek Back"
                    onClick={handleSeekBack}
                    className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                  >
                    <SeekBack />
                  </button>
                </div>

                <Spacing />

                <div className="h-[52px] w-[52px] relative">
                  <button
                    aria-label="Seek Forward"
                    onClick={handleSeekForward}
                    className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                  >
                    <SeekForward />
                  </button>
                </div>

                <Spacing />

                <div className="h-[52px] w-[52px] relative">
                  <button
                    aria-label="Volume"
                    onClick={toggleMute}
                    className=" border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                    data-uia="control-volume-high"
                  >
                    {muted ? <VolumeMuted /> : <VolumeFull />}
                  </button>
                </div>
              </div>
              <div
                className="title flex flex-grow min-h-0 min-w-0 relative ml-[5px] mr-[5px] pt-[5px]"
                style={{ flexBasis: '14px' }}
              >
                <Spacing />

                <div
                  className="overflow-hidden text-center overflow-ellipsis whitespace-nowrap w-full text-[20px]"
                  data-uia="video-title"
                >
                  Fast &amp; Furious Presents: Hobbs &amp; Shaw
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 relative justify-end">
                <Spacing />
                <div className="h-[52px w-[52px] relative">
                  <button
                    aria-label="Change Source"
                    className="bg-transparent border-none text-white m-0 p-0 relative "
                    data-uia="control-question"
                  >
                    Source
                  </button>
                </div>

                <Spacing />

                <div className="h-[52px w-[52px] relative">
                  <button
                    aria-label="Audio &amp; Subtitles"
                    className="bg-transparent border-none text-white m-0 p-0 relative "
                  >
                    <Subtitles />
                  </button>
                </div>

                <Spacing />

                <div className="h-[52px w-[52px] relative">
                  <button
                    aria-label="1x (Normal)"
                    className="bg-transparent border-none text-white m-0 p-0 relative "
                    style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                    data-uia="control-speed"
                  >
                    <PlaybackSpeed />
                  </button>
                </div>

                <Spacing />

                <div className="h-[52px w-[52px] relative">
                  <button
                    aria-label="Full screen"
                    onClick={handleFullscreen}
                    className="bg-transparent border-none text-white m-0 p-0 relative "
                    style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                    data-uia="control-fullscreen-enter"
                  >
                    <FullScreen />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spacing type="vertical" />
      </div>

      <style jsx>{`
        button {
          transition: transform 150ms ease 0s;
          border-radius: 2px;
        }
        button:hover {
          transform: scale(1.3);
        }

        .buffer_bar {
          height: 3.75px;
          width: ${buffered};
          background-color: lightgray;
          transition: height 0.2s ease 0s;
        }

        .time_range:hover ~ .buffer_bar {
          height: 7.5px;
        }

        .horizontal:hover .buffer_bar {
          height: 7.5px;
        }

        button:focus {
          outline-color: rgb(255, 255, 255);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
});

PlaybackControls.displayName = 'PlaybackControls';

export default PlaybackControls;
