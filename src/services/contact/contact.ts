import {api} from '../../configs';
import {Contact, CreateContactPayload} from '../../types';

export class ContactApiService {
  public static async create(payload: CreateContactPayload): Promise<Contact> {
    const {data} = await api.post('/contacts', payload);
    return data;
  }

  public static async findAll(): Promise<Contact[]> {
    const {data} = await api.get('/contacts');
    return data;
  }

  public static async findOne(id: string): Promise<Contact> {
    const {data} = await api.get(`/contacts/${id}`);
    return data;
  }

  public static async delete(id: string) {
    await api.delete(`/contacts/${id}`);
  }
}
