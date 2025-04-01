import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/supporting/role/role";
import { RoleEntity } from "src/supporting/role/role.entity";
import { Repository } from "typeorm";

export interface ReadRolesRepo {
     findAll: () => Promise<Role[]>;
}

@Injectable()
export class RoleRepository implements ReadRolesRepo {
     constructor(
          @InjectRepository(RoleEntity) private roles: Repository<RoleEntity>
     ) {}

     public async findAll(): Promise<Role[]> {
          const results = await this.roles.find();
          return results.map((entity) => transform(entity));
     }
}

function transform({ id, name }: RoleEntity): Role {
     return {
          id: id.toString(),
          name,
     };
}
