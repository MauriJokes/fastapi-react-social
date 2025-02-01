import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import './login.css'

export function LoginPage({setAuth}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await loginUser({email, password});
            if(res){
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("user_id", res.data.user_id);
                setAuth(true)
                navigate("/")
            } else {
                alert("Login failed")
            }
        } catch (error) {
            console.log("Login error:", error)
        }
    }

    return (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}