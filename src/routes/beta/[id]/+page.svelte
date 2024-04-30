<script lang="ts">
	import Counter from 'compounds/Counter.svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase.app';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: any;

	onSnapshot(doc(firestore, `kounts/${$page.params.id}`), (snapshot) => {
		data = { ...data, ...snapshot.data() };
	});
</script>

<svelte:head>
	<title>kount | {data.phrase}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h2 class="text-2xl text-gray-700 mb-2">
		<span class="text-primary font-medium">{data.type}</span>
		{data.phrase}
	</h2>
	{#if data.username}
		<p class="text-gray-600">@{data.username}</p>
	{/if}

	<div class="mt-8">
		<Counter count={data.count} id={$page.params.id} />
	</div>
</section>

<MetaTags
	openGraph={{
		images: [
			{
				url: `https://kount.ing/beta/${$page.params.id}/opengraph-image`,
				width: 800,
				height: 600,
				alt: 'Open Graph Image'
			}
		]
	}}
/>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
