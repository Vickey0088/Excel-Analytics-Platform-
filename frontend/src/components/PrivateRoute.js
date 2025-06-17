import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    if (location.pathname !== "/login") {
      alert("Please login first then use Excel Work features.");
    }
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;