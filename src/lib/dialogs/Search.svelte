<script lang="ts">
  import { beforeUpdate } from "svelte";
  import { Search } from "lucide-svelte";

  import type { Message, MessageList } from "../../utils/types";

  import Dialog from "../Dialog.svelte";
  import StaticMessage from "../StaticText.svelte";

  export let willOpen: boolean;
  export let messages: MessageList;

  let requestPump = "";
  let messageDelegate = messages;

  beforeUpdate(() => {
    if (requestPump === "") {
      messageDelegate = messages;
    }
  });

  function onSearch() {
    if (requestPump === "") {
      messageDelegate = messages;
      return messageDelegate;
    }

    messageDelegate = messages.filter((item: Message) =>
      item.contents.toLowerCase().includes(requestPump.toLowerCase()),
    );

    return messageDelegate;
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
        class="py-2 px-4 w-full bg-inherit border-b border-b-gray-600 text-slate-800 dark:text-gray-200 outline-none"
        type="search"
        placeholder="@Message"
        bind:value={requestPump}
        on:input={onSearch}
      />
    </form>
    <ul class="list-none overflow-y-auto h-96 rounded-md">
      {#each messageDelegate as message (message.id)}
        <li
          class="mx-2 my-1 p-4 bg-inherit text-slate-800 dark:text-gray-300 rounded-md hover:brightness-75 transition cursor-pointer"
        >
          <a href={`#${message.id}`} on:click={onCloseDialog}>
            <h1 class="mb-1"><b>{message.remitent}</b></h1>
            <StaticMessage contents={message.contents} />
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

  input::-webkit-search-cancel-button {
    display: none;
  }
</style>
