import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUsers } from '../interface/users.interface';

export class PatchUserDTO implements IUsers {
  id: string;
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(12, {
    message: 'Name is too long',
  })
  @IsOptional()
  nombre: string;

  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(12, {
    message: 'Name is too long',
  })
  @IsOptional()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;
}
