import {api} from '../../configs';
import {Contact} from '../../types';

export class ContactFollowerApiService {
  public static async findMeFollowings() {
    const {data} = await api.get('/users/me/followings');
    return data as {contacts: Contact[]};
  }
}
