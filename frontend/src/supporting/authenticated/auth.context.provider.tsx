import { LoginSuccessResponseDto } from "@shared/src/supporting/auth/dto";
import React, { useState } from "react";
import { User } from "src/supporting/authenticated/user";
import { defaultConfigService } from "src/supporting/config/config.service";
import { AuthContext, UserService } from "./auth.context";

export const AuthProvider = (props: {
    children: React.ReactNode[] | React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

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
            .then((body: LoginSuccessResponseDto) => {
                setUser(body.user);
            });

    const authService: UserService = { login, user };
    return (
        <AuthContext.Provider value={authService}>
            {props.children}
        </AuthContext.Provider>
    );
};
