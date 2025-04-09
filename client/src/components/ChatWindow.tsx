import MessageBubble from './MessageBubble';
import React from 'react'; 

type Sender = keyof typeof senderLabel;
const senderLabel = {
  monday: '먼데이',
  gaebot: '개봇',
  user: '나'
} as const;

function ChatWindow({ chatLog }: { chatLog: { sender: Sender, message: string }[] }) {
  return (
    <div className="h-[70vh] overflow-y-auto p-4 bg-white rounded shadow mb-4">
      {chatLog.map((msg, idx) => (
        <MessageBubble key={idx} sender={senderLabel[msg.sender]} message={msg.message} />
      ))}
    </div>
  );
}

export default ChatWindow;
