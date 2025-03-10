import { createContext } from "react";

export interface AuthService {
    token: string | null;
    login: (username: string, password: string) => Promise<void>
}

const unprovidedLogin: AuthService["login"] = () => { throw new Error("Login unprovided") }
export const AuthContext = createContext<AuthService>({ token: null, login: unprovidedLogin })
