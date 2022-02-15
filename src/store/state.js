import { writable } from 'svelte/store';

const settingsVisible = writable(false);

const helpVisible = writable(false);

const winVisible = writable(true);

const pickedClue = writable(0);

const hoveredClue = writable(null);

const mapSize = writable(640);

const currentGuess = writable();

const tryAgain = writable(false);

export {
	mapSize,
	pickedClue,
	hoveredClue,
	settingsVisible,
	helpVisible,
	winVisible,
	currentGuess,
	tryAgain
};
