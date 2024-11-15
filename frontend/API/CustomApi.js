import axios from 'axios';
import { Config } from './Config';

const api = axios.create({
  baseURL: Config.baseUrl,
  withCredentials: true, // This is crucial for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized error (maybe redirect to login)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;