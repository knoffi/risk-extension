import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../auth.context";
export const LoginPage: React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, token } = useContext(AuthContext);

    const onLoginSuccess = useCallback(
        () => {
            navigate("/home");

        },
        [navigate])

    const onLoginFail = useCallback(
        (error: string) => { console.error(error) },
        [])

    const onSubmit = () => {
        login(username, password).then(onLoginSuccess).catch(onLoginFail)
    }


    return <div>
        <h1>
            Loginos Page
        </h1>
        <div style={{ flexDirection: "column", display: "flex", gap: 10, maxWidth: "25%" }}>
            <input type="text" title="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type="text" title="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            {/* <button type="submit">Login</button> */}
        </div>
        <button onClick={onSubmit}>Submit hier</button>
        <p>Token: {token}</p>

        <p><Link to={"/home"} >Go To Home</Link></p>
    </div>
}