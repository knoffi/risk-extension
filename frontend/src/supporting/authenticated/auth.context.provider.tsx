import React, { useState } from "react";
import { defaultConfigService } from "src/supporting/config/config.service";
import { AuthContext, AuthService } from "./auth.context";

export const AuthProvider = (props: {
    children: React.ReactNode[] | React.ReactNode;
}) => {
    const [token, setToken] = useState<null | string>(null);

    const origin = defaultConfigService.getApiOrigin();

    const login = (username: string, password: string) =>
        fetch(origin + "/api/authentication/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status >= 400)
                    throw new Error(`Log in failed with status ${res.status}`);
                return res.json();
            })
            .then((body) => {
                setToken(body["token"]);
            });

    const authService: AuthService = { token, login };
    return (
        <AuthContext.Provider value={authService}>
            {props.children}
        </AuthContext.Provider>
    );
};
