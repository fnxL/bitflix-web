import { isMobile } from 'react-device-detect';
const isFirefox = typeof InstallTrigger !== 'undefined';

export const platformSlice = (set, get) => ({
  isMobile: false,
  isFirefox,
  setIsMobile: () => set({ isMobile: isMobile ? isMobile : false }),
});
