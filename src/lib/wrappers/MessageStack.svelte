<script lang="ts">
  import { fade } from "svelte/transition";
  import { MessageSquareOff } from "lucide-svelte";

  import type { MessageList } from "../../utils/types";

  export let messages: MessageList;
</script>

<section class="contents">
  {#if messages.length > 0}
    <ul class="list-none my-2">
      {#each messages as message (message.id)}
        <li id={message.id} class="my-4" transition:fade>
          {message.remitent}
          {message.contents}
        </li>
      {/each}
    </ul>
  {:else}
    <div
      class="grid gap-4 place-content-center place-items-center w-full h-5/6 text-slate-700 dark:text-gray-400"
    >
      <MessageSquareOff size="5em" />
      <h3 class="text-2xl text-center max-w-md">
        <b>You don't have any messages with spanner</b>
      </h3>
    </div>
  {/if}
</section>
