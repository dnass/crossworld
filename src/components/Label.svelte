<script>
	import { fade } from 'svelte/transition';
	export let name, x, y;

	const size = 25;
</script>

<text
	transition:fade={{ duration: 100 }}
	transform="translate({x}, {y})"
	style:font-size="{size * 0.6}px"
	x={size / 4}
	y={size * 0.3}
>
	{name}
</text>

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
		pointer-events: none;
	}
</style>
