import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router";

const Footer = () => {
  const [isSelected, setIsSelected] = useState("explore");

  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link
          onClick={() => setIsSelected("explore")}
          to="/explore"
          className={`${
            isSelected === "explore" ? "selected-tab" : "footer-section"
          }`}
        >
          <img src="./images/exploreicon.svg" alt="explore-icon" />
        </Link>
        <Link
          onClick={() => setIsSelected("connection")}
          to="/connection"
          className={`${
            isSelected === "connection" ? "selected-tab" : "footer-section"
          }`}
        >
          <img src="./images/connectionicon.svg" alt="connection-icon" />
        </Link>
        <Link
          onClick={() => setIsSelected("profile")}
          to="/profile"
          className={`${
            isSelected === "profile" ? "selected-tab" : "footer-section"
          }`}
        >
          <img src="./images/usericon.svg" alt="user-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
