<script lang="ts">
	import './styles.scss';
	import { firebaseApp } from '$lib/firebase/firebase.app';
	import {
		getAuth,
		GoogleAuthProvider,
		signInWithRedirect,
		getRedirectResult
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	import { userData } from '../stores';

	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);
	let isAuthenticated = false;
	let currentUID: string;

	const checkSession = async () => {
		const response = await fetch('/auth', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const data = await response.json();

			isAuthenticated = data.authenticated;
			currentUID = data.uid;
			userData.set(data.userData);
		}
	};

	const verifyLogin = async () => {
		const result = await getRedirectResult(auth);
		const user = result?.user;

		if (user) {
			await fetch('/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});

			checkSession();
		}
	};

	const logout = async () => {
		await fetch('/auth/logout', { method: 'GET' });
		checkSession();
		userData.set(null);
	};

	onMount(async () => {
		checkSession();
		verifyLogin();
	});
</script>

<div class="app">
	<div id="firebaseui-auth-container"></div>
	<nav class="w-full fixed h-24">
		<div class="flex items-center justify-between h-full w-full mx-auto container px-4 md:px-0">
			<h1 class="!text-2xl font-semibold"><a href="/">kount.ing</a></h1>
			<div class="flex justify-center items-center gap-8 opacity-70">
				{#if !!isAuthenticated && !!currentUID}
					<button class="text-base"> my kounts </button>
					<button
						on:click={() => {
							logout();
						}}
						class="text-base px-4 py-2 border-2 border-primary bg-primary text-white rounded-md"
						>Log Out</button
					>
				{/if}

				{#if !isAuthenticated || !currentUID}
					<button
						on:click={() => {
							signInWithRedirect(auth, provider);
						}}
						class="text-base px-4 py-2 border-2 border-primary bg-primary text-white rounded-md"
						>Log In</button
					>
				{/if}
			</div>
		</div>
	</nav>
	<main>
		<slot {userData} />
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
