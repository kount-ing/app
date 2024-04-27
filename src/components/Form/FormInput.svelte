<script lang="ts">
	export let name: string;
	export let label: string;
	export let value: any;
	export let type: string;
	export let errors: string[] | undefined = [];

	const handleInput = (event: { target: { value: any } }) => {
		const inputValue = event.target.value;
		if (type === 'number') {
			value = inputValue === '' ? undefined : Number(inputValue);
		} else {
			value = inputValue;
		}
	};
</script>

<div class="flex flex-col">
	<p>{label}</p>
	<input {...{ type }} bind:value {name} on:input={handleInput} />

	{#if Array.isArray(errors) && errors?.length > 0}
		<div><p class="text-red-500 mt-5">this field is required boss</p></div>
	{/if}
</div>

<style>
</style>
