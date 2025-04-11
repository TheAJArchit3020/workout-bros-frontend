import React, { useEffect, useState } from "react";
import "./Filter.css";
import { interests } from "../../data/interests";
import { useNavigate } from "react-router";
import axios from "axios";
import { getnearbyusersapi } from "../../common/apis";
import { useUsers } from "../../common/context";

const Filter = () => {
  const { usersArray, setUsersArray, setSelectType } = useUsers();

  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);

  const navigate = useNavigate();
  const [distance, setDistance] = useState(50);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const __interest = usersArray?.length > 0 && usersArray[0]?.interests || [];

  console.log(__interest);

  // const toggleInterest = (interestId) => {
  //   setSelectedInterests((prev) =>
  //     prev.includes(interestId)
  //       ? prev.filter((id) => id !== interestId)
  //       : [...prev, interestId]
  //   );
  // };
  const toggleInterest = (interestName) => {
    setSelectedInterests((prev) =>
      prev.includes(interestName)
        ? prev.filter((name) => name !== interestName)
        : [...prev, interestName]
    );
  };

  const handleApply = async () => {
    // Convert selected interests into a comma-separated string
    const interestNames = selectedInterests
      .map((interestName) => interestName) // Already in name format
      .filter(Boolean)
      .join(",");

    console.log("Applied filters:", {
      d: Number(distance) * 1000,
      selectedInterests,
    });

    if (tokenData) {
      try {
        const response = await axios.get(`${getnearbyusersapi}`, {
          params: {
            maxDistance: Number(distance) * 1000,
            interests: interestNames,
          },
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        if (response.status === 200) {
          setSelectType("filter");

          setUsersArray((prevUsers) => {
            const newUsers = response.data.users;

            console.log({ newUsers });

            // Filter out duplicates (e.g., based on unique user ID or name)
            const mergedUsers = [...prevUsers];

            newUsers?.forEach((newUser) => {
              const exists = mergedUsers?.some(
                (user) => user.id === newUser.id // adjust if your users have different unique key
              );
              if (!exists) {
                mergedUsers.push(newUser);
              }
            });

            return mergedUsers;
          });

          navigate("/explore");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/explore", { state: { type: "filter" } });
  };

  useEffect(() => {
    if (
      __interest
    ) {
      const initialSelected = interests
        .filter((interest) => __interest?.includes(interest.name))
        .map((interest) => interest.name); // use name, not id
      setSelectedInterests(initialSelected);
    }
  }, [usersArray]);

  return (
    <div className="filter-container">
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
                // const isSelected =
                //   selectedInterests?.includes(interest.name) || userHasInterest;
                const isSelected = selectedInterests?.includes(interest.name);

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
