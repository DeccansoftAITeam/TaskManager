import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import FormField from "../components/FormField";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("login click");
    const data = await authService.login(username, password);
    console.log("login response", data);
    if (data.token) {
      login(data.token, username);
      navigate("/dashboard");
    } else {
      alert("login failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "350px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <div style={{ marginBottom: "10px" }}>
        <FormField placeholder="username" value={username} onChange={setUsername} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <FormField placeholder="password" type="text" value={password} onChange={setPassword} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ padding: "10px", border: "1px solid #444" }} onClick={handleLogin}>
          Login
        </button>
        <Link to="/register" style={{ textDecoration: 'none' }}>
           <button style={{ padding: "10px", border: "1px solid #444", width: '100%' }}>Go Register</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
