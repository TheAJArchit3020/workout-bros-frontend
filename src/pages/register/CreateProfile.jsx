import React, { use, useState } from "react";
import "./CreateProfile.css";
import CreateProfileInfo from "../../components/profile/profileInfo/profileInfo";
import CreateProfileIntrest from "../../components/profile/profileIntrests/profileIntrest";
import { useNavigate } from "react-router";
const CreateProfile = () => {
  const [profileSection, setProfileSection] = useState(1);
  const navigate = useNavigate();
  const handleNextButton = () => {
    if (profileSection < 2) {
      setProfileSection((prev) => prev + 1);
    } else {
      navigate("/explore");
    }
  };

  const handleBackButton = () => {
    if (profileSection > 1) {
      setProfileSection(1);
    }
     else{
       navigate("/")
     }
  };

  return (
    <div className="profile_container">
      <div className="p_c_header">
        <div className="p_c_header_left">
          <button
            className="p_c_backButton"
            onClick={handleBackButton}
          ></button>
          <span className="text">Set up your profile</span>
        </div>
        <span className="text">{profileSection}/2</span>
      </div>

      {profileSection === 1 ? <CreateProfileInfo /> : <CreateProfileIntrest />}

      <div className="p_c_buttonContainer">
        <button className="p_c_nextButton" onClick={handleNextButton}>
          <span>{profileSection === 1 ? "Next" : "Done"}</span>
          <div className="p_c_nextArrow"></div>
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;
