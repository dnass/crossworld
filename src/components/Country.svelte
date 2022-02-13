<script>
	import { tweened } from 'svelte/motion';
	import { quadOut as easing } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	// import { interpolate } from 'flubber';
	import { hoveredClue, pickedClue, guessed } from '../store';

	export let id, number, d, x, y;

	const size = 25;

	$: initialPath = `M${[
		[x, y],
		[x + size, y],
		[x + size, y + size],
		[x, y + size],
		[x, y]
	]
		.map((coords) => coords.join(','))
		.join(' ')}`;

	const path = tweened(initialPath, {
		easing,
		duration: 0
	});

	$: path.set(initialPath);

	$: picked = number === $pickedClue;
	$: hovered = number === $hoveredClue;
	$: correct = $guessed.includes(id);
	$: correct && path.set(d);
</script>

<g
	class:picked
	class:hovered
	class:correct
	on:mouseover={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:click={() => ($pickedClue = number)}
>
	<path d={$path} />
	{#if !correct}
		<text
			transition:fade
			transform="translate({x}, {y})"
			style:font-size="{size * 0.8}px"
			x={size / 2}
			y={size * 0.8}>{number + 1}</text
		>
	{/if}
</g>

<style type="text/scss">
	g {
		cursor: pointer;
	}

	text {
		text-anchor: middle;
	}

	path {
		fill: transparent;
		stroke: tomato;
		stroke-width: 2;
		stroke-linecap: square;
		transition: fill 0.25s;

		.hovered & {
			fill: rgba(tomato, 0.2);
		}

		.picked &,
		.correct & {
			fill: rgba(tomato, 0.7);
		}

		.picked.correct & {
			fill: rgba(tomato, 0.9);
		}
	}
</style>
