<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { auth } from "$lib/firebase";
  import { countdowns, currentUser } from "$lib/store";
  import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
  import type { User } from "firebase/auth";
  import LoginButton from "$lib/components/loginButton.svelte";
  import LogoutIcon from "$lib/components/logoutIcon.svelte";
  import { Spinner } from "$lib/components/ui/spinner/index.js";

  let { children } = $props();
  let loading = $state(true);

  auth.onAuthStateChanged(async (user) => {
    currentUser.set(user);
    loading = false;
    if (!user) return;
    subscribeToCountdowns(user);
  });

  const subscribeToCountdowns = (user: User) => {
    const db = getFirestore();

    const collectionRef = collection(db, "countdowns");
    const q = query(
      collectionRef,
      where(`users`, "array-contains", user.email)
    );

    onSnapshot(q, ({ docs }) => {
      countdowns.set(docs);
    });
  };
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="flex p-2 items-center gap-2 border-b">
  <h1 class="text-xl">Coundown app</h1>
  <div class="grow"></div>
  {#if $currentUser}
    <LogoutIcon />
  {/if}
</header>

<main class="max-w-3xl mx-auto my-8 px-2">
  {#if loading}
    <div class="flex justify-center my-8">
      <Spinner class="size-16" />
    </div>
  {:else if $currentUser}
    {@render children()}
  {:else}
    <div class="flex justify-center m-8">
      <LoginButton />
    </div>
  {/if}
</main>
