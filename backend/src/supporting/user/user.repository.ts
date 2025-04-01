import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/supporting/user/user";
import { CreateUserEntity, UserEntity } from "src/supporting/user/user.entity";
import { Repository } from "typeorm";

export interface ReadUsersRepo {
     findAllByUsername: (username: string) => Promise<User[]>;
     findAll: () => Promise<User[]>;
}

export interface WriteUsersRepo {
     create: (user: CreateUserEntity) => Promise<void>;
}

@Injectable()
export class UserRepository implements ReadUsersRepo, WriteUsersRepo {
     constructor(
          @InjectRepository(UserEntity) private users: Repository<UserEntity>
     ) {}

     public async findAllByUsername(username: string): Promise<User[]> {
          const results = await this.users.find({
               where: { name: username },
               relations: { role: true },
          });
          return results.map((entity) => transform(entity));
     }

     public async findAll(): Promise<User[]> {
          const results = await this.users.find({ relations: { role: true } });
          return results.map((entity) => transform(entity));
     }

     public create({
          name,
          password,
          roleId,
     }: CreateUserEntity): Promise<void> {
          return void this.users.insert({ name, password, roleId });
     }
}

function transform({ id, role, name, password, roleId }: UserEntity): User {
     return {
          id: id.toString(),
          name,
          password,
          role,
          roleId,
     };
}
