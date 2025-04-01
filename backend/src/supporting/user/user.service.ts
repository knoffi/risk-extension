import {
     Inject,
     Injectable,
     InternalServerErrorException,
     UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "@shared/src/supporting/user/dto";
import { User } from "./user";
import {
     ReadUsersRepo,
     UserRepository,
     WriteUsersRepo,
} from "./user.repository";

export interface ReadUserService {
     login: (
          username: string,
          password: string
     ) => Promise<Omit<User, "password">>;

     create: (newUser: CreateUserDto) => Promise<void>;
}

@Injectable()
export class UserService implements ReadUserService {
     constructor(
          @Inject(UserRepository) private users: ReadUsersRepo & WriteUsersRepo
     ) {}

     public async create(newUser: CreateUserDto): Promise<void> {
          return this.users.create({
               name: newUser.name,
               password: newUser.password,
               roleId: newUser.roleId,
          });
     }

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

     public async findAll(): Promise<User[]> {
          return this.users.findAll();
     }
}
