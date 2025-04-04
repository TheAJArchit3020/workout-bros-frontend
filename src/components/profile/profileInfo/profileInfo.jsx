import React,{useState} from "react";
import "./profileInfo.css";
const CreateProfileInfo = ({handleInput}) => {
  const [fullName,setFullName] = useState("");
  const [description,setDescription] = useState("");

  return (
    <>
      <div className="p_c_profileContainer">
        <div className="p_c_profileImageContainer" />
        <button className="p_c_profilePlusButton"/> 
        <span className="p_c_text">Add your Profile</span>
      </div>

      <div className="p_c_inputContainer">
        <input
          type="text"
          placeholder="Full Name"
          className="p_c_input"
          style={{ height: "20%",borderRadius:'20px'}}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value) 
            handleInput(e.target.value,description)
          }}
        />

        <textarea
          placeholder="Tell about yourself"
          className="p_c_input"
          style={{ height: "60%", paddingTop: "5%" }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value) 
            handleInput(fullName,e.target.value)
          }}
        />
      </div>
    </>
  );
};

export default CreateProfileInfo;
