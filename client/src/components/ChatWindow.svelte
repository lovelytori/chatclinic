
<script lang="ts">
  import MessageBubble from './MessageBubble.svelte';
  import type { ChatMessage, Sender } from '$lib/types';

  export let chatLog: ChatMessage[];

  const senderLabel: Record<Sender, string> = {
    monday: '먼데이',
    gaebot: '개봇',
    user: '나'
  };
</script>

<div class="h-[70vh] overflow-y-auto p-4 bg-white rounded shadow mb-4">
  {#each chatLog as msg (msg.id)}
    <MessageBubble sender={msg.sender} senderLabel={senderLabel[msg.sender]} message={msg.message} />
  {/each}
</div>
