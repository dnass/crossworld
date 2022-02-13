<script>
	import { clues } from '../store';
	import Clue from './Clue.svelte';
</script>

<ol>
	{#each $clues as clue}
		<Clue {...clue} />
	{/each}
</ol>

<style type="text/scss">
	ol {
		flex: 0 0 300px;
		padding: 0;
		margin: 0;
	}
</style>
