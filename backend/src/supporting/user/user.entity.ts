import { RoleId } from "@shared/src/supporting/user/dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column()
     roleId: RoleId;

     // TODO: Should be hashed, needs salt & pepper
     @Column()
     password: string;
}
