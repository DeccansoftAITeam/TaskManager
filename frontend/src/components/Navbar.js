import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  return (
    <div
      style={{
        background: "#222",
        color: "white",
        padding: "12px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Link style={{ color: "white", textDecoration: "none" }} to="/dashboard">
        Dashboard
      </Link>
      <span>|</span>
      <Link style={{ color: "white", textDecoration: "none" }} to="/task/create">
        Add Task
      </Link>
      <span>|</span>
      <Link style={{ color: "white", textDecoration: "none" }} to="/login">
        Login
      </Link>
      <span style={{ marginLeft: "auto", marginRight: "8px" }}>Token: {token ? token : "none"}</span>
      <button
        style={{ padding: "8px", background: "#555", color: "white", border: "1px solid #999" }}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
