import React, { useContext } from "react";
import { Pages } from "src/pages";
import { NavLink } from "src/shared/components/nav-link.component";
import { AuthContext } from "src/supporting/authenticated/auth.context";
import { Permissions } from "src/supporting/permissions/has-permission";

export const HomePage: React.FC = () => {
    const { user } = useContext(AuthContext);

    const greeting = user
        ? `Hello ${user.name}, you are a ${user.role.name}`
        : "Loading user...";

    return (
        <div style={{ gap: 5 }}>
            <p>{greeting}</p>
            <div>
                <NavLink
                    title="Manage Users"
                    to={Pages.MANAGE_USERS_PRIVAT}
                    restriction={{
                        mustBeAuthenticated: true,
                        permissions: [Permissions.CAN_MANAGE_USERS],
                    }}
                />
            </div>
            <div>
                <NavLink
                    title="Send Messages"
                    to={Pages.MESSAGES_PRIVAT}
                    restriction={{ mustBeAuthenticated: true }}
                />
            </div>
        </div>
    );
};
