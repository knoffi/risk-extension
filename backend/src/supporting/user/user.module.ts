import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "src/supporting/role/role.module";
import { UserController } from "src/supporting/user/user.controller";
import { UserEntity } from "src/supporting/user/user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
     imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
     controllers: [UserController],
     providers: [UserService, UserRepository],
     exports: [UserService],
})
export class UserModule {}
