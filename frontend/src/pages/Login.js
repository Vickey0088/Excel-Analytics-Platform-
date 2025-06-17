import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API, { setAuthToken } from "../services/API";
import "../styles/Login.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email && password) {
      try {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        setUser({ name: res.data.name, email: res.data.email });
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    } else {
      setError("Enter email and password");
    }
  };

  return (
    <div className="login-bg center-page">
      <div className="login-content center-form">
        <form onSubmit={handleLogin} className="form-content">
          <h2>Login</h2>
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-1">Login</button>
          <div className="register-section">
            <span>If you are new, please</span>
            <br />
            <Link to="/register" className="register-btn-link">
              <button
                type="button"
                className="register-btn"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;