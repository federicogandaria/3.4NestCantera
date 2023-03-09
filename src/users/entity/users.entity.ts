import { v4 as uuid } from 'uuid';

export class usersEntity {
  id = uuid();
  nombre: string;
  apellido: string;
  email: string;
}
