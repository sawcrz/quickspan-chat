<script lang="ts">
  import { onMount } from "svelte";
  import { v4 } from "uuid";

  import { defaultTypingMs, emptyStr } from "../utils/constants";
  import { dynamicFillMethod } from "../utils/dom/fillmethods";

  export let content: string;

  export let id = v4();
  export let typingDelay = defaultTypingMs;
  export let customClassList = emptyStr;

  let thisTag: HTMLElement;

  onMount(() => {
    dynamicFillMethod(thisTag, content, typingDelay);
  });
</script>

<p {id} bind:this={thisTag} class={customClassList} contenteditable="false" />
