import axios from 'axios';
import { Config } from './Config';


const api = axios.create({
  baseURL: Config.baseUrl,
  withCredentials: Config.baseUrl.startsWith('http') && new URL(Config.baseUrl).origin !== window.location.origin
});

export default api;