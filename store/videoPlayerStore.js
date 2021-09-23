import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useVideoPlayerStore = create(
  devtools((set, get) => ({
    playing: true,
    notification: false,
    muted: false,
    volume: 1,
    controls: false,
    mouseMoving: true,
    played: 0,
    loaded: 0,
    seeking: false,
    duration: 0,
    elapsedTime: '00:00',

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
  }))
);
export default useVideoPlayerStore;
