import React, { useState } from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(location.pathname.split('/')[1] || "explore");

  const handleTabClick = (tab) => {
    setIsSelected(tab);
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link
          onClick={() => handleTabClick("explore")}
          to="/explore"
          className={`${
            isSelected === "explore" ? "selected-tab" : "footer-section"
          } nav-btn`}
        >
          <img src="./images/exploreicon.svg" alt="explore-icon" />
        </Link>
        <Link
          onClick={() => handleTabClick("connection")}
          to="/connection"
          className={`${
            isSelected === "connection" ? "selected-tab" : "footer-section"
          } nav-btn`}
        >
          <img src="./images/connectionicon.svg" alt="connection-icon" />
        </Link>
        <Link
          onClick={() => handleTabClick("profile")}
          to="/profile"
          className={`${
            isSelected === "profile" ? "selected-tab" : "footer-section"
          } nav-btn`}
        >
          <img src="./images/usericon.svg" alt="user-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
