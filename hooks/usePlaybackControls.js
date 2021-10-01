import shallow from 'zustand/shallow';
import useVideoPlayerStore from '../store/videoPlayerStore';
import { formatTime } from '../utils/utils';

const usePlaybackControls = (ref) => {
  const { playerRef } = ref;

  const [
    playing,
    vttURL,
    elapsedTime,
    duration,
    played,
    loaded,
    togglePlayback,
    muted,
    toggleMute,
    setVolume,
    volume,
    title,
    sourceList,
    subsEnabled,
    currentSource,
    subName,
    selectedSourceList,
  ] = useVideoPlayerStore(
    (state) => [
      state.playing,
      state.vttURL,
      state.elapsedTime,
      state.duration,
      state.played,
      state.loaded,
      state.togglePlayback,
      state.muted,
      state.toggleMute,
      state.setVolume,
      state.volume,
      state.title,
      state.sourceList,
      state.subsEnabled,
      state.currentSource,
      state.subName,
      state.selectedSourceList,
    ],
    shallow
  );

  const handleSeekForward = () => {
    const notif = useVideoPlayerStore.getState().notification;
    let value;
    if (typeof notif === 'string' || typeof notif === 'boolean') {
      value = 1;
    }
    if (notif < 0) {
      value = 1;
    }
    if (notif > 0) {
      value = notif + 1;
    }
    useVideoPlayerStore.setState({ notification: value });
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSeekBack = () => {
    const notif = useVideoPlayerStore.getState().notification;
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
    useVideoPlayerStore.setState({ notification: value });
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleVolumeChange = (e, value) => {
    setVolume(parseFloat(value / 100));
  };

  const handleSeekChange = (e, value) => {
    const valueInSeconds = formatTime((value / 100) * duration);
    useVideoPlayerStore.setState({ played: parseFloat(value / 100), elapsedTime: valueInSeconds });
  };

  const handleSeekMouseDown = () => {
    useVideoPlayerStore.setState({ seeking: true });
  };

  const handleSeekCommited = (e, value) => {
    useVideoPlayerStore.setState({ seeking: false });
    playerRef.current.seekTo(value / 100);
  };
  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const timeLeft = formatTime(duration - currentTime);

  const handleSubChange = () => {
    const videoElement = playerRef.current.getInternalPlayer();
    if (!subsEnabled) {
      videoElement.textTracks[0].mode = 'showing';

      useVideoPlayerStore.setState({ subsEnabled: true });
    }
  };

  const handleTurnOffSub = () => {
    const videoElement = playerRef.current.getInternalPlayer();
    if (subsEnabled) {
      videoElement.textTracks[0].mode = 'hidden';
      useVideoPlayerStore.setState({ subsEnabled: false });
    }
  };

  const handleSourceChange = (quality) => {
    const modifiedList = sourceList.map((item) => ({
      ...item,
      selected: item.quality === quality,
    }));

    const selected = modifiedList.find((item) => item.selected);
    useVideoPlayerStore.setState({ sourceList: modifiedList, currentSource: selected });
  };

  return {
    handleSeekBack,
    handleSeekChange,
    handleSeekCommited,
    handleTurnOffSub,
    handleSubChange,
    handleSeekMouseDown,
    handleSourceChange,
    handleVolumeChange,
    handleSeekForward,
    played,
    elapsedTime,
    timeLeft,
    togglePlayback,
    playing,
    volume,
    toggleMute,
    muted,
    title,
    selectedSourceList,
    currentSource,
    subName,
    vttURL,
    subsEnabled,
    loaded,
    sourceList,
  };
};

export default usePlaybackControls;
