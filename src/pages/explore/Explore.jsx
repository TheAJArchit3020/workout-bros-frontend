import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import "./Explore.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import {
  getExplorelocationapi,
  sendconnectrequestapi,
  getnearbyusersapi,
} from "../../common/apis";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import ViewPhoto from "../../components/ViewPhoto/viewPhoto";
import { useUsers } from "../../common/context";

const Explore = () => {
  const navigate = useNavigate();
  const { usersArray, setUsersArray } = useUsers();
  const { location, error, loading, requestLocation } = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);

  useEffect(() => {
    const getUsersLocation = async () => {
      try {
        const response = await axios.put(
          getExplorelocationapi,
          {
            coordinates: [location?.latitude, location?.longitude],
          },
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );

        console.log("API Response:", response.data);
        const { user } = response.data;
        console.log("User data:", user);

        // Transform the user data into the format we need
        const transformedUser = {
          name: user.name, // Using email as name for now
          interest: user.interests || "No interests",
          image: user.profilePic,
          location: user.location,
          _id: user._id,
        };

        return transformedUser;
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsersArray([]);
      }
    };

    if (location?.latitude && location?.longitude) {
      getUsersLocation();
    }
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    getNearByUsers();
  }, []);

  const getNearByUsers = async () => {
    setShowLoader(true);
    try {
      const response = await axios.get(getnearbyusersapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      console.log("getnearbyusersapi API Response:", response.data);
      const { users } = response.data;
      console.log("User data:", users);
      setUsersArray(users);
      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersArray([]);
      setShowLoader(false);
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
      getNearByUsers();
    } catch (error) {
      console.error("Error sending connect request:", error);
    }
  };

  const navigateToPublicProfile = (userId) => {
    navigate("/publicprofile", { state: { userId } });
  };

  return (
    <>
      {showLoader && <Loader />}
      {showProfilePic && (
        <div
          className="viewPhoto-container"
          onClick={() => setShowProfilePic(false)}
        >
          <ViewPhoto image={selectedImage} />
        </div>
      )}
      <div className="explore-container">
        <div className="navbar-container">
          <div className="navbar-brand-name" style={{ marginLeft: "4rem" }}>
            <span className="navbar-brand-name-text">SwolHomies</span>
          </div>

          <div className="navbar-right" onClick={() => navigate("/filter")}>
            <div className="navbar-filter-container">
              <img src="./images/filtericon.svg" alt="filter-icon" />
            </div>
          </div>
        </div>

        {/* {loading && (
          <div className="location-status">
            <p>Requesting location access...</p>
          </div>
        )} */}

        {error && (
          <div className="location-status error">
            <p>{error}</p>
            <div
              className="location-enable-button"
              onClick={() => requestLocation()}
            >
              <img
                src="/images/explore/location.svg"
                alt="location"
                className="location-enable-button-icon"
              />
              <span className="location-enable-button-text">
                Enable Location
              </span>
            </div>
          </div>
        )}

        <div className="explore-profile-card-section">
          <span className="explore-profile-card-title">Explore Bro's</span>
          {usersArray && usersArray.length > 0 ? (
            usersArray.map((bro) => (
              <div
                className="explore-profile-card"
                key={bro._id}
                onClick={() => navigateToPublicProfile(bro._id)}
              >
                <div className="explore-profile-card-image">
                  <img
                    src={
                      bro.profilePic
                        ? `${bro.profilePic}`
                        : "/images/profile.png"
                    }
                    alt="profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(
                        bro.profilePic
                          ? `${bro.profilePic}`
                          : "/images/profile.png"
                      );
                      setShowProfilePic(!showProfilePic);
                    }}
                  />
                  <div className="explore-profile-card-content">
                    <span className="explore-profile-card-name">
                      {bro.name}
                    </span>
                    <div className="explore-profile-card-interest-container">
                      {bro.interests && bro.interests.length > 0 && (
                        <>
                          {bro.interests.slice(0, 2).map((interest, index) => (
                            <span
                              className="explore-profile-card-interest"
                              key={index}
                            >
                              {interest}
                              {index === 0 && bro.interests.length > 1
                                ? ""
                                : ""}
                            </span>
                          ))}
                          {bro.interests.length > 2 && (
                            <span className="explore-profile-card-interest-more">
                              +{bro.interests.length - 2} more
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="explore-profile-card-button1"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (bro.connectionStatus === "accepted") {
                      navigate("/chatting", {
                        state: {
                          chatId: bro?._id,
                          name: bro?.name,
                          roomId: bro?.roomId,
                          receiverId: bro?.receiverId,
                          senderId: bro?.senderId,
                        },
                      });
                      return;
                    }
                    sendConnectRequest(bro._id);
                  }}
                >
                  {bro.connectionStatus === null ? (
                    <span className="explore-profile-card-button-text">
                      Connect
                    </span>
                  ) : bro.connectionStatus === "pending" ? (
                    <span className="explore-profile-card-button-text-pending">
                      requested
                    </span>
                  ) : (
                    <img
                      src="/images/explore/exploremessage.svg"
                      alt="message"
                      className="explore-profile-card-exploremessage-image"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No users found in your area</p>
          )}
        </div>

        <div className="explore-footer-section">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Explore;
