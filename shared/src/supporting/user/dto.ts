import { Flavor } from "@shared/src/util/flavor";

export type UserId = Flavor<"userid">;
// TODO: Good enough for now, as lon as we do not have persistence. Before the latter, implement correct Role slice in /supporting/ and a proper role-facade, role-service, role-repository
export type RoleId = "Game master" | "player";
