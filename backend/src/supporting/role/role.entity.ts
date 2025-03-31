import { RoleId } from "@shared/src/supporting/role/dto";
import { RoleNames } from "src/supporting/role/role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity {
     @PrimaryGeneratedColumn()
     id: RoleId;

     @Column({ type: "enum", enum: RoleNames, unique: true })
     name: RoleNames;
}
