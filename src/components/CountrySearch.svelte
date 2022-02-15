<script>
	import { onMount, tick } from 'svelte';
	import { currentGuess, settingsVisible, helpVisible, win, winVisible } from '../store';

	let input;

	onMount(async () => {
		if (!input) return;

		const listener = () => {
			if ($settingsVisible || $helpVisible || ($win && $winVisible)) return;
			if (input) input.focus();
		};

		document.addEventListener('click', listener);

		await tick();
		input.focus();

		return () => document.removeEventListener('click', listener);
	});
</script>

<input bind:this={input} bind:value={$currentGuess} />

<style type="text/scss">
	input {
		position: absolute;
		left: -9999px;
	}
</style>
