import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/supporting/role/role.entity";

@Module({
     imports: [TypeOrmModule.forFeature([RoleEntity])],
     controllers: [],
     providers: [],
     exports: [],
})
export class UserModule {}
