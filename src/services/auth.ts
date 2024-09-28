import {AuthLoginPayload} from '../types';
import {api} from '../configs';

export class AuthApiService {
  public static async login(payload: AuthLoginPayload) {
    const {data} = await api.post('/auth/login', payload);
    return data;
  }
}
