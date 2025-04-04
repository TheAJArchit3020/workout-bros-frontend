import React, { useState } from "react";
import "./Filter.css";
import { interests } from "../../data/interests";
import { useNavigate } from "react-router";
const Filter = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(50);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleApply = () => {
    // Handle apply logic here
    console.log("Applied filters:", { distance, selectedInterests });
  };

  const handleBack = () => {
    navigate("/explore");
  };

  return (
    <div className="filter-container">
      <img src="/images/referenceImages/filter360x740.png" alt="filter-page" className="filter-page-image" />
      <div className="filter-wrapper">
        {/* header section */}
        <div className="filter-header">
          <div className="filter-back-button" onClick={handleBack}>
            <img src="./images/backbuttonicon.svg" alt="back-button" />
          </div>
          <div className="filter-title">
            <span className="filter-title-text">Filters</span>
          </div>
        </div>

        <div className="filter-section">
          {/* filter section1 */}
          <div className="filter-section1">
            <span className="filter-section-title-text">Distance</span>
            <span className="filter-section-title-text2">
              Find people within {distance} km
            </span>
            <input
              type="range"
              min="0"
              max="100"
              step="2"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="filter-section-input"
            />
          </div>

          {/* filter section2 */}
          <div className="filter-section2">
            <span className="filter-section-title-text">Interests</span>
            <div className="interests-grid">
              {interests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <div
                    key={interest.id}
                    className={`interest-button ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <span className="interest-name">{interest.name}</span>
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

          {/* Apply button */}
          <div className="apply-button-container">
            <div className="apply-button" onClick={handleApply}>
              <img src="/images/filterpage/applybutton.svg" alt="apply-button" className="apply-button-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
