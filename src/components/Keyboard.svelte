<script>
	import Keyboard from 'svelte-keyboard';
	import { mobile, currentGuess } from '../store';
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

{#if $mobile}
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
			--margin="0.125em"
		/>
	</div>
{/if}

<style type="text/scss">
	div {
		margin: 0.25em -0.125em 0;

		:global(button) {
			padding: 0;
		}
	}
</style>
