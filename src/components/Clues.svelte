<script>
	import { fade } from 'svelte/transition';
	import { clues, pickedClue, mobile, currentPuzzle } from '../store';
	import { getNextClue } from '../controller';
	import Clue from './Clue.svelte';
</script>

{#key $currentPuzzle}
	<div out:fade={{ duration: 200 }} in:fade={{ duration: 200, delay: 200 }}>
		<button aria-label="Previous clue" on:click={() => getNextClue(true)}>
			<img src="/arrow_left_black_24dp.svg" alt="" />
		</button>
		<div class="clues">
			<ol style:transform={$mobile ? `translateX(-${$pickedClue * 100}%)` : null}>
				{#each $clues as { number, clue } (clue)}
					<Clue {number} {clue} />
				{/each}
			</ol>
		</div>
		<button aria-label="Next clue" on:click={() => getNextClue()}>
			<img src="/arrow_right_black_24dp.svg" alt="" />
		</button>
	</div>
{/key}

<style type="text/scss">
	div {
		display: flex;
		width: 100%;
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

	@media (max-width: 767px) {
		.clues {
			flex: 1 1 100%;
			overflow: hidden;
		}
	}
	ol {
		padding: 0;
		margin: 0;
		width: 100%;

		@media (max-width: 767px) {
			display: flex;
			flex-direction: row;
			transition: 0.5s transform;
		}
	}
</style>
