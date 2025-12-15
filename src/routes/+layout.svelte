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

  let { children } = $props();

  auth.onAuthStateChanged(async (user) => {
    currentUser.set(user);
    if (!user) return;
    subscribeToCountdowns(user);
  });

  const subscribeToCountdowns = (user: User) => {
    const db = getFirestore();
    // const collectionRef = collection(db, "users", user.uid, "countdowns");

    const collectionRef = collection(db, "countdowns");
    const q = query(
      collectionRef,
      where(`users`, "array-contains", user.email)
    );

    // onSnapshot(collectionRef, ({ docs }) => {
    //   countdowns.set(docs);
    // });

    onSnapshot(q, ({ docs }) => {
      countdowns.set(docs);
    });
  };
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="flex p-2 items-center gap-2 border-b">
  <h1 class="text-xl">Coundown app</h1>
</header>

<main class="max-w-3xl mx-auto my-8 px-2">
  {@render children()}
</main>
