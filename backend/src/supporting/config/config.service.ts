import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export type ReadConfig = ReadAuthConfig & ReadEnvConfig & ReadDBConnection;
type ProcessKey = AuthKey | EnvKey | DBKey;

export type ReadEnvConfig = { getEnvInfo(): string; isLocal(): boolean };
type EnvKey = "ENV_NAME";

export type ReadAuthConfig = JwtOptionsFactory & {
     getAuthSecret: () => string;
};
type AuthKey = "AUTH_SECRET";

export type ReadDBConnection = {
     /** Returns either an ip address or an alias name like localhost or db (see docker-compose file) */
     getDBHost: () => string;
     getDBPort: () => number;
     getDBUsername: () => string;
     getDBPassword: () => string;
     getDBName: () => string;
     getDBConfig: () => TypeOrmModuleOptions;
     getDBRetryAttempts: () => number;
     getDBDataSource: () => DataSourceOptions;
};
type DBKey =
     | DBHostKey
     | DBPortKey
     | DBPasswordKey
     | DBUsernameKey
     | DBNameKey
     | DBRetryAttemptsKey;
type DBHostKey = "DB_HOST";
type DBPortKey = "DB_PORT";
type DBUsernameKey = "DB_USERNAME";
type DBPasswordKey = "DB_PASSWORD";
type DBNameKey = "DB_NAME";
type DBRetryAttemptsKey = "DB_RETRY_ATTEMPTS";

@Injectable()
export class ConfigService implements ReadConfig {
     getDBDataSource() {
          return this.getDBConfig();
     }
     getDBConfig(): TypeOrmModuleOptions & { type: "postgres" } {
          return {
               type: "postgres",
               host: this.getDBHost(),
               port: this.getDBPort(),
               username: this.getDBUsername(),
               password: this.getDBPassword(),
               database: this.getDBName(),
               entities: ["dist/**/*.entity{.ts,.js}"],
               synchronize: false,
               migrationsRun: this.isLocal() ? true : false,
               autoLoadEntities: true,
               // NOTE: To run migrations script during dev, build backend or run backend in dev-mode, so that dist gets updated with code changes
               migrations: ["dist/**/migrations/*.js"],
               retryAttempts: this.getDBRetryAttempts(),
          };
     }

     getDBRetryAttempts() {
          return parseInt(this.getOrThrow("DB_RETRY_ATTEMPTS"));
     }
     getDBHost() {
          return this.getOrThrow("DB_HOST");
     }
     getDBPassword() {
          return this.getOrThrow("DB_PASSWORD");
     }
     getDBUsername() {
          return this.getOrThrow("DB_USERNAME");
     }
     getDBPort() {
          return parseInt(this.getOrThrow("DB_PORT"));
     }
     getDBName() {
          return this.getOrThrow("DB_NAME");
     }

     getAuthSecret() {
          return this.getOrThrow("AUTH_SECRET");
     }
     getEnvInfo() {
          return this.getOrThrow("ENV_NAME");
     }
     isLocal(): boolean {
          return this.getOrThrow("ENV_NAME") === "local";
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
