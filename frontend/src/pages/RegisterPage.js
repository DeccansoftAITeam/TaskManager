import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import FormField from "../components/FormField";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const handleRegister = async () => {
    console.log("register click");
    const data = await authService.register(username, password, ownerName);
    console.log("register response", data);
    alert("registered");
    navigate("/login");
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
      <h2 style={{ marginTop: 0 }}>Register</h2>
      <div style={{ marginBottom: "10px" }}>
        <FormField placeholder="username" value={username} onChange={setUsername} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <FormField placeholder="password" type="text" value={password} onChange={setPassword} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <FormField placeholder="owner name extra field" value={ownerName} onChange={setOwnerName} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ padding: "10px", border: "1px solid #444" }} onClick={handleRegister}>
          Register
        </button>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ padding: "10px", border: "1px solid #444", width: '100%' }}>Go Login</button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
