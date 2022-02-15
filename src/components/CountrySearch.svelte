<script>
	import { onMount } from 'svelte';
	import AutoComplete from 'simple-svelte-autocomplete';
	import { countryList } from '../geo';
	import { pickedClue, pickedCountry, guessed } from '../store';

	let guessedCountry = null,
		guessedOnce = false,
		blink = false;

	$: if (guessedCountry) {
		if (guessedCountry.id === $pickedCountry) {
			const newGuesses = [...$guessed];
			newGuesses[$pickedClue] = guessedCountry.id;
			$guessed = newGuesses;
		}

		guessedOnce = true;
		blink = true;
		guessedCountry = null;

		setTimeout(() => (blink = false), 400);
	}

	onMount(() => {
		const input = document.querySelector('#country-picker');
		input.type = 'search';
		input.focus();
	});
</script>

<div class:blink>
	<AutoComplete
		inputId="country-picker"
		labelFieldName="name"
		valueFieldName="number"
		placeholder={guessedOnce ? 'Nope, guess again...' : 'Guess a country...'}
		hideArrow
		noResultsText=""
		maxItemsToShowInList={5}
		searchFunction={() => countryList}
		bind:selectedItem={guessedCountry}
	/>
</div>

<style type="text/scss">
	:global(.autocomplete) {
		font-size: 0.8em;
	}

	:global(.autocomplete-list-item) {
		color: rgb(var(--color-foreground)) !important;
	}

	:global(.autocomplete-list-item b) {
		font-weight: normal;
	}

	:global(.autocomplete-list-item.selected) {
		background-color: rgba(var(--color-accent), 0.5) !important;
	}

	:global(.autocomplete-list) {
		background: rgb(var(--color-background)) !important;
		padding: 0 !important;
	}

	:global(.autocomplete-list-item-no-results) {
		display: none;
	}

	:global(.autocomplete-input) {
		border: 1px solid transparent;
		background-color: rgba(white, 0.5);

		&:focus {
			outline: none;
			border: 1px solid rgba(white, 0.75);
		}

		&::placeholder {
			color: rgb(var(--background-color));
			opacity: 0.75;
		}
	}

	.blink {
		animation: blink 0.4s ease-in-out;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
		100% {
			opacity: 1;
		}
	}
</style>
