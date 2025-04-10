import React, { useEffect, useState } from "react";
import "./Editprofile.css";
import { interests } from "../../data/interests";
import axios from "axios";
import { getuserprofileapi } from "../../common/apis";
import { useNavigate } from "react-router";

const Editprofile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profileImage: null,
    selectedIntrests: [],
  });
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const [profile, setProfile] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [deSelectedInterests, setdeSelectedInterests] = useState([
    ...interests,
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
    setFormData((prev) => ({
      ...prev,
      selectedIntrests: [...prev.selectedIntrests, interest.name],
    }));
    setdeSelectedInterests((prev) => {
      return prev.filter((int) => int.id !== interest.id);
    });
  };

  const toggleDelSelectedInterest = (interest) => {
    setdeSelectedInterests([...deSelectedInterests, interest]);
    setSelectedInterests((prev) => {
      return prev.filter((int) => int.id !== interest.id);
    });
    setFormData((prev) => ({
      ...prev,
      selectedIntrests: prev.selectedIntrests.filter(
        (name) => name !== interest.name
      ),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      setSelectedImagePreview(imageUrl);
    }
  };

  const handleSave = async () => {
    // setShowModal(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);

      // Append each interest separately
      formData.selectedIntrests.forEach((interest) => {
        formDataToSubmit.append("interests[]", interest);
      });

      if (formData.profileImage) {
        formDataToSubmit.append("photo", formData.profileImage);
      }

      const response = await axios.put(getuserprofileapi, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("profile updatedresponse", response);
        setShowModal(true);

        if (showModal) {
          const timer = setTimeout(() => {
            setShowModal(false);
            navigate("/profile");
          }, 2000); // 2 seconds
          return () => clearTimeout(timer);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // useEffect(() => {
  //   if (showModal) {
  //     const timer = setTimeout(() => {
  //       setShowModal(false);
  //     }, 2000); // 2 seconds
  //     return () => clearTimeout(timer);
  //   }
  // }, [showModal]);

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
        // Set initial form data
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          description: user.description || "",
          selectedIntrests: user.interests || [],
        }));
        // Set initial selected interests
        const userInterests = interests.filter((interest) =>
          user.interests.includes(interest.name)
        );
        setSelectedInterests(userInterests);
        setdeSelectedInterests(
          interests.filter(
            (interest) => !user.interests.includes(interest.name)
          )
        );
      }
    };

    getUserProfile();
  }, []);

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="edit-profile-container">
      <div className="public-profile-back-header">
        <div className="filter-back-button" onClick={handleBack}>
          <img src="./images/backbuttonicon.svg" alt="back-button" />
        </div>
      </div>

      {/* Edit Profile */}
      <div className="edit-profile-wrapper">
        <div className="edit-profile-placeholder">
          <div className="edit-profile-placeholder-image">
            {selectedImagePreview ? (
              <img
                src={selectedImagePreview}
                alt="profile"
                className="profile-pic"
              />
            ) : profile?.profilePic ? (
              <img
                src={profile.profilePic}
                alt="profile"
                className="profile-pic"
              />
            ) : (
              <img src="./images/editprofileusericon.svg" alt="edit-profile" />
            )}
          </div>
          <div className="edit-profile-placeholder-image">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profile-image-input"
            />
            <label htmlFor="profile-image-input">
              <img
                src="./images/editprofileuserplusicon.svg"
                alt="edit-profile-plus"
                className="edit-profile-placeholder-image-plus"
              />
            </label>
          </div>
          <span className="edit-profile-placeholder-text">
            Edit your profile
          </span>
        </div>

        {/* Edit Profile Form */}
        <div className="edit-profile-form">
          <div className="edit-profile-form-wrapper">
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-title">Name</span>
              <input
                type="text"
                name="name"
                className="edit-profile-form-content-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-title">Bio</span>
              <textarea
                name="description"
                className="edit-profile-form-content-input text-area-input"
                placeholder="Enter your Bio"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            {/* Interests */}
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-title">
                Your Interests
              </span>
              <div className="edit-profile-form-content-interests-container">
                {selectedInterests.map((interest, index) => {
                  return (
                    <div
                      className="edit-profile-form-content-interests"
                      key={index}
                      onClick={() => toggleDelSelectedInterest(interest)}
                    >
                      <span className="edit-profile-form-content-interests-name">
                        {interest.name}
                      </span>
                      <img
                        src={`/images/yellowicons/${interest.activeIconFile}`}
                        alt="edit-profile-interest"
                        className="edit-profile-form-content-interests-image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Interests */}
            <div className="edit-profile-form-conatent">
              <span className="edit-profile-form-content-add-interests-title">
                Add Interests
              </span>

              <div className="interests-grid">
                {deSelectedInterests.map((interest) => {
                  return (
                    <div
                      key={interest.id}
                      className={"interest-button"}
                      onClick={() => toggleInterest(interest)}
                    >
                      <span className="interest-name">{interest.name}</span>
                      <img
                        src={`/images/Greyicon/${interest.iconFile}`}
                        alt={interest.name}
                        className="interest-icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Save Button */}
      </div>
      <div
        className="edit-profile-form-content-save-button"
        onClick={handleSave}
      >
        <img src="./images/donebutton.svg" alt="edit-profile-done" />
      </div>

      {/* modal */}
      <div
        className={`edit-profile-modal-wrapper ${
          showModal ? "fade-in" : "fade-out"
        }`}
      >
        {showModal && (
          <div className="edit-profile-modal">
            <div className="edit-profile-modal-content">
              <span className="edit-profile-modal-content-text">
                Profile updated
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editprofile;
