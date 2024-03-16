<script lang="ts">
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import { MessageSquareOff } from "lucide-svelte";

  import { configStore } from "../../utils/stores";
  import {
    animationWaitMs,
    debugUserName,
    fastTypingMs,
  } from "../../utils/constants";

  import type { Message, MessageList } from "../../utils/types";

  import AnimatedText from "../AnimatedText.svelte";
  import Avatar from "../Avatar.svelte";
  import StaticMessage from "../StaticMessage.svelte";

  export let messages: MessageList;

  const prefersReducedMotionValue = get(configStore).prefersReducedMotion;
  const preferredNameValue = get(configStore).preferredName;

  const handleWhoSendsMessage = (msg: Message) => {
    if (msg.remitent === debugUserName) {
      return {
        src: "user-mascot.webp",
        alt: "Your avatar",
      };
    }

    return {
      src: "spanner-mascot.webp",
      alt: "Application mascot",
    };
  };
</script>

<section
  class="m-0"
  transition:fade={{
    delay: animationWaitMs + 1000,
    duration: prefersReducedMotionValue ? 0 : 250,
  }}
>
  {#if messages.length > 0}
    <ul class="list-none">
      {#each messages as message (message.id)}
        <li
          class="grid w-full max-w-2xl sm:grid-cols-1 md:grid-cols-10 gap-4 text-slate-900 dark:text-gray-300 px-2 my-6"
        >
          <p class="w-8 h-8 col-span-1">
            <Avatar {...handleWhoSendsMessage(message)} />
          </p>
          <div class="col-span-9">
            <h1 class="text-md">
              <b>
                {message.remitent === debugUserName
                  ? preferredNameValue
                  : message.remitent}
              </b>
            </h1>
            {#if message.added || message.remitent === debugUserName || prefersReducedMotionValue}
              <StaticMessage
                id={message.id.toString()}
                contents={message.contents}
              />
            {:else}
              <p id={message.id.toString()} class="text-balance">
                <AnimatedText
                  content={message.contents}
                  typingDelay={fastTypingMs}
                />
              </p>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div
      class="transition grid gap-4 place-content-center place-items-center w-full h-52 text-slate-700 dark:text-gray-400"
    >
      <MessageSquareOff size="5em" />
      <p class="text-2xl text-center max-w-md">
        <b>You don't have any messages with spanner</b>
      </p>
    </div>
  {/if}
</section>
