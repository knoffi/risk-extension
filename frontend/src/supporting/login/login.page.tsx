import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Pages } from "src/pages";
import { NavLink } from "src/shared/components/nav-link.component";
import { AuthContext } from "src/supporting/authenticated/auth.context";
export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, token } = useContext(AuthContext);

    const onLoginSuccess = useCallback(() => {
        navigate(Pages.HOME_PRIVAT);
    }, [navigate]);

    const onLoginFail = useCallback((error: string) => {
        console.error(error);
    }, []);

    const onSubmit = () => {
        login(username, password).then(onLoginSuccess).catch(onLoginFail);
    };

    return (
        <div>
            <h1>Login</h1>
            <div
                style={{
                    flexDirection: "column",
                    display: "flex",
                    gap: 10,
                    maxWidth: "25%",
                }}
            >
                <input
                    type="text"
                    title="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="text"
                    title="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <button onClick={onSubmit}>Submit</button>
            <p>Token: {token}</p>

            <p>
                <NavLink
                    to={Pages.HOME_PRIVAT}
                    title="Home"
                    restriction={{ mustBeAuthenticated: true }}
                />
            </p>
            <p>
                <NavLink
                    to={Pages.ACKNOWLEDGEMENTS_PUBLIC}
                    title="Acknowledgements"
                />
            </p>
            <p>
                <NavLink
                    to={Pages.GAME_HISTORY_PUBLIC}
                    title="Previous Games"
                />
            </p>
        </div>
    );
};
