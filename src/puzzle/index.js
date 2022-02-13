import puzzles from './puzzles';
import { countries } from '../data';

const gameData = puzzles[0];

export const gameCountries = gameData.clues.map(({ country }) => country);

export const clues = gameData.clues.map((clue, number) => {
	const feature = countries.find(({ id }) => id === clue.id);

	if (feature.geometry.type === 'MultiPolygon') {
		feature.geometry.coordinates.sort(([a], [b]) => b.length - a.length);
	}

	return { number, ...clue, name: feature.properties.name, feature };
});

export const rotation = gameData.rotation;

export const projection = gameData.projection;
