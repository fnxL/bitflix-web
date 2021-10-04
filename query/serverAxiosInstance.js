import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export default instance;
