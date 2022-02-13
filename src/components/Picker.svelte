<script>
	import { onMount } from 'svelte';
	import AutoComplete from 'simple-svelte-autocomplete';
	import { countryList } from '../data';
	import { pickedClue, pickedCountry, guessed } from '../store';

	let guessedCountry = null,
		guessedOnce = false;

	const search = () => {
		return countryList;
	};

	$: if (guessedCountry) {
		if (guessedCountry.id === $pickedCountry) {
			const newGuesses = [...$guessed];
			newGuesses[$pickedClue] = guessedCountry.id;
			$guessed = newGuesses;
		}

		guessedOnce = true;
		guessedCountry = null;
	}

	onMount(() => {
		const input = document.querySelector('#country-picker');
		input.type = 'search';
		input.focus();
	});
</script>

<AutoComplete
	inputId="country-picker"
	labelFieldName="name"
	valueFieldName="number"
	placeholder={guessedOnce ? 'Nope, guess again...' : 'Guess a country...'}
	hideArrow
	noResultsText=""
	maxItemsToShowInList={5}
	searchFunction={search}
	bind:selectedItem={guessedCountry}
/>

<style type="text/scss">
	:global(.autocomplete) {
		font-size: 0.8em;
	}

	:global(.autocomplete-list-item b) {
		font-weight: normal;
	}

	:global(.autocomplete-list-item.selected) {
		background-color: #ccc !important;
		color: black !important;
	}

	:global(.autocomplete-list) {
		padding: 0 !important;
	}

	:global(.autocomplete-list-item-no-results) {
		display: none;
	}

	:global(.autocomplete-input) {
		border: 1px solid #ccc;
	}
</style>
