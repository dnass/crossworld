import { geoPath } from 'd3-geo';
import { tick } from 'svelte';
import { writable, derived, get } from 'svelte/store';
import { countries, projections } from '../geo';
import { mapSize, pickedClue, currentGuess, tryAgain } from './state';
import { hardMode, currentPuzzle } from './settings';
import { smartquotes } from '../utils';
import { puzzles, puzzleList } from '../puzzles';
import { countryList } from '../geo';

const rotation = derived([hardMode, currentPuzzle], ([$hardMode]) =>
	$hardMode ? 30 + Math.random() * 300 : 0
);

const clues = derived(
	[currentPuzzle, mapSize, rotation],
	([$currentPuzzle, $mapSize, $rotation]) => {
		const { clues, projection } = puzzles[$currentPuzzle];

		const features = clues.map(({ id }) => countries.get(id));

		features.forEach((feature) => {
			if (feature.geometry.type === 'MultiPolygon') {
				feature.geometry.coordinates.sort(([a], [b]) => b.length - a.length);
			}
		});

		const pad = 20;

		const proj = projections[projection]()
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

		const path = geoPath(proj);

		return clues.map(({ id, clue }, number) => {
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

const guessed = writable(new Array(get(clues).length).fill(null));

currentPuzzle.subscribe(async () => {
	await tick();
	guessed.set(new Array(get(clues).length).fill(null));
});

const pickedCountry = derived(
	[clues, pickedClue],
	([$clues, $pickedClue]) => $clues.find((clue) => clue.number === $pickedClue).countryID
);

const win = derived(
	[guessed, clues],
	([$guessed, $clues]) => $guessed.filter(Boolean).length === $clues.length
);

const shareMessage = derived(
	[mapSize, clues, currentPuzzle],
	([$mapSize, $clues, $currentPuzzle]) => {
		const gridSize = 7;

		const positions = $clues.map((clue) =>
			clue.centroid.map((coord) => Math.round((coord / $mapSize) * gridSize))
		);

		let grid = '';

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const position = positions.find(([px, py]) => px === x && py === y);
				if (position) grid += '🟪';
				else grid += '⬛️';
			}
			grid += '\n';
		}

		return `Crossworld – ${puzzleList[$currentPuzzle]}\n\n${grid}\nhttps://crossworld.world`;
	}
);

const guessedCountry = derived(currentGuess, ($currentGuess) => {
	const cleanGuess = $currentGuess && $currentGuess.replace(/[^a-z ]/g, '');
	if (!cleanGuess) return null;

	const match = countryList.find(({ name }) =>
		name.toLowerCase().includes(cleanGuess.toLowerCase())
	);

	if (!match) {
		tryAgain.set(true);
		currentGuess.set('');
		return null;
	}

	return match;
});

export { clues, guessedCountry, pickedCountry, guessed, win, shareMessage };
