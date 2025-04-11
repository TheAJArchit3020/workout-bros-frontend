import React, { useEffect, useState } from "react";
import "./Publicprofile.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { getpublicprofileapi } from "../../common/apis";
import { interests as allInterests } from "../../data/interests";
import ViewPhoto from "../../components/ViewPhoto/viewPhoto";

const Publicprofile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const navigation = useNavigate();
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`${getpublicprofileapi}/${userId}`, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      console.log("response", response);
      setProfile(response.data.user);
    };
    fetchProfile();
  }, [userId]);

  const handleBack = () => {
    navigate("/explore");
  };

  return (
    <>
      {showProfilePic && (
        <div
          className="viewPhoto-container"
          onClick={() =>{
             setShowProfilePic(false)
             setSelectedImage(null);
          }}
        >
          <ViewPhoto image={selectedImage} />
        </div>
      )}
      <div className="public-profile-container">
        {/* header section */}
        <div className="public-profile-back-header">
          <div className="filter-back-button" onClick={handleBack}>
            <img src="./images/backbuttonicon.svg" alt="back-button" />
          </div>
          {/* <div className="filter-title">
          <span className="filter-title-text">Filters</span>
        </div> */}
        </div>
        <div className="public-profile-header">
          <div className="public-profile-info-container">
            <img
              src={profile?.profilePic}
              alt="Profile"
              className="public-profile-picture"
              onClick={() => {
                setShowProfilePic(true);
                setSelectedImage(profile?.profilePic);
              }}
            />
            <div className="public-profile-info-content">
              <span className="public-profile-name">{profile?.name}</span>
            </div>
          </div>
          <span className="public-profile-description">
            {profile?.description}
          </span>
          <div className="public-profile-interests-container">
            {profile?.interests.map((item, index) => {
              const matchedInterest = allInterests.find(
                (interest) => interest.name === item
              );
              return (
                <div className="public-profile-interests-list" key={index}>
                  <span className="public-profile-interests-list-text">
                    {item}
                  </span>
                  <img
                    src={`./images/yellowicons/${
                      matchedInterest?.activeIconFile || "fishhookfill.svg"
                    }`}
                    alt={item}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="public-profile-connect-container">
          {profile?.connectionStatus === null ? (
            <span className="explore-profile-card-button-text">Connect</span>
          ) : profile?.connectionStatus === "pending" ? (
            <span className="explore-profile-card-button-text-pending">
              requested
            </span>
          ) : (
            <img
              src="/images/explore/exploremessage.svg"
              alt="message"
              className="public-profile-card-exploremessage-image"
              onClick={() => {
                navigation("/chatting", {
                  state: {
                    chatId: profile?.id,
                    name: profile?.name,
                    roomId: profile?.roomId,
                    receiverId: profile?.receiverId,
                    senderId: profile?.senderId,
                  },
                });
              }}
            />
          )}
        </div>

        {/* <span className="public-profile-message-image">
        <img
          src="./images/message.svg"
          alt="Profile"
          className="public-profile-messageimage"
        />
      </span> */}
      </div>
    </>
  );
};

export default Publicprofile;
