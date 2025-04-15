import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/supporting/authentication/public.decorator";

export class BasicRouteGuard implements CanActivate {
     constructor(protected reflector: Reflector) {}

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     canActivate(context: ExecutionContext): boolean | Promise<boolean> {
          return false;
     }

     protected isPublicEndpoint(context: ExecutionContext): boolean {
          return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
               context.getHandler(),
               context.getClass(),
          ]);
     }
}
