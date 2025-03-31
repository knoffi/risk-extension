import { RoleId } from "@shared/src/supporting/role/dto";
import { RoleEntity } from "src/supporting/role/role.entity";
import {
     Column,
     CreateDateColumn,
     DeleteDateColumn,
     Entity,
     ManyToOne,
     PrimaryGeneratedColumn,
     UpdateDateColumn,
} from "typeorm";

@Entity()
export class UserEntity {
     // TODO #6: String or number? Also, answer this question for roles
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ type: "char", length: 20 })
     name: string;

     @Column()
     roleId: RoleId;

     @ManyToOne(() => RoleEntity)
     role: RoleEntity;

     // TODO: Should be hashed, needs salt & pepper
     @Column({ type: "text" })
     password: string;

     @CreateDateColumn({ type: "timestamptz" })
     readonly createdAt!: Date;

     @UpdateDateColumn({ type: "timestamptz" })
     readonly updatedAt!: Date;

     @DeleteDateColumn({ type: "timestamptz" })
     deletedAt!: Date;
}

export type CreateUserEntity = Pick<UserEntity, "name" | "password" | "role">;
