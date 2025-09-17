import { useEffect, useState } from 'react';
import { sendMsg, connect } from './api';
import Header from './components/header/header';
import ChatHistory from './components/chathistory/ChatHistory';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect((msg) => {
      console.log("New Message", msg);
      setChatHistory(prev => [...prev, msg]);
    });
  }, []);

  const send = () => {
    if (!message.trim()) return;
    sendMsg(message);
    setMessage("");
  }

  return (
    <div className="App min-h-screen bg-gray-100">
      <Header/>
      <div className="container mx-auto p-4">
        <ChatHistory chatHistory={chatHistory}/>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg text-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          onClick={send} 
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;