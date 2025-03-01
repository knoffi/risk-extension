import { Inject, Injectable } from '@nestjs/common';
import { ReadUserService, UserService } from '../user/user.service';
import { User } from '../user/user';

@Injectable()
export class AuthenticationService {
    constructor(@Inject(UserService) private userService:ReadUserService){}

    public login(username:string,password:string):Omit<User,"password">|null{
        return this.userService.login(username,password);
    }
}
