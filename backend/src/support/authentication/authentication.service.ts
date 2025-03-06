import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReadUserService, UserService } from '../user/user.service';
import { User } from '../user/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

// TODO: Introduce Flavoured Type here
type AccessToken = string

@Injectable()
export class AuthenticationService {
    constructor(@Inject(UserService) private userService: ReadUserService, private jwtService: JwtService, private configService: ConfigService) { }

    public login(username: string, password: string): Promise<AccessToken> {
        const user = this.userService.login(username, password);

        return this.jwtService.signAsync(user, { expiresIn: "2 days" });
    }

    public async verifyToken(jwt: string): Promise<boolean> | never {
        try {
            await this.jwtService.verifyAsync(
                jwt,
                {
                    secret: this.configService.getAuthSecret()
                }
            );
            return true;
        } catch {
            return false;
        }
    }
}
