import { RoleNames } from "src/supporting/role/role";
import { RoleEntity } from "src/supporting/role/role.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlayerRole1743499211000 implements MigrationInterface {
     public async up(queryRunner: QueryRunner): Promise<unknown> {
          return queryRunner.manager.save(RoleEntity, {
               name: RoleNames.PLAYER,
          });
     }

     public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.manager.delete(RoleEntity, {
               name: RoleNames.PLAYER,
          });
     }
}
