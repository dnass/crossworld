<script>
	import { clues, getNextClue } from '../store';
	import Clue from './Clue.svelte';
</script>

<div>
	<button aria-label="Previous clue" on:click={() => getNextClue(true)}>
		<img src="/arrow_left_black_24dp.svg" alt="" />
	</button>
	<ol>
		{#each $clues as { countryID, number, clue }}
			<Clue {countryID} {number} {clue} />
		{/each}
	</ol>
	<button aria-label="NExt clue" on:click={() => getNextClue()}>
		<img src="/arrow_right_black_24dp.svg" alt="" />
	</button>
</div>

<style type="text/scss">
	div {
		display: flex;
		width: 100%;

		@media (min-width: 768px) {
			flex: 0 0 300px;
		}
	}

	button {
		background-color: rgba(var(--color-accent), 0.2);
		border: none;
		padding: 2px;
		margin: 0;
		cursor: pointer;

		&:hover {
			background-color: rgba(var(--color-accent), 0.5);
		}

		@media (min-width: 768px) {
			display: none;
		}
	}

	ol {
		padding: 0;
		margin: 0;
		flex: 1 1 100%;
	}
</style>
