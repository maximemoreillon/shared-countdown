<script lang="ts">
  import { CalendarDate } from "@internationalized/date";
  import Button from "./ui/button/button.svelte";
  import { Timestamp, type DocumentData } from "firebase/firestore";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { dateProxy } from "sveltekit-superforms";

  const { countdown = $bindable(), onSubmit } = $props<{
    countdown?: DocumentData;
    onSubmit: Function;
  }>();

  const defaultDate = countdown
    ? new Date(countdown?.data().timestamp.toMillis())
    : new Date();

  let name = $state(countdown?.data().name);
  let time = $state(
    `${defaultDate.getHours()}:${defaultDate.getMinutes()}:${defaultDate.getSeconds()}`
  );
  let userPickedDate = $state<CalendarDate>(
    new CalendarDate(
      defaultDate.getFullYear(),
      defaultDate.getMonth() + 1,
      defaultDate.getDate()
    )
  );

  function handleSubmit(e: Event) {
    e.preventDefault();

    const date = userPickedDate.toDate("Asia/Tokyo");

    const [hours, minutes, seconds] = time.split(":");

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));

    const timestamp = Timestamp.fromDate(date);

    onSubmit({ timestamp, name });
  }
</script>

<form class="flex flex-col items-center gap-4" onsubmit={handleSubmit}>
  <div class="flex w-full max-w-3xs flex-col gap-1.5">
    <Label for="name">Name</Label>
    <Input
      type="text"
      placeholder="New year's eve"
      bind:value={name}
      id="name"
    />
  </div>

  <div class="flex w-full max-w-3xs flex-col gap-1.5">
    <Label for="date">Date</Label>
    <Calendar
      type="single"
      bind:value={userPickedDate}
      class="rounded-lg border shadow-sm"
      id="date"
    />
  </div>

  <div class="flex w-full max-w-3xs flex-col gap-1.5">
    <Label for="time">Time</Label>
    <Input type="time" bind:value={time} id="time" step="1" />
  </div>

  <Button type="submit">Save</Button>
</form>
