<script>
	import Clues from '../components/Clues.svelte';
	import Map from '../components/Map.svelte';
	import Title from '../components/Title.svelte';

	import { showNorth } from '../store';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
	<Title />
</div>
<div>
	<Clues />
	<Map />
</div>

<style>
	div {
		display: flex;
		gap: 1em;
	}

	:global(*) {
		font-family: 'Montserrat', sans-serif;
	}
</style>
