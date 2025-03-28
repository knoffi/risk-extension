import { RoleId } from "@shared/src/supporting/user/dto";
import {
     Column,
     CreateDateColumn,
     DeleteDateColumn,
     Entity,
     PrimaryGeneratedColumn,
     UpdateDateColumn,
} from "typeorm";

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

     @CreateDateColumn({ type: "timestamptz" })
     readonly createdAt!: Date;

     @UpdateDateColumn({ type: "timestamptz" })
     readonly updatedAt!: Date;

     @DeleteDateColumn({ type: "timestamptz" })
     deletedAt!: Date;
}
