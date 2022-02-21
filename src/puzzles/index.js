import { timeFormat } from 'd3-time-format';
import puzzle20220213 from './2022-02-13.json';
import puzzle20220215 from './2022-02-15.json';
import puzzle20220219 from './2022-02-19.json';
import puzzle20220221 from './2022-02-21.json';

const format = timeFormat('%b %d, %Y');

export const puzzles = [
	puzzle20220221,
	puzzle20220219,
	puzzle20220215,
	puzzle20220213,
	//
];

export const puzzleList = puzzles.map(({ date }) => format(new Date(`${date}T00:00:00`)));
