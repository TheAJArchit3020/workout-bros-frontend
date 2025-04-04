import React, { useState } from "react";
import "./Publicprofile.css";
import Navbar from "../../components/navbar/Navbar";

const Publicprofile = () => {
  // Mock data - replace with actual data from your backend
  const [profile] = useState({
    name: "John Doe",
    email: "xyz@gmail.com",
    profilePicture: "./images/profile.png",
    description:
      "I'm a fitness enthusiast who loves to lift weights and run marathons. I'm also a big fan of yoga and crossfit.",
    interests: ["Golf", "Fishing", "Beach Volleyball"],
    reviews: [
      {
        id: 1,
        reviewerName: "Alice Smith",
        rating: 5,
        comment: "Great workout partner! Very motivating and punctual.",
      },
      {
        id: 2,
        reviewerName: "Bob Johnson",
        rating: 4,
        comment: "Good communication and reliable. Would recommend!",
      },
    ],
    connectionStatus: "not_connected", // possible values: "not_connected", "requested", "connected"
  });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleConnect = () => {
    // Implement connection logic
    console.log("Connecting...");
  };

  const handleAcceptConnection = () => {
    // Implement accept connection logic
    console.log("Accepting connection...");
  };

  const handleAddReview = () => {
    setShowReviewModal(true);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    // Implement submit review logic
    console.log("Submitting review:", { rating, comment });
    setShowReviewModal(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className="public-profile-container">
      <Navbar />
      <div className="public-profile-header">
        <div className="public-profile-info-container">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="public-profile-picture"
          />
          <div className="public-profile-info-content">
            <span className="public-profile-name">{profile.name}</span>
          </div>
        </div>
        <span className="public-profile-description">
          {profile.description}
        </span>
        <div className="public-profile-interests-container">
          {profile.interests.map((item) => (
            <span className="public-profile-interests-list">{item}</span>
          ))}
        </div>
      </div>

      <div className="public-profile-connect-container">
        <span className="public-profile-connect-title">Connect</span>
      </div>

      {/* <span className="public-profile-message-image">
        <img
          src="./images/message.svg"
          alt="Profile"
          className="public-profile-messageimage"
        />
      </span> */}
    </div>
  );
};

export default Publicprofile;
