import axios from 'axios';

const baseURL = 'https://woman-safety-app-api.vercel.app'
  

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;