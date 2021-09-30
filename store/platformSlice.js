const isFireFox = typeof InstallTrigger !== 'undefined';

export const platformSlice = (set, get) => ({
  isFireFox,
  dataSaver: false,
  isLoggedin: false,
  user: null,
  isToastOpen: false,
});
