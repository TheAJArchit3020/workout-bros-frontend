import React from "react";
import "./viewPhoto.css";
const ViewPhoto = ({image}) => {

  return (
    <div className="viewPhoto-profileContainer">
      <img src={image} className="viewPhoto-profileImage"/>
    </div>
  );
};

export default ViewPhoto;
