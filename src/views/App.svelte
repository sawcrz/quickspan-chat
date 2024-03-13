<script lang="ts">
  import { onMount, type ComponentType } from "svelte";
  import {
    MessageSquareX,
    Search,
    SendHorizonal,
    Settings,
  } from "lucide-svelte";

  import BodyWrapper from "../lib/layout/BodyWrapper.svelte";
  import AppContainer from "../lib/layout/AppContainer.svelte";
  import Header from "../lib/layout/Header.svelte";

  import Button from "../lib/Button.svelte";

  import type { MessageList } from "../utils/types";

  let messages: MessageList = [];
  let presentationNode: ComponentType;

  onMount(async () => {
    presentationNode = (await import("../lib/Presentation.svelte")).default;
  });
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
        onClickCallback={() => {}}
        customStyles="display:flex; align-items:center; gap:1em; width: max(40%, 5em)"
        ariaLabel="Search a message"
      >
        <Search />
        Search...
      </Button>
      <Button ariaLabel="Open settings" onClickCallback={() => {}}>
        <Settings />
      </Button>
    </Header>
    <div class="w-5/6 h-full mx-auto">
      <svelte:component this={presentationNode} />
      {#await import("../lib/wrappers/MessageStack.svelte") then moduleName}
        <svelte:component this={moduleName.default} {messages} />
      {/await}
    </div>
    <form
      class="flex items-center gap-2 m-2 rounded-md bg-slate-900 border border-gray-300 dark:border-slate-700"
      on:submit|preventDefault
    >
      <Button
        ariaLabel="Clear Context"
        customStyles="background-color: #00000000; border-width: 0px;"
        onClickCallback={() => {}}
      >
        <MessageSquareX color="#ff2323" />
      </Button>
      <textarea
        class="w-full h-10 resize-none overflow-y-auto bg-inherit text-slate-800 dark:text-gray-300 outline-none p-2"
        placeholder="Type here"
        aria-label="query-input"
        name="query"
      />
      <Button
        ariaLabel="Send Message"
        customStyles="background-color: #00000000; border-width: 0px;"
        onClickCallback={() => {}}
      >
        <SendHorizonal color="#1960ff" />
      </Button>
    </form>
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
