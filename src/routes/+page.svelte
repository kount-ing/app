<script lang="ts">
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
	<form method="post" class="w-full flex flex-col items-center justify-center gap-8">
		<div class="flex w-full md:w-4/5 lg:w-3/5 border-2 h-12 mx-auto rounded-md text-sm md:text-lg">
			<select value="number of times" class="px-2 bg-primary text-white rounded-sm">
				<option>number of times</option>
			</select>
			<input placeholder="I relapsed" type="text" class="px-4 bg-transparent w-4/5" />
		</div>
		<button type="submit" class="bg-primary font-medium text-white rounded-md text-xl px-8 py-2"
			>kount now!</button
		>
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
