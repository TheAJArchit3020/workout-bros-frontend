import React from "react";
import "./Footer.css";
import { Link } from "react-router";

const Footer = () => {

    
  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link to="/explore" className="footer-section">
          <img src="./vite.svg" alt="" />
          <span>Explore</span>
        </Link>
        <Link to="/connected" className="footer-section">
          <img src="./vite.svg" alt="" />
          <span>Connected</span>
        </Link>
        <Link to="/profile" className="footer-section">
          <img src="./vite.svg" alt="" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
