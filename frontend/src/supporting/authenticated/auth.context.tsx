import { createContext } from "react";
import { User } from "src/supporting/authenticated/user";

export interface UserService {
    login: (username: string, password: string) => Promise<void>;
    user: User | null;
}

const unprovidedLogin: UserService["login"] = () => {
    throw new Error("Login unprovided");
};
export const AuthContext = createContext<UserService>({
    login: unprovidedLogin,
    user: null,
});
