import { Flavor } from "@shared/src/util/flavor";

export type RoleId = Flavor<"roleId">;

export interface GetRoleResponse {
     id: RoleId;
     name: string;
}
