import { useEffect, useState } from 'react';
import { sendMsg, connect } from './api';
import Header from './components/header/header';
import ChatHistory from './components/chathistory/ChatHistory';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Connect to WebSocket and handle incoming messages
    connect((msg) => {
      console.log("New Messagee", msg);
      setChatHistory(prevHistory => [...prevHistory, msg]);
    });
  }, []);

  const send = () => {
    console.log("hello");
    sendMsg("hello");
  }

  return (
    <div className="App min-h-screen bg-gray-100">
      <Header/>
      <div className="container mx-auto p-4">
        <ChatHistory chatHistory={chatHistory}/>
        <button 
          onClick={send} 
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl"
        >
          Hit
        </button>
      </div>
    </div>
  );
}

export default App;