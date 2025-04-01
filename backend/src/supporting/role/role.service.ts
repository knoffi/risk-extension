import { Inject, Injectable } from "@nestjs/common";
import { Role } from "src/supporting/role/role";
import { RoleRepository } from "src/supporting/role/role.repository";

export interface ReadRoles {
     findAll: () => Promise<Role[]>;
}

@Injectable()
export class RoleService implements ReadRoles {
     constructor(@Inject(RoleRepository) private roles: ReadRoles) {}

     public async findAll(): Promise<Role[]> {
          return this.roles.findAll();
     }
}
