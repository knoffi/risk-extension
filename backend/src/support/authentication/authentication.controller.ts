import { Body, Controller, Get, HttpCode, HttpStatus, Post, BadRequestException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: unknown) {
        // TODO: replace typeguard with nestjs guard
        if(!isLoginDto(loginDto)){
            throw new BadRequestException(JSON.stringify(Object.keys(loginDto)))
        }

        return this.authService.login(loginDto.username, loginDto.password);
    }
}

interface LoginDto{
    password:string,
    username:string
}

function isLoginDto(dto:unknown): dto is LoginDto{
    if(dto == null || typeof dto != "object") return false;

    return ("username" in dto && typeof dto.username == "string") && ("password" in dto && typeof dto.password == "string")
}