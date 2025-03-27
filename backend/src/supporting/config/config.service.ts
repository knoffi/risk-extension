import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export type ReadConfig = ReadAuthConfig & ReadEnvConfig & ReadDBConnection;
type ProcessKey = AuthKey | EnvKey | DBHostKey;

export type ReadEnvConfig = { getEnvInfo(): string };
type EnvKey = "ENV_NAME";

export type ReadAuthConfig = JwtOptionsFactory & {
     getAuthSecret: () => string;
};
type AuthKey = "AUTH_SECRET";

export type ReadDBConnection = {
     /** Returns either an ip address or an alias name like localhost or db (see docker-compose file) */
     getDBHost: () => string;
};
type DBHostKey = "DB_HOST";

@Injectable()
export class ConfigService implements ReadConfig {
     getDBHost(): string {
          console.error(this.getOrThrow("DB_HOST"));
          return this.getOrThrow("DB_HOST");
     }

     getAuthSecret(): string {
          return this.getOrThrow("AUTH_SECRET");
     }
     getEnvInfo(): string {
          return this.getOrThrow("ENV_NAME");
     }

     createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
          return { secret: this.getOrThrow("AUTH_SECRET") };
     }

     private getOrThrow(envKey: ProcessKey): string | never {
          const envValue = process.env[envKey];

          if (!envValue) {
               throw new Error("Not found: " + envKey);
          }

          return envValue;
     }

     static build(): ConfigService {
          return new ConfigService();
     }
}

export const defaultConfigService: ReadConfig = ConfigService.build();
