import { Controller, Get, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import { RoleNames } from "@shared/src/supporting/role/dto";
import { Role } from "src/supporting/role/role";
import { ReadRoles, RoleService } from "src/supporting/role/role.service";
import { Roles } from "src/supporting/role/roles.decorator";

@Controller("role")
export class RoleController {
     constructor(@Inject(RoleService) private roleService: ReadRoles) {}

     @Get("")
     @HttpCode(HttpStatus.OK)
     @Roles([RoleNames.GAMER_MASTER])
     public async findAll(): Promise<Role[]> {
          return this.roleService.findAll();
     }
}
