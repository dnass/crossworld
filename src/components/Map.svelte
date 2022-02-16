<script>
	import { fade } from 'svelte/transition';
	import Country from './Country.svelte';
	import Label from './Label.svelte';
	import { currentPuzzle, clues, mapSize, solutions } from '../store';
</script>

<div bind:clientWidth={$mapSize}>
	<svg>
		{#key $currentPuzzle}
			{#if $mapSize > 0}
				<g out:fade={{ duration: 200 }} in:fade={{ duration: 200, delay: 200 }}>
					{#each $clues as { countryID, name, number, d, centroid: [x, y] } (name)}
						<Country id={countryID} {name} {number} {d} {x} {y} />
					{/each}
					{#each $clues as { name, number, centroid: [x, y] }}
						{#if $solutions[number]}
							<Label {name} {number} {x} {y} />
						{/if}
					{/each}
				</g>
			{/if}
		{/key}
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
		width: 100%;
		background: #222;
		aspect-ratio: 1;
	}
</style>
