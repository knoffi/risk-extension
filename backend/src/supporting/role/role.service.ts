import { Inject, Injectable } from "@nestjs/common";
import { RoleId } from "@shared/src/supporting/role/dto";
import { Role } from "src/supporting/role/role";
import {
     ReadRolesRepo,
     RoleRepository,
} from "src/supporting/role/role.repository";

export interface ReadRoles {
     findAll: () => Promise<Role[]>;
     findById: (id: RoleId) => Promise<Role>;
}

@Injectable()
export class RoleService implements ReadRoles {
     constructor(@Inject(RoleRepository) private roles: ReadRolesRepo) {}

     public async findAll(): Promise<Role[]> {
          return this.roles.findAll();
     }

     public async findById(id: RoleId): Promise<Role> {
          return this.roles.findById(id);
     }
}
