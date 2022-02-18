import { readdir } from 'fs/promises';

export const get = async () => {
	const files = await readdir('./src/puzzles');
	const body = files.map((file) => file.split('.')[0]).sort((a, b) => (a < b ? 1 : b < a ? -1 : 0));

	return { body };
};
