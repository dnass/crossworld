<script>
	import Spinner from '../Spinner.svelte';
	import { shareMessage, currentPuzzleDate, completedGames, guessesPerClue } from '../../store';
	import { trackEvent } from '../../utils';

	let copied = false;

	const share = async () => {
		trackEvent('share', $currentPuzzleDate);

		if (typeof navigator.share === 'undefined') {
			navigator.clipboard.writeText($shareMessage);
			copied = true;
		} else {
			await navigator.share({ text: $shareMessage });
		}
	};
</script>

<div class="win">
	<h2><Spinner spin /> You won!</h2>
	<div class="stats">
		<div class="stat">
			<div class="number">{$completedGames.length}</div>
			<div class="label">Current<br />streak</div>
		</div>
		<div class="stat">
			<div class="number">{$guessesPerClue.toFixed(1)}</div>
			<div class="label">Guesses<br />per clue</div>
		</div>
	</div>
	<button on:click={share}>
		{#if copied}
			Copied to clipboard
		{:else}
			<img alt="" src="/share_black_24dp.svg" />
			Share
		{/if}
	</button>
</div>

<style type="text/scss">
	.win {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1.5em;
		height: 100%;
	}

	.stats {
		display: flex;
		gap: 1em;
		margin-bottom: 8px;

		.stat {
			display: flex;
			flex-direction: column;
			text-align: center;

			.number {
				font-size: 2em;
				font-weight: 900;
			}

			.label {
				font-size: 0.7em;
				text-transform: uppercase;
			}
		}
	}

	h2 {
		font-size: 2.5em;
		font-weight: 900;
		color: rgb(var(--color-accent));
		filter: drop-shadow(-4px 4px 0 rgba(var(--color-accent), 0.3));
		margin: 0;
	}

	button {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 0.4em 0.8em;
		font-size: 1.2em;
		background-color: rgb(var(--color-accent));
		color: white;
		border: transparent;
		border-radius: 2px;
		cursor: pointer;

		img {
			filter: invert(1);
			width: 0.9em;
		}

		&:hover {
			background-color: rgba(var(--color-accent), 0.8);
		}
	}
</style>
