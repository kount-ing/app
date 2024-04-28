import { writable } from 'svelte/store';

export const userData = writable(null);
export const isAuthenticated = writable(false);
