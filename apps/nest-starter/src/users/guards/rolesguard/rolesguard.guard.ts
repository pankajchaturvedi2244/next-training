import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesguardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context, 'I am a guard and I am protecting the users route');
    // return true to allow access to the route
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request, 'inside roles guard request');
    const user = request.user;
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    console.log(user, 'roles', requiredRoles);
    return true;
  }
}
