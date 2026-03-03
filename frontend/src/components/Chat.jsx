import React, { useState } from "react";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {/* Chat Bubble Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px", height: "60px", borderRadius: "50%",
          backgroundColor: "#ff4757", color: "white", border: "none",
          cursor: "pointer", fontSize: "24px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "absolute", bottom: "80px", right: "0",
          width: "300px", height: "400px", backgroundColor: "white",
          borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid #ddd"
        }}>
          <div style={{ backgroundColor: "#ff4757", color: "white", padding: "15px", fontWeight: "bold" }}>
            Support Chat
          </div>
          <div style={{ flex: 1, padding: "10px", fontSize: "0.9rem", overflowY: "auto" }}>
            <p style={{ background: "#f1f1f1", padding: "8px", borderRadius: "5px" }}>
              👋 Hello! How can we help you today? 
            </p>
            <p style={{ background: "#f1f1f1", padding: "8px", borderRadius: "5px" }}>
              Type "OFFERS" to see today's deals!
            </p>
          </div>
          <div style={{ padding: "10px", borderTop: "1px solid #ddd" }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;