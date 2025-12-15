<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { currentUser } from "$lib/store";
  import { CalendarDate } from "@internationalized/date";
  import {
    setDoc,
    getFirestore,
    doc,
    Timestamp,
    addDoc,
    collection,
  } from "firebase/firestore";

  const now = new Date();
  let value = $state<CalendarDate | undefined>(
    new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
  );
  let name = $state("");

  async function onclick() {
    if (!value) return;
    if (!name) return alert("Name not defined");
    if (!$currentUser) return;
    const date = value.toDate("Asia/Tokyo");

    const timestamp = Timestamp.fromDate(date);

    const db = getFirestore();

    // const docRef = await addDoc(
    //   collection(db, "users", $currentUser.uid, "countdowns"),
    //   {
    //     name,
    //     timestamp,
    //   }
    // );

    const docRef = await addDoc(collection(db, "countdowns"), {
      name,
      timestamp,
      users: [$currentUser.email],
    });

    return goto(`/countdowns/${docRef.id}`);
  }
</script>

<Button href="/countdowns">Return</Button>

<div class="flex flex-col items-center gap-2">
  <Calendar type="single" bind:value class="rounded-lg border shadow-sm" />
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="name">Name</Label>
    <Input type="text" placeholder="New year's eve" bind:value={name} />
  </div>
  <Button {onclick}>Register</Button>
</div>
