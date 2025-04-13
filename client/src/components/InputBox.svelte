
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let input = '';

  function handleSend() {
    const messageToSend = input.trim();
    if (!messageToSend) return;
    input = '';
    dispatch('send', { message: messageToSend });
  }
</script>

<div class="flex">
  <input
    class="flex-1 border border-gray-300 rounded-l px-3 py-2"
    placeholder="메시지를 입력하세요"
    bind:value={input}
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    }}
  />
  <button
    class="bg-black text-white px-4 rounded-r"
    on:click={handleSend}
  >
    보내기
  </button>
</div>
