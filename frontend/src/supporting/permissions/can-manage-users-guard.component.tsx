import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Pages } from "src/pages";
import { AuthContext } from "src/supporting/authenticated/auth.context";
import {
    hasPermission,
    Permissions,
} from "src/supporting/permissions/has-permission";

export const CanManageUsersGuard = () => {
    const { user } = useContext(AuthContext);
    if (!user || !hasPermission(Permissions.CAN_MANAGE_USERS, user.role.name))
        return <Navigate to={Pages.HOME_PRIVAT} />;

    return <Outlet />;
};
