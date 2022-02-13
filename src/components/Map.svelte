<script>
	import { geoTransverseMercator, geoNaturalEarth1, geoPath } from 'd3-geo';
	import Country from './Country.svelte';
	import Win from './Win.svelte';
	import { clues, rotation, projection } from '../puzzle';
	import { win, showNorth } from '../store';

	const projections = {
		geoTransverseMercator,
		geoNaturalEarth1
	};

	const pad = 20;

	let _width = 640;
	$: width = Math.min(_width, 640);

	const geography = {
		type: 'FeatureCollection',
		features: clues.map(({ feature }) => feature)
	};

	$: proj = projections[projection]()
		.angle($showNorth ? 0 : rotation)
		.fitExtent(
			[
				[pad, pad],
				[width - pad, width - pad]
			],
			geography
		);

	$: path = geoPath(proj);
</script>

<div bind:clientWidth={_width}>
	<svg {width} height={width}>
		{#each clues as { feature, id, name, number }}
			{@const [x, y] = path.centroid(feature)}
			<Country {id} {name} {number} d={path(feature)} {x} {y} />
		{/each}
	</svg>

	{#if $win}
		<Win />
	{/if}
</div>

<style>
	svg {
		border: 4px solid #ccc;
	}
</style>
