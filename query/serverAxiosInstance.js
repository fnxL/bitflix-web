import axios from 'axios';
import config from '../config';

const { PROXY_URL } = config;

const instance = axios.create({
  baseURL: PROXY_URL,
  withCredentials: true,
});

export default instance;
