import { RoleId } from "@shared/src/supporting/user/dto";

export interface User {
     id: string;
     name: string;
     password: string;
     roleId: RoleId;
}
