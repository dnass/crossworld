import { get } from 'svelte/store';
import { browser, dev } from '$app/env';
import { filledArray } from './utils';
import {
	clueList,
	pickedClue,
	previousGuess,
	guessedCountry,
	pickedCountry,
	hoveredClue,
	currentGuess,
	solutions,
	guessCounts,
	win,
	winVisible,
	input,
	modalVisible,
	alreadyCompleted,
	completedGames,
	currentPuzzleDate,
	guessesPerClue,
	startTime,
	currentPuzzle,
	shareMessage,
	submittedOnce,
} from './store';

export const getNextClue = (reverse = false) => {
	const solutionList = get(solutions),
		picked = get(pickedClue);

	const count = solutionList.length - 1;

	let index;

	if (get(win)) {
		if (reverse) {
			if (picked === 0) index = count;
			else index = picked - 1;
		} else {
			if (picked === count) index = 0;
			else index = picked + 1;
		}
	} else {
		if (reverse) {
			const reverseIndex = [...solutionList]
				.reverse()
				.findIndex((correct, i) => i > count - picked && !correct);
			if (reverseIndex === -1) index = solutionList.lastIndexOf(false);
			else index = count - reverseIndex;
		} else {
			index = solutionList.findIndex((correct, i) => i > picked && !correct);
			if (index === -1) index = solutionList.indexOf(false);
			if (index === -1) index = picked;
		}
	}

	pickedClue.set(index);
};

export const enterGuess = () => {
	const guess = get(guessedCountry),
		clue = get(pickedClue),
		guessList = [...get(guessCounts)],
		solutionList = [...get(solutions)];

	if (solutionList[clue]) return;

	if (guess) {
		guessList[clue] += 1;
		guessCounts.set(guessList);
	}

	if (guess && guess.id === get(pickedCountry)) {
		solutionList[clue] = true;
		solutions.set(solutionList);
		hoveredClue.set(null);
		getNextClue();
		submittedOnce.set(false);
	} else {
		submittedOnce.set(true);
	}

	currentGuess.set('');
};

export const focusSearch = () => {
	const el = get(input);
	if (!el || get(modalVisible)) return;
	el.focus();
};

clueList.subscribe(($clueList) => {
	solutions.set(filledArray($clueList.length, false));
	guessCounts.set(filledArray($clueList.length, 0));
	pickedClue.set(0);
	hoveredClue.set(null);
	currentGuess.set('');
	previousGuess.set();
	startTime.set(new Date().toISOString());
});

pickedClue.subscribe(() => {
	currentGuess.set('');
	submittedOnce.set(false);
});

win.subscribe(async ($win) => {
	if (!get(alreadyCompleted) && $win) {
		winVisible.set(true);

		const game = {
			puzzle: get(currentPuzzleDate),
			guessesPerClue: get(guessesPerClue),
			startTime: get(startTime),
			endTime: new Date().toISOString(),
		};

		setTimeout(() => completedGames.update((games) => [game, ...games]), 750);
	}
});

if (dev) {
	clueList.subscribe((value) => console.log('clueList\n', value));

	shareMessage.subscribe((value) => {
		console.log('share message\n', value);
	});
}

if (browser) {
	document.addEventListener('keydown', (e) => {
		switch (e.key) {
			case 'ArrowRight':
				getNextClue();
				break;

			case 'ArrowLeft':
				getNextClue(true);
				break;

			case 'Enter':
				enterGuess();
				break;
		}
	});
}
