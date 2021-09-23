import { memo } from 'react';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { Pause, Play, SeekBack, SeekForward, VolumeFull, VolumeMuted } from './Icons';

const notificationSelector = (state) => state.notification;

function PlaybackNotification() {
  const state = useVideoPlayerStore(notificationSelector);

  if (state)
    return (
      <div
        style={{
          right:
            typeof state === 'number' && state < 0
              ? 'auto'
              : typeof state === 'number' && state > 0
              ? '40px'
              : null,
          left:
            typeof state === 'number' && state < 0
              ? '160px'
              : typeof state === 'number' && state > 0
              ? 'auto'
              : '50%',
        }}
        key={Math.random()}
        className={`playback-notification content-center ${
          state === 'seekback' && 'right-auto left-[160px]'
        } ${
          state === 'seekforward' && 'left-auto right-[40px]'
        } items-center h-[100px] w-[100px] left-[50%] pointer-events-none absolute top-[50%]`}
      >
        <div className="playback-background" />
        <div
          className="playback-icon flex items-center justify-center h-[38px] w-[38px]"
          role="presentation"
        >
          {state === 'play' ? (
            <Pause />
          ) : state === 'pause' ? (
            <Play />
          ) : state < 0 ? (
            <SeekBack />
          ) : state > 0 ? (
            <SeekForward />
          ) : state === 'muted' ? (
            <VolumeMuted />
          ) : state === 'unmuted' ? (
            <VolumeFull />
          ) : (
            ''
          )}
        </div>
        <style jsx>{`
          @keyframes buttonFader {
            0% {
              transform: translateY(-50%) translateX(-50%) scale(1);
              opacity: 1;
              visibility: 'visible';
            }
            100% {
              transform: translateY(-50%) translateX(-50%) scale(1.3);
              opacity: 0;
              visiblility: 'hidden';
            }
          }

          .playback-background {
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.4);
            width: 100%;
            height: 100%;
            position: absolute;
          }

          .playback-icon {
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
          }

          .playback-icon svg {
            height: 100%;
            width: 100%;
          }

          .playback-notification {
            user-select: none;
            transform: translateY(-50%) translateX(-50%);
            animation: buttonFader 650ms normal forwards ease-out;
          }
        `}</style>
      </div>
    );
  return null;
}

export default memo(PlaybackNotification);
