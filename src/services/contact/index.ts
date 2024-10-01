export * from './follower';

import {api} from '../../configs';
import {Contact, CreateContactPayload} from '../../types';

export class ContactApiService {
  public static async findAll() {
    const {data} = await api.get('/contacts');
    return data as {contacts: Contact[]};
  }

  public static async create(payload: CreateContactPayload) {
    await api.post('/contacts', payload);
  }

  public static async delete(id: string) {
    return api.delete(`/contacts/${id}`);
  }
}
