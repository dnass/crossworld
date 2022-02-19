<script>
	import Keyboard from 'svelte-keyboard';
	import { width, currentGuess } from '../store';
	import { enterGuess } from '../controller';

	const onKeydown = ({ detail }) => {
		if (detail === 'Enter') {
			enterGuess();
		} else if (detail === 'Backspace') {
			$currentGuess = $currentGuess.slice(0, -1);
		} else if ($currentGuess) {
			$currentGuess = `${$currentGuess}${detail}`;
		} else {
			$currentGuess = detail;
		}
	};
</script>

{#if $width < 768}
	<div>
		<Keyboard
			on:keydown={onKeydown}
			layout="wordle"
			--background="rgba(var(--color-accent), 0.2)"
			--active-background="rgba(var(--color-accent), 0.5)"
			--color="currentColor"
			--font-family="'Montserrat', sans-serif'"
			--font-size="1em"
			--height="2.5em"
			--min-width="1.5em"
			--border-radius="0"
		/>
	</div>
{/if}

<style type="text/scss">
	div {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: flex-end;
		margin: 0.5em 0 0.25em;
		width: 100%;

		:global(button) {
			padding: 0;
		}
	}
</style>
