import axios from 'axios';
import { Config } from './Config';

const api = axios.create({
  baseURL: Config.baseUrl,
  withCredentials: true, // This is crucial for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});



export default api;