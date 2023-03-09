import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Interceptor } from 'src/interceptors/transform.interceptor';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import { usersEntity } from '../entity/users.entity';
import { IUsers } from '../interface/users.interface';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  @UseInterceptors(Interceptor)
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUser: createUserDto): IUsers {
    const crearUsuario = this.usersService.addUser(createUser);
    if (crearUsuario) {
      return crearUsuario;
    } else {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  getUsers(): IUsers[] {
    const gUser = this.usersService.getUsers();
    if (gUser) {
      return gUser;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserInfo(@Param('id', ParseUUIDPipe) userId: string): usersEntity {
    return this.usersService.findOneById(userId);
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() usuario: updateUserDto,
  ): usersEntity {
    return this.usersService.update(id, usuario);
  }
  @UseGuards(AuthGuard)
  @Patch('updateName/:id')
  changeName(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('Name') name: string,
  ): void {
    this.usersService.changeName(id, name);
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string): boolean {
    this.usersService.deleteUser(id);
    return true;
  }
}
