import { writable, derived } from 'svelte/store';
import { localStore } from '../utils';

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

const completedGames = localStore('completed-games', []);

const startTime = writable(new Date().toISOString());

const showMap = writable(true);

const submittedOnce = writable(false);

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
	input,
	completedGames,
	startTime,
	showMap,
	submittedOnce,
};
