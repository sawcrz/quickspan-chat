<script lang="ts">
  import { emptyStr } from "../utils/constants";

  export let buttonType: "button" | "submit" | "reset" = "button";
  export let ariaLabel: string;
  export let customStyles = emptyStr;
  export let onClickCallback: () => void;
</script>

<button
  style={customStyles}
  type={buttonType}
  class="rounded-md bg-gray-200 border border-gray-300 text-slate-800 dark:bg-slate-800 dark:border-none dark:text-gray-400 transition hover:brightness-90 p-2"
  aria-label={ariaLabel}
  on:click={onClickCallback}
>
  <slot />
</button>
