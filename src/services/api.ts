import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecoleta-api.herokuapp.com/api',
});

export default api;
