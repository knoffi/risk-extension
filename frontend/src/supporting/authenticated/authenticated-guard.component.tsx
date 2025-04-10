import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Pages } from "src/pages";
import { AuthContext } from "src/supporting/authenticated/auth.context";

export const AuthenticatedGuard = () => {
    const { user, whoami } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        whoami()
            .then(() => {
                navigate(location.pathname);
            })
            .catch(() => {
                navigate(Pages.LOGIN_PUBLIC);
            });
    }, []);

    if (!user) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return <Outlet />;
};
