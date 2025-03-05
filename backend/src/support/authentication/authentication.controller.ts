import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) { }

    // TODO: define dto response and put it in shared
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginDto: unknown) {
        // TODO: replace typeguard with nestjs guard
        if (!isLoginDto(loginDto)) {
            throw new BadRequestException(JSON.stringify(Object.keys(loginDto)))
        }

        const token = await this.authService.login(loginDto.username, loginDto.password)
        return { token };
    }
}

interface LoginDto {
    password: string,
    username: string
}

function isLoginDto(dto: unknown): dto is LoginDto {
    if (dto == null || typeof dto != "object") return false;

    return ("username" in dto && typeof dto.username == "string") && ("password" in dto && typeof dto.password == "string")
}