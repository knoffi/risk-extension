import {
     Body,
     Controller,
     Get,
     HttpCode,
     HttpStatus,
     Post,
} from "@nestjs/common";
import { RoleNames } from "@shared/src/supporting/role/dto";
import {
     CreateUserDto,
     GetUserResponse,
} from "@shared/src/supporting/user/dto";
import { Roles } from "src/supporting/role/roles.decorator";
import { UserService } from "src/supporting/user/user.service";

@Controller("user")
export class UserController {
     constructor(private userService: UserService) {}

     @HttpCode(HttpStatus.CREATED)
     @Post()
     @Roles([RoleNames.GAMER_MASTER])
     create(@Body() body: CreateUserDto): Promise<undefined> {
          return this.userService.create(body);
     }

     @HttpCode(HttpStatus.OK)
     @Get()
     @Roles([RoleNames.GAMER_MASTER])
     findAll(): Promise<GetUserResponse[]> {
          return this.userService.findAll();
     }
}
