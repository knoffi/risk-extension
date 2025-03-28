import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/supporting/user/user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
     imports: [TypeOrmModule.forFeature([UserEntity])],
     controllers: [],
     providers: [UserService, UserRepository],
     exports: [UserService],
})
export class UserModule {}
