
<script lang="ts">
  export let message: string;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let input = '';
  
  function handleSend() {
    const messageToSend = input.trim();
    if (!messageToSend) return;
    input = '';
    dispatch('send', { message: messageToSend });
  }

  function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    dispatch('inputChange', value);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      dispatch('send', { message }); // 대화 전송
    }
  }
</script>

<div class="flex">
  <form
  class="flex gap-2 w-full"
  on:submit|preventDefault={() => dispatch('send', { message })}
>
  <input
    class="flex-1 border border-gray-300 rounded-l px-3 py-2"
    placeholder="메시지를 입력하세요"
    bind:value={message}
    on:input={handleInput}
    on:keydown={handleKeyDown}
  />
  <button
    class="bg-black text-white px-4 rounded-r"
    on:click={() => dispatch('send', {message})}
  >
    보내기
  </button>
  </form>
</div>
