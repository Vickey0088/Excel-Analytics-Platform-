import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";
// import BackButton from "../components/BackButton";

const cardData = [
  {
    img: "https://img.icons8.com/color/96/000000/ms-excel.png",
    title: "Upload Excel File",
     button: {
      label: "Upload",
      action: "/upload"
    },
    text: "Import row data for analysis"
  },
  {
    img: "https://img.icons8.com/color/96/000000/ms-excel.png",
    title: "Charts Created",
     button: {
      label: "View Charts",
      action: "/charts"
    },
    text: "See Created Charts"
  },
  {
    img: "https://img.icons8.com/color/96/000000/ms-excel.png",
    title: "Files Uploaded",
     button: {
      label: "View Files",
      action: "/files"
    },
    text: "See Uploaded Files"
  }
];
function About() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      
      <h2>Features Of Excel Work</h2>
      <div className="about-cards-inline">
        {cardData.map((card, idx) => (
          <div className="about-card-inline" key={idx}>
            <img src={card.img} alt={card.title} className="about-img" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <button
              onClick={() => navigate(card.button.action)}
              style={{
                background: "#1d6f42",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.7rem 1.5rem",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: "1.2rem"
              }}
            >
              {card.button.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;