import { createContext } from "react";
import { User } from "src/supporting/authenticated/user";

export interface AuthService {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    user: User | null;
}

const unprovidedLogin: AuthService["login"] = () => {
    throw new Error("Login unprovided");
};
export const AuthContext = createContext<AuthService>({
    token: null,
    login: unprovidedLogin,
    user: null,
});
