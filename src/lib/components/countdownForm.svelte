<script lang="ts">
  import { CalendarDate } from "@internationalized/date";
  import Button from "./ui/button/button.svelte";
  import { Timestamp, type DocumentData } from "firebase/firestore";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  const { countdown = $bindable(), onSubmit } = $props<{
    countdown?: DocumentData;
    onSubmit: Function;
  }>();

  const propsDate = countdown
    ? new Date(countdown?.data().timestamp.seconds * 1000)
    : new Date();

  let userPickedDate = $state<CalendarDate>(
    new CalendarDate(
      propsDate.getFullYear(),
      propsDate.getMonth() + 1,
      propsDate.getDate()
    )
  );
  let name = $state(countdown?.data().name);

  function handleSubmit() {
    const timestamp = Timestamp.fromDate(userPickedDate.toDate("Asia/Tokyo"));

    onSubmit({ timestamp, name });
  }
</script>

<form
  class="flex flex-col items-center gap-2"
  on:submit|preventDefault={handleSubmit}
>
  <Calendar
    type="single"
    bind:value={userPickedDate}
    class="rounded-lg border shadow-sm"
  />
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="name">Name</Label>
    <Input type="text" placeholder="New year's eve" bind:value={name} />
  </div>
  <Button type="submit">Save</Button>
</form>
