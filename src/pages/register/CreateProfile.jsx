import React, { useState, useRef, useEffect } from "react";
import "./CreateProfile.css";
import { useNavigate } from "react-router";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { registerprofileapi } from "../../common/apis";
import { getAllInterests } from "../../common/getallinterest";

const CreateProfile = () => {
  const [profileSection, setProfileSection] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [interestArray, setInterestArray] = useState([]);

  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedIntrests: [],
    profileImage: null,
  });

  const isValidInfo =
    formData.name.length > 0 && formData.description.length > 0;
  const isValidIntrest = formData.selectedIntrests.length > 0;

  const handleInput = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageClick = () => {
    // Toggle modal visibility
    setShowUploadModal(!showUploadModal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const toggleInterest = (interestName) => {
    setFormData((prev) => ({
      ...prev,
      selectedIntrests: prev.selectedIntrests.includes(interestName)
        ? prev.selectedIntrests.filter((item) => item !== interestName)
        : [...prev.selectedIntrests, interestName],
    }));
  };

  useEffect(() => {
    getAllInterests(tokenData, setInterestArray);
  }, []);

  const submitFormData = async () => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token);
    console.log({ tokenData });

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      // Loop through selectedIntrests and append each interest separately
      formData.selectedIntrests.forEach((interest) => {
        formDataToSubmit.append("interests[]", interest);
      });

      if (formData.profileImage) {
        formDataToSubmit.append("photo", formData.profileImage);
      }

      console.log({
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });

      const response = await fetch(registerprofileapi, {
        method: "PUT",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit profile");
      }

      const data = await response.json();
      console.log("Profile submitted successfully:", data);
      navigate("/explore");
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleNextButton = () => {
    console.log(formData, "formData");
    if (profileSection < 2) {
      setProfileSection((prev) => prev + 1);
    } else {
      submitFormData();
    }
  };

  const handleBackButton = () => {
    if (profileSection > 1) {
      setProfileSection(1);
      setFormData((prev) => ({
        ...prev,
        name: "",
        description: "",
      }));
    } else {
      navigate("/");
    }
  };

  return (
    <>
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
          <>
            <div className="p_c_profileContainer">
              <div
                className="p_c_profileImageContainer"
                onClick={() => {
                  handleImageClick(), setProfileImage(null);
                }} // This triggers modal open
              >
                <div className="p_c_profilePlusButtonContainer">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="p_c_profileImage"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img src="/images/profile.svg" alt="user" />
                  )}
                  <button className="p_c_profilePlusButton" />
                </div>
              </div>

              <span className="p_c_text">Add your Profile</span>
            </div>

            <div className="p_c_inputContainer">
              <input
                type="text"
                placeholder="Full Name"
                className="p_c_input"
                style={{ height: "20%", borderRadius: "20px" }}
                value={formData.name || ""}
                onChange={(e) => {
                  handleInput("name", e.target.value);
                }}
              />

              <textarea
                placeholder="Tell about yourself"
                className="p_c_input"
                style={{ height: "60%", paddingTop: "5%" }}
                value={formData.description || ""}
                onChange={(e) => {
                  handleInput("description", e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="interests-container">
              <span className="i-headerTitle">
                Find your tribe! Pick your interests
              </span>

              <div className="interests_grid">
                {interestArray?.map((interest) => {
                  const isSelected = formData.selectedIntrests.includes(
                    interest.name
                  );
                  return (
                    <div
                      key={interest.name}
                      className={`interest_button ${
                        isSelected ? "selected_intrestButton" : ""
                      }`}
                      onClick={() => toggleInterest(interest.name)}
                    >
                      <span
                        className={
                          isSelected
                            ? "selected_intrestText"
                            : "unSelected_intrestText"
                        }
                      >
                        {interest.name}
                      </span>

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
          </>
        )}

        <div className="p_c_buttonContainer">
          <button
            className="p_c_nextButton"
            style={{
              backgroundImage:
                profileSection === 1
                  ? isValidInfo
                    ? "url('/images/buttonActive.svg')"
                    : "url('/images/buttonDeActive.svg')"
                  : isValidIntrest
                  ? "url('/images/activeDone.svg')"
                  : "url('/images/inactiveDone.svg')",
            }}
            disabled={profileSection === 1 ? !isValidInfo : !isValidIntrest}
            onClick={handleNextButton}
          ></button>
        </div>

        {/* Upload image modal */}
        {showUploadModal && (
          <div className="createprofile-uploadprofile-modal">
            <div className="createprofile-uploadprofile-modal-content">
              <div className="createprofile-uploadprofile-modal-header">
                <span className="createprofile-uploadprofile-modal-title">
                  Upload Profile Image
                </span>
                <img
                  src="/images/profile/cross.svg"
                  alt="profile"
                  onClick={handleImageClick}
                />
              </div>
              {profileImage ? (
                <>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="p_c_profileImage"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="createprofile-uploadprofile-modal-donebutton">
                    <span
                      className="createprofile-uploadprofile-modal-donebutton-text"
                      onClick={handleImageClick}
                    >
                      Done
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src="/images/profile/uploadprofileimage.svg"
                  alt="profile"
                  className="createprofile-uploadprofile-modal-uploadbutton"
                  onClick={() => fileInputRef.current.click()}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProfile;
