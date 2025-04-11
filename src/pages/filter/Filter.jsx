import React, { useEffect, useState } from "react";
import "./Filter.css";
import { interests } from "../../data/interests";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { getnearbyusersapi } from "../../common/apis";
import { useUsers } from "../../common/context";

const Filter = () => {
  const { usersArray, setUsersArray } = useUsers();

  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);

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

  const handleApply = async () => {
    console.log("tokenData:", tokenData);

    // Convert selected interests into a comma-separated string
    const interestNames = selectedInterests
      .map((interestId) => {
        const interest = interests.find((i) => i.id === interestId);
        return interest ? interest.name : null;
      })
      .filter(Boolean) // Filter out nulls if any
      .join(","); // Join interests into a single string

    console.log("Applied filters:", {
      d: Number(distance) * 1000,
      selectedInterests,
    });

    if (tokenData) {
      try {
        const response = await axios.get(`${getnearbyusersapi}`, {
          params: {
            maxDistance: Number(distance) * 1000,
            interests: interestNames, // Add interests as a query parameter
          },
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        console.log("response getnearbyusersapi", response);
        setUsersArray(response.data);

        if (response.status === 200) {
          navigate("/explore");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/explore");
  };

  useEffect(() => {
    if (
      Array.isArray(usersArray) &&
      usersArray.length > 0 &&
      usersArray[0]?.interests?.length
    ) {
      const initialSelected = interests
        .filter((interest) => usersArray[0].interests.includes(interest.name))
        .map((interest) => interest.id);
      setSelectedInterests(initialSelected);
    }
  }, [usersArray]);

  return (
    <div className="filter-container">
      {/* <img src="/images/referenceImages/filter360x740.png" alt="filter-page" className="filter-page-image" /> */}
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
              {interests?.map((interest) => {
                // Preselect based on user's interests (name match), or manual selection
                const userInterests = usersArray?.[0]?.interests || [];
                const userHasInterest = userInterests.includes(interest?.name);

                console.log(userHasInterest);
                const isSelected =
                  selectedInterests?.includes(interest.name) || userHasInterest;

                return (
                  <div
                    key={interest.id}
                    className={`interest-button ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => toggleInterest(interest.name)}
                  >
                    <span className="interest-name">{interest.name}</span>
                    <img
                      src={`/images/${
                        isSelected
                          ? `yellowicons/${interest.activeIconFile}`
                          : `Greyicon/${interest.iconFile}`
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
              <img
                src="/images/filterpage/applybutton.svg"
                alt="apply-button"
                className="apply-button-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
