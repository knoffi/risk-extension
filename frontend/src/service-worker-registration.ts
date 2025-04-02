import { defaultConfigService } from "src/supporting/config/config.service";

export const registerServiceWorker = async () => {
    if (
        "serviceWorker" in navigator &&
        defaultConfigService.getEnvironment() !== "LOCAL"
    ) {
        try {
            const registration = await navigator.serviceWorker.register(
                "/service-worker.js",
                {
                    scope: "/",
                }
            );
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();
