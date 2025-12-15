<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { CalendarDate } from "@internationalized/date";
  import Button from "./ui/button/button.svelte";
  import EditIcon from "@lucide/svelte/icons/edit";
  import type { DocumentData } from "firebase/firestore";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import {
    setDoc,
    getFirestore,
    doc,
    Timestamp,
    addDoc,
    collection,
  } from "firebase/firestore";

  // TODO: this component is dirty and should reuse /countdowns/new

  let open = $state(false);
  const { countdown } = $props<{ countdown: DocumentData | undefined }>();

  const propsDate = new Date(countdown?.data().timestamp.seconds * 1000);

  let userPickedDate = $state<CalendarDate>(
    new CalendarDate(
      propsDate.getFullYear(),
      propsDate.getMonth() + 1,
      propsDate.getDate()
    )
  );
  let name = $state(countdown?.data().name);

  async function onclick() {
    const db = getFirestore();

    const timestamp = Timestamp.fromDate(userPickedDate.toDate("Asia/Tokyo"));

    const countdownDoc = doc(db, "countdowns", countdown.id);
    await setDoc(countdownDoc, { name, timestamp }, { merge: true });
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
        <div class="flex flex-col items-center gap-2">
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
        </div>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
