<script lang="ts">
  import { onMount } from "svelte";
  import { v4 } from "uuid";

  import { simpleFillMethod } from "../utils/dom/fillmethods";

  export let id = v4();
  export let customClassList = "text-balance";

  export let contents: string;

  let thisNode: HTMLParagraphElement;

  onMount(() => {
    simpleFillMethod(thisNode, contents);
  });
</script>

<p {id} class={customClassList} bind:this={thisNode} />
