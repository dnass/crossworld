<script>
	import { onMount } from 'svelte';
	import { currentGuess, mobile, input } from '../store';
	import { focusSearch } from '../controller';

	onMount(() => {
		focusSearch();
		document.addEventListener('click', focusSearch);
		return () => document.removeEventListener('click', focusSearch);
	});
</script>

{#if !$mobile}
	<input bind:this={$input} bind:value={$currentGuess} />
{/if}

<style type="text/scss">
	input {
		position: absolute;
		left: -9999px;
		font-size: 16px;
	}
</style>
