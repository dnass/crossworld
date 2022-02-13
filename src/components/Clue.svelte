<script>
	import Picker from './Picker.svelte';
	import { smartquotes } from '../utils';
	import { hoveredClue, pickedClue, guessed } from '../store';

	export let id, number, clue;

	$: picked = $pickedClue === number;
	$: correct = $guessed.includes(id);
</script>

<li
	on:mouseover={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:click={() => ($pickedClue = number)}
	class:correct
	class:hovered={$hoveredClue === number}
	class:picked
>
	<div>
		<p>{@html smartquotes(clue)}</p>
		{#if picked && !correct}
			<Picker />
		{/if}
	</div>
</li>

<style type="text/scss">
	div {
		width: 100%;
	}

	li {
		transition: 0.25s background, 0.25s opacity;
		list-style: none;
		padding: 6px 8px;
		display: flex;
		gap: 4px;
		cursor: pointer;

		&:before {
			content: counter(index, decimal);
			counter-increment: index;
			flex: 0 0 1em;
			font-weight: 700;
		}

		&:first-child {
			counter-reset: index;
		}

		&.hovered {
			background: rgba(tomato, 0.2);
		}

		&.picked {
			background: rgba(tomato, 0.7);
		}

		&.correct {
			opacity: 0.5;
		}
	}

	p {
		margin: 0;

		&:not(:last-child) {
			margin-bottom: 0.5em;
		}
	}
</style>
