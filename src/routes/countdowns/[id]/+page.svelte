<script lang="ts">
  // import { Temporal } from "@js-temporal/polyfill";
  import Button from "$lib/components/ui/button/button.svelte";
  import { countdowns, currentUser } from "$lib/store";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import CountdownDeleteButton from "$lib/components/countdownDeleteButton.svelte";
  import CountdownUsersEdit from "$lib/components/countdownUsersEdit.svelte";
  import CountdownEditDialog from "$lib/components/countdownEditDialog.svelte";

  dayjs.extend(duration);

  let id = $page.params.id;

  let remaining = $state({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let countdown = $derived(() => $countdowns.find((c) => c.id === id));

  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      const cd = $countdowns.find((c) => c.id === id);
      if (!cd) return console.error("Countdown not found");

      // // @ts-ignore
      // const target = Temporal.Instant.fromEpochMilliseconds(
      //   countdown.data().timestamp.seconds * 1000
      // );

      // // @ts-ignore
      // const now = Temporal.Now.instant();

      // remaining = now.until(target, {
      //   largestUnit: "hours",
      //   smallestUnit: "seconds",
      // });

      const futureDate = dayjs(cd.data().timestamp.seconds * 1000);
      const now = dayjs();

      const diffMs = futureDate.diff(now);

      const remainingDuration = dayjs.duration(diffMs);

      const years = remainingDuration.years();
      const months = remainingDuration.months();
      const days = remainingDuration.days();
      const hours = remainingDuration.hours();
      const minutes = remainingDuration.minutes();
      const seconds = remainingDuration.seconds();

      remaining = { years, months, days, hours, minutes, seconds };
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const units = [
    { label: "Years", key: "years" },
    { label: "Months", key: "months" },
    { label: "Days", key: "days" },
    { label: "Hours", key: "hours" },
    { label: "Minutes", key: "minutes" },
    { label: "Seconds", key: "seconds" },
  ] as const;
</script>

{#if countdown()}
  <div class="flex items-center gap-2 my-4">
    <Button href="/countdowns" variant="ghost">
      <ArrowLeftIcon />
    </Button>
    <h2 class="text-2xl">{countdown()?.data()?.name || "Unnamed countdown"}</h2>
    <div class="grow"></div>
    <CountdownEditDialog countdown={countdown()} />
    <CountdownDeleteButton id={countdown()?.id} />
  </div>

  <div class="flex gap-2 justify-between my-8">
    {#each units as unit}
      <div class="flex items-center flex-col gap-2">
        <div>{unit.label}</div>
        <div class="text-3xl">{remaining[unit.key]}</div>
      </div>
    {/each}
  </div>

  <div class="my-8 text-center">
    Until {new Date(
      countdown()?.data().timestamp.seconds * 1000
    ).toDateString()}
  </div>
  <CountdownUsersEdit id={countdown()?.id} />
{/if}
