import axios from 'axios';
import { Config } from '../../API/Config';

const api = axios.create({
  baseURL: Config.BaseUrl,
  withCredentials: Config.BaseUrl.startsWith('http') && new URL(Config.BaseUrl).origin !== window.location.origin
});

export default api;