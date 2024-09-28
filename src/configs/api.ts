import axios from 'axios';
import {API_BASE_URL} from '../constants';
import {useAuthStore} from '../stores';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
  if (config.headers?.Authorization) {
    const jwt = useAuthStore.getState().jwt;
    if (jwt) {
      config.headers['Authorization'] = `Bearer ${jwt}`;
    }
  }
  return config;
});

export {api};
