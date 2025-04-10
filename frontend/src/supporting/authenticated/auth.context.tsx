import { createContext } from "react";
import { User } from "src/supporting/authenticated/user";

export interface UserService {
    login: (username: string, password: string) => Promise<void>;
    user: User | null;
    whoami: () => Promise<void>;
}

const unprovided = () => {
    throw new Error("Login unprovided");
};
export const AuthContext = createContext<UserService>({
    login: unprovided,
    user: null,
    whoami: unprovided,
});
