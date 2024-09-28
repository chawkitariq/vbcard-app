import axios from 'axios';
import {AuthLoginPayload} from '../types';
import {API_BASE_URL} from '../constants';

export class AuthApiService {
  public static async login(payload: AuthLoginPayload) {
    const {data} = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    return data;
  }
}
