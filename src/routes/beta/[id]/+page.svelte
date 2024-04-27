<script lang="ts">
	import Counter from 'compounds/Counter.svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase.app';

	export let data: any;

	onSnapshot(doc(firestore, `kounts/${data.id}`), (snapshot) => {
		data = { ...snapshot.data() };
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Counter count={data.count} />
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
