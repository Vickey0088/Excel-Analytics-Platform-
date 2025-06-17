import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ to = "/" }) {
  const navigate = useNavigate();
  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      left: "2rem",
      zIndex: 100
    }}>
      <button
        onClick={() => {
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate(to);
          }
        }}
        style={{
          background: "#eee",
          color: "#333",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "0.5rem 1.2rem",
          fontSize: "1rem",
          cursor: "pointer",
          minWidth: "80px"
        }}
      >
        &#8592; Back
      </button>
    </div>
  );
}

export default BackButton;