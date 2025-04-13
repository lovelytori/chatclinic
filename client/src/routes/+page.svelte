
<script lang="ts">
    import { onMount } from 'svelte';
    import ChatWindow from '../components/ChatWindow.svelte';
    import InputBox from '../components/InputBox.svelte';
    import type { ChatMessage, Sender } from '$lib/types';
  
    let chatLog: ChatMessage[] = [];
  
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
  
        const reply = await callBot(currentBot, inputMessage);
        appendToChat(currentBot, reply);
        await delay(1000);
        currentBot = currentBot === 'monday' ? 'gaebot' : 'monday';
      }
    }
  
    async function handleSend(event: CustomEvent) {
      const message = event.detail.message;
  
      appendToChat('user', message);
  
      try {
        const [mondayRes, gaebotRes] = await Promise.all([
          callBot('monday', message),
          callBot('gaebot', message),
        ]);
  
        appendToChat('monday', mondayRes);
        appendToChat('gaebot', gaebotRes);
      } catch (err) {
        console.error('API 에러:', err);
      }
    }
  </script>
  
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-4">ChatClinic</h1>
    <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={() => startBotConversation(4)}>
      봇 대화 시작
    </button>
    <ChatWindow {chatLog} />
    <InputBox on:send={handleSend} />
  </div>
  