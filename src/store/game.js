import { geoPath } from 'd3-geo';
import { writable, derived, get } from 'svelte/store';
import { countries, countryList, projections } from '../geo';
import { mapSize, pickedClue, currentGuess } from './state';
import { hardMode, currentPuzzle } from './settings';
import { smartquotes, filledArray } from '../utils';
import { puzzles, puzzleList } from '../puzzles';

const rotation = derived([hardMode, currentPuzzle], ([$hardMode]) =>
	$hardMode ? 30 + Math.random() * 300 : 0
);

const clueList = derived(currentPuzzle, ($currentPuzzle) => puzzles[$currentPuzzle].clues);

const projection = derived(currentPuzzle, ($currentPuzzle) => puzzles[$currentPuzzle].projection);

const clues = derived(
	[clueList, projection, mapSize, rotation],
	([$clueList, $projection, $mapSize, $rotation]) => {
		const features = $clueList.map(({ id }) => countries.get(id));

		const pad = 20;

		const projection = projections[$projection]()
			.angle($rotation)
			.fitExtent(
				[
					[pad, pad],
					[$mapSize - pad, $mapSize - pad]
				],
				{
					type: 'FeatureCollection',
					features
				}
			);

		const path = geoPath(projection);

		return $clueList.map(({ id, clue }, number) => {
			const feature = features[number];

			return {
				number,
				countryID: id,
				clue: smartquotes(clue),
				name: feature.properties.name,
				d: path(feature),
				centroid: path.centroid(feature)
			};
		});
	}
);

const solutions = writable(filledArray(get(clues).length, false));
// solutions.subscribe(console.log);

const guessCounts = writable(filledArray(get(clues).length, 0));
// guessCounts.subscribe(console.log);

const pickedCountry = derived(
	[clues, pickedClue],
	([$clues, $pickedClue]) => $clues.find((clue) => clue.number === $pickedClue).countryID
);

const win = derived(
	[solutions, clues],
	([$solutions, $clues]) => $solutions.filter(Boolean).length === $clues.length
);

const shareMessage = derived(
	[mapSize, clues, currentPuzzle, guessCounts],
	([$mapSize, $clues, $currentPuzzle, $guessCounts]) => {
		const gridSize = 7;

		const numbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		const positions = $clues.map((clue, number) => ({
			number,
			coords: clue.centroid.map((coord) => Math.round((coord / $mapSize) * gridSize))
		}));

		let grid = '';

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const position = positions.find(({ coords: [px, py] }) => px === x && py === y);
				if (position) grid += numbers[Math.min($guessCounts[position.number], 10)];
				else grid += '⬛️';
			}
			grid += '\n';
		}

		return `Crossworld – ${puzzleList[$currentPuzzle]}\n\n${grid}\nhttps://crossworld.world`;
	}
);

const guessedCountry = derived(currentGuess, ($currentGuess) => {
	const cleanGuess = $currentGuess && $currentGuess.toLowerCase().replace(/[^a-z ]/g, '');
	if (!cleanGuess) return null;

	const match = [...countryList]
		.sort(() => 0.5 - Math.random())
		.find(({ name }) => name.toLowerCase().includes(cleanGuess));

	if (!match) currentGuess.set('');

	return match;
});

const formattedGuess = derived([currentGuess, guessedCountry], ([$currentGuess, $guessedCountry]) =>
	$guessedCountry
		? $guessedCountry.name.replace(
				new RegExp($currentGuess, 'gi'),
				(match) => `<strong>${match}</strong>`
		  )
		: null
);

const ready = derived(
	[clues, solutions],
	([$clues, $solutions]) => $clues.length === $solutions.length
);

export {
	clueList,
	clues,
	guessedCountry,
	pickedCountry,
	formattedGuess,
	solutions,
	guessCounts,
	win,
	shareMessage,
	ready
};
