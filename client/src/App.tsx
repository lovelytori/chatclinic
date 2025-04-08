import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

export default function App() {
  const [chatLog, setChatLog] = useState<
    { sender: string; message: string }[]
  >([]);

  const handleSend = async (message: string) => {
    const userMsg = { sender: '나', message };
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
        { sender: '먼데이', message: mondayRes.reply },
        { sender: '개봇', message: gaebotRes.reply },
      ]);
    } catch (err) {
      console.error('API 에러:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">ChatClinic</h1>
      <ChatWindow chatLog={chatLog} />
      <InputBox onSend={handleSend} />
    </div>
  );
}