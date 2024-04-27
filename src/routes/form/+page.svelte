<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';

	import FormInput from '../../components/Form/FormInput.svelte';
	import FormRadio from '../../components/Form/FormRadio.svelte';

	import schema from './schema';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		validators: zodClient(schema)
	});

	const typeOptions = ['Number of times', 'Kountdown', 'Stopwatch'];
</script>

<svelte:head>
	<title>kount.ing | Home</title>
	<meta name="description" content="Kount, kount, and kount..." />
</svelte:head>

<SuperDebug data={$form} />
<section class="w-full">
	<form method="POST" use:enhance>
		<FormInput
			name="name"
			type="text"
			label="Kount Name"
			bind:value={$form.name}
			errors={$errors.name}
		/>

		<FormRadio
			name="type"
			label="Choose Type"
			options={typeOptions}
			bind:group={$form.type}
			errors={$errors.type}
		/>

		{#if $form.type === 'Number of times'}
			<FormInput
				name="kountStart"
				type="number"
				label="Kount Start"
				bind:value={$form.kountStart}
				errors={$errors.kountStart}
			/>
		{/if}

		{#if $form.type === 'Kountdown'}
			<FormInput
				name="kountDate"
				type="datetime-local"
				label="Kount Date"
				bind:value={$form.kountDate}
				errors={$errors.kountDate}
			/>
		{/if}

		<div>
			<button>Submit</button>
		</div>
	</form>
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
