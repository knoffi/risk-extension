import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Flavor } from "@shared/src/util/flavor";
import { ConfigService } from "src/supporting/config/config.service";
import { ReadUserService, UserService } from "src/supporting/user/user.service";

type AccessToken = Flavor<"access-token">;
type Await<T> = T extends Promise<infer K> ? K : never;
type DecryptedUser = Await<ReturnType<UserService["login"]>>;

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
          const user: DecryptedUser = await this.userService.login(
               username,
               password
          );

          return this.jwtService.signAsync(user, { expiresIn: "2 days" });
     }

     public async verifyToken(jwt: string): Promise<DecryptedUser | void> {
          try {
               const user = await this.jwtService.verifyAsync<DecryptedUser>(
                    jwt,
                    {
                         secret: this.configService.getAuthSecret(),
                    }
               );
               return user;
          } catch {
               return;
          }
     }
}
