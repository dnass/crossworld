import { writable, derived } from 'svelte/store';

const settingsVisible = writable(false);

const helpVisible = writable(false);

const winVisible = writable(false);

const modalVisible = derived(
	[settingsVisible, helpVisible, winVisible],
	([$settings, $help, $win]) => $settings || $help || $win
);

const pickedClue = writable(0);

const hoveredClue = writable(null);

const mapSize = writable(0);

const currentGuess = writable();

const width = writable(768);

const input = writable();

export {
	mapSize,
	pickedClue,
	hoveredClue,
	settingsVisible,
	helpVisible,
	winVisible,
	modalVisible,
	currentGuess,
	width,
	input
};
