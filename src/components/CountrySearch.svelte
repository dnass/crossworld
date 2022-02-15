<script>
	import { onMount, tick } from 'svelte';
	import { currentGuess, settingsVisible, helpVisible, win, winVisible } from '../store';

	let input;

	onMount(async () => {
		document.addEventListener('click', () => {
			if ($settingsVisible || $helpVisible || ($win && $winVisible)) return;
			input.focus();
		});

		await tick();
		input.focus();
	});
</script>

<input bind:this={input} bind:value={$currentGuess} />

<style type="text/scss">
	input {
		position: absolute;
		left: -9999px;
	}
</style>
