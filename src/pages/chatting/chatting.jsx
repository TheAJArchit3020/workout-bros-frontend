import React,{useState} from 'react';
import MessageBox from '../../components/chatting/messageBox';
import { ArrowLeftIcon,PaperAirplaneIcon } from '@heroicons/react/24/solid';
import "./chatting.css";
const Chatting = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello, how are you?", isUser: false },
      ]);
      const [input, setInput] = useState("");
      const [name, setname] = useState("Srujan");
      const sendMessage = () => {
        if (input.trim().length === 0) return;
        setMessages([...messages, { id: Date.now(), text: input, isUser: true }]);
        setInput("");
      };
    
      const handleKey = (e)=>{
         if(e.key === "Enter") sendMessage();
      };

      return (
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <button className="back-button">
              <ArrowLeftIcon className="icon arrow" />
            </button>
            <span className="username">{name}</span>
          </div>
    
          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <MessageBox key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
    
          {/* Input */}
          <div className="chat-input">
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
      );
};

export default Chatting;