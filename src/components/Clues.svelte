<script>
	import { clues } from '../store';
	import Clue from './Clue.svelte';
</script>

<ol>
	{#each $clues as { countryID, number, clue }}
		<Clue {countryID} {number} {clue} />
	{/each}
</ol>

<style type="text/scss">
	ol {
		flex: 0 0 300px;
		padding: 0;
		margin: 0;
	}
</style>
