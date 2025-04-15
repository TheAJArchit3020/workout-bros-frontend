import React, { useEffect, useState } from "react";
import "./Publicprofile.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import {
  acceptchatrequestsapi,
  getpublicprofileapi,
  getuserprofileapi,
  sendconnectrequestapi,
} from "../../common/apis";
import { interests as allInterests } from "../../data/interests";
import ViewPhoto from "../../components/ViewPhoto/viewPhoto";
import useCheckToken from "../../hooks/useCheckToken";

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
  const [myuserId, setMyuserId] = useState();

  // check token...
  useCheckToken();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`${getpublicprofileapi}/${userId}`, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      console.log("public profile api", response.data.user);
      setProfile(response.data.user);
      console.log(profile?.profilePic);
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    console.log("connection request ID",profile?.senderRequestId);
    const getUserData = async () => {
      const response = await axios.get(getuserprofileapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      console.log("the current user Data: ", response.data.user._id);
      setMyuserId(response.data.user._id);
    };
    getUserData();
  }, []);

  const handleBack = () => {
    navigate("/explore");
  };

  const acceptChatRequest = async (id) => {
    try {
      const response = await axios.post(
        `${acceptchatrequestsapi}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("acceptChatRequest", error);
    }
  };

  const sendConnectRequest = async (receiverId) => {
    console.log(receiverId, "receiverId");
    try {
      const response = await axios.post(
        sendconnectrequestapi,
        {
          receiverId: receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      console.log("Connect request sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending connect request:", error);
    }
  };

  return (
    <>
      {showProfilePic && (
        <div
          className="viewPhoto-container"
          onClick={() => {
            setShowProfilePic(false);
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
          {/* status null */}
          {profile?.connectionStatus === null && (
            <div className="explore-profile-card-button"   onClick={() => sendConnectRequest(profile?.id)}>
            <span
              className="explore-profile-card-button-text"
            >
              Connect
            </span>
            </div>
          )}

          {/* status pending */}
          {profile?.connectionStatus === "pending" &&
            profile?.senderRequestId === myuserId && (
              <div className="explore-profile-card-button requestedButton" >
              <span className="explore-profile-card-button-text-requested">
                Requested
              </span>
              </div>
            )}

          {profile?.connectionStatus === "pending" &&
            profile.senderRequestId!== myuserId && (
              <div className="explore-profile-card-button"   onClick={() => acceptChatRequest(profile?.connectionRequestId)}>
              <span
                className="explore-profile-card-button-text"
              >
                Accept
              </span>
              </div>
            )}

          {/* status accepted */}
          {profile?.connectionStatus === "accepted" && (
            <img
              src="/images/explore/exploremessage.svg"
              alt="message"
              className="public-profile-card-exploremessage-image"
              onClick={() => {
                navigation("/chatting", {
                  state: {
                    name: profile?.name,
                    roomId: profile?.roomId,
                    receiverId: profile?.receiverId,
                    senderId: profile?.senderId,
                  },
                });
              }}
            />
          )}
          {/* {profile?.connectionStatus === null ? (
            <span className="public-profile-card-button-text">Connect</span>
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
          )} */}
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
