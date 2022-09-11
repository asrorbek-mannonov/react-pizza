import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export default http;
