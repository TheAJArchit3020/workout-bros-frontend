import React from "react";
import "./Editprofile.css";

const Editprofile = () => {
  return (
    <div className="edit-profile-main-container">
      <div className="edit-profile-container">
        {/* Navbar */}
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div className="navbar-brand-name">
              <span className="navbar-brand-name-text">SwolHomies</span>
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="edit-profile-wrapper">
          <div className="edit-profile-placeholder">
            <div className="edit-profile-placeholder-image">
              <img src="./images/editprofileusericon.svg" alt="edit-profile" />
            </div>
            <div className="edit-profile-placeholder-image">
              <img
                src="./images/editprofileuserplusicon.svg"
                alt="edit-profile-plus"
              />
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="edit-profile-form">
            <div className="edit-profile-form-wrapper">
              <div className="edit-profile-form-conatent">
                <span className="edit-profile-form-content-title">Name</span>
                <input
                  type="text"
                  className="edit-profile-form-content-input"
                  placeholder="Enter your name"
                />
              </div>
              <div className="edit-profile-form-conatent">
                <span className="edit-profile-form-content-title">Bio</span>
                <input
                  type="text"
                  className="edit-profile-form-content-input"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
