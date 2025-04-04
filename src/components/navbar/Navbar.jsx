import React from "react";
import "./Navbar.css";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-brand-name">
          <span className="navbar-brand-name-text">SwolHomies</span>
        </div>
        <div className="navbar-right">
          <Link to="/filter">
            <div className="navbar-filter-container">
              <img src="./images/filtericon.svg" alt="filter-icon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
