import React, { useContext } from "react";
import { Link } from "react-router";
import { Pages } from "src/pages";
import { AuthContext } from "src/supporting/authenticated/auth.context";

export const HomePage: React.FC = () => {
    const { user } = useContext(AuthContext);

    const greeting = user
        ? `Hello ${user.name}, you are a ${user.role.name}`
        : "Loading user...";

    return (
        <div style={{ gap: 5 }}>
            <p>{greeting}</p>
            <div>
                <Link to={Pages.MANAGE_USERS_PRIVAT}>Manage Users</Link>
            </div>
            <div>
                {" "}
                <Link to={Pages.MESSAGES_PRIVAT}>Send Messages</Link>
            </div>
        </div>
    );
};
