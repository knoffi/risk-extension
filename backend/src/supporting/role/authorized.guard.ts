import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { BasicRouteGuard } from "src/shared/util/guards/basic.guard";
import { isAuthenticatedRequest } from "src/supporting/authentication/authenticated.guard";
import {
     ALLOWED_ROLES,
     AllowedRoles,
} from "src/supporting/role/roles.decorator";

@Injectable()
export class AuthorizedGuard extends BasicRouteGuard implements CanActivate {
     constructor(protected reflector: Reflector) {
          super(reflector);
     }

     canActivate(context: ExecutionContext): boolean {
          if (this.isPublicEndpoint(context)) return true;

          const request = context.switchToHttp().getRequest<Request>();
          if (!isAuthenticatedRequest(request)) return false;

          const { user } = request;
          const allowedRoles = this.reflector.getAllAndOverride<AllowedRoles>(
               ALLOWED_ROLES,
               [context.getHandler(), context.getClass()]
          );

          if (!allowedRoles) {
               console.log("No roles allowed for: " + request.path);
               return false;
          }

          return allowedRoles.some((role) => user.role.name === role);
     }
}
