<script>
	import Country from './Country.svelte';
	import Label from './Label.svelte';
	import { clues, mapSize } from '../store';
</script>

<div bind:clientWidth={$mapSize}>
	<svg>
		{#each $clues as { countryID, name, number, d, centroid: [x, y] }}
			<Country id={countryID} {name} {number} {d} {x} {y} />
		{/each}
		{#each $clues as { name, countryID, centroid: [x, y] }}
			<Label {name} id={countryID} {x} {y} />
		{/each}
	</svg>
</div>

<style type="text/scss">
	div {
		width: 100%;

		@media (max-width: 767px) {
			margin-bottom: 0.5em;
		}
	}

	svg {
		border: 1px solid rgba(white, 0.22);
		background: #222;
		width: 100%;
		aspect-ratio: 1;
	}
</style>
