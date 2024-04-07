import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true to allow access to the route
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.user, 'at user guard');
    return true;
  }
}
