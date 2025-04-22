import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://127.0.0.1:5010',
  withCredentials: true,
});
