import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import './register.css'

export function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const res = await registerUser({name, email, password});
            if (res) {
                navigate("/login");
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error)
        }
    }

    return (
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      );
}
