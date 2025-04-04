import React, { useState } from "react";
import "./Editprofile.css";
import { interests } from "../../data/interests";

const Editprofile = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <div className="edit-profile-container">
      <img
        src="/images/referenceImages/editprofilescreen.png"
        alt="edit-profile"
        className="edit-profile-background-image"
      />
      {/* Navbar */}
      <div className="edit-profile-navbar-container">
        <div className="edit-profile-navbar-wrapper">
          <div className="edit-profile-navbar-brand-name">
            <span className="edit-profile-navbar-brand-name-text">
              SwolHomies
            </span>
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
              className="edit-profile-placeholder-image-plus"
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

              <textarea
                type="text"
                className="edit-profile-form-content-input text-area-input"
                placeholder="Enter your Bio"
              />
            </div>
            {/* Interests */}
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-title">
                Your Interests
              </span>
              <div className="edit-profile-form-content-interests-container">
                <div className="edit-profile-form-content-interests">
                  <img
                    src="./images/archeryfill.svg"
                    alt="edit-profile-interest"
                    className="edit-profile-form-content-interests-image"
                  />
                  <span className="edit-profile-form-content-interests-text">
                  Archery
                  </span>
                </div>
                <div className="edit-profile-form-content-interests">
                  <img
                    src="./images/archeryfill.svg"
                    alt="edit-profile-interest"
                    className="edit-profile-form-content-interests-image"
                  />
                  <span className="edit-profile-form-content-interests-text">
                    Golf
                  </span>
                </div>
                <div className="edit-profile-form-content-interests">
                  <img
                    src="./images/archeryfill.svg"
                    alt="edit-profile-interest"
                    className="edit-profile-form-content-interests-image"
                  />
                  <span className="edit-profile-form-content-interests-text">
                    Golf
                  </span>
                </div>
              </div>
            </div>

            {/* Add Interests */}
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-add-interests-title">
                Add Interests
              </span>
             
              <div className="interests-grid">
                {interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <div
                      key={interest.id}
                      className={`interest-button ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <span className="interest-name">{interest.name}</span>
                      <img
                        src={`/images/${
                          isSelected
                            ? interest.activeIconFile
                            : interest.iconFile
                        }`}
                        alt={interest.name}
                        className="interest-icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Save Button */}
      </div>
      <div className="edit-profile-form-content-save-button">
        <img src="./images/donebutton.svg" alt="edit-profile-done" />
      </div>
    </div>
  );
};

export default Editprofile;
