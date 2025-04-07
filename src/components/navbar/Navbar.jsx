import React from "react";
import "./Navbar.css";
import { Link } from "react-router";

const Navbar = ({displayFilterButton}) => {
  return (
    <div className="navbar-container">
        <div className="navbar-brand-name" style={displayFilterButton && {marginLeft: '20%'}}>
          <span className="navbar-brand-name-text">SwolHomies</span>
        </div>

       { displayFilterButton &&
        <div className="navbar-right">
          <Link to="/filter">
            <div className="navbar-filter-container">
              <img src="./images/filtericon.svg" alt="filter-icon" />
            </div>
          </Link>
        </div>
        }
      </div>
  );
};

export default Navbar;
