import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./Profile.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { getuserprofileapi } from "../../common/apis";
import { Link } from "react-router";
import { interests as allInterests } from "../../data/interests";
import { useNavigate } from "react-router";
const Profile = () => {
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);

  const [profile, setProfile] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    // Implement submit review logic
    setShowReviewModal(false);
    setRating(0);
    setComment("");
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get(getuserprofileapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      if (response.status === 200) {
        const { user } = response.data;
        setProfile(user);
      }
    };

    getUserProfile();
  }, []);

  return (
    <Layout>
      <div className="profile-container">
        <Navbar />
        <div className="profile-header">
          <span className="profile-header-text">Profile</span>

          <div className="profile-info-container">
            <img
              src={profile?.profilePic}
              alt="Profile"
              className="profile-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23666666'%3EProfile Image%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="profile-info-content">
              <span className="profile-name">{profile?.name}</span>
              <span className="profile-email">{profile?.email}</span>
            </div>

            <div className="profile-edit-info-button" onClick={()=> navigate("/editprofile")}>
              <img src="./images/editpencil.svg" alt="edit" />
              <span className="profile-edit-info-button-text">
                Edit profile
              </span>
            </div>
          </div>
          <span className="profile-description">{profile?.description}</span>
          <div className="profile-interests-container">
            {profile?.interests.map((interest, index) => {
              const matchingInterest = allInterests.find(
                (item) => item.name === interest
              );
              return (
                <div className="profile-interest-item" key={index}>
                  <span className="profile-interests-list">{interest}</span>
                  <img
                    src={`./images/yellowicons/${
                      matchingInterest?.activeIconFile ||
                      matchingInterest?.iconFile
                    }`}
                    alt={interest}
                    className="interest-icon"
                  />
                </div>
              );
            })}
          </div>
        </div>

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
