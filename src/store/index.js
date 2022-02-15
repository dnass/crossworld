import { browser } from '$app/env';
import { get } from 'svelte/store';
import {
	mapSize,
	pickedClue,
	hoveredClue,
	settingsVisible,
	helpVisible,
	winVisible,
	currentGuess,
	tryAgain
} from './state';
import { currentPuzzle, hardMode, darkMode } from './settings';
import { clues, guessedCountry, pickedCountry, guessed, shareMessage, win } from './game';

export const getNextClue = (reverse = false) => {
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

	pickedClue.set(index);
	tryAgain.set(false);
};

export const enterGuess = () => {
	const guess = get(guessedCountry);

	if (guess && guess.id === get(pickedCountry)) {
		const newGuesses = [...get(guessed)];
		newGuesses[get(pickedClue)] = guess.id;
		guessed.set(newGuesses);
		tryAgain.set(false);

		getNextClue();
		hoveredClue.set(null);
	} else {
		tryAgain.set(true);
	}

	currentGuess.set('');
};

if (browser) {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') {
			getNextClue();
		}

		if (e.key === 'ArrowLeft') {
			getNextClue(true);
		}

		if (e.key === 'Enter') {
			enterGuess();
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
	currentGuess,
	guessedCountry,
	guessed,
	win,
	tryAgain,
	shareMessage,
	darkMode,
	hardMode,
	settingsVisible,
	helpVisible,
	winVisible
};
