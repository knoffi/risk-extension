import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Flavor } from "@shared/src/util/flavor";
import { Await } from "src/shared/util/types/await";
import {
     ConfigService,
     ReadAuthConfig,
} from "src/supporting/config/config.service";
import { User } from "src/supporting/user/user";
import { ReadUserService, UserService } from "src/supporting/user/user.service";

type AccessToken = Flavor<"access-token">;

type UserFromToken = Await<ReturnType<UserService["login"]>>;
type DecodedJwt = UserFromToken & {
     iat: number;
     exp: number;
};

type ReadWriteJwt = Pick<JwtService, "signAsync" | "verifyAsync" | "decode">;

@Injectable()
export class AuthenticationService {
     constructor(
          @Inject(UserService) private userService: ReadUserService,
          @Inject(JwtService) private jwtService: ReadWriteJwt,
          @Inject(ConfigService) private configService: ReadAuthConfig
     ) {}

     public async login(
          username: string,
          password: string
     ): Promise<{ token: AccessToken; user: Omit<User, "password"> }> {
          const user = await this.userService.login(username, password);
          const token = await this.jwtService.signAsync(user, {
               expiresIn: "2 days",
          });

          return {
               token,
               user,
          };
     }

     public async verifyToken(jwt: string): Promise<UserFromToken | void> {
          try {
               const { exp, iat, ...user } =
                    await this.jwtService.verifyAsync<DecodedJwt>(jwt, {
                         secret: this.configService.getAuthSecret(),
                    });
               return user;
          } catch {
               return;
          }
     }

     public decodeJwt(jwt: string): DecodedJwt {
          return this.jwtService.decode<DecodedJwt>(jwt);
     }
}
