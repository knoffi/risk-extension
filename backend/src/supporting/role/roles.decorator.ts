import { SetMetadata } from "@nestjs/common";
import { RoleNames } from "@shared/src/supporting/role/dto";

export const ALLOWED_ROLES = "allowedRoles";
export type AllowedRoles = Parameters<typeof Roles>[0];
export const Roles = (roles: RoleNames[]) => SetMetadata(ALLOWED_ROLES, roles);
