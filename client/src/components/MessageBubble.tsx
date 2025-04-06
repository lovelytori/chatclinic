import React from 'react'; 

function MessageBubble({ sender, message }: { sender: string, message: string }) {
  const isUser = sender === 'user';
  const isMonday = sender === 'monday';
  const isGaebot = sender === 'gaebot';

  const bgColor = isUser
    ? 'bg-gray-300'
    : isMonday
    ? 'bg-red-100'
    : 'bg-blue-100';

  const align = isUser ? 'justify-end' : 'justify-start';
  const name = isUser ? '나' : isMonday ? '먼데이' : '개봇';

  return (
    <div className={`flex ${align} mb-2`}>
      <div className={`px-3 py-2 rounded-lg max-w-xs ${bgColor}`}>
        <p className="text-sm font-semibold mb-1">{name}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
