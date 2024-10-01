import {User} from './user';

export type Contact = {
  id: string;
  vcard?: string;
  viewed: number;
  shared: number;
  scanned: number;
  owner?: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContactPayload = {
  vcard: string
}