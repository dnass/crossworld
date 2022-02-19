<script>
	import { fade, slide } from 'svelte/transition';
	import {
		hoveredClue,
		pickedClue,
		guessedCountry,
		formattedGuess,
		solutions,
		win,
		guessCounts,
		alreadyCompleted
	} from '../store';
	import { enterGuess } from '../controller';

	export let number, clue;

	let blink = false;

	$: picked = $pickedClue === number;
	$: correct = $solutions[number] || $alreadyCompleted;
	$: guessCount = $guessCounts[number];
	$: if (guessCount > 0 && picked && !correct) {
		blink = true;
		setTimeout(() => (blink = false), 400);
	}
</script>

<li
	on:mouseover={() => ($hoveredClue = number)}
	on:focus={() => ($hoveredClue = number)}
	on:mouseout={() => ($hoveredClue = null)}
	on:blur={() => ($hoveredClue = null)}
	on:click={picked ? enterGuess : () => ($pickedClue = number)}
	class:correct
	class:hovered={$hoveredClue === number}
	class:picked
	class:blink
>
	<div class="slide-container">
		<p>{@html clue}</p>
		{#if picked && !correct}
			{#if $formattedGuess}
				<div class="guess-container">
					<div class="slide-container">
						{#key $guessedCountry.name}
							<div transition:slide={{ duration: 100 }}>
								<p class="guess">
									<span>{@html $formattedGuess}</span>
								</p>
							</div>
						{/key}
					</div>
					<button transition:fade={{ duration: 100 }} on:click|stopPropagation={enterGuess}>
						<img alt="" src="/arrow_circle_right_black_24dp.svg" />
					</button>
				</div>
			{:else if !$win}
				<p class="note" transition:slide|local={{ duration: 100 }}>
					{#if guessCount > 0}
						Try again...
					{:else}
						Start typing a guess...
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

	.guess-container {
		display: flex;
		flex-direction: row;
	}

	.slide-container {
		display: flex;
		flex-direction: column;
	}

	button {
		appearance: none;
		background: transparent;
		border: none;
		cursor: pointer;
		opacity: 0.8;
		line-height: 0;
		transition: 0.1s opacity;

		&:hover {
			opacity: 0.6;
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
		padding: 4px 8px 4px 12px;
		gap: 4px;
		cursor: pointer;

		@media (min-width: 768px) {
			padding: 8px 8px 8px 12px;
		}

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

		&.blink {
			animation: blink 0.4s ease-in-out;
		}
	}

	p {
		margin: 0;
		font-size: 0.9em;

		&.guess {
			font-size: 1.4em;
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

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
</style>
