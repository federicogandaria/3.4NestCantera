import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { createUserDto } from '../users/dto/createUser.dto';

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((customer: createUserDto) => {
        if (!customer.hasOwnProperty('apellido')) {
          customer.apellido = 'null';
        }
        return customer;
      }),
    );
  }
}
