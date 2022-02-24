<script>
	import { tweened } from 'svelte/motion';
	import { quadOut as easing } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as flubber from 'flubber';
	import { hoveredClue, pickedClue, solutions, alreadyCompleted } from '../store';
	import { squarePath } from '../utils';

	export let number, mainPath, restPath, x, y;

	const size = 25;

	const path = tweened(null, {
		easing,
		duration: 0,
		interpolate: (a, b) => flubber.interpolate(a, b, { maxSegmentLength: 100 }),
	});

	$: picked = number === $pickedClue;
	$: hovered = number === $hoveredClue;
	$: show = $solutions[number] || $alreadyCompleted;

	$: !show && path.set(squarePath(x, y, size));
	$: show && path.set(mainPath, { duration: !$alreadyCompleted ? 750 : 0 });
</script>

<g
	class:picked
	class:hovered
	class:correct={show}
	on:mouseover={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:focus={() => ($hoveredClue = number)}
	on:blur={() => ($hoveredClue = null)}
	on:click={() => ($pickedClue = number)}
>
	<path d={$path} />
	{#if show}
		<path transition:fade|local={{ duration: 750, delay: 400, easing }} d={restPath} />
	{/if}
	{#if !show}
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
		stroke: rgba(var(--color-accent), 0.9);
		fill: rgb(var(--color-accent));
		fill-opacity: 0.1;
		stroke-width: 2;
		stroke-linecap: square;
		transition: fill-opacity 0.25s;

		.hovered & {
			fill-opacity: 0.4;
		}

		.correct & {
			fill-opacity: 0.5;
		}

		.hovered.correct & {
			fill-opacity: 0.6;
		}

		.picked & {
			fill-opacity: 0.7;
		}
	}
</style>
