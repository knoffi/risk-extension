import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/supporting/user/user";
import { UserEntity } from "src/supporting/user/user.entity";
import { Repository } from "typeorm";

export interface ReadUsersRepo {
     findAllByUsername: (username: string) => Promise<User[]>;
}

export interface WriteUsersRepo {
     create: (
          user: Omit<User, "name" | "password" | "roleId">
     ) => Promise<void>;
}

@Injectable()
export class UserRepository implements ReadUsersRepo {
     constructor(
          @InjectRepository(UserEntity) private users: Repository<UserEntity>
     ) {
          const newUser = this.users.create({
               name: "super-admino",
               password: "abcdefg",
          });
          // void this.users.insert(newUser).then(() => {
          //      console.log("I created!");
          // });
     }

     public async findAllByUsername(username: string): Promise<User[]> {
          const results = await this.users.find({ where: { name: username } });
          return results.map((entity) => transform(entity));
     }
}

function transform({ id, role, name, password }: UserEntity): User {
     return { id: id.toString(), name, password, role };
}
