<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { currentUser } from "$lib/store";

  import TrashIcon from "@lucide/svelte/icons/trash";
  import { getFirestore, doc, deleteDoc } from "firebase/firestore";

  let { id } = $props<{ id: string }>();
  let loading = $state(false);

  async function deleteCountdown() {
    if (!$currentUser) throw new Error("Current user not defined");
    if (!id) throw new Error("Countdown ID not defined");
    if (!confirm(`Delete countdown?`)) return;
    const db = getFirestore();
    loading = true;
    await deleteDoc(doc(db, "countdowns", id));
    loading = false;
    return goto("/countdowns");
  }
</script>

<Button onclick={deleteCountdown} variant="destructive">
  <TrashIcon />
</Button>
