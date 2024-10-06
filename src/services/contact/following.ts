import {api} from '../../configs';
import {Contact} from '../../types';

export class ContactFollowingApiService {
  public static async findMeAll() {
    const {data} = await api.get('/users/me/followings');
    return data as Contact[];
  }

  public static async findMeOne(id: string) {
    const {data} = await api.get(`/users/me/followings/${id}`);
    return data as Contact;
  }
}
