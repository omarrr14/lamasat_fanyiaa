import axios from 'axios';

const api = axios.create({
  // Use relative path so requests go to localhost:5173/api and get proxied by Vite
  baseURL: import.meta.env.MODE === 'development' ? '' : 'https://omarapis.runasp.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
