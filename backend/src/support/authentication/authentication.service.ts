import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReadUserService, UserService } from '../user/user.service';
import { User } from '../user/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthenticationService {
    constructor(@Inject(UserService) private userService: ReadUserService, private jwtService: JwtService, private configService: ConfigService) { }

    public login(username: string, password: string): Omit<User, "password"> | null {
        return this.userService.login(username, password);
    }

    public async verifyToken(jwt: string): Promise<boolean> | never {
        try {
            const foo = await this.jwtService.verifyAsync(
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
