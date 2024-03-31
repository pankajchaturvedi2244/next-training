import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUserIP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.connection.remoteAddress; // returns the IP address of the client
  },
);
