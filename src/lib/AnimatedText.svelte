<script lang="ts">
  import { onMount } from "svelte";
  import { dynamicFillMethod } from "../utils/dom/fillmethods";
  import { defaultTypingMs, emptyStr } from "../utils/constants";

  export let content: string;
  export let customClassList: string = emptyStr;

  let thisTag: HTMLElement;

  onMount(() => {
    dynamicFillMethod(thisTag, content, defaultTypingMs);
  });
</script>

<svelte:element
  this="p"
  bind:this={thisTag}
  class={customClassList}
  contenteditable="false"
/>
