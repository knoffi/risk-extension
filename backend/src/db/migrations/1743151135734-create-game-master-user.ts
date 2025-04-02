import { RoleNames } from "@shared/src/supporting/role/dto";
import { RoleEntity } from "src/supporting/role/role.entity";
import { UserEntity } from "src/supporting/user/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

const GAME_MASTER_NAME = "superadmin";

export class CreateGameMasterUser1743151135734 implements MigrationInterface {
     public async up(queryRunner: QueryRunner): Promise<unknown> {
          const role = await queryRunner.manager.findOne(RoleEntity, {
               where: { name: RoleNames.GAMER_MASTER },
          });

          return queryRunner.manager.insert(UserEntity, {
               name: GAME_MASTER_NAME,
               password: "12345",
               role: role,
          });
     }

     public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.manager.delete(UserEntity, {
               name: GAME_MASTER_NAME,
          });
     }
}
