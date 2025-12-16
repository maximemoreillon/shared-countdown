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
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import CountdownForm from "$lib/components/countdownForm.svelte";

  async function onSubmit(data: any) {
    if (!data.timestamp) return alert("Timestamp not defined");
    if (!data.name) return alert("Name not defined");
    if (!$currentUser) return;

    const db = getFirestore();

    // const docRef = await addDoc(
    //   collection(db, "users", $currentUser.uid, "countdowns"),
    //   {
    //     name,
    //     timestamp,
    //   }
    // );

    const docRef = await addDoc(collection(db, "countdowns"), {
      ...data,
      users: [$currentUser.email],
    });

    return goto(`/countdowns/${docRef.id}`);
  }
</script>

<div class="flex items-center gap-2 my-4">
  <Button href="/countdowns" variant="ghost">
    <ArrowLeftIcon />
  </Button>
  <h2 class="text-2xl">New countdown</h2>
  <div class="grow"></div>
</div>

<CountdownForm {onSubmit} />
