<script>
	import { fade } from 'svelte/transition';
	import { hoveredClue, pickedClue, solutions, alreadyCompleted } from '../store';

	export let name, number, x, y;

	const size = 25;
	$: show = $solutions[number] || $alreadyCompleted;
</script>

{#if show}
	<text
		on:mouseover={() => ($hoveredClue = number)}
		on:mouseout={() => ($hoveredClue = null)}
		on:focus={() => ($hoveredClue = number)}
		on:blur={() => ($hoveredClue = null)}
		on:click={() => ($pickedClue = number)}
		transition:fade|local={{ duration: 100 }}
		transform="translate({x}, {y})"
		style:font-size="{size * 0.6}px"
		x={size / 4}
		y={size * 0.3}
	>
		{name}
	</text>
{/if}

<style type="text/scss">
	text {
		text-anchor: middle;
		fill: #fefefe;
		font-weight: 700;
		stroke: rgb(var(--color-accent));
		stroke-width: 4;
		paint-order: stroke;
		stroke-linejoin: round;
		stroke-linecap: round;
		cursor: pointer;

		&:focus {
			outline: none;
		}
	}
</style>
