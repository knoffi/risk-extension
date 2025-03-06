import { useContext, useState } from "react";
import { Link } from "react-router"
import { AuthContext } from "../auth.context";
export const LoginPage: React.FC=()=>{

    const [username,setUsername] = useState("Player1");
    const [password,setPassword] = useState("player1");

    const {login,token} = useContext(AuthContext);

    const onLoginSuccess = ()=> {alert("success!")}

    const onLoginFail = (error:string)=> {alert(error)}

    const onSubmit =()=>{
        login(username,password).then(onLoginSuccess).catch(onLoginFail)
    }


    return <div>
        <h1>
            Login Page
        </h1>

        <button onClick={onSubmit}>Submit</button>
        <p>Token: {token}</p>

        <p><Link to={"/home"} >Go To Home</Link></p>
    </div>
}