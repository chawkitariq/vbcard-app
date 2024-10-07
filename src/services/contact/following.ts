import {api} from '../../configs';
import {Contact} from '../../types';

export class ContactFollowingApiService {
  public static async findMeAll(): Promise<Contact[]> {
    const {data} = await api.get('/users/me/followings');
    return data;
  }

  public static async findMeOne(id: string): Promise<Contact> {
    const {data} = await api.get(`/users/me/followings/${id}`);
    return data;
  }

  public static async delete(id: string) {
    const {data} = await api.delete(`/users/me/followings/${id}`);
    return data;
  }
}
