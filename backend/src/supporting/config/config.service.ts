import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export type ReadConfig = ReadAuthConfig & ReadEnvConfig;
type ProcessKey = AuthKey | EnvKey;

export type ReadEnvConfig = { getEnvInfo(): string };
type EnvKey = "ENV_NAME";

export type ReadAuthConfig = JwtOptionsFactory & {
  getAuthSecret: () => string;
};

type AuthKey = "AUTH_SECRET";

@Injectable()
export class ConfigService implements ReadConfig {
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
}
