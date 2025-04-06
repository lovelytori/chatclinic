import React from 'react'; 
import { useState } from 'react';

function InputBox({ onSend }: { onSend: (message: string) => void }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex">
      <input
        className="flex-1 border border-gray-300 rounded-l px-3 py-2"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
