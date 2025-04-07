import React, { useState } from "react";
import "./Editprofile.css";
import { interests } from "../../data/interests";

const Editprofile = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [deSelectedInterests, setdeSelectedInterests] = useState([
    ...interests,
  ]);
  const [showModal, setShowModal] = useState(false);

  const toggleInterest = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);

    setdeSelectedInterests((prev) => {
      return prev.filter((int) => int.id !== interest.id);
    });
  };

  const toggleDelSelectedInterest = (interest) => {
      
    setdeSelectedInterests([...deSelectedInterests,interest]);
    setSelectedInterests((prev) => {
      return prev.filter((int) => int.id !== interest.id);
    });
  };

  const handleSave = () => {
    setShowModal(true);
    // Hide modal after 2 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="edit-profile-container">
      {/* <img
        src="/images/referenceImages/editprofilescreen.png"
        alt="edit-profile"
        className="edit-profile-background-image"
      /> */}
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

                {selectedInterests.map((interest) => {
                  return (
                    <div className="edit-profile-form-content-interests" onClick={() => toggleDelSelectedInterest(interest)}>
                      <span className="edit-profile-form-content-title" >{interest.name}</span>
                      <img
                        src={`/images/${
                            interest.activeIconFile
                        }`}
                        alt="edit-profile-interest"
                        className="edit-profile-form-content-interests-image"
                      />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Add Interests */}
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-add-interests-title">
                Add Interests
              </span>

              <div className="interests-grid">
                {deSelectedInterests.map((interest) => {
                  return (
                    <div
                      key={interest.id}
                      className={"interest-button"}
                      onClick={() => toggleInterest(interest)}
                    >
                      <span className="interest-name">{interest.name}</span>
                      <img
                        src={`/images/${
                             interest.iconFile
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
      <div
        className="edit-profile-form-content-save-button"
        onClick={handleSave}
      >
        <img src="./images/donebutton.svg" alt="edit-profile-done" />
      </div>

      {/* modal */}
      {showModal && (
        <div className="edit-profile-modal">
          <div className="edit-profile-modal-content">
            <span className="edit-profile-modal-content-text">
              Profile updated
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editprofile;
