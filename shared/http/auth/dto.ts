export interface LoginRequestDto {
    username: string,
    password: string
}

export type LoginResponseDto = LoginSuccessResponseDto | LoginFailResponseDto

export interface LoginSuccessResponseDto {
    token: string
}

export type LoginFailResponseDto = { message: "Unauthorized", statusCode: 401 } | {message: string,
    error: "Bad Request",
    statusCode: 400}