// TODO: Good enough for now, as lon as we do not have persistence. Before the latter, implement correct Role slice in /supporting/ and a proper role-facade, role-service, role-repository
type Role = "Game master" | "player";

export interface User {
     userId: string;
     username: string;
     // TODO: Should be hashed, needs salt & pepper
     password: string;
     roleId: Role;
}
