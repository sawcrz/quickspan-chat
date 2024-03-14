<script lang="ts">
  import { v4 } from "uuid";
  import { simpleFillMethod } from "../utils/dom/fillmethods";
  import { onMount } from "svelte";

  export let id: string = v4();
  export let classList: string = "text-balance";

  export let contents: string;

  let thisNode: HTMLParagraphElement;

  onMount(() => {
    simpleFillMethod(thisNode, contents);
  });
</script>

<p {id} class={classList} bind:this={thisNode} />
