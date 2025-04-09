import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

export default function App() {

  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  type BotType = 'monday' | 'gaebot';

  interface ChatMessage {
    id: string;
    sender: string;
    message: string;
  }
  const handleSend = async (message: string) => {
    const userMsg = { id: crypto.randomUUID(), sender: '나', message };
    setChatLog((prev) => [...prev, userMsg]);

    // 서버에 메시지 보내기
    try {
      const [mondayRes, gaebotRes] = await Promise.all([
        fetch('/api/monday', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        }).then((res) => res.json()),

        fetch('/api/gaebot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        }).then((res) => res.json()),
      ]);

      setChatLog((prev) => [
        ...prev,
        { id: crypto.randomUUID(),sender: '먼데이', message: mondayRes.reply },
        { id: crypto.randomUUID(),sender: '개봇', message: gaebotRes.reply },
      ]);
    } catch (err) {
      console.error('API 에러:', err);
    }
  };

  // 봇끼리 대화
  async function startBotConversation(turns: number) {
    console.log("turns:", turns);
    let currentBot: BotType = Math.random() < 0.5 ? 'monday' : 'gaebot';
    let lastMessage = '안녕! 오늘 기분 어때?';
  
    for (let i = 0; i < turns; i++) {
      const reply = await callBot(currentBot, lastMessage);
      appendToChat(currentBot, reply);
  
      await delay(1000);
  
      currentBot = currentBot === 'monday' ? 'gaebot' : 'monday';
      lastMessage = reply;
    }
  }

  async function callBot(bot: string, message: string): Promise<string> {
    const response = await fetch(`/api/${bot}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }).then((res) => res.json());
  
    //const data = await response.json();
    return response.reply; // 너 백엔드에서 `reply` 키로 응답했으니까
  }

  function appendToChat(sender: string, message: string) {
    setChatLog(prev => [...prev, {
      id: crypto.randomUUID(), // or uuid()
      sender,
      message,
    }]);
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">ChatClinic</h1>
      <button onClick={() => startBotConversation(3)}>봇 대화 시작</button>
      <ChatWindow chatLog={chatLog} />
      <InputBox onSend={handleSend} />
    </div>
  );
}