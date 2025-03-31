import {
     CanActivate,
     ExecutionContext,
     Injectable,
     UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { AuthenticationService } from "src/supporting/authentication/authentication.service";
import { IS_PUBLIC_KEY } from "src/supporting/authentication/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
     constructor(
          private authService: AuthenticationService,
          private reflector: Reflector
     ) {}

     async canActivate(context: ExecutionContext): Promise<boolean> {
          if (this.isPublicEndpoint(context)) return true;

          const request = context.switchToHttp().getRequest<Request>();

          console.log(JSON.stringify(request.body));

          const token = this.extractTokenFromHeader(request);
          if (!token) {
               throw new UnauthorizedException();
          }
          //   try {
          //        const payload = await this.jwtService.verifyAsync(token, {
          //             secret: jwtConstants.secret,
          //        });
          //        // 💡 We're assigning the payload to the request object here
          //        // so that we can access it in our route handlers
          //        request["user"] = payload;
          //   } catch {
          //        throw new UnauthorizedException();
          //   }
          return true;
     }

     private isPublicEndpoint(context: ExecutionContext): boolean {
          return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
               context.getHandler(),
               context.getClass(),
          ]);
     }

     private extractTokenFromHeader(request: Request): string | undefined {
          const [type, token] = request.headers.authorization?.split(" ") ?? [];
          return type === "Bearer" ? token : undefined;
     }
}
