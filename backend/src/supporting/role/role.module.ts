import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "src/supporting/role/role.controller";
import { RoleEntity } from "src/supporting/role/role.entity";
import { RoleRepository } from "src/supporting/role/role.repository";
import { RoleService } from "src/supporting/role/role.service";

@Module({
     imports: [TypeOrmModule.forFeature([RoleEntity])],
     controllers: [RoleController],
     providers: [RoleService, RoleRepository],
     exports: [],
})
export class RoleModule {}
