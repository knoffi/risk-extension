import { createContext } from "react";

export interface AuthService {
    token: string | null;
    login: (username: string, password: string) => Promise<void> | void
}

export const AuthContext = createContext<AuthService>({ token: null, login: () => undefined })
