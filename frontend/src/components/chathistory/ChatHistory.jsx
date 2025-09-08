import React from "react";

const ChatHistory = ({ chatHistory }) => {
  const messages = chatHistory.map((msg, index) => {
    // Handle different message formats
    let messageText;
    
    if (typeof msg.data === 'string') {
      messageText = msg.data;
    } else if (msg.data instanceof Blob) {
      // Handle binary data if needed
      messageText = "Binary message";
    } else {
      messageText = JSON.stringify(msg);
    }

    return (
      <p key={index} className="mb-2 p-3 bg-white rounded-lg shadow-sm border">
        {messageText}
      </p>
    );
  });

  return (
    <div className="ChatHistory bg-gray-50 p-4 rounded-lg shadow-inner">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Chat History</h2>
      <div className="messages-container max-h-96 overflow-y-auto">
        {messages.length > 0 ? messages : <p className="text-gray-500">No messages yet</p>}
      </div>
    </div>
  );
};

export default ChatHistory;