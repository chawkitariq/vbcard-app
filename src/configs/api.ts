import axios from 'axios';
import {API_BASE_URL} from '../constants';
import {useAuthStore} from '../stores';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export {api};
