import {api} from '../configs';
import {User} from '../types';

export class UserMeApiService {
  public static async findMe() {
    const {data} = await api.get('/users/me');
    return data as User;
  }

  public static async deleteMe() {
    return api.delete('/users/me');
  }
}
