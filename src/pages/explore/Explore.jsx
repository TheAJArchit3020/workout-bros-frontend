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
  getuserprofileapi,
  acceptchatrequestsapi,
} from "../../common/apis";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import ViewPhoto from "../../components/ViewPhoto/viewPhoto";
import { useUsers } from "../../common/context";
import useCheckToken from "../../hooks/useCheckToken";

const Explore = () => {
  const navigate = useNavigate();
  const { usersArray, setUsersArray, selectType, setSelectType } = useUsers();
  const { location, error, loading, requestLocation } = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const [MyuserId, setMyuserId] = useState();

  useCheckToken();

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
        console.log("Location Response:", user);

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

  useEffect(() => {
    if (selectType === "explore") {
      getNearByUsers();
    }
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
      if(response.status === 429){
        console.error("Error fetching users:", error);
        //setUsersArray([]);
        setShowLoader(false);
      }
      else if(response.status === 200){
        const { users } = response.data;
        console.log("Nearby Users Data", users);
        setUsersArray(users);
        setShowLoader(false);
      }   

    } catch (error) {
      console.error("Error fetching users:", error);
      //setUsersArray([]);
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

  const navigateToPublicProfile = (userId, senderRequestId) => {
    navigate("/publicprofile", { state: { userId,senderRequestId } });
  };

  console.log({ MyuserId });

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
      getNearByUsers();

      return response;
    } catch (error) {
      console.log("acceptChatRequest", error);
    }
  };

  const reloadHandler = () => {
    getNearByUsers();
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
          <div className="explore-profile-card-title-container">
            <span className="explore-profile-card-title">Explore Bro's</span>
            <img onClick={reloadHandler}
              src="/images/explore/reloadbutton.svg"
              alt="reloadbutton"
              className="explore-profile-card-title-reloadbutton"
            />
          </div>
          {usersArray && usersArray.length > 0 ? (
            usersArray.map((bro) => (
              <div
                className="explore-profile-card"
                key={bro._id}
                onClick={() => navigateToPublicProfile(bro?._id, bro?.senderRequestId)}
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
                          name: bro?.name,
                          roomId: bro?.roomId,
                          receiverId: bro?.receiverId,
                          senderId: bro?.senderId,
                        },
                      });
                      return;
                    }

                    if (
                      bro.connectionStatus === "pending" &&
                      bro?.senderRequestId !== MyuserId
                    ) {
                      acceptChatRequest(bro?.connectionRequestId);
                    } else {
                      sendConnectRequest(bro._id);
                    }
                  }}
                >
                  {/* status null */}
                  {bro.connectionStatus === null && (
                    <span className="explore-profile-card-button-text">
                      Connect
                    </span>
                  )}

                  {/* status pending */}
                  {bro.connectionStatus === "pending" &&
                    bro?.senderRequestId === MyuserId && (
                      <span className="explore-profile-card-button-text">
                        Requested
                      </span>
                    )}

                  {bro.connectionStatus === "pending" &&
                    bro?.senderRequestId !== MyuserId && (
                      <span className="explore-profile-card-button-text">
                        Accept
                      </span>
                    )}

                  {/* status accepted */}
                  {bro.connectionStatus === "accepted" && (
                    <img
                      src="/images/explore/exploremessage.svg"
                      alt="message"
                      className="explore-profile-card-exploremessage-image"
                    />
                  )}

                  {/* {bro.connectionStatus === null || bro?._id !== MyuserId ? (
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
                  )} */}
                </div>
              </div>
            ))
          ) : (
            <p className="no-users-found">No users found in your area</p>
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
