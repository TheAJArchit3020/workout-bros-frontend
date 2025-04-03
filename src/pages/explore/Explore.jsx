import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import useLocation from "../../hooks/useLocation";
import "./Explore.css";
import Navbar from "../../components/navbar/Navbar";
const Explore = () => {
  const { location, error, loading, requestLocation, locationDetails, cities } =
    useLocation();
  const [selectedCity, setSelectedCity] = useState("");
  const [distance, setDistance] = useState(10); // Default 10km
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      <div className="explore-container">
        <Navbar />
        {/* <div className="header-section">
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div> */}

        {loading && (
          <div className="location-status">
            <p>Requesting location access...</p>
          </div>
        )}

        {error && (
          <div className="location-status error">
            <p>{error}</p>
            <button onClick={requestLocation}>Enable Location</button>
          </div>
        )}

        {/* {showFilters && (
          <div className="filters-section" style={{ marginBottom: "20px" }}>
            {cities.length > 0 && (
              <div className="cities-section">
                <h3>Cities in {locationDetails?.state}</h3>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="city-select"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="distance-section" style={{ marginTop: "20px" }}>
              <h3>Distance Range: {distance}km</h3>
              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        )} */}

        <div className="explore-profile-card-section">
          <span className="explore-profile-card-title">Explore Bro's</span>
          <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>
          <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>

          <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>  <div className="explore-profile-card">
            <div className="explore-profile-card-image">
              <img src="./images/profile.png" alt="profile" />
              <div className="explore-profile-card-content">
                <span className="explore-profile-card-name">John Doe</span>
                <span className="explore-profile-card-interest">NY</span>
              </div>
            </div>
            <div className="explore-profile-card-button">
              <span>Connect</span>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
