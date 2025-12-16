<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Button from "./ui/button/button.svelte";
  import EditIcon from "@lucide/svelte/icons/edit";
  import type { DocumentData } from "firebase/firestore";
  import {
    setDoc,
    getFirestore,
    doc,
    Timestamp,
    addDoc,
    collection,
  } from "firebase/firestore";
  import CountdownForm from "./countdownForm.svelte";

  let open = $state(false);
  let { countdown } = $props<{ countdown?: DocumentData }>();

  async function onSubmit(data: any) {
    const db = getFirestore();
    const countdownDoc = doc(db, "countdowns", countdown.id);
    await setDoc(countdownDoc, data, { merge: true });
    open = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    <Button variant="secondary">
      <EditIcon />
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit countdown</Dialog.Title>
      <Dialog.Description>
        <CountdownForm bind:countdown {onSubmit} />
        <!-- <div class="flex flex-col items-center gap-2">
          <Calendar
            type="single"
            bind:value={userPickedDate}
            class="rounded-lg border shadow-sm"
          />
          <div class="flex w-full max-w-sm flex-col gap-1.5">
            <Label for="name">Name</Label>
            <Input type="text" placeholder="New year's eve" bind:value={name} />
          </div>
          <Button {onclick}>Register</Button>
        </div> -->
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
