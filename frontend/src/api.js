import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: `${config.apiBaseUrl}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

export default api;
