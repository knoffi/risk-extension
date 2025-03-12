import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "src/supporting/authenticated/auth.context";

export const AuthenticatedGuard = () => {
    const { token } = useContext(AuthContext);

    if (!token) return <Navigate to={"login"} />;

    return <Outlet />;
};
