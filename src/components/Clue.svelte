<script>
	import { fade } from 'svelte/transition';
	import {
		hoveredClue,
		pickedClue,
		guessedCountry,
		currentGuess,
		guessed,
		win,
		tryAgain,
		enterGuess
	} from '../store';

	export let countryID, number, clue;

	$: picked = $pickedClue === number;
	$: correct = $guessed.includes(countryID);
	$: displayName = $guessedCountry
		? $guessedCountry.name.replace(
				new RegExp($currentGuess, 'gi'),
				(match) => `<strong>${match}</strong>`
		  )
		: null;
</script>

<li
	on:mouseover={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:click={picked ? enterGuess : () => ($pickedClue = number)}
	class:correct
	class:hovered={$hoveredClue === number}
	class:picked
>
	<div>
		<p>{@html clue}</p>
		{#if picked && !correct}
			{#if displayName}
				{#key $guessedCountry}
					<p class="guess">
						<span>{@html displayName}</span>
						<button on:click={enterGuess}>
							<img alt="" src="/arrow_circle_right_black_24dp.svg" />
						</button>
					</p>
				{/key}
			{:else if !$win}
				<p class="note">
					{#if $tryAgain}
						Try again...
					{:else}
						Start typing a country...
					{/if}
				</p>
			{/if}
		{/if}
	</div>
</li>

<style type="text/scss">
	div {
		width: 100%;
	}

	button {
		appearance: none;
		background: transparent;
		border: none;
		cursor: pointer;
		opacity: 0.9;
		line-height: 0;

		&:hover {
			opacity: 0.7;
		}

		img {
			width: 2em;
		}
	}

	li {
		display: flex;
		align-items: center;
		transition: 0.25s background, 0.25s opacity;
		list-style: none;
		padding: 8px 8px 8px 12px;
		gap: 4px;
		cursor: pointer;

		&:before {
			content: counter(index, decimal);
			counter-increment: index;
			flex: 0 0 1em;
			font-weight: 700;
			font-size: 1.25em;
		}

		&:first-child {
			counter-reset: index;
		}

		&.hovered {
			background: rgba(var(--color-accent), 0.2);
		}

		&.picked {
			background: rgba(var(--color-accent), 0.7);
		}

		&.correct {
			opacity: 0.5;
		}
	}

	p {
		margin: 0;

		&.guess {
			font-size: 1.5em;
			display: flex;
			line-height: 1;
			align-items: center;
			min-height: 30px;

			span {
				flex-grow: 1;
			}
		}

		&.note,
		&.guess {
			font-weight: 300;
			opacity: 0.7;
		}

		&.note {
			font-size: 0.8em;
		}

		&:not(:last-child) {
			margin-bottom: 0.25em;
		}
	}

	@media (max-width: 767px) {
		li {
			background-color: rgb(var(--color-accent), 0.7) !important;
			&:not(.picked) {
				position: absolute;
				left: -9999px;
			}
		}
	}
</style>
