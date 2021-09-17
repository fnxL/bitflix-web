const isFirefox = typeof InstallTrigger !== 'undefined';

export const platformSlice = (set, get) => ({
  isFirefox,
});
