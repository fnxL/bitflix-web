import { useState } from 'react';

const useVideoBanner = (playerRef) => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transitionStyles, setTransitionStyles] = useState({
    titleWrapper: {},
    infoWrapper: {},
    infoFade: {},
  });

  const toggleMute = () => {
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
    setTransitionStyles((state) => ({
      ...state,
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
    }));
  };

  const onReady = () => {
    setTransitionStyles((state) => ({
      ...state,
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
    }));
  };

  const onEnd = () => {
    setTransitionStyles((state) => ({
      ...state,
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
    }));
    setIsPlaying(false);
    setHasVideoEnded(true);
  };

  return {
    isMuted,
    hasVideoEnded,
    isPlaying,
    transitionStyles,
    toggleMute,
    onPlay,
    onEnd,
    replay,
    onReady,
  };
};

export default useVideoBanner;
