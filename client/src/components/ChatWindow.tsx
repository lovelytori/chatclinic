import MessageBubble from './MessageBubble';
import React from 'react'; 

function ChatWindow({ chatLog }: { chatLog: { sender: string, message: string }[] }) {
  return (
    <div className="h-[70vh] overflow-y-auto p-4 bg-white rounded shadow mb-4">
      {chatLog.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} message={msg.message} />
      ))}
    </div>
  );
}

export default ChatWindow;
