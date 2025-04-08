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
const Explore = () => {
  const [usersArray, setUsersArray] = useState(null);
  const { location, error, loading, requestLocation } = useLocation();

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
    console.log({ tokenData });
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
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersArray([]);
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
    navigate("publicprofile", { state: { userId } });
  };

  return (
    <div className="explore-container">
      <Navbar displayFilterButton={true} />

      {loading && (
        <div className="location-status">
          <p>Requesting location access...</p>
        </div>
      )}

      {error && (
        <div className="location-status error">
          <p>{error}</p>
          <button onClick={requestLocation}>Enable Location</button>
        </div>
      )}

      <div className="explore-profile-card-section">
        <span className="explore-profile-card-title">Explore Bro's</span>
        {usersArray && usersArray.length > 0 ? (
          usersArray.map((bro) => (
            <div className="explore-profile-card" key={bro._id}>
              <div className="explore-profile-card-image">
                <img
                  // src={
                  //   `${bro.profilePic}` || "/public/images/profile/cross.svg"
                  // }
                  src="/images/profile.png"
                  alt="profile"
                />
                <div className="explore-profile-card-content">
                  <span className="explore-profile-card-name">{bro.name}</span>
                  <div className="explore-profile-card-interest-container">
                    {bro.interests && bro.interests.length > 0 && (
                      <>
                        {bro.interests.slice(0, 2).map((interest, index) => (
                          <span
                            className="explore-profile-card-interest"
                            key={index}
                          >
                            {interest}
                            {index === 0 && bro.interests.length > 1 ? "" : ""}
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
                className="explore-profile-card-button"
                onClick={() => sendConnectRequest(bro._id)}
              >
                <span className="explore-profile-card-button-text">
                  {bro.connectionStatus === null
                    ? "Connect"
                    : bro.connectionStatus === "pending"
                    ? "Pending"
                    : "Message"}
                </span>
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
  );
};

export default Explore;
