type EnvVariable = "NODE_ENV"

class ConfigService {
    getSocketUrl(): string| undefined {

        // "undefined" means the URL will be computed from the `window.location` object
        return this.getEnvOrThrow("NODE_ENV") === 'production' ? undefined : 'http://localhost:3001'
    }

    private getEnvOrThrow(variable: EnvVariable): string | never {
        const value = process.env[variable]

        if (typeof value != "string") throw new Error("No value variable " + variable);

        return value;
    }

    static default() {
        return new ConfigService();
    }
}

export const defaultConfigService = ConfigService.default();