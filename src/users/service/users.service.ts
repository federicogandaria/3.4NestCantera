import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import { usersEntity } from '../entity/users.entity';
import { IUsers } from '../interface/users.interface';
import { v4 as uuid } from 'uuid';

export class UsersService {
  private readonly users: usersEntity[] = [];

  addUser(nuevoUsuario: createUserDto): IUsers {
    const Id = uuid();
    const user = { Id, ...nuevoUsuario };
    this.users.push(user);
    return user;
  }

  getUsers(): usersEntity[] {
    return this.users;
  }

  findOneById(id: string): usersEntity {
    const user = this.users.find((item) => item.id === id);
    if (user) return user;
    else
      throw new HttpException('No se encontro el id we', HttpStatus.NOT_FOUND);
  }

  update(id: string, entity: updateUserDto): usersEntity {
    const indexCurrentEntity = this.users.findIndex((item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.users[indexCurrentEntity] = {
        ...this.users[indexCurrentEntity],
        ...entity,
        id,
      } as usersEntity;
    else throw new NotFoundException();
    return this.users[indexCurrentEntity];
  }
  changeName(id: string, name: string): updateUserDto {
    const cambiarNombre = this.findOneById(id);
    if (cambiarNombre) {
      cambiarNombre.nombre = name;
      return this.update(id, cambiarNombre);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  deleteUser(id: string): void {
    this.delete(id);
  }
  delete(id: string): void {
    this.users.splice(
      this.users.findIndex((item) => item.id === id),
      1,
    );
  }
}
