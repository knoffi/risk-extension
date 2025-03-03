import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export type ReadConfig = ReadAuthConfig & ReadEnvConfig;
type ProcessKey = AuthKey | EnvKey

export type ReadEnvConfig = {getEnvInfo():string}
type EnvKey = "ENV_NAME"

export type ReadAuthConfig = JwtOptionsFactory

type AuthKey = "AUTH_SECRET"

@Injectable()
export class ConfigService implements ReadConfig {
    getEnvInfo(): string {
        return this.getOrThrow('ENV_NAME');
    }
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {};
    }

    getOrThrow(envKey:ProcessKey):string|never{
        const envValue = process.env[envKey];

        if(!envValue){
            throw new Error("Not found: " + envKey)
        }

        return envValue;
    }
}
