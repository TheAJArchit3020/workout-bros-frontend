import React,{useState} from "react";
import "./CreateProfile.css";
import ProfileInfo from "../../components/profile/profileInfo/profileInfo";
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

  return(
    <div className="profile_container">
     <ProfileInfo profileSection={profileSection}/>

     <div className="p_c_buttonContainer">
        <button className="p_c_nextButton">
          <span>Next</span>
          <div onClick={handleNextButton} className="p_c_nextArrow"></div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
