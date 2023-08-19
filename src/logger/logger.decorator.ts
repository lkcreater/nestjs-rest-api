import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { interDecoratorLogger } from 'src/@types';

export const Logge = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;

    return <interDecoratorLogger>{
      ip: ipAddress || null,
      origin: req.originalUrl || null,
      path: req.route.path || null,
      method: req.route.stack[0].method || null,
      params: req.params || {},
    };
  },
);
