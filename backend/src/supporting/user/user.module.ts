import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
     controllers: [],
     providers: [UserService, UserRepository],
     exports: [UserService],
})
export class UserModule {}
