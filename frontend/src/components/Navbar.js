import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="Excel Work" className="logo-icon">📊</span>
        <span className="logo-text">SheetXSleuth</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">Features</Link>
        {!user ? (
          <>
            <Link to="/login">Login/Signup</Link>
          </>
        ) : (
          <>
            <span className="navbar-user">Hello, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;