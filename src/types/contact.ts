import {User} from './user';

export type Contact = {
  id: string;
  vcard?: string;
  viewed: number;
  shared: number;
  scanned: number;
  layout: Contact.Layout;
  owner?: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContactPayload = {
  vcard: string;
};

export namespace Contact {
  export enum Layout {
    Leder = 'leder',
    Futer = 'futer',
    Rider = 'rider',
    Miter = 'miter',
    Lext = 'lext',
    Rixt = 'rixt',
  }
}
