import {
     Inject,
     Injectable,
     InternalServerErrorException,
     UnauthorizedException,
} from "@nestjs/common";
import { User } from "./user";
import { ReadUsersRepo, UserRepository } from "./user.repository";

export interface ReadUserService {
     login: (
          username: string,
          password: string
     ) => Promise<Omit<User, "password">>;
}

@Injectable()
export class UserService implements ReadUserService {
     constructor(@Inject(UserRepository) private users: ReadUsersRepo) {}

     public async login(
          username: string,
          password: string
     ): Promise<Omit<User, "password">> {
          const users = await this.users.findAllByUsername(username);

          if (users.length > 1)
               throw new InternalServerErrorException(
                    `Multiple users with same username ${username}`
               );

          const userNotFound = users.length === 0;
          if (userNotFound) throw new UnauthorizedException();

          const { password: actualPassword, ...userPartial } = users[0];
          if (actualPassword !== password) throw new UnauthorizedException();

          return userPartial;
     }
}
