<script>
	import { settingsVisible, helpVisible } from '../store';
	import { currentPuzzle } from '../store';
	import { puzzleList } from '../puzzles';
	import { focusSearch } from '../controller';
</script>

<div>
	<select
		aria-label="Pick a puzzle"
		bind:value={$currentPuzzle}
		on:click|stopPropagation
		on:change={focusSearch}
	>
		{#each puzzleList as date, i}
			<option value={i}>{date}</option>
		{/each}
	</select>
	<button aria-label="Settings" on:click={() => ($settingsVisible = true)}>
		<img alt="" src="/settings_black_24dp.svg" />
	</button>
	<button aria-label="How to play" on:click={() => ($helpVisible = true)}>
		<img alt="" src="/help_black_24dp.svg" />
	</button>
</div>

<style type="text/scss">
	div {
		display: flex;
		align-items: center;
		gap: 0.75em;
	}

	select {
		width: 2em;
		appearance: none;
		-webkit-appearance: none;
		color: transparent;
		border: transparent;
		background-color: transparent;
		background-image: url(/menu_book_black_24dp.svg);
		background-repeat: no-repeat;
		background-size: 2em;
		background-position: 100% 80%;
		padding: 0.25em 0;
	}

	button {
		padding: 0;
		margin: 0;
		background-color: transparent;
		border: transparent;
		line-height: 0;
	}

	select,
	button {
		cursor: pointer;
		opacity: 0.9;

		&:hover {
			opacity: 0.7;
		}
	}
</style>
