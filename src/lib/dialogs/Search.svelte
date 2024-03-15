<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { Search } from "lucide-svelte";

  import Dialog from "../Dialog.svelte";
  import type { Message, MessageList } from "../../utils/types";

  export let willOpen: boolean;
  export let messages: MessageList;

  let requestPump: string = "";
  let messageDelegate: MessageList = messages;

  afterUpdate(() => {
    messageDelegate = messages;
  });

  function onSearch() {
    if (requestPump === "") {
      messageDelegate = messages;
      return messageDelegate;
    }

    messageDelegate = messages.filter((item: Message) =>
      item.contents.toLowerCase().includes(requestPump.toLowerCase()),
    );
  }

  let onCloseDialog: () => void;
</script>

<Dialog bind:willOpen bind:handleModalClose={onCloseDialog}>
  <h2 class="flex gap-4 text-xl" slot="modal-header">
    <Search />
    <b>Search Messages</b>
  </h2>
  <section class="my-2 p-2" slot="modal-body">
    <form class="flex flex-col p-2" on:submit|preventDefault>
      <label class="my-2" for="searchmessage">
        Start typing to filter a message
      </label>
      <input
        id="searchmessage"
        class="py-2 px-4 w-full bg-gray-300 text-slate-800 dark:bg-slate-700 dark:text-gray-200 rounded-md outline-none"
        type="search"
        bind:value={requestPump}
        on:input={onSearch}
      />
    </form>
    <ul class="list-none overflow-y-auto h-96">
      {#each messageDelegate as message (message.id)}
        <li
          class="my-2 mx-4 p-4 bg-gray-300 text-slate-800 dark:bg-slate-900 dark:text-gray-300 rounded-sm cursor-pointer"
        >
          <a href={`#${message.id}`} on:click={onCloseDialog}>
            <h1 class="mb-1"><b>{message.remitent}</b></h1>
            <p>{message.contents}</p>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</Dialog>

<style scoped>
  ul {
    scrollbar-width: none;
  }
</style>
