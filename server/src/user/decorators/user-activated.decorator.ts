import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserActivated = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const requset = context.switchToHttp().getRequest();
    return requset.acitavted;
  },
);
