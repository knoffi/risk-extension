import { GetUserResponse } from "@shared/src/supporting/user/dto";

export interface LoginRequestDto {
     username: string;
     password: string;
}

export type LoginResponseDto = LoginSuccessResponseDto | LoginFailResponseDto;

export interface LoginSuccessResponseDto {
     token: string;
     user: GetUserResponse;
}

export type LoginFailResponseDto =
     | { message: "Unauthorized"; statusCode: 401 }
     | { message: string; error: "Bad Request"; statusCode: 400 };
