import {
     CanActivate,
     ExecutionContext,
     Injectable,
     UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { BasicRouteGuard } from "src/shared/util/guards/basic.guard";
import { Await } from "src/shared/util/types/await";
import { NeverVoid } from "src/shared/util/types/never-void";
import { AuthenticationService } from "src/supporting/authentication/authentication.service";

const USER_KEY = "user";
export type AuthenticatedRequest = Request & {
     [USER_KEY]: NeverVoid<
          Await<ReturnType<AuthenticationService["verifyToken"]>>
     >;
};

@Injectable()
export class AuthenticatedGuard extends BasicRouteGuard implements CanActivate {
     constructor(
          private authService: AuthenticationService,
          protected reflector: Reflector
     ) {
          super(reflector);
     }

     async canActivate(context: ExecutionContext): Promise<boolean> {
          if (this.isPublicEndpoint(context)) return true;

          const request = context.switchToHttp().getRequest<Request>();

          const token = this.extractTokenFromHeader(request);
          if (!token) {
               throw new UnauthorizedException();
          }

          const user = await this.authService.verifyToken(token);
          if (!user) {
               throw new UnauthorizedException();
          }

          request[USER_KEY] = user;

          return true;
     }

     private extractTokenFromHeader(request: Request): string | undefined {
          const [type, token] = request.headers.authorization?.split(" ") ?? [];
          return type === "Bearer" ? token : undefined;
     }
}

export function isAuthenticatedRequest(
     request: Request
): request is AuthenticatedRequest {
     if (request == null || !("user" in request)) return false;

     const { user } = request;

     return typeof user == "object" && user != null;
}
