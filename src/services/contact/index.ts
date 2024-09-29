export * from './follower';

import {api} from '../../configs';
import {Contact} from '../../types';

export class ContactApiService {
  public static async findAll() {
    const {data} = await api.get('/contacts');
    return data as {contacts: Contact[]};
  }

  public static async delete(id: string) {
    return api.delete(`/contacts/${id}`);
  }
}
