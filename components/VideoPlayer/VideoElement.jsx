import { useEffect, forwardRef } from 'react';
import useVideoPlayerStore from '../../store/videoPlayerStore';

const VideoElement = forwardRef(({ muted, playing, source }, ref) => {
  const togglePlaying = useVideoPlayerStore((state) => state.togglePlaying);

  useEffect(() => {
    const player = document.getElementById('vid');
    player.muted = muted;
  }, [muted]);

  useEffect(() => {
    const player = document.getElementById('vid');
    if (playing)
      player.play().catch(() => {
        togglePlaying();
      });
    else player.pause();
  }, [playing]);

  useEffect(() => {
    document.getElementById('vid').autoplay = true;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <video preload="true" id="vid" ref={ref} style={{ width: '100%', height: '100%' }}>
        <source src={source} />
      </video>
      {/* <div className="subtitles absolute">
        <div className="subtitles_container block whitespace-nowrap absolute left-[32%] bottom-[10%] ">
          <span className="text">I know you needed a break,</span>
          <span className="text">
            <br />
            but it's been over a year, boss.
          </span>
        </div>
      </div> */}
      <style jsx>{`
        .subtitles {
          inset: 0px 99px;
          display: block;
        }
        .text {
          font-size: 43px;
          text-shadow: #000000 0px 0px 7px;
          font-weight: bolder;
        }
      `}</style>
    </div>
  );
});

VideoElement.displayName = 'VideoElement';

export default VideoElement;
