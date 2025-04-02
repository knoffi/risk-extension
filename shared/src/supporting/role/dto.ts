import { Flavor } from "@shared/src/util/flavor";

export enum RoleNames {
     GAMER_MASTER = "Game master",
     PLAYER = "Player",
}

export type RoleId = Flavor<"roleId">;

export interface GetRoleResponse {
     id: RoleId;
     name: RoleNames;
}
