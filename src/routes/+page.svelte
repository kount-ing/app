<script lang="ts">
	import Loading from 'elements/Loading.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import schema from './schema.js';
	import { createId } from '@paralleldrive/cuid2';
	import { redirect } from '@sveltejs/kit';

	export let data;
	let loading: boolean = false;

	const { form, enhance, errors, allErrors } = superForm(data.form, {
		validators: zodClient(schema),
		onSubmit() {
			loading = true;
		},
		onResult(event) {
			loading = false;
		}
	});

	$form.link = createId();
</script>

<svelte:head>
	<title>kount.ing | Home</title>
	<meta name="description" content="Kount, kount, and kount..." />
</svelte:head>

<section class="w-full">
	<h1 class="text-4xl md:text-5xl font-semibold mb-8">kount.ing</h1>
	<p class="text-xl md:text-2xl tracking-wider text-gray-700 font-light mb-8">
		what do you want to <span class="tracking-normal font-semibold text-primary">kount</span>?
	</p>
	<form method="POST" class="w-full flex flex-col items-center justify-center gap-4" use:enhance>
		<div class="flex w-full md:w-4/5 lg:w-3/5 border-2 h-12 mx-auto rounded-md text-sm md:text-lg">
			<select value={$form.type} class="px-2 bg-primary text-white rounded-sm" name="type">
				<option value="number of times">number of times</option>
			</select>
			<input
				name="phrase"
				placeholder="I relapsed"
				type="text"
				class="px-4 bg-transparent w-4/5"
				bind:value={$form.phrase}
			/>
			<input type="hidden" bind:value={$form.link} name="link" />
		</div>
		<div class="h-4 mb-8">
			{#if Array.isArray($errors.phrase)}
				<p class="text-red-700">{$errors.phrase[0]}</p>
			{/if}
		</div>

		<button
			type="submit"
			disabled={loading || $allErrors.length > 0}
			class="disabled:cursor-not-allowed disabled:opacity-70 bg-primary font-medium text-white rounded-md text-xl px-8 py-2 flex items-center justify-center"
		>
			{#if loading}
				<Loading />
			{/if}
			kount now!</button
		>
	</form>
</section>

<!-- <SuperDebug data={{ $form, $allErrors }} /> -->

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.8;
	}
</style>
