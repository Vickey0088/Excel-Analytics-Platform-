import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/API";
import "../styles/Register.css";

function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (name && email && password) {
      try {
        const res = await API.post("/auth/register", { name, email, password });
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
      }
    } else {
      setError("Fill all fields");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-content">
        <form onSubmit={handleRegister} className="form-content">
          <h2>Register</h2>
          {error && <div className="error">{error}</div>}
          {success && (
            <div
              style={{
                color: "#008000",
                background: "#eaffea",
                padding: "0.7em",
                borderRadius: "4px",
                marginBottom: "0.9em",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Register done
            </div>
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <Link to="/login">
              <button type="button">Back to Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
