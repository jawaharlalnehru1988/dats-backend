import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../common/types';

export interface UserPayload {
  name: string;
  email: string;
  sub: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    if (!request.user) {
      throw new Error('User not found in request');
    }
    return request.user;
  },
);
