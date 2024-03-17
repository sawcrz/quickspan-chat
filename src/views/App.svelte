<script lang="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  import { get } from "svelte/store";

  import {
    MessageSquareX,
    Search,
    SendHorizonal,
    Settings,
  } from "lucide-svelte";

  import { debugUserName, emptyStr } from "../utils/constants";
  import { messagePumpStore, configStore } from "../utils/stores";
  import type { MessageList } from "../utils/types";

  import BodyWrapper from "../lib/layout/BodyWrapper.svelte";
  import AppContainer from "../lib/layout/AppContainer.svelte";
  import Header from "../lib/layout/Header.svelte";
  import Button from "../lib/Button.svelte";

  let autoscroll: boolean;
  let chatElementNode: HTMLElement;
  let textAreaNode: HTMLTextAreaElement;

  let queryPump = emptyStr;
  let messages = get(messagePumpStore);

  const unsubscribeCallback = messagePumpStore.subscribe(
    (newList: MessageList) => {
      messages = newList;
    },
  );

  onMount(async () => {
    const storageModule = await import("../utils/client/storage");
    messagePumpStore.set(storageModule.getMessagesFromStorage());

    if (!get(configStore).preserveOnStorage) {
      storageModule.cleanMessagePump();
    }
  });

  $: beforeUpdate(() => {
    autoscroll =
      chatElementNode &&
      chatElementNode.offsetHeight + chatElementNode.scrollTop >
        chatElementNode.scrollHeight - 20;
  });

  $: afterUpdate(() => {
    if (autoscroll) chatElementNode.scrollTo(0, chatElementNode.scrollHeight);
  });

  onDestroy(unsubscribeCallback);

  async function onSendRequest(): Promise<boolean> {
    if (textAreaNode.disabled || queryPump === "") {
      return false;
    }

    const queryString = queryPump;
    const requestModule = await import("../utils/client/request");
    const storageModule = await import("../utils/client/storage");

    queryPump = "";
    textAreaNode.disabled = true;

    await requestModule
      .stackMessage({
        message: queryString,
        remitent: debugUserName,
        listHandle: messages,
      })
      .then(async () => {
        await requestModule.submitQuery(queryString, messages).then(() => {
          messages.forEach((item) => (item.added = true));

          if (get(configStore).preserveOnStorage) {
            storageModule.updateMessagesStorage(messages);
          }

          textAreaNode.disabled = false;
        });
      });
    return true;
  }

  async function onClearContext(): Promise<boolean> {
    if (textAreaNode.disabled) {
      return false;
    }

    try {
      queryPump = "";
      const requestModule = await import("../utils/client/request");
      await requestModule.clearContext();
      return true;
    } catch (e) {
      console.error(e);
    }

    return false;
  }

  function onSearchOpen() {
    searchDialogWillOpen = true;
  }

  function onSettingsOpen() {
    settingsDialogWillOpen = true;
  }

  let searchDialogWillOpen = false;
  let settingsDialogWillOpen = false;
</script>

<BodyWrapper>
  <AppContainer>
    <Header>
      <h1
        class="w-12 h-12 border rounded-full border-gray-300 dark:border-slate-700"
      >
        {#await import("../lib/Avatar.svelte") then moduleName}
          <svelte:component
            this={moduleName.default}
            src="quickspanlogo.webp"
            alt="Application logo"
          />
        {/await}
      </h1>
      <Button
        onClickCallback={onSearchOpen}
        customStyles="display:flex; align-items:center; gap:1em; width: max(40%, 5em)"
        ariaLabel="Search a message"
      >
        <Search />
        Search
      </Button>
      <Button ariaLabel="Open settings" onClickCallback={onSettingsOpen}>
        <Settings />
      </Button>
    </Header>
    <div
      class="w-5/6 h-5/6 mx-auto overflow-y-auto"
      bind:this={chatElementNode}
    >
      {#await import("../lib/Presentation.svelte") then moduleName}
        <svelte:component this={moduleName.default} />
      {/await}
      {#await import("../lib/wrappers/MessageStack.svelte") then moduleName}
        <svelte:component this={moduleName.default} bind:messages />
      {/await}
    </div>
    <form
      class="flex h-auto items-center gap-2 m-2 rounded-md border border-gray-300 dark:border-slate-700"
      on:submit|preventDefault
    >
      <Button
        buttonType="reset"
        ariaLabel="Clear Context"
        customStyles="background-color: #00000000; border-width: 0px;"
        onClickCallback={onClearContext}
      >
        <MessageSquareX color="#ff2323" />
      </Button>
      <textarea
        on:keydown={() => {}}
        bind:this={textAreaNode}
        bind:value={queryPump}
        class="w-full h-10 resize-none overflow-y-auto bg-inherit text-slate-800 dark:text-gray-300 outline-none p-2"
        placeholder="Type here"
        aria-label="query-input"
        name="query"
        required
      />
      <Button
        buttonType="submit"
        ariaLabel="Send Message"
        customStyles="background-color: #00000000; border-width: 0px;"
        onClickCallback={onSendRequest}
      >
        <SendHorizonal color="#1960ff" />
      </Button>
    </form>
    {#await import("../lib/dialogs/Search.svelte") then moduleName}
      <svelte:component
        this={moduleName.default}
        bind:willOpen={searchDialogWillOpen}
        bind:messages
      />
    {/await}
    {#await import("../lib/dialogs/Settings.svelte") then moduleName}
      <svelte:component
        this={moduleName.default}
        bind:willOpen={settingsDialogWillOpen}
      />
    {/await}
  </AppContainer>
</BodyWrapper>

<style scoped>
  textarea,
  div {
    scrollbar-width: none;
  }

  div {
    scroll-behavior: smooth;
  }
</style>
