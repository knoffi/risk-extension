import { RoleId, RoleNames } from "@shared/src/supporting/role/dto";
import { UserEntity } from "src/supporting/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity {
     @PrimaryGeneratedColumn()
     id: RoleId;

     @Column({ type: "enum", enum: RoleNames, unique: true })
     name: RoleNames;

     @OneToMany(() => UserEntity, (user) => user.role)
     users: UserEntity[];
}
