<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { countdowns } from "$lib/store";
  import * as Card from "$lib/components/ui/card/index.js";
  import PlusIcon from "@lucide/svelte/icons/plus";
</script>

<div class="flex justify-between">
  <h2 class="text-2xl">My countdowns</h2>
  <Button href="/countdowns/new">
    <PlusIcon />
    Create
  </Button>
</div>

<ul class="flex flex-col gap-2 my-6">
  {#each $countdowns as countdown}
    <li>
      <Card.Root>
        <Card.Header>
          <Card.Title>{countdown.data().name}</Card.Title>
          <Card.Description>
            {new Date(countdown.data().timestamp.seconds * 1000).toDateString()}
          </Card.Description>
        </Card.Header>
        <!-- <Card.Content>
        <p>Card Content</p>
      </Card.Content> -->
        <Card.Footer class="flex justify-end">
          <Button href={`/countdowns/${countdown.id}`}>See</Button>
        </Card.Footer>
      </Card.Root>
    </li>
  {/each}
</ul>
