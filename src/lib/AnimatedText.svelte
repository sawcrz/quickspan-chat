<script lang="ts">
  import { onMount } from "svelte";
  import { dynamicFillMethod } from "../utils/dom/fillmethods";
  import { defaultTypingMs, emptyStr } from "../utils/constants";

  export let content: string;
  export let customClassList: string = emptyStr;
  export let typingDelay: number = defaultTypingMs;

  let thisTag: HTMLElement;

  onMount(() => {
    dynamicFillMethod(thisTag, content, typingDelay);
  });
</script>

<svelte:element
  this="p"
  bind:this={thisTag}
  class={customClassList}
  contenteditable="false"
/>
