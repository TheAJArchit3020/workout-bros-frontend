import React, { useState } from "react";
import "./CreateProfile.css";
import CreateProfileInfo from "../../components/profile/profileInfo/profileInfo";
import CreateProfileIntrest from "../../components/profile/profileIntrests/profileIntrest";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const CreateProfile = () => {
  const [profileSection, setProfileSection] = useState(1);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIntrests, setselectedIntrests] = useState([]);

  const isValidInfo = fullName.length > 0 && description.length > 0;
  const isValidIntrest = selectedIntrests.length > 0;
  const handleInput = (name, description) => {
    setFullName(name);
    setDescription(description);
    console.log(name, " ", description);
  };

  const handleIntrest = (intrest) => {
    if (selectedIntrests.includes(intrest)) {
      setselectedIntrests((prev) => prev.filter((item) => item !== intrest));
    } else {
      setselectedIntrests((prev) => [...prev, intrest]);
    }
  }

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
      setFullName("");
      setDescription("");
    } else {
      navigate("/");
    }
  };

  return (
    <>
    {/* <div className="refImage" /> */}
    <div className="profile_container">
      <div className="p_c_header">
        <div className="p_c_header_left">
          <button className="p_c_backButton" onClick={handleBackButton}>
            <ArrowLeftIcon className="arrowIcon" />
          </button>
          <span className="text">Set up your profile</span>
        </div>
        <span className="text section">{profileSection}/2</span>
      </div>

      {profileSection === 1 ? (
        <CreateProfileInfo handleInput={handleInput} />
      ) : (
        <CreateProfileIntrest selectedIntrests = {selectedIntrests} handleIntrest={handleIntrest}/>
      )}

      <div className="p_c_buttonContainer">
        <button
          className="p_c_nextButton"
          style={{
            backgroundImage:
              profileSection === 1
                ? ( isValidInfo
                  ? "url('/images/buttonActive.svg')"
                  : "url('/images/buttonDeActive.svg')")
                : (isValidIntrest
                ? "url('/images/activeDone.svg')"
                : "url('/images/inactiveDone.svg')")
          }}
          disabled={profileSection === 1 ? !isValidInfo : !isValidIntrest}
          onClick={handleNextButton}
        ></button>
      </div>
    </div>
    </>
  );
};

export default CreateProfile;

