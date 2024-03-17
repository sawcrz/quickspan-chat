<script lang="ts">
  import { X } from "lucide-svelte";

  import Button from "./Button.svelte";
  import Header from "./layout/Header.svelte";

  export let willOpen: boolean;

  let referenceHandle: HTMLDialogElement;

  const handleModalOpen = () => {
    referenceHandle.showModal();
  };

  export const handleModalClose = () => {
    referenceHandle.close();
    willOpen = false;
  };

  $: if (willOpen && referenceHandle) handleModalOpen();
</script>

<dialog
  class="bg-gray-200 text-slate-800 dark:bg-slate-800 dark:text-gray-400 rounded-lg border-0 p-2 sm:w-5/6 xl:w-1/2"
  bind:this={referenceHandle}
  on:close|stopPropagation
>
  <Header>
    <slot name="modal-header" />
    <Button ariaLabel={"Close dialog"} onClickCallback={handleModalClose}>
      <X />
    </Button>
  </Header>
  <hr class="border border-gray-300 dark:border-gray-500" />
  <slot name="modal-body" />
</dialog>

<!--tailwind does not allow you to style the dialog animations directly-->
<style scoped>
  dialog[open] {
    animation: izoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  dialog[open]::backdrop {
    background-color: #03030390;
    animation: ifade 0.2s ease-out;
  }

  @keyframes izoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes ifade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
