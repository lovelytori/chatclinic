import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

export default function App() {

  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  type Sender = 'user' | 'monday' | 'gaebot';
  // const lastMessage = useRef('');
  // const lastSender = useRef<Sender>('gaebot');
  
  interface ChatMessage {
    id: string;
    sender: Sender;
    message: string;
  }
  const handleSend = async (message: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      message
    };
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
        { id: crypto.randomUUID(),sender: 'monday', message: mondayRes.reply },
        { id: crypto.randomUUID(),sender: 'gaebot', message: gaebotRes.reply },
      ]);
    } catch (err) {
      console.error('API 에러:', err);
    }
  };



  // 봇끼리 대화
  async function startBotConversation(turns: number) {
    let currentBot: Sender = Math.random() < 0.5 ? 'monday' : 'gaebot'; // 말을 시작할 봇 랜덤 선택
    // let lastMessage = '안녕! 오늘 기분 어때?';
    const lastSender = chatLog[chatLog.length-1].sender;
    const lastMessage = chatLog[chatLog.length-1].message;
    for (let i = 0; i < turns; i++) {
      console.log(i+":::"+lastSender+" > "+lastMessage);
      // 💡 상대방 말만 반응하도록
    const inputMessage = lastSender === currentBot
                            ? '...' // 자기 말이면 빈 입력 주거나 적절한 프롬프트
                            : `${lastMessage}`;

      const reply = await callBot(currentBot, inputMessage);
      appendToChat(currentBot, reply);
  
      // lastMessage.current = reply;
      // lastSender.current = currentBot;

      await delay(1000);
      currentBot = currentBot === 'monday' ? 'gaebot' : 'monday';
      // lastMessage.current = reply;
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

  function appendToChat(sender: Sender, message: string) {
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
      <button onClick={() => startBotConversation(10)}>봇 대화 시작</button>
      <ChatWindow chatLog={chatLog} />
      <InputBox onSend={handleSend} />
    </div>
  );
}