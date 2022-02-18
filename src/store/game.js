import { geoPath } from 'd3-geo';
import { writable, derived, get } from 'svelte/store';
import { countries, countryList, projections } from '../geo';
import { mapSize, pickedClue, currentGuess } from './state';
import { hardMode, currentPuzzle } from './settings';
import { smartquotes, filledArray } from '../utils';
import { puzzles, puzzleList } from '../puzzles';

const currentPuzzleDate = derived(currentPuzzle, ($currentPuzzle) => puzzleList[$currentPuzzle]);

const rotation = derived([hardMode, currentPuzzle], ([$hardMode]) =>
	$hardMode ? 30 + Math.random() * 300 : 0
);

const clueList = derived(currentPuzzle, ($currentPuzzle) => puzzles[$currentPuzzle].clues);

const projection = derived(currentPuzzle, ($currentPuzzle) => puzzles[$currentPuzzle].projection);

const clues = derived(
	[clueList, projection, mapSize, rotation],
	([$clueList, $projection, $mapSize, $rotation]) => {
		const features = $clueList.map(({ id }) => countries.get(id));

		const pad = $mapSize * 0.025;

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
			let mainPath, restPath;

			if (feature.geometry.type === 'MultiPolygon') {
				const [firstSegment, ...rest] = feature.geometry.coordinates;
				mainPath = path({ type: 'Polygon', coordinates: firstSegment });
				restPath = path({ type: 'MultiPolygon', coordinates: rest });
			} else {
				mainPath = path(feature);
			}

			return {
				number,
				countryID: id,
				clue: smartquotes(clue),
				name: feature.properties.name,
				mainPath,
				restPath,
				centroid: path.centroid(feature)
			};
		});
	}
);

const solutions = writable(filledArray(get(clues).length, false));

const guessCounts = writable(filledArray(get(clues).length, 0));

const pickedCountry = derived(
	[clues, pickedClue],
	([$clues, $pickedClue]) => $clues.find((clue) => clue.number === $pickedClue).countryID
);

const win = derived(
	[solutions, clues],
	([$solutions, $clues]) => $solutions.filter(Boolean).length === $clues.length
);

const shareMessage = derived(
	[clues, currentPuzzleDate, guessCounts],
	([$clues, $currentPuzzleDate, $guessCounts]) => {
		const gridSize = 7;

		const numbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		const allCoords = [
			...$clues.map((clue) => clue.centroid[0]),
			...$clues.map((clue) => clue.centroid[1])
		];
		const min = Math.min(...allCoords);
		const max = Math.max(...allCoords);

		const positions = $clues.map((clue, number) => ({
			number,
			coords: clue.centroid.map((coord) => Math.round(((coord - min) / max) * gridSize))
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

		return `Crossworld – ${$currentPuzzleDate}\n\n${grid}\nhttps://crossworld.world`;
	}
);

const previousGuess = writable();

const guessedCountry = derived(currentGuess, ($currentGuess) => {
	const cleanGuess = $currentGuess && $currentGuess.toLowerCase().replace(/[^a-z ]/g, '');
	if (!cleanGuess) return null;

	const match = [...countryList]
		.sort(() => 0.5 - Math.random())
		.find(({ name }) => name.toLowerCase().includes(cleanGuess));

	if (match) {
		previousGuess.set(match);
		return match;
	} else {
		return get(previousGuess);
	}
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

const sortedClues = derived([clues, solutions], ([$clues, $solutions]) =>
	[...$clues].sort((a, b) => $solutions[b.number] - $solutions[a.number])
);

export {
	clueList,
	clues,
	previousGuess,
	guessedCountry,
	pickedCountry,
	formattedGuess,
	solutions,
	guessCounts,
	win,
	shareMessage,
	ready,
	currentPuzzleDate,
	sortedClues
};
