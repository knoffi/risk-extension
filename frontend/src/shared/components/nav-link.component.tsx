import { useContext } from "react";
import { Link } from "react-router";
import { Pages } from "src/pages";
import { AuthContext } from "src/supporting/authenticated/auth.context";
import { User } from "src/supporting/authenticated/user";
import {
    hasPermission,
    Permissions,
} from "src/supporting/permissions/has-permission";

interface NavRestriction {
    permissions?: Permissions[];
    mustBeAuthenticated: true;
}

interface NavButtonProps {
    title: string;
    to: Pages;
    restriction?: NavRestriction;
}

export const NavLink: React.FC<NavButtonProps> = ({
    restriction,
    title,
    to,
}: NavButtonProps) => {
    const { user } = useContext(AuthContext);
    const canAccessRoute = canAccess(user, restriction);

    return canAccessRoute ? <Link to={to}>{title}</Link> : null;
};

// TODO: Move into service, since this gets decided during build time at the moment
function canAccess(user: User | null, restriction?: NavRestriction) {
    if (!restriction) return true;

    if (!user) return false;

    const { permissions } = restriction;
    if (!permissions) return true;

    return permissions.every((permission) =>
        hasPermission(permission, user.role.name)
    );
}
