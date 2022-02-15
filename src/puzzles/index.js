import { timeFormat } from 'd3-time-format';
import puzzle20220213 from './2022-02-13.json';
import puzzle20220214 from './2022-02-14.json';

const format = timeFormat('%b %d, %Y');

export const puzzles = [
	// puzzle20220214,
	puzzle20220213
	//
];

export const puzzleList = puzzles.map(({ date }) => format(new Date(`${date}T00:00:00`)));
