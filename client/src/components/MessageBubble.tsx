import React from 'react';

type Props = {
  sender: string;
  message: string;
};

export default function MessageBubble({ sender, message }: Props) {
  const isUser = sender === 'user';
  const isMonday = sender === 'monday';

  const bubbleStyle = isUser
    ? 'bg-gray-300 text-black self-end'
    : isMonday
    ? 'bg-red-100 text-red-900 self-start'
    : 'bg-blue-100 text-blue-900 self-start';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`rounded-xl p-3 shadow-md max-w-[75%] ${bubbleStyle}`}>
        <p className="text-xs font-semibold mb-1">{sender}</p>
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}