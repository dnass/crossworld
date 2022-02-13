<script>
	import { clues } from '../puzzle';
	import Clue from './Clue.svelte';
</script>

<ol>
	{#each clues as clue}
		<Clue {...clue} />
	{/each}
</ol>

<style type="text/scss">
	ol {
		width: 300px;
		padding: 0;
		margin: 0;
	}
</style>
