<script>
	import { onMount, tick } from 'svelte';
	import { currentGuess, settingsVisible, helpVisible, win, winVisible, width } from '../store';

	let input;

	onMount(async () => {
		if (!input) return;

		const listener = () => {
			if ($settingsVisible || $helpVisible || ($win && $winVisible)) return;
			if (input) input.focus();
		};

		document.addEventListener('click', listener);

		while (!input) await tick();
		input.focus();

		return () => document.removeEventListener('click', listener);
	});
</script>

{#if $width >= 768}
	<input bind:this={input} bind:value={$currentGuess} />
{/if}

<style type="text/scss">
	input {
		position: absolute;
		left: -9999px;
		font-size: 16px;
	}
</style>
