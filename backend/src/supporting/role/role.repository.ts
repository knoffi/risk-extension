import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleId } from "@shared/src/supporting/role/dto";
import { Role } from "src/supporting/role/role";
import { RoleEntity } from "src/supporting/role/role.entity";
import { Repository } from "typeorm";

export interface ReadRolesRepo {
     findAll: () => Promise<Role[]>;
     findById: (id: RoleId) => Promise<Role | null>;
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

     public async findById(id: RoleId): Promise<Role | null> {
          return this.roles.findOne({ where: { id } });
     }
}

function transform({ id, name }: RoleEntity): Role {
     return {
          id: id.toString(),
          name,
     };
}
