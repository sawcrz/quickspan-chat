<script lang="ts">
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";

  import { animationWaitMs } from "../utils/constants";
  import { configStore } from "../utils/stores";
  import Avatar from "./Avatar.svelte";

  const prefersReducedMotionValue = get(configStore).prefersReducedMotion;

  let mainText = `<b>Hello i'm Spanner, your GPT chat assistant</b>`;
  let subText = `Type belown to start a conversation`;
</script>

<section class="flex flex-col gap-3 items-center mt-4">
  <p class="w-20 h-20">
    <Avatar src="spanner-mascot.webp" alt="Assistant profile picture" />
  </p>
  <div class="text-center">
    {#if prefersReducedMotionValue === true}
      <p class="text-gray-200 text-xl">{mainText}</p>
      <p class="text-gray-600 text-md">{subText}</p>
    {:else}
      {#await import("../lib/AnimatedText.svelte") then mod}
        <svelte:component
          this={mod.default}
          customClassList="text-slate-800 dark:text-gray-200 text-xl"
          bind:content={mainText}
        />
        <p
          class="text-gray-600 text-md"
          transition:fade={{ delay: animationWaitMs }}
        >
          {subText}
        </p>
      {/await}
    {/if}
  </div>
</section>
