import React from 'react'; 
import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

function App() {
  type ChatMessage = {
    sender: string;
    message: string;
  };
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const handleSend = (message: string) => {
    const newMsg = { sender: 'user', message };
    setChatLog([...chatLog, newMsg]);
    // TODO: API 연결 후 캐릭터 응답 추가
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">ChatClinic</h1>
      <ChatWindow chatLog={chatLog} />
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default App;
