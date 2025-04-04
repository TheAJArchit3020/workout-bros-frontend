import React from "react";
import "./messageBox.css"

const MessageBox = ({ message, isUser }) => {
  return (
    <div
      className={`message-box ${isUser ? "user-message" : "receiver-message"}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default MessageBox;
