import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import useLocation from "../../hooks/useLocation";
import "./Explore.css";

const Explore = () => {
  const { location, error, loading, requestLocation, locationDetails, cities } =
    useLocation();
  const [selectedCity, setSelectedCity] = useState("");
  const [distance, setDistance] = useState(10); // Default 10km
  const [showFilters, setShowFilters] = useState(false);

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
    <Layout>
      <div className="explore-container">
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
      </div>
    </Layout>
  );
};

export default Explore;

