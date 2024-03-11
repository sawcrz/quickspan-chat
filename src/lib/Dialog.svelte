<script lang="ts">
  import { X } from "lucide-svelte";
  import Button from "./Button.svelte";
  import Header from "./layout/Header.svelte";

  export let willOpen = false;

  let referenceHandle: HTMLDialogElement;

  const handleModalOpen = () => {
    referenceHandle.showModal();
  };

  const handleModalClose = () => {
    referenceHandle.close();
    willOpen = false;
  };

  $: if (willOpen && referenceHandle) handleModalOpen();
</script>

<dialog
  class="rounded-lg border-0 p-2 sm:w-5/6 xl:w-1/2"
  bind:this={referenceHandle}
  on:close|stopPropagation
>
  <Header>
    <slot name="modal-header" />
    <Button ariaLabel={"Close dialog"} assignedCallback={handleModalClose}
      ><X /></Button
    >
  </Header>
  <hr />
  <slot name="modal-body" />
</dialog>

<!--tailwind does not allow you to style the dialog animations directly-->
<style scoped>
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
