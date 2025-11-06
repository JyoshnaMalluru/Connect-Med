import React, { useState } from "react";
import axios from "axios";
import { Send, MessageCircle } from "lucide-react";
import "./ChatBot.css";

const ChatBot = ({ userData }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`${API_BASE_URL}/chatbot`, { message: input, userData },
      { headers: { "Content-Type": "application/json" } });

      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI service.", sender: "bot" },
      ]);
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <div className="chatbot-icon-circle chat">
            <MessageCircle size={24} />
            <p>Chat with us</p>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>MediConnect AI Assistant</h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask a health question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chatbot-send" onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
