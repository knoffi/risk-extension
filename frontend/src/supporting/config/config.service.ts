import { BACKEND_PORT } from "@shared/src/ports";

type ImportMetaEnvKey = keyof ImportMeta["env"];
type ENV = ImportMeta["env"]["MODE"];

class ConfigService {
    getSocketOrigin(): string | undefined {
        const env = this.getEnvVarOrThrow("MODE");
        switch (env) {
            case "PROD":
            case "STG":
                // "undefined" means the origin will be computed from the `window.location.origin` object by socket.io-client
                // (socket.io-client assumes as default behaviour that the source of the frontend is the same server that handles the socket communication)
                return undefined;

            case "LOCAL":
            case "LOCAL_PREVIEW":
                return "http://localhost:" + BACKEND_PORT;
            case "LOCAL_PREVIEW_AGAINST_DOCKER":
                return "http://localhost:4144";
            default:
                throw new Error("Unknown socket origin for MODE:" + env);
        }
    }

    getApiOrigin(): string {
        const env = this.getEnvVarOrThrow("MODE");
        switch (env) {
            case "PROD":
            case "STG":
                throw new Error("Not implemented yet!");
            case "LOCAL":
            case "LOCAL_PREVIEW":
                return "http://localhost:" + BACKEND_PORT;
            case "LOCAL_PREVIEW_AGAINST_DOCKER":
                return "http://localhost:4144";

            default:
                throw new Error("Unknown socket origin for MODE:" + env);
        }
    }

    getEnvironment(): ENV {
        return this.getEnvVarOrThrow("MODE");
    }

    getNumberOfTurtles(): string | undefined {
        return this.getEnvVarOrThrow("VITE_NUMBER_OF_TURTLES");
    }

    private getEnvVarOrThrow<T extends ImportMetaEnvKey>(
        property: T
    ): ImportMeta["env"][T] | never {
        const value = import.meta.env[property];

        if (value == undefined)
            throw new Error("No value for import.meta property: " + property);

        return value;
    }

    static default() {
        return new ConfigService();
    }
}

export const defaultConfigService = ConfigService.default();
