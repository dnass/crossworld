<script>
	import { fade } from 'svelte/transition';
	import Country from './Country.svelte';
	import Label from './Label.svelte';
	import { sortedClues, mapSize, showMap, currentPuzzle } from '../store';
</script>

<div bind:clientWidth={$mapSize}>
	{#key $currentPuzzle}
		<!-- <svg out:fade={{ duration: 200 }} in:fade={{ duration: 200, delay: 200 }}> -->
		<svg>
			{#if $mapSize > 0}
				<g>
					{#each $sortedClues as { countryID, name, number, mainPath, restPath, centroid: [x, y] } (name)}
						<Country id={countryID} {name} {number} {mainPath} {restPath} {x} {y} />
					{/each}
					{#each $sortedClues as { name, number, centroid: [x, y] } (name)}
						<Label {name} {number} {x} {y} />
					{/each}
				</g>
			{/if}
		</svg>
	{/key}
</div>

<style type="text/scss">
	div {
		width: 100%;
	}

	svg {
		width: 100%;
		background: #222;
		aspect-ratio: 1;
	}
</style>
