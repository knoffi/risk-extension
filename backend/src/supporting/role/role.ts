import { RoleId } from "@shared/src/supporting/role/dto";

export enum RoleNames {
     GAMER_MASTER = "Game master",
     PLAYER = "Player",
}

export interface Role {
     id: RoleId;
     name: RoleNames;
}
