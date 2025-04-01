import { Controller, Get, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import { Role } from "src/supporting/role/role";
import { ReadRoles, RoleService } from "src/supporting/role/role.service";

@Controller("role")
export class RoleController {
     constructor(@Inject(RoleService) private roleService: ReadRoles) {}

     @Get("")
     @HttpCode(HttpStatus.OK)
     public async findAll(): Promise<Role[]> {
          return this.roleService.findAll();
     }
}
