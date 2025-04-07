import React, { useState } from "react";
import useLocation from "../../hooks/useLocation";
import "./Explore.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
const Explore = () => {
  const { location, error, loading, requestLocation, locationDetails, cities } =
    useLocation();
 

  const brosArray = [
    {
      name: "John Doe",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Jane Doe",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Bob Smith",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Alice Johnson",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Mike Brown",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Sarah Lee",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "David Kim",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Emily Chen",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Kevin White",
      interest: "NY",
      image: "./images/profile.png",
    },
    {
      name: "Lisa Nguyen",
      interest: "NY",
      image: "./images/profile.png",
    },
  ];

  return (
      <div className="explore-container">
           
        <Navbar  displayFilterButton={true}/>
    
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


        <div className="explore-profile-card-section">
          <span className="explore-profile-card-title">Explore Bro's</span>
          {brosArray.map((bro) => (
            <div className="explore-profile-card" key={bro.name}>
              <div className="explore-profile-card-image">
                <img src={bro.image} alt="profile" />
                <div className="explore-profile-card-content">
                  <span className="explore-profile-card-name">
                    {bro.name}
                  </span>
                  <span className="explore-profile-card-interest">
                    {bro.interest}
                  </span>
                </div>
              </div>
              <div className="explore-profile-card-button">
                <span>Connect</span>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-footer-section">
         <Footer />
        </div>
      </div>
  );
};

export default Explore;

