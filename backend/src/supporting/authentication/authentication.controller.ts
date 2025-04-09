import {
     BadRequestException,
     Body,
     Controller,
     Get,
     HttpCode,
     HttpStatus,
     Post,
     Request,
} from "@nestjs/common";
import {
     LoginRequestDto,
     LoginSuccessResponseDto,
} from "@shared/src/supporting/auth/dto";
import { GetUserResponse } from "@shared/src/supporting/user/dto";
import { AuthenticatedRequest } from "src/supporting/authentication/auth.guard";
import { Public } from "src/supporting/authentication/public.decorator";
import { AuthenticationService } from "./authentication.service";

@Controller("authentication")
export class AuthenticationController {
     constructor(private authService: AuthenticationService) {}

     @Public()
     @HttpCode(HttpStatus.OK)
     @Post("login")
     async signIn(@Body() loginDto: unknown): Promise<LoginSuccessResponseDto> {
          // TODO: replace typeguard with nestjs guard
          if (!isLoginDto(loginDto)) {
               // TODO: think about implementing unified error response and use error response dtos from /shared
               throw new BadRequestException(
                    JSON.stringify(
                         typeof loginDto === "object" && loginDto
                              ? Object.keys(loginDto)
                              : "Dto needs to be an object"
                    )
               );
          }

          const { token, user } = await this.authService.login(
               loginDto.username,
               loginDto.password
          );
          return { token, user };
     }

     @HttpCode(HttpStatus.OK)
     @Get("whoami")
     whoami(@Request() request: AuthenticatedRequest): GetUserResponse {
          return request.user;
     }
}

function isLoginDto(dto: unknown): dto is LoginRequestDto {
     if (dto == null || typeof dto != "object") return false;

     return (
          "username" in dto &&
          typeof dto.username == "string" &&
          "password" in dto &&
          typeof dto.password == "string"
     );
}
