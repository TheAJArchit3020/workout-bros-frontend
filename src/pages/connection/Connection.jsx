import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Connection.css";
import Footer from "../../components/footer/Footer";
import {
  acceptchatrequestsapi,
  getchatpendingapi,
  getchatrequestsapi,
  getchatsapi,
} from "../../common/apis";
import axios from "axios";
import { useNavigate } from "react-router";

const Connection = () => {
  const token = localStorage.getItem("token");
  const tokenData = JSON.parse(token);
  const navigate = useNavigate();

  const [selectedSegment, setSelectedSegment] = useState("Connections");
  const [chatPending, setChatPending] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);
  const [chats, setChats] = useState([]);

  const getPendingRequests = async () => {
    try {
      const response = await axios.get(getchatpendingapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      setChatPending(response.data);
    } catch (error) {
      console.log("getPendingRequests", error);
    }
  };

  const getChatRequests = async () => {
    try {
      const response = await axios.get(getchatrequestsapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      setChatRequests(response.data);
    } catch (error) {
      console.log("getChatRequests", error);
    }
  };

  useEffect(() => {
    getPendingRequests();
    getChatRequests();
    getChats();
  }, []);

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
      
      getPendingRequests();
      getChatRequests();
      getChats();

      return response;
    } catch (error) {
      console.log("acceptChatRequest", error);
    }
  };

  const getChats = async () => {
    try {
      const response = await axios.get(getchatsapi, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      if (response.status === 200) {
        const { connections } = response.data;
        setChats(connections);
      }
    } catch (error) {
      console.log("getChats", error);
    }
  };


  return (
    <div className="connection-container">
      <img
        src="/images/referenceImages/connectionscreen.png"
        alt="connection-page"
        className="filter-page-image"
      />
      <div className="edit-profile-navbar-container">
        <div className="edit-profile-navbar-wrapper">
          <div className="edit-profile-navbar-brand-name">
            <span className="edit-profile-navbar-brand-name-text">
              SwolHomies
            </span>
          </div>
        </div>
      </div>

      <div className="connection-segmentbutton-container">
        <div
          className="connection-segmentbutton"
          onClick={() => setSelectedSegment("Connections")}
        >
          <span
            className={
              selectedSegment === "Connections"
                ? "connection-segmentbutton-text-selected"
                : "connection-segmentbutton-text"
            }
          >
            Connections
          </span>
        </div>
        <div
          className="connection-segmentbutton"
          onClick={() => setSelectedSegment("Chats")}
        >
          <span
            className={
              selectedSegment === "Chats"
                ? "connection-segmentbutton-text-selected"
                : "connection-segmentbutton-text"
            }
          >
            Chats
          </span>
        </div>
      </div>

      {/* Connection */}
      {selectedSegment === "Connections" && (
        <>
          <div className="connection-request-container">
            <div className="connection-request-header">
              <span className="connection-request-header-text">Requests</span>
            </div>

            <div className="connection-request-list">
              {chatPending && chatPending?.requests?.length > 0 ? (
                chatPending?.requests?.map((item, index) => (
                  <div className="connection-request-item" key={index}>
                    <img
                      src={item?.senderId?.profilePic}
                      alt="profilePic"
                      className="connection-request-item-image"
                    />
                    <div className="connection-request-item-info">
                      <span className="connection-request-item-info-text">
                        <b>{item?.senderId?.name}</b> sent you a connection
                        request. Want to team up?
                      </span>
                    </div>
                    <div
                      className="connection-request-item-button"
                      onClick={() => acceptChatRequest(item?._id)}
                    >
                      <span className="connection-request-item-button-text">
                        Accept
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="connection-request-item">
                  <span className="connection-request-item-text">
                    Your requests will show up here tell others to connect with
                    you.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="connection-notification-container">
            <div className="connection-notification-header">
              <span className="connection-notification-header-text">
                Notifications
              </span>
            </div>
            {chatRequests && chatRequests?.notifications?.length > 0 ? (
              chatRequests?.notifications?.map((item, index) => (
                <div className="connection-notification-list" key={index}>
                  <div className="connection-notification-item">
                    {/* <img
                      src={item?.senderId?.profilePic}
                      alt=""
                      className="connection-notification-item-image"
                    /> */}
                    <div className="connection-notification-item-info">
                      <span className="connection-notification-item-info-text">
                        <b>{item?.name || "User"}</b> {item?.message}.
                      </span>
                    </div>
                    <div className="connection-notification-item-button">
                      <img src="./images/message.svg" alt="message" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="connection-notification-item">
                <span className="connection-notification-item-text">
                  No notifications yet. New updates will appear here
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Connection Chat */}
      {selectedSegment === "Chats" && (
        <div className="connection-chat-container">
          <div className="connection-chat-list">
            {chats && chats?.length > 0 ? (
              chats?.map((item, index) => (
                <div
                  className="connection-chat-item"
                  key={index}
                  onClick={() =>
                    navigate("/chatting", {
                      state: {
                        chatId: item?._id,
                        name: item?.name,
                      },
                    })
                  }
                >
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-chat-item-image"
                  />
                  <div className="connection-chat-item-info">
                    <span className="connection-chat-item-info-text">
                      <b>{item?.name}</b>
                    </span>
                    <span className="connection-chat-item-info-text">
                      Sent 2 mins ago
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="connection-chat-item">
                <span className="connection-chat-item-text">
                  No chats yet. New chats will appear here
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="connection-chat-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Connection;
