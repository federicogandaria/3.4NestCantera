import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { IUsers } from '../interface/users.interface';

export class GetUserDTO implements IUsers {
  id: string;
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(12, {
    message: 'Name is too long',
  })
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(12, {
    message: 'Name is too long',
  })
  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
