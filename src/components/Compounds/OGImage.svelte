<script>
	// @ts-nocheck

	export let type;
	export let phrase;
	export let count;
	export let username;
</script>

<div tw="bg-gray-50 flex flex-col w-full h-full items-center justify-center">
	<h3 tw="text-[#6D309B] text-[2.5rem] mb-4 font-medium">{type}</h3>
	<p tw="text-[4rem] mb-2 text-gray-800 font-light px-8">{phrase}</p>
	{#if username}
		<p tw="text-[1.8rem] mb-4 text-gray-600 underline">@{username}</p>
	{/if}
	<h1 tw="text-[12rem] text-[#6D309B] font-bold">{count}</h1>
</div>
