import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUsers } from '../interface/users.interface';

export class GetUserById implements IUsers {
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

  @MinLength(3, {
    message: 'Last name is too short',
  })
  @MaxLength(12, {
    message: 'Last name is too long',
  })
  @IsOptional()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
