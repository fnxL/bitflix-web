import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useVideoPlayerStore = create(
  devtools((set, get) => ({
    playing: true,
    notification: false,
    muted: false,
    fullscreen: false,
    controls: false,
    mouseMoving: true,

    pause: () => set({ playing: false }),
    togglePlaying: () => set((state) => ({ playing: !state.playing })),
    toggleMute: () => set((state) => ({ muted: !state.muted })),
    toggleFullscreen: () => set((state) => ({ fullscreen: !state.fullscreen })),
    setNotification: (notification) => set({ notification }),
    setControls: (bool) => set({ controls: bool }),
    setMouseMoving: (bool) => set({ mouseMoving: bool }),
  }))
);
export default useVideoPlayerStore;
