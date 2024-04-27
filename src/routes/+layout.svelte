<script>
	import './styles.scss';
</script>

<div class="app">
	<nav class="w-full fixed h-24">
		<div class="flex items-center justify-between h-full w-full mx-auto container px-4 md:px-0">
			<h1 class="!text-2xl font-semibold"><a href="/">kount.ing</a></h1>
			<div class="flex justify-center items-center gap-4 opacity-70">
				<button class="text-base px-2 py-2 underline rounded-md cursor-not-allowed">Log In</button>
				<p>or</p>
				<button
					class=" cursor-not-allowed text-base px-4 py-2 border-2 border-primary bg-primary text-white rounded-md"
					>Sign Up</button
				>
			</div>
		</div>
	</nav>
	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
