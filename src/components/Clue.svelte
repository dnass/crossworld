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
		alreadyCompleted,
		submittedOnce,
	} from '../store';
	import { enterGuess } from '../controller';

	export let number, clue;

	let shake = false;

	$: picked = $pickedClue === number;
	$: correct = $solutions[number] || $alreadyCompleted;
	$: guessCount = $guessCounts[number];
	$: if (guessCount > 0 && picked && !correct && $submittedOnce) {
		shake = true;
		setTimeout(() => (shake = false), 300);
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
	class:shake
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
			{:else if !$win && picked}
				<p class="note" transition:slide|local={{ duration: 100 }}>
					{#if $submittedOnce}
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
		background-color: transparent;
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
		transition: 0.25s background-color, 0.25s opacity;
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
			background-color: rgba(var(--color-accent), 0.2);
		}

		&.picked {
			background-color: rgba(var(--color-accent), 0.7);
		}

		&.correct {
			opacity: 0.5;
		}

		&.shake {
			animation: shake 0.3s ease-in-out;
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
			border-left: 1px solid rgba(var(--color-foreground), 0);
			animation: 0.75s cursor infinite;
			padding: 1px 0 1px 4px;
		}

		&:not(:last-child) {
			margin-bottom: 0.25em;
		}
	}

	@media (max-width: 767px) {
		li {
			flex: 1 0 100%;
		}
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}

		25% {
			transform: translateX(-10px);
			opacity: 0.5;
		}

		75% {
			transform: translateX(10px);
			opacity: 0.5;
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes cursor {
		0% {
			border-left-color: rgba(var(--color-foreground), 0);
		}

		20% {
			border-left-color: rgba(var(--color-foreground), 0.3);
		}

		50% {
			border-left-color: rgba(var(--color-foreground), 0.3);
		}

		70% {
			border-left-color: rgba(var(--color-foreground), 0);
		}
	}
</style>
