<script>
	// @ts-nocheck

	export let type;
	export let phrase;
	export let count;
</script>

<div tw="bg-gray-50 flex flex-col w-full h-full items-center justify-center">
	<h3 tw="text-[#6D309B] text-[2.5rem] mb-4 font-medium">{type}</h3>
	<p tw="text-[4rem] mb-8 text-gray-700 font-light">{phrase}</p>
	<h1 tw="text-[12rem] text-[#6D309B]  font-bold">{count}</h1>
</div>
