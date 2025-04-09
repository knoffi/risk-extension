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
     async create(@Body() body: CreateUserDto): Promise<void> {
          return this.userService.create(body);
     }

     @HttpCode(HttpStatus.OK)
     @Get()
     async findAll(): Promise<GetUserResponse[]> {
          return this.userService.findAll();
     }
}
