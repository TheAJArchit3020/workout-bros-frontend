import React from "react";
import "./profileInfo.css";
const CreateProfileInfo = () => {
  return (
    <>
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
          style={{ height: "55%", padding: "3%" }}
        />
      </div>
    </>
  );
};

export default CreateProfileInfo;
