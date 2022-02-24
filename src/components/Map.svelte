<script>
	import { fade } from 'svelte/transition';
	import Country from './Country.svelte';
	import Label from './Label.svelte';
	import { sortedClues, mapSize, currentPuzzle } from '../store';
</script>

<div bind:clientWidth={$mapSize}>
	<svg height={$mapSize}>
		{#if $mapSize > 0}
			{#key $currentPuzzle}
				<g out:fade={{ duration: 0 }} in:fade={{ duration: 0, delay: 200 }}>
					{#each $sortedClues as { countryID, name, number, mainPath, restPath, centroid: [x, y] } (name)}
						<Country id={countryID} {name} {number} {mainPath} {restPath} {x} {y} />
					{/each}
					{#each $sortedClues as { name, number, centroid: [x, y] } (name)}
						<Label {name} {number} {x} {y} />
					{/each}
				</g>
			{/key}
		{/if}
	</svg>
</div>

<style type="text/scss">
	div {
		width: 100%;
	}

	svg {
		width: 100%;
		background: #222;
	}
</style>
