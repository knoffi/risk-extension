import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Flavor } from "@shared/src/util/flavor";
import { ConfigService } from "src/supporting/config/config.service";
import { ReadUserService, UserService } from "src/supporting/user/user.service";

type AccessToken = Flavor<"access-token">;

@Injectable()
export class AuthenticationService {
     constructor(
          @Inject(UserService) private userService: ReadUserService,
          private jwtService: JwtService,
          private configService: ConfigService
     ) {}

     public async login(
          username: string,
          password: string
     ): Promise<AccessToken> {
          const user = await this.userService.login(username, password);

          return this.jwtService.signAsync(user, { expiresIn: "2 days" });
     }

     public async verifyToken(jwt: string): Promise<boolean> | never {
          try {
               await this.jwtService.verifyAsync(jwt, {
                    secret: this.configService.getAuthSecret(),
               });
               return true;
          } catch {
               return false;
          }
     }
}
