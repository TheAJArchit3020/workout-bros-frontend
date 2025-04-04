import React from "react";
import {interests} from "../../../data/interests";
 import "./profileIntrest.css";
const CreateProfileIntrest = ({selectedIntrests,handleIntrest}) => {

  const toggleInterest = (interestId) => {
     handleIntrest(interestId);
  };

  return (
    <div className="interests-container">
      <span className="i-headerTitle">
        Find your tribe! Pick your interests
      </span>

      <div className="interests_grid">
        {interests.map((interest) => {
          const isSelected = selectedIntrests.includes(interest.id);
          return (
            <div
              key={interest.id}
              className={`interest_button ${isSelected ? "selected_intrestButton" : ""}`}
              onClick={() => toggleInterest(interest.id)}
            >
              <span className={isSelected ? "selected_intrestText" : "unSelected_intrestText"}>{interest.name}</span>

              <img
                src={`/images/${
                  isSelected ? interest.activeIconFile : interest.iconFile
                }`}
                alt={interest.name}
                className="interest-icon"
              />
            </div>
          );
        })}
      </div> 
    </div>
  );
};

export default CreateProfileIntrest;
