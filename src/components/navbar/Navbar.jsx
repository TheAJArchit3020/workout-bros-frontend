import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router";

const Navbar = ({ displayFilterButton }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div
        className="navbar-brand-name"
        style={displayFilterButton && { marginLeft: "20%" }}
      >
        <span className="navbar-brand-name-text">SwolHomies</span>
      </div>

      {displayFilterButton && (
        <div
          className="navbar-right"
          onClick={() =>
            navigate("filter", { params: { setUsersArray: setUsersArray } })
          }
        >
          <div className="navbar-filter-container">
            <img src="./images/filtericon.svg" alt="filter-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
