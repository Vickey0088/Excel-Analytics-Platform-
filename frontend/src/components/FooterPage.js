import React from "react";
import "../styles/FooterPage.css";
import BackButton from "../components/BackButton";

function FooterPage() {
  return (
    <div className="footerpage-container">
        <BackButton />
      <div className="footerpage-details">
        <b>Excel Work Project</b> &copy; {new Date().getFullYear()}<br />
        Designed by Vickey yadav<br />
        Contact: <a href="vickeyyadav0088@gmail.com">vickeyyadav0088@gmail.com</a>
      </div>
    </div>
  );
}

export default FooterPage;