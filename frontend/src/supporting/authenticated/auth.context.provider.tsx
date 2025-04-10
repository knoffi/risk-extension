import { LoginSuccessResponseDto } from "@shared/src/supporting/auth/dto";
import { GetUserResponse } from "@shared/src/supporting/user/dto";
import React, { useEffect, useState } from "react";
import { User } from "src/supporting/authenticated/user";
import { defaultConfigService } from "src/supporting/config/config.service";
import { AuthContext, UserService } from "./auth.context";

export const AuthProvider = (props: {
    children: React.ReactNode[] | React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

    const apiOrigin = defaultConfigService.getApiOrigin();

    useEffect(() => setUserOnInit(setUser), []);

    const whoami = async (): Promise<void> | never => {
        const res = await fetch(apiOrigin + "/api/authentication/whoami");

        if (res.status >= 300)
            throw new Error(`Whoami failed with status ${res.status}`);

        const user: GetUserResponse = await res.json();
        setUser(user);
    };

    const login = async (
        username: string,
        password: string
    ): Promise<void> | never => {
        const res = await fetch(apiOrigin + "/api/authentication/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status >= 300)
            throw new Error(`Log in failed with status ${res.status}`);

        const body: LoginSuccessResponseDto = await res.json();
                setUser(body.user);
    };

    const authService: UserService = { login, user, whoami };
    return (
        <AuthContext.Provider value={authService}>
            {props.children}
        </AuthContext.Provider>
    );
};
