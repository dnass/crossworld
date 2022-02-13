<script>
	import Clues from '../components/Clues.svelte';
	import Map from '../components/Map.svelte';
	import Title from '../components/Title.svelte';
	import Picker from '../components/Picker.svelte';

	import { showNorth } from '../store';
</script>

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%20style=%22filter:%20grayscale(1)%20sepia(1)%20saturate(3)%20hue-rotate(-46deg);%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E%F0%9F%8C%8D%3C/text%3E%3C/svg%3E"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
	<title>Crossworld: The geographic crossword puzzle</title>
</svelte:head>

<div class="body">
	<nav>
		<Title />
		<Picker />
	</nav>
	<div class="game">
		<Clues />
		<Map />
	</div>
</div>

<style>
	.body {
		max-width: 1000px;
		margin: 0 auto;
	}

	.game {
		display: flex;
		gap: 1em;
		width: 100%;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1em;
	}

	:global(*) {
		font-family: 'Montserrat', sans-serif;
		box-sizing: border-box;
	}
</style>
