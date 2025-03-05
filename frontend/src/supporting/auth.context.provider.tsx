import React, { useEffect, useState } from "react";
import { AuthContext, AuthService } from "./auth.context";

export const AuthProvider = (props: { children: React.ReactNode[] | React.ReactNode }) => {
    const [token, setToken] = useState<null | string>(null)

    const body = JSON.stringify({ username: "Player1", password: "player1" })

    useEffect(() => {
        fetch("http://localhost:3001/api/authentication/login", {
            method: "POST",
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((body) => setToken(body["access_token"]))
            .catch(error => console.error("Error during auth fetch!"))
    }, [])

    const authService: AuthService = { token, login: () => undefined }
    return <AuthContext.Provider value={authService}>{props.children}</AuthContext.Provider>
}