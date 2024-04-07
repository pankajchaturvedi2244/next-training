import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../../decorators/roles.decorator';
import { Request } from 'express';
import { User } from '../../schemas/User.schema';

@Injectable()
export class RolesguardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context, 'I am a guard and I am protecting the users route');
    // return true to allow access to the route
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as User;
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    console.log(
      requiredRoles.includes(user.role)
        ? 'user has the required role'
        : 'user does not have the required role',
    );
    if (!requiredRoles) {
      return true;
    }
    if (!user) {
      return false;
    }
    if (requiredRoles.includes(user.role)) {
      return true;
    }
    return false;
  }
}
