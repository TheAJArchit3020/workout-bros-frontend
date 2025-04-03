import React, { useState } from "react";
import "./Filter.css";
import { interests } from "../../data/interests";

const Filter = () => {
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

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        {/* header section */}
        <div className="filter-header">
          <div className="filter-back-button">
            <img src="./images/backbuttonicon.svg" alt="back-button" />
          </div>
          <div className="filter-title">
            <span className="filter-title-text">Filter</span>
          </div>
        </div>
        <div className="filter-section">
          {/* filter section1 */}
          <div className="filter-section1">
            <span className="filter-section-title-text">Distance</span>
            <span className="filter-section-title-text2">
              Find people within {distance} km/miles
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
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  className={`interest-button ${
                    selectedInterests.includes(interest.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <img
                    src={`/images/${interest.iconFile}`}
                    alt={interest.name}
                    className="interest-icon"
                  />
                  <span className="interest-name">{interest.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <div className="apply-button-container">
            <div className="apply-button" onClick={handleApply}>
              <span className="apply-button-text">Apply</span>
              <div className="apply-button-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                    fill="#DAFF3E"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
