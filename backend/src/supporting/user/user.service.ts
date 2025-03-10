import { Inject, Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {ReadUsersRepo, UserRepository } from './user.repository';
import { User } from './user';


export interface ReadUserService {
    login: (username: string, password: string) => Omit<User, "password">
}


@Injectable()
export class UserService implements ReadUserService {
    constructor(@Inject(UserRepository.name) private users: ReadUsersRepo) { }

    public login(username: string, password: string): Omit<User, "password">{
        const users = this.users.findAllByUsername(username);

        if (users.length > 1) throw new InternalServerErrorException(`Multiple users with same username ${username}`);

        const userNotFound = users.length === 0
        if (userNotFound) throw new UnauthorizedException();

        const { password: actualPassword, ...userPartial } = users[0]
        if (actualPassword !== password) throw new UnauthorizedException();

        return userPartial;
    };
}
