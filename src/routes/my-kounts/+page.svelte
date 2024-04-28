<script lang="ts">
	import { doc, onSnapshot } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase.app';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let data;

	let kounts = data.kounts;

	let kountsStore = writable(kounts);

	function setupSnapshotListeners(kounts: any[]) {
		kounts.forEach((kount) => {
			onSnapshot(doc(firestore, `kounts/${kount.id}`), (snapshot) => {
				if (snapshot.exists()) {
					updateKount(snapshot.id, snapshot.data());
				}
			});
		});
	}

	function updateKount(id: string, updatedData: any) {
		kountsStore.update((currentKounts) => {
			const index = currentKounts.findIndex((k) => k.id === id);
			if (index !== -1) {
				let updatedKounts = [...currentKounts];
				updatedKounts[index] = { ...updatedKounts[index], ...updatedData };
				return updatedKounts;
			}
			return currentKounts;
		});
	}

	onMount(() => {
		setupSnapshotListeners(kounts);
	});
</script>

<section class="w-full">
	<p class="mb-5">my kounts</p>
	{#each $kountsStore as kount}
		<a class="border-2 border-solid border-black rounded-md w-3/4 p-5" href={`/beta/${kount.id}`}>
			<p>{kount.id}</p>
			<p>current kount: {kount.count}</p>
		</a>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.8;
	}
</style>
