import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import MessageBox from "../../components/chatting/messageBox";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "./chatting.css";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import useCheckToken from "../../hooks/useCheckToken";

const Chatting = () => {
  const { state } = useLocation();
  const { name: chatName, roomId, receiverId, senderId } = state;
  const currentUserId = senderId;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);
  const socket = useRef(null);
  const navigate = useNavigate();


   // check token...
   useCheckToken();

  const sendMessage = () => {
    if (input.trim().length === 0) return;
    const message = { id: Date.now(), text: input, isUser: true };
    socket.current.emit("chatMessage", {
      roomId,
      receiverId,
      message: message.text,
    });
    console.log(message);
    setMessages([...messages, message]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleBackButton = () => {
    socket.current.disconnect();
    navigate(-1);
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token);

    console.log(tokenData);
    socket.current = io("https://api.swolhomies.com/", {
      auth: {
        token: tokenData,
      },
    });

    socket.current.on("connect", () => {
      console.log(" Connected  to server");
      socket.current.emit("joinRoom", { roomId });
      socket.current.emit("markAsRead", { roomId });
    });

    socket.current.on("chatHistory", (messages) => {
      console.log(messages);
      const formattedMessages = messages.map(
        ({ senderId, message, timestamp }) => {
          const time = new Date(timestamp).toLocaleTimeString();
          return {
            id: time,
            text: message,
            isUser: senderId === currentUserId,
          };
        }
      );
      setMessages(formattedMessages);
    });

    socket.current.on("chatMessage", ({ senderId, message, timestamp }) => {
      console.log(
        "called",
        "senderId",
        senderId,
        " ",
        " currentId",
        currentUserId
      );
      if (senderId === currentUserId) return;
      const time = new Date(timestamp).toLocaleTimeString();
      setMessages((prev) => [
        ...prev,
        { id: time, text: message, isUser: false },
      ]);

      if (senderId !== currentUserId) {
        socket.emit("markAsRead", { roomId });
      }
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="back-button" onClick={handleBackButton}>
          <ArrowLeftIcon className="icon arrow" />
        </div>
        <span className="username">{chatName}</span>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageBox key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        <div style={{ paddingBottom: "60px" }} ref={messageEndRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <div className="c-i-Container">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="send-button" onClick={sendMessage}>
            <PaperAirplaneIcon className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
