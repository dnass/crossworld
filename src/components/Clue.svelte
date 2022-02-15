<script>
	import CountrySearch from './CountrySearch.svelte';
	import { hoveredClue, pickedClue, guessed } from '../store';

	export let countryID, number, clue;

	$: picked = $pickedClue === number;
	$: correct = $guessed.includes(countryID);
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
		<p>{@html clue}</p>
		{#if picked && !correct}
			<CountrySearch />
		{/if}
	</div>
</li>

<style type="text/scss">
	div {
		width: 100%;
	}

	li {
		display: flex;
		transition: 0.25s background, 0.25s opacity;
		list-style: none;
		padding: 8px 8px 8px 12px;
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
			background: rgba(var(--color-accent), 0.2);
		}

		&.picked {
			background: rgba(var(--color-accent), 0.7);
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

	@media (max-width: 767px) {
		li {
			background-color: rgb(var(--color-accent), 0.7) !important;
			&:not(.picked) {
				position: absolute;
				left: -9999px;
			}
		}
	}
</style>
