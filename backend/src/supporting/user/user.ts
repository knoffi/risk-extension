import { Role } from "src/supporting/role/role";

export interface User {
     id: string;
     name: string;
     password: string;
     role: Role;
}
