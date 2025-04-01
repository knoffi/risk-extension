import { RoleId } from "@shared/src/supporting/role/dto";
import { Flavor } from "@shared/src/util/flavor";

export type UserId = Flavor<"userid">;

export interface CreateUserDto {
     name: string;
     password: string;
     roleId: RoleId;
}

export interface Foo {
     username: string;
}
