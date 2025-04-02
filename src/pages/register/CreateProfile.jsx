import React, { useState } from "react";
import "./CreateProfile.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const Profile = () => {
  const [profileSection, setProfileSection] = useState(1);
  const handleNextButton = () => {
    if (profileSection < 2) {
      setProfileSection(profileSection + 1);
    }
    else {
      setProfileSection(1);
    }
  }
  return (
    <div className="profile_container">
      <div className="p_c_header">
        <div className="p_c_header_left">
          <button className="p_c_backButton"></button>
          <span className="text">Set up your profile</span>
        </div>
        <span className="text">{profileSection}/2</span>
      </div>

      <div className="p_c_profileContainer">
        <div className="p_c_profileImageContainer" />
        <span className="text">Add your Profile</span>
      </div>

      <div className="p_c_inputContainer">
        <input
          type="text"
          placeholder="Full Name"
          className="p_c_input"
          style={{ height: "20%" }}
        />

        <textarea
          placeholder="Tell about yourself"
          className="p_c_input"
          style={{ height: "55%",padding:"3%" }} 
        />
      </div>

      <div className="p_c_buttonContainer">
      <button className="p_c_nextButton" >
        <span>Next</span>
        <div
         onClick={handleNextButton}
        className="p_c_nextArrow"></div>
      </button>
      </div>
    </div>
  );
};

export default Profile;
