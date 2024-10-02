import {AuthLoginPayload, AuthRegisterPayload} from '../types';
import {api} from '../configs';

export class AuthApiService {
  public static async login(payload: AuthLoginPayload) {
    const {data} = await api.post('/auth/login', payload);
    return data;
  }

  public static async register(payload: AuthRegisterPayload) {
    const {data} = await api.post('/auth/register', payload);
    return data;
  }
}
