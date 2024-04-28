import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		rollupOptions: {
			// cf. https://rollupjs.org/configuration-options/#external
			external: ['@resvg/resvg-js', 'css-tree']
		}
	}
});
