import React from 'react'; 
import { useState } from 'react';

function InputBox({ onSend }: { onSend: (message: string) => void }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const messageToSend = input.trim();
    if (!messageToSend) return;

    // 순서 중요: 먼저 복사하고 → 초기화하고 → 보내기
    setInput('');
    onSend(messageToSend);
  };

  return (
    <div className="flex">
      <input
        className="flex-1 border border-gray-300 rounded-l px-3 py-2"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 이거 없으면 간혹 폼 제출되면서 꼬임
            handleSend();
          }
        }}
      />
      <button
        className="bg-black text-white px-4 rounded-r"
        onClick={handleSend}
      >
        보내기
      </button>
    </div>
  );
}
export default InputBox;