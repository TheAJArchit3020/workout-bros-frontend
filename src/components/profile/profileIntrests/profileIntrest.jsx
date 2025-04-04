import React from "react";
import {interests} from "../../../data/interests";
 import "./profileIntrest.css";
const CreateProfileIntrest = () => {

  const [selectedInterests, setSelectedInterests] = React.useState([]);

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>{
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  return (
    <div className="interests-container">
      <span className="i-headerTitle">
        Find your tribe! Pick your interests
      </span>

      <div className="interests_grid">
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          return (
            <div
              key={interest.id}
              className={`interest-button ${isSelected ? "selected" : ""}`}
              onClick={() => toggleInterest(interest.id)}
            >
              <img
                src={`/images/${
                  isSelected ? interest.activeIconFile : interest.iconFile
                }`}
                alt={interest.name}
                className="interest-icon"
              />
              <span className="interest-name">{interest.name}</span>
            </div>
          );
        })}
      </div> 
    </div>
  );
};

export default CreateProfileIntrest;
