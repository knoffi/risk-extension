import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./service-worker-registration";
import { AuthProvider } from "./supporting/authenticated/auth.context.provider";
import { SocketProvider } from "./supporting/socket/socket.context.provider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <SocketProvider>
                <App />
            </SocketProvider>
        </AuthProvider>
    </React.StrictMode>
);

serviceWorkerRegistration.registerServiceWorker();
