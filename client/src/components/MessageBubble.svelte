
<script lang="ts">
  export let sender: string;
  export let senderLabel: string;
  export let message: string;

  const isUser = sender === 'user';
  const isMonday = sender === 'monday';
  const avatar = isUser ? '👤' : sender === 'monday' ? '😎' : '🤖';

  const bubbleStyle = isUser
    ? 'bg-gray-300 text-black self-end'
    : isMonday
    ? 'bg-red-100 text-red-900 self-start'
    : 'bg-blue-100 text-blue-900 self-start';
</script>

<div class={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
  <div class={`rounded-xl p-3 shadow-md max-w-[75%] ${bubbleStyle}`}>
    <p class="text-xs font-semibold mb-1">{avatar} {senderLabel}</p>
    <p class="whitespace-pre-wrap">{message}</p>
  </div>
</div>
