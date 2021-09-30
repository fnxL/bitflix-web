import axios from 'axios';
import config from '../config';

const { SERVER_URL } = config;

const instance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default instance;
