import { useEffect } from 'react';
import { sendMsg,connect } from './api';
import './App.css';

function App() {
  useEffect(()=>{
    connect()
  },[])

  const send = ()=>{
    console.log("hello")
    sendMsg("hello")
  }
  return (
    <div>
      <button onClick={send}>Hit</button>
    </div>
  );
}

export default App;
