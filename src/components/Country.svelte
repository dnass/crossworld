<script>
	import { browser } from '$app/env';
	import { tweened } from 'svelte/motion';
	import { quadOut as easing } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { hoveredClue, pickedClue, solutions } from '../store';

	export let number, mainPath, restPath, x, y;

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

	let interpolate;

	if (browser) {
		import('flubber').then(({ interpolate: i }) => (interpolate = i));
	}

	const path = tweened(initialPath, {
		easing,
		duration: 0
	});

	$: !correct && path.set(initialPath);

	$: picked = number === $pickedClue;
	$: hovered = number === $hoveredClue;
	$: correct = $solutions[number];
	$: correct && path.set(mainPath, { duration: interpolate ? 750 : 0, interpolate });
</script>

<g
	class:picked
	class:hovered
	class:correct
	on:mouseover={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:focus={() => ($hoveredClue = number)}
	on:blur={() => ($hoveredClue = null)}
	on:click={() => ($pickedClue = number)}
>
	<path d={$path} />
	{#if correct}
		<path transition:fade={{ duration: 750, delay: 400, easing }} d={restPath} />
	{/if}
	{#if !correct}
		<text
			transform="translate({x}, {y})"
			style:font-size="{size * 0.8}px"
			x={size / 2}
			y={size * 0.8}
		>
			{number + 1}
		</text>
	{/if}
</g>

<style type="text/scss">
	g {
		cursor: pointer;

		&:focus {
			outline: none;
		}
	}

	text {
		text-anchor: middle;
		fill: #fefefe;
		font-weight: 700;
	}

	path {
		fill: transparent;
		stroke: rgba(var(--color-accent), 0.9);
		fill: rgb(var(--color-accent));
		fill-opacity: 0.1;
		stroke-width: 2;
		stroke-linecap: square;
		transition: fill 0.25s;

		.hovered & {
			fill-opacity: 0.4;
		}

		.correct & {
			fill-opacity: 0.6;
		}

		.picked &,
		.correct & {
			fill-opacity: 0.7;
		}

		.correct.hovered & {
			fill-opacity: 0.8;
		}

		.picked.correct & {
			fill-opacity: 0.9;
		}
	}
</style>
