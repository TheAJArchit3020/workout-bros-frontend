import React, { useRef } from "react";
import "./profileInfo.css";

const CreateProfileInfo = ({
  handleInput,
  formData,
  profileImage,
  handleImageClick,
}) => {
  console.log("Form Data:", formData);
  return (
    <>
      <div className="p_c_profileContainer">
        <div className="p_c_profileImageContainer">

            <img
              src={profileImage ? profileImage : "/images/profile/profile.svg"}
              alt="Profile"
              className="p_c_profileImage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              onClick={handleImageClick}
            />
        </div>

        <span className="p_c_text">Add your Profile</span>
      </div>

      <div className="p_c_inputContainer">
        <input
          type="text"
          placeholder="Full Name"
          className="p_c_input"
          style={{ height: "20%", borderRadius: "20px" }}
          value={formData.fullName || ""}
          onChange={(e) => {
            handleInput("fullName", e.target.value);
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
  );
};

export default CreateProfileInfo;
