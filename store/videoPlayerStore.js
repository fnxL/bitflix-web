import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useVideoPlayerStore = create(
  devtools((set, get) => ({
    playing: true,
    notification: false,
    muted: false,
    volume: 1,
    played: 0,
    loaded: 0,
    seeking: false,
    duration: 0,
    elapsedTime: '00:00',
    sourceLoaded: false,
    currentSource: null,
    sourceList: [],
    title: '',
    buffering: false,
    currentTime: 0,
    subsEnabled: true,
    srtURL: false,
    vttURL: '',
    subName: '',
    quality: '1080',
    selectedSourceList: [],
    tryCount: 1,
    error: '',

    pause: () => set({ playing: false }),
    togglePlayback: () =>
      set((state) => ({ playing: !state.playing, notification: state.playing ? 'play' : 'pause' })),
    toggleMute: () =>
      set((state) => ({ muted: !state.muted, notification: state.muted ? 'unmuted' : 'muted' })),

    setVolume: (value) =>
      set((state) => ({
        volume: value,
        muted: value === 0,
        notification: value === 0 ? 'muted' : 'unmuted',
      })),

    setNotification: (notification) => set({ notification }),

    resetVideoPlayer: () =>
      set({
        playing: true,
        notification: false,
        muted: false,
        played: 0,
        loaded: 0,
        seeking: false,
        duration: 0,
        elapsedTime: '00:00',
        sourceLoaded: false,
        currentSource: null,
        sourceList: [],
        title: '',
        buffering: false,
        currentTime: 0,
        subsEnabled: true,
        srtURL: false,
        vttURL: '',
        subName: '',
        error: '',
      }),
  }))
);
export default useVideoPlayerStore;
