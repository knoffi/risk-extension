import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdmin1743150935734 implements MigrationInterface {
     public async up(queryRunner: QueryRunner): Promise<void> {
          console.error("I MIGRATED UPWARD");
     }

     public async down(queryRunner: QueryRunner): Promise<void> {
          console.error("I MIGRATED DOWNWARD");
     }
}
