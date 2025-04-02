import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Profile.css";

const Profile = () => {
  // Mock data - replace with actual data from your backend
  const [profile] = useState({
    name: "John Doe",
    profilePicture: "./images/profile.png",
    interests: ["Weight Training", "Cardio", "Yoga", "CrossFit"],
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

  const handleConnect = () => {
    // Implement connection logic
    console.log("Connecting...");
  };

  const handleAcceptConnection = () => {
    // Implement accept connection logic
    console.log("Accepting connection...");
  };

  const handleAddReview = () => {
    // Implement add review logic
    console.log("Adding review...");
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <span className="profile-name">{profile.name}</span>
            <div className="interests-section">
              <span className="interests-title">Interests</span>
              <div className="interests-list">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <span className="reviews-title">Reviews</span>
          {profile.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.reviewerName}</span>
                <span className="review-rating">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <span className="review-comment">{review.comment}</span>
            </div>
          ))}
        </div>

        <button className="review-button">Review</button>
      </div>
    </Layout>
  );
};

export default Profile;
