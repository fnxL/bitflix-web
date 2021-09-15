import axios from './tmdbAxiosInstance';

const fetcher = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default fetcher;
