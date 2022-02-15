import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { localStore } from '../utils';

const currentPuzzle = writable(0);

const hardMode = localStore('hard-mode', false);

const darkMode = localStore(
	'dark-mode',
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches
);

export { currentPuzzle, hardMode, darkMode };
