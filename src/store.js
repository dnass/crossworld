import { browser } from '$app/env';
import { writable, derived, get } from 'svelte/store';
import { clues } from './puzzle';

export const pickedClue = writable(0);

export const pickedCountry = derived(
	pickedClue,
	($pickedClue) => clues.find((clue) => clue.number === $pickedClue).id
);

export const hoveredClue = writable(null);

export const guessed = writable(new Array(clues.length).fill(null));

export const win = derived(guessed, ($guessed) => $guessed.filter(Boolean).length === clues.length);

export const showNorth = writable(false);

const getNextClue = (reverse = false) => {
	const guesses = get(guessed),
		picked = get(pickedClue);

	let index;

	if (reverse) {
		const count = guesses.length - 1;
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
