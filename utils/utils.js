export const getOneMonthAgoReleaseDate = () => {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  let formattedDate = date.toJSON().slice(0, 10);

  return formattedDate;
};

export const dateToYearOnly = (date) => date.slice(0, 4);

export const capitalizeFirstLetter = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const randomize = (data) => Math.floor(Math.random() * data.length);

export const truncate = (text, n) =>
  text?.length > n ? text.substr(0, n - 1) + '...' : text;

export const getRuntime = (n) => {
  if (n <= 60) return `${n}m`;
  return `${(n / 60) ^ 0}`.slice(-2) + 'h ' + ('0' + (n % 60)).slice(-2) + 'm';
};

export const getFallBackTitle = (data) =>
  data?.title || data?.name || data?.original_name;
