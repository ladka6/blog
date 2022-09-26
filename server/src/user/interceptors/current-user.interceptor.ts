import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const requset = context.switchToHttp().getRequest();
    const { userId } = requset.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      requset.currentUser = user;
    }

    return handler.handle();
  }
}
