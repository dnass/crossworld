import netlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: netlify(),
		vite: {
			optimizeDeps: {
				include: ['flubber', 'd3-geo', 'd3-time-format']
			},
			ssr: {
				noExternal: ['d3-geo', 'd3-time-format']
			}
		}
	}
};

export default config;
