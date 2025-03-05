import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService, private jwtService: JwtService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginDto: unknown) {
        // TODO: replace typeguard with nestjs guard
        if(!isLoginDto(loginDto)){
            throw new BadRequestException(JSON.stringify(Object.keys(loginDto)))
        }

        const payload = this.authService.login(loginDto.username, loginDto.password);
        const jwt = await this.jwtService.signAsync(payload,{expiresIn:"2 days"});

    return {
      access_token: jwt,
    };
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