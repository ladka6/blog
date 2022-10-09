import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserActivatedInterceptor implements NestInterceptor {
  constructor(private usersService: UserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const requset = context.switchToHttp().getRequest();

    const { userId, acitavted } = requset.session || {};

    if (userId && acitavted) {
      const user = await this.usersService.findOne(userId);
      if (user) {
        requset.acitavted = user.active;
      }
      // console.log(user);
      // requset.acitavted = user;
    }

    return handler.handle();
  }
}
