import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { IUsers } from '../interface/users.interface';

export class createUserDto implements IUsers {
  @IsString({ message: ' This field should be a string' })
  @IsOptional()
  id: string;

  @IsString({ message: ' This field should be a string' })
  @IsNotEmpty({ message: ' This field should not be empty' })
  nombre: string;

  @IsOptional()
  apellido: string;

  @IsEmail()
  @IsNotEmpty({ message: ' This field should not be empty' })
  email: string;
}
