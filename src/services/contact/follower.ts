import {api} from '../../configs';

export class ContactFollowerApiService {
  public static async findMeFollowings() {
    const {data} = await api.get('/users/me/followings');
    return data;
  }
}
