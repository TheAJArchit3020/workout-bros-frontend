import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Profile.css";
import Navbar from "../../components/navbar/Navbar";

const Profile = () => {
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
    <Layout>
      <div className="profile-container">
        <Navbar />
        <div className="profile-header">
          <span className="profile-header-text">Profile</span>

          <div className="profile-info-container">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-info-content">
              <span className="profile-name">{profile.name}</span>
              <span className="profile-email">{profile.email}</span>
            </div>

            <div className="profile-edit-info-button">
              <img src="./images/editpencil.svg" alt="edit" />
              <span className="profile-edit-info-button-text">
                Edit profile
              </span>
            </div>
          </div>
          <span className="profile-description">{profile.description}</span>
          <div className="profile-interests-container">
            {profile.interests.map((item) => (
              <span className="profile-interests-list">{item}</span>
            ))}
          </div>
        </div>

        {/* <div className="reviews-section">
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

        <button className="review-button" onClick={handleAddReview}>
          Review
        </button> */}

        {showReviewModal && (
          <div className="modal-overlay">
            <div className="review-modal">
              <h2>Rate your workout</h2>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? "filled" : ""}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className="review-comment-input"
                placeholder="Add a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="modal-buttons">
                <button
                  className="submit-review-button"
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                >
                  Submit Review
                </button>
                <button
                  className="cancel-review-button"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
