import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Pages } from "src/pages";
import { AuthContext } from "src/supporting/authenticated/auth.context";

export const AuthenticatedGuard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to={Pages.LOGIN_PUBLIC} />;

    return <Outlet />;
};
