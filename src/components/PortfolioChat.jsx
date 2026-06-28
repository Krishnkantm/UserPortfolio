import React, { useState, useEffect, useRef } from "react";
import "../assets/css/style.css";

const PortfolioChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi My name is Kishu 😊! I'm Krishnkant's AI Assistant. How can I help you 😗?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply || "No response" }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Server Error" }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`portfolio-chat ${isOpen ? "chat-open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-avatar">🤖</div>
          <div className="chat-header-info">
            <h3>Portfolio Assistant Kishu</h3>
            <span>Ask me anything</span>
          </div>
          <div className="chat-status-dot" />
          <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-row ${msg.role}`}>
              <div className={`bubble-avatar ${msg.role === "user" ? "user-av" : "ai-av"}`}>
                {msg.role === "user" ? "Me" : "AI"}
              </div>
              <div className={`chat-bubble ${msg.role}`}>
                <span className="bubble-label">{msg.role === "user" ? "You" : "AI"}</span>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-row ai">
              <div className="bubble-avatar ai-av">AI</div>
              <div className="chat-bubble ai">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
          />
          <button className="chat-send-btn" onClick={sendMessage}>➤</button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        className={`chat-fab ${isOpen ? "chat-fab-open" : ""}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle chat"
      >
        <span className="chat-fab-icon chat-fab-ai">🤖</span>
        <span className="chat-fab-icon chat-fab-close">✕</span>
      </button>
    </>
  );
};

export default PortfolioChat;
