<script>
	import { timeFormat } from 'd3-time-format';
	import { currentPuzzle } from '../store';
	import puzzles from '../puzzles';

	const format = timeFormat('%b %d, %Y');
</script>

<div>
	<label for="puzzle-picker">Pick a puzzle</label>
	<select id="puzzle-picker" bind:value={$currentPuzzle}>
		{#each puzzles as puzzle, i}
			<option value={i}>{format(new Date(`${puzzle.date}T00:00:00`))}</option>
		{/each}
	</select>
</div>

<style>
	label {
		font-size: 0.8em;
		opacity: 0.5;
	}
</style>
