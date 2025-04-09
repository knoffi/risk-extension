import {
     Body,
     Controller,
     Get,
     HttpCode,
     HttpStatus,
     Post,
} from "@nestjs/common";
import {
     CreateUserDto,
     GetUserResponse,
} from "@shared/src/supporting/user/dto";
import { UserService } from "src/supporting/user/user.service";

@Controller("user")
export class UserController {
     constructor(private userService: UserService) {}

     @HttpCode(HttpStatus.CREATED)
     @Post("create")
     create(@Body() body: CreateUserDto): Promise<undefined> {
          return this.userService.create(body);
     }

     @HttpCode(HttpStatus.OK)
     @Get()
     findAll(): Promise<GetUserResponse[]> {
          return this.userService.findAll();
     }
}
