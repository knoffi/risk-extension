
type ImportMetaEnvKey = keyof ImportMeta["env"]

class ConfigService {
    getSocketUrl(): string| undefined {

        // "undefined" means the URL will be computed from the `window.location` object by socket.io-client
        return this.getEnvVarOrThrow("PROD") === true ? undefined : 'http://localhost:3001'
    }

    getNumberOfTurtles(): string|undefined {
        return this.getEnvVarOrThrow("VITE_NUMBER_OF_TURTLES")
    }


    private getEnvVarOrThrow<T extends ImportMetaEnvKey>(property: T): ImportMeta["env"][T] | never {
        const value = import.meta.env[property];

        if (value == undefined) throw new Error("No value for import.meta property: " + property);

        return value;
    }

    static default() {
        return new ConfigService();
    }
}

export const defaultConfigService = ConfigService.default();