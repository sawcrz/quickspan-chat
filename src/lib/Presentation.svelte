<script lang="ts">
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";

  import { animationWaitMs } from "../utils/constants";
  import { configStore } from "../utils/stores";
  import Avatar from "./Avatar.svelte";

  const prefersReducedMotionValue = get(configStore).prefersReducedMotion;

  let mainText = `**Hello i'm Spanner, your GPT chat assistant**`;
  let subText = `Type belown to start a conversation`;
</script>

<section class="flex flex-col gap-3 items-center mt-4 mb-2 h-64">
  <p class="w-20 h-20">
    <Avatar src="spanner-mascot.webp" alt="Assistant profile picture" />
  </p>
  <div class="text-center">
    {#if prefersReducedMotionValue === true}
      {#await import("../lib/StaticMessage.svelte") then mod}
        <svelte:component
          this={mod.default}
          classList="text-slate-800 dark:text-gray-200 text-xl"
          bind:contents={mainText}
        />
      {/await}
      <p class="text-gray-400 text-md">{subText}</p>
    {:else}
      {#await import("../lib/AnimatedText.svelte") then mod}
        <svelte:component
          this={mod.default}
          customClassList="text-slate-800 dark:text-gray-200 text-xl"
          bind:content={mainText}
        />
        <p
          class="text-gray-400 text-md"
          transition:fade={{ delay: animationWaitMs }}
        >
          {subText}
        </p>
      {/await}
    {/if}
  </div>
</section>
