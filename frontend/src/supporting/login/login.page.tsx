import { Link } from "react-router"
export const LoginPage: React.FC=()=>{

    return <div>
        <h1>
            Login Page
        </h1>
        <p><Link to={"/home"} >Go To Home</Link></p>
    </div>
}