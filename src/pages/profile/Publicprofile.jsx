import React, { useEffect, useState } from "react";
import "./Publicprofile.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router";
import axios from "axios";
import { getpublicprofileapi } from "../../common/apis";
import { interests as allInterests } from "../../data/interests";
import { useNavigate } from "react-router";
const Publicprofile = () => {
  const { state } = useLocation();
  const userId = state?.userId;

  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const navigation = useNavigate();
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

  console.log("profile", profile);

  return (
    <div className="public-profile-container">
      <Navbar />
      <div className="public-profile-header">
        <div className="public-profile-info-container">
          <img
            src={profile?.profilePic}
            alt="Profile"
            className="public-profile-picture"
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
                  src={`./images/${matchedInterest?.activeIconFile || "fishhookfill.svg"
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
            onClick={()=>{navigation('/chatting',{
              state:{
                chatId: profile?.id,
                name: profile?.name,
                roomId: profile?.roomId,
                receiverId : profile?.receiverId,
                senderId : profile?.senderId
              }
            })}}
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
  );
};

export default Publicprofile;