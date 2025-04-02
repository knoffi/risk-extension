import { RoleNames } from "@shared/src/supporting/role/dto";

export enum Permissions {
    CAN_MANAGE_USERS = "Can manage users",
}

// TODO: Introduce proper permission system, get permissions from endpoint and implement one-to-many role -> permissions (maybe even role -> rightsgroup -> permissions)
export function hasPermission(
    permission: Permissions,
    role: RoleNames
): boolean {
    switch (permission) {
        case Permissions.CAN_MANAGE_USERS:
            return role === RoleNames.GAMER_MASTER;
        default:
            throw new Error("Unknown permission " + role);
    }
}
