<script lang="ts">
	export let name: string;
	export let label: string;
	export let group: any;
	export let options: string[];
	export let errors: string[] | undefined = [];
</script>

<div class="flex flex-col">
	<p>{label}</p>
	{#each options as option}
		<label>
			<input type="radio" {name} bind:group value={option} />
			{option}
		</label>
	{/each}

	{#if Array.isArray(errors) && errors?.length > 0}
		<div><p class="text-red-500 mt-5">this field is required boss</p></div>
	{/if}
</div>

<style>
	label {
		margin-bottom: 0.5em;
	}
</style>
