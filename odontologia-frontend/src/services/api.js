import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Tu backend
});

export default api;
