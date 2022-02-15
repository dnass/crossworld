import { browser } from '$app/env';
import { get } from 'svelte/store';
import {
	mapSize,
	pickedClue,
	hoveredClue,
	settingsVisible,
	helpVisible,
	winVisible
} from './state';
import { currentPuzzle, hardMode, darkMode } from './settings';
import { clues, pickedCountry, guessed, shareMessage, win } from './game';

const getNextClue = (reverse = false) => {
	const guesses = get(guessed),
		picked = get(pickedClue);

	const win = guesses.filter(Boolean).length === guesses.length;

	const count = guesses.length - 1;

	let index;

	if (win) {
		if (reverse) {
			if (picked === 0) index = count;
			else index = picked - 1;
		} else {
			if (picked === count) index = 0;
			else index = picked + 1;
		}
	} else {
		if (reverse) {
			const reverseIndex = [...guesses]
				.reverse()
				.findIndex((guess, i) => i > count - picked && !guess);
			if (reverseIndex === -1) index = guesses.lastIndexOf(null);
			else index = count - reverseIndex;
		} else {
			index = guesses.findIndex((guess, i) => i > picked && !guess);
			if (index === -1) index = guesses.indexOf(null);
			if (index === -1) index = picked;
		}
	}

	return index;
};

guessed.subscribe(() => {
	if (get(guessed)[get(pickedClue)] !== get(pickedCountry)) return;

	pickedClue.set(getNextClue());
	hoveredClue.set(null);
});

if (browser) {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') {
			pickedClue.set(getNextClue());
		} else if (e.key === 'ArrowLeft') {
			pickedClue.set(getNextClue(true));
		}
	});
}

export {
	currentPuzzle,
	mapSize,
	clues,
	pickedClue,
	pickedCountry,
	hoveredClue,
	guessed,
	win,
	shareMessage,
	darkMode,
	hardMode,
	settingsVisible,
	helpVisible,
	winVisible
};
