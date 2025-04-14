import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Pages } from "src/pages";
import { NavLink } from "src/shared/components/nav-link.component";
import { AuthContext } from "src/supporting/authenticated/auth.context";
export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const onLoginSuccess = useCallback(() => {
        navigate(Pages.HOME_PRIVAT);
    }, [navigate]);

    const onLoginFail = useCallback((e: { message?: string }) => {
        setLoginError(e.message ?? "Login failed");
    }, []);

    const onSubmit = () => {
        login(username, password).then(onLoginSuccess).catch(onLoginFail);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginError(null);
        const { value, id } = e.target;

        switch (id) {
            case USERNAME_FIELD:
                setUsername(value);
                return;
            case PASSWORD_FIELD:
                setPassword(value);
                return;
            default:
                setLoginError("Unknown field: " + id);
        }
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
                    id={USERNAME_FIELD}
                    value={username}
                    onChange={onChange}
                ></input>
                <input
                    type="password"
                    title="Password"
                    id={PASSWORD_FIELD}
                    value={password}
                    onChange={onChange}
                ></input>
            </div>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <button onClick={onSubmit}>Submit</button>

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

const USERNAME_FIELD = "username";
const PASSWORD_FIELD = "password";
