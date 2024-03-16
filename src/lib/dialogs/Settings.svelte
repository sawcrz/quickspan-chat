<script lang="ts">
  import { get } from "svelte/store";
  import { ArchiveRestore, Save, Settings } from "lucide-svelte";

  import Dialog from "../Dialog.svelte";
  import Button from "../Button.svelte";

  import { configStore } from "../../utils/stores";
  import { defaultConfig } from "../../utils/constants";

  export let willOpen: boolean = false;

  const currentState = get(configStore);

  let { preferredName } = currentState;
  let { preserveOnStorage } = currentState;
  let { prefersReducedMotion } = currentState;

  let onCloseDialog: () => void;

  async function onRestoreDefaults() {
    const storageModule = await import("../../utils/client/storage");

    configStore.set(defaultConfig);
    storageModule.updateConfig(defaultConfig);

    onCloseDialog();
  }

  async function onModify() {
    const storageModule = await import("../../utils/client/storage");

    configStore.set({ preferredName, preserveOnStorage, prefersReducedMotion });
    storageModule.updateConfig(get(configStore));

    if (preferredName !== "") {
      onCloseDialog();
    }
  }
</script>

<Dialog bind:willOpen bind:handleModalClose={onCloseDialog}>
  <h2 class="flex gap-4 text-xl" slot="modal-header">
    <Settings />
    <b>Settings</b>
  </h2>
  <section class="my-2 p-2" slot="modal-body">
    <form class="flex flex-col p-2" on:submit|preventDefault>
      <ul class="list-none overflow-y-auto h-96 rounded-md">
        <li
          class="flex gap-6 mx-2 my-1 p-4 bg-inherit text-slate-800 dark:text-gray-300 rounded-md transition"
        >
          <input
            id="prefersreducedmotionvalue"
            type="checkbox"
            bind:checked={prefersReducedMotion}
          />
          <div>
            <label for="prefersreducedmotionvalue" class="text-xl">
              <b>Application: prefers reduced motion</b>
            </label>
            <p class="text-slate-600 dark:text-gray-400">
              Blocks excentric animations
            </p>
          </div>
        </li>
        <li
          class="flex gap-6 mx-2 my-1 p-4 bg-inherit text-slate-800 dark:text-gray-300 rounded-md transition"
        >
          <input
            id="preservestorevalue"
            type="checkbox"
            bind:checked={preserveOnStorage}
          />
          <div>
            <label for="preservestorevalue" class="text-xl">
              <b>Chat: preserve messages on storage</b>
            </label>
            <p class="text-slate-600 dark:text-gray-400">
              Determimes if the messages are saved or not
            </p>
          </div>
        </li>
        <li
          class="flex gap-6 mx-2 my-1 p-4 bg-inherit text-slate-800 dark:text-gray-300 rounded-md transition"
        >
          <div class="w-full">
            <label for="preferredname" class="text-xl">
              <b>User: Preferred name</b>
            </label>
            <p class="mb-2 text-slate-600 dark:text-gray-400">
              Display name in the chat
            </p>
            <input
              id="preferredname"
              class="py-2 px-4 w-full bg-inherit border-b border-b-gray-600 text-slate-800 dark:text-gray-200 outline-none"
              type="search"
              placeholder="@Username"
              bind:value={preferredName}
              required
            />
          </div>
        </li>

        <h2 class="text-lg text-center mx-auto">
          Some Settings will be applied after restart the application
        </h2>

        <section class="flex justify-center gap-6 mt-6">
          <Button
            customStyles="display:flex; gap: 6px; background-color: rgb(25, 96, 255); color: #f4f4f4"
            ariaLabel="Save Changes"
            onClickCallback={onModify}
          >
            <Save />
            Save Changes
          </Button>
          <Button
            customStyles="display:flex; gap: 6px; background-color: rgb(255, 35, 35); color: #f4f4f4"
            ariaLabel="Save Changes"
            onClickCallback={onRestoreDefaults}
          >
            <ArchiveRestore />
            Restore Defaults
          </Button>
        </section>
      </ul>
    </form>
  </section>
</Dialog>

<style scoped>
  ul {
    scrollbar-width: none;
  }
</style>
