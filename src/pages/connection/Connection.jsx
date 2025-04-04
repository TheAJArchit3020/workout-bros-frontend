import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Connection.css";
import Layout from "../../components/layout/Layout";
import Footer from "../../components/footer/Footer";

const Connection = () => {
  const [selectedSegment, setSelectedSegment] = useState("Connections");

  return (
      <div className="connection-container">
        <img src="/images/referenceImages/connectionscreen.png" alt="connection-page" className="filter-page-image" />
        <Navbar />

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
                <div className="connection-request-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-request-item-image"
                  />
                  <div className="connection-request-item-info">
                    <span className="connection-request-item-info-text">
                      <b>Benjamin</b> sent you a connection request. Want to team up?
                    </span>
                    {/* <span className="connection-request-item-info-text">
                      Want to team up?
                    </span> */}
                  </div>
                  <div className="connection-request-item-button">
                    <span className="connection-request-item-button-text">
                      Accept
                    </span>
                  </div>
                </div>
              </div>
              <div className="connection-request-list">
                <div className="connection-request-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-request-item-image"
                  />
                  <div className="connection-request-item-info">
                    <span className="connection-request-item-info-text">
                      <b>Benjamin</b> sent you a connection request. Want to team up?
                    </span>
                    {/* <span className="connection-request-item-info-text">
                      Want to team up?
                    </span> */}
                  </div>
                  <div className="connection-request-item-button">
                    <span className="connection-request-item-button-text">
                      Accept
                    </span>
                  </div>
                </div>
              </div>
              <div className="connection-request-list">
                <div className="connection-request-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-request-item-image"
                  />
                  <div className="connection-request-item-info">
                    <span className="connection-request-item-info-text">
                      <b>Benjamin</b> sent you a connection request. Want to team up?
                    </span>
                    {/* <span className="connection-request-item-info-text">
                      Want to team up?
                    </span> */}
                  </div>
                  <div className="connection-request-item-button">
                    <span className="connection-request-item-button-text">
                      Accept
                    </span>
                  </div>
                </div>
              </div>
              <div className="connection-request-list">
                <div className="connection-request-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-request-item-image"
                  />
                  <div className="connection-request-item-info">
                    <span className="connection-request-item-info-text">
                      <b>Benjamin</b> sent you a connection request. Want to team up?
                    </span>
                    {/* <span className="connection-request-item-info-text">
                      Want to team up?
                    </span> */}
                  </div>
                  <div className="connection-request-item-button">
                    <span className="connection-request-item-button-text">
                      Accept
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="connection-notification-container">
              <div className="connection-notification-header">
                <span className="connection-notification-header-text">
                  Notifications
                </span>
              </div>

              <div className="connection-notification-list">
                <div className="connection-notification-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-notification-item-image"
                  />
                  <div className="connection-notification-item-info">
                    <span className="connection-notification-item-info-text">
                      <b>Benjamin</b> accepted your request.Time to meet up.
                    </span>
                    {/* <span className="connection-notification-item-info-text">
                      Time to meet up.
                    </span> */}
                  </div>
                  <div className="connection-notification-item-button">
                    <img src="./images/message.svg" alt="message" />
                  </div>
                </div>
              </div>
              <div className="connection-notification-list">
                <div className="connection-notification-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-notification-item-image"
                  />
                  <div className="connection-notification-item-info">
                    <span className="connection-notification-item-info-text">
                        <b>Benjamin</b> accepted your request.Time to meet up.
                    </span>
                    {/* <span className="connection-notification-item-info-text">
                      Time to meet up.
                    </span> */}
                  </div>
                  <div className="connection-notification-item-button">
                    <img src="./images/message.svg" alt="message" />
                  </div>
                </div>
              </div>
              <div className="connection-notification-list">
                <div className="connection-notification-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-notification-item-image"
                  />
                  <div className="connection-notification-item-info">
                    <span className="connection-notification-item-info-text">
                      <b>Benjamin</b> accepted your request.Time to meet up.
                    </span>
                    {/* <span className="connection-notification-item-info-text">
                      Time to meet up.
                    </span> */}
                  </div>
                  <div className="connection-notification-item-button">
                    <img src="./images/message.svg" alt="message" />
                  </div>
                </div>
              </div>
              <div className="connection-notification-list">
                <div className="connection-notification-item">
                  <img
                    src="./images/profile.png"
                    alt=""
                    className="connection-notification-item-image"
                  />
                  <div className="connection-notification-item-info">
                    <span className="connection-notification-item-info-text">
                      <b>Benjamin</b> accepted your request.Time to meet up.
                    </span>
                    {/* <span className="connection-notification-item-info-text">
                      Time to meet up.
                    </span> */}
                  </div>
                  <div className="connection-notification-item-button">
                    <img src="./images/message.svg" alt="message" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Connection Chat */}
        {selectedSegment === "Chats" && (
          <div className="connection-chat-container">
            <div className="connection-chat-list">
              <div className="connection-chat-item">
                <img
                  src="./images/profile.png"
                  alt=""
                  className="connection-chat-item-image"
                />
                <div className="connection-chat-item-info">
                  <span className="connection-chat-item-info-text">
                    <b>Benjamin</b>
                  </span>
                  <span className="connection-chat-item-info-text">
                    Sent 2 mins ago
                  </span>
                </div>
                 
              </div>
              <div className="connection-chat-item">
                <img
                  src="./images/profile.png"
                  alt=""
                  className="connection-chat-item-image"
                />
                <div className="connection-chat-item-info">
                  <span className="connection-chat-item-info-text">
                    <b>Benjamin</b>
                  </span>
                  <span className="connection-chat-item-info-text">
                    Send you a message.{" "}
                    <span className="connection-chat-item-info-text-time">
                      2 mins ago
                    </span>
                  </span>
                </div>
                <div className="connection-chat-item-button">
                  <span className="connection-chat-item-button-text">+2</span>
                </div>
              </div>
              <div className="connection-chat-item">
                <img
                  src="./images/profile.png"
                  alt=""
                  className="connection-chat-item-image"
                />
                <div className="connection-chat-item-info">
                  <span className="connection-chat-item-info-text">
                    <b>Benjamin</b>
                  </span>
                  <span className="connection-chat-item-info-text">
                    Send you a message.{" "}
                    <span className="connection-chat-item-info-text-time">
                      2 mins ago
                    </span>
                  </span>
                </div>
                 
              </div>
              <div className="connection-chat-item">
                <img
                  src="./images/profile.png"
                  alt=""
                  className="connection-chat-item-image"
                />
                <div className="connection-chat-item-info">
                  <span className="connection-chat-item-info-text">
                    <b>Benjamin</b>
                  </span>
                  <span className="connection-chat-item-info-text">
                    Send you a message.{" "}
                    <span className="connection-chat-item-info-text-time">
                      2 mins ago
                    </span>
                  </span>
                </div>
                 
              </div>
              <div className="connection-chat-item">
                <img
                  src="./images/profile.png"
                  alt=""
                  className="connection-chat-item-image"
                />
                <div className="connection-chat-item-info">
                  <span className="connection-chat-item-info-text">
                    <b>Benjamin</b>
                  </span>
                  <span className="connection-chat-item-info-text">
                    Sent 5 mins ago
                  </span>
                </div>
                 
              </div>
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
