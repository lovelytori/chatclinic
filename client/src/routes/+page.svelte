
<script lang="ts">
    import { onMount } from 'svelte';
    import ChatWindow from '../components/ChatWindow.svelte';
    import InputBox from '../components/InputBox.svelte';
    import type { ChatMessage, Sender } from '$lib/types';
  
    let chatLog: ChatMessage[] = [];
    let typing: 'monday' | 'gaebot' | null = null;
    let target: 'monday' | 'gaebot' | 'both' = 'both';

    function appendToChat(sender: Sender, message: string) {
      chatLog = [...chatLog, {
        id: crypto.randomUUID(),
        sender,
        message,
      }];
    }
  
    async function callBot(bot: string, message: string): Promise<string> {
      const response = await fetch(`/api/${bot}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
      return response.reply;
    }
  
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function startBotConversation(turns: number) {
      let currentBot: Sender = Math.random() < 0.5 ? 'monday' : 'gaebot';
  
      for (let i = 0; i < turns; i++) {
        const last = chatLog[chatLog.length - 1];
        const inputMessage = !last || last.sender === currentBot
          ? '...'
          : last.message;
        typing = currentBot;
        const reply = await callBot(currentBot, inputMessage);
        appendToChat(currentBot, reply);
        typing = null;
        await delay(1000);
        currentBot = currentBot === 'monday' ? 'gaebot' : 'monday';
      }
    }
  
    async function handleSend(event: CustomEvent) {
      const fullMessage = event.detail.message;
      const { target, content } = parseTarget(fullMessage);

      appendToChat('user', content);
      message = getMessagePrefix(target);

      try {
        if (target === 'monday') {
      typing = 'monday';
      const mondayRes = await callBot('monday', content);
      appendToChat('monday', mondayRes);
    } else if (target === 'gaebot') {
      typing = 'gaebot';
      const gaebotRes = await callBot('gaebot', content);
      appendToChat('gaebot', gaebotRes);
    } else if (target === 'both') {
      typing = 'monday';
      const mondayRes = await callBot('monday', content);
      appendToChat('monday', mondayRes);

      typing = 'gaebot';
      const gaebotRes = await callBot('gaebot', content);
      appendToChat('gaebot', gaebotRes);
    }

    typing = null;

    
      } catch (err) {
        console.error('API 에러:', err);
        typing = null;
      }
    }

    function parseTarget(message: string): {
  target: 'monday' | 'gaebot' | 'both',
  content: string
} {
  if (message.startsWith('@개봇')) {
    return { target: 'gaebot', content: message.replace('@개봇', '').trim() };
  }
  if (message.startsWith('@먼데이')) {
    return { target: 'monday', content: message.replace('@먼데이', '').trim() };
  }
  if (message.startsWith('@all')) {
    return { target: 'both', content: message.replace('@all', '').trim() };
  }

  // 아무 접두어도 없으면 기본은 둘 다
  return { target: 'both', content: message.trim() };
}

let message = '';
function updateMessage(val: string) {
  message = val;
  target = parseTarget(val).target;
}
function getMessagePrefix(target: 'monday' | 'gaebot' | 'both') {
  return target === 'monday' ? '@먼데이 '
       : target === 'gaebot' ? '@개봇 '
       : target === 'both' ? ''
       : '';
}

  </script>
  
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-4">ChatClinic</h1>
    <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={() => startBotConversation(4)}>
      봇 대화 시작
    </button>
    <ChatWindow {chatLog} />
    {#if typing}
    <p class="text-sm text-gray-500 mb-2">
        {typing === 'monday' ? '먼데이' : '개봇'}이 입력 중...
    </p>
    {/if}
    <p class="text-sm mb-2 text-gray-600">
        현재 대상: {target === 'both' ? '모두' : target === 'monday' ? '먼데이' : '개봇'}
    </p>
    <InputBox {message} on:inputChange={(e) => updateMessage(e.detail)} on:send={handleSend} />
  </div>
  