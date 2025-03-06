import React, { useState } from "react";
import { AuthContext, AuthService } from "./auth.context";

export const AuthProvider = (props: { children: React.ReactNode[] | React.ReactNode }) => {
    const [token, setToken] = useState<null | string>(null)

    const login = (username: string, password: string) => fetch("http://localhost:3001/api/authentication/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((body) => setToken(body["token"])) // TODO: Use shared type here

    const authService: AuthService = { token, login }
    return <AuthContext.Provider value={authService}>{props.children}</AuthContext.Provider>
}