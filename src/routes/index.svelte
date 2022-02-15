<script>
	import Clues from '../components/Clues.svelte';
	import Map from '../components/Map.svelte';
	import Title from '../components/Title.svelte';
	import Controls from '../components/Controls.svelte';
	import Modal from '../components/Modal.svelte';
	import Settings from '../components/modals/Settings.svelte';
	import Help from '../components/modals/Help.svelte';
	import Win from '../components/modals/Win.svelte';
	import { settingsVisible, helpVisible, darkMode, win, winVisible } from '../store';

	$: themeStyle = `<style> :root { --color-foreground: ${
		$darkMode ? '250, 250, 250' : '5, 5, 5'
	}; --color-background: ${
		$darkMode ? '10, 10, 10' : '252, 252, 252'
	}; --color-accent: 123, 104, 238; }</style>`;
</script>

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%20style=%22filter:%20grayscale(1)%20sepia(1)%20saturate(3)%20hue-rotate(202deg);%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E%F0%9F%8C%8D%3C/text%3E%3C/svg%3E"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
	<title>Crossworld: The geographic crossword puzzle</title>
	{@html themeStyle}
</svelte:head>

<div class="body" class:dark={$darkMode}>
	<nav>
		<Title />
		<Controls />
	</nav>
	<div class="game">
		<Map />
		<Clues />
	</div>
	{#if $settingsVisible}
		<Modal title="Settings" store={settingsVisible}>
			<Settings slot="content" />
		</Modal>
	{/if}
	{#if $helpVisible}
		<Modal title="How to Play" store={helpVisible}>
			<Help slot="content" />
		</Modal>
	{/if}
	{#if $win && $winVisible}
		<Modal delay={500} store={winVisible}>
			<Win slot="content" />
		</Modal>
	{/if}
</div>

<style type="text/scss">
	.body {
		max-width: 960px;
		max-height: 100vh;
		margin: 0 auto 0;

		@media (min-width: 768px) {
			margin-top: 4em;
		}
	}

	.game {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		@media (min-width: 768px) {
			gap: 1em;
			flex-direction: row-reverse;
		}
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75em;
		@media (min-width: 768px) {
			margin-bottom: 1em;
		}
	}

	:global(*) {
		font-family: 'Montserrat', sans-serif;
		box-sizing: border-box;
		transition: 0.2s background-color, 0s color, 0.2s filter;
	}

	:global(body) {
		background-color: rgb(var(--color-background));
		color: rgb(var(--color-foreground));
	}

	:global(.dark) {
		:global(img),
		:global(select) {
			filter: invert(1);
		}
	}
</style>
