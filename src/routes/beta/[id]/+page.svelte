<script lang="ts">
	import Counter from 'compounds/Counter.svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase.app';
	import { page } from '$app/stores';

	export let data: any;

	onSnapshot(doc(firestore, `kounts/${$page.params.id}`), (snapshot) => {
		data = { ...snapshot.data() };
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h2 class="text-2xl text-gray-700 mb-8">
		<span class="text-primary font-medium">{data.type}</span>
		{data.phrase}
	</h2>

	<Counter count={data.count} id={$page.params.id} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
