<script>
	import { dev } from '$app/env';
	import Analytics from '../components/Analytics.svelte';
	import Head from '../components/Head.svelte';
	import Clues from '../components/Clues.svelte';
	import Map from '../components/Map.svelte';
	import Title from '../components/Title.svelte';
	import Controls from '../components/Controls.svelte';
	import Modal from '../components/Modal.svelte';
	import Settings from '../components/modals/Settings.svelte';
	import CountrySearch from '../components/CountrySearch.svelte';
	import Keyboard from '../components/Keyboard.svelte';
	import Help from '../components/modals/Help.svelte';
	import Win from '../components/modals/Win.svelte';
	import {
		settingsVisible,
		helpVisible,
		darkMode,
		win,
		winVisible,
		width,
		mobile,
		mapSize,
	} from '../store';

	let height, navHeight, floatHeight;

	$: mapOverflow = height + $mapSize - (height - navHeight - floatHeight);
</script>

{#if !dev}
	<Analytics />
{/if}

<Head />

<svelte:window bind:innerWidth={$width} bind:innerHeight={height} />

<CountrySearch />

<div class="body" class:dark={$darkMode} style:height={height ? `${height}px` : null}>
	<nav>
		<div bind:clientHeight={navHeight}>
			<Title />
			<Controls />
		</div>
	</nav>
	<div
		class="game"
		style:min-height={height && $mobile ? `calc(${mapOverflow}px - 2.5em)` : null}
		style:margin-top={$mobile ? `${navHeight}px` : null}
	>
		<div class="float">
			<div bind:clientHeight={floatHeight}>
				<Clues />
				<Keyboard />
			</div>
		</div>
		<Map />
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
		<Modal delay={800} store={winVisible}>
			<Win slot="content" />
		</Modal>
	{/if}
</div>

<style type="text/scss">
	.body {
		display: flex;
		flex-direction: column;
		max-width: 960px;
		height: 100vh;
		margin: 0 auto;
		padding: 1em;

		@media (max-width: 767px) {
			padding: 0 1em;
		}

		@media (max-width: 480px) {
			padding: 0 0.75em;
		}
	}

	.game {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		@media (min-width: 768px) {
			gap: 1em;
			flex-direction: row;
			align-items: flex-start;
		}
	}

	.float {
		@media (min-width: 768px) {
			flex: 0 0 300px;
		}
	}

	@media (max-width: 767px) {
		.float,
		nav {
			left: 0;
			right: 0;
			position: fixed;
			padding: 0.5em 0.75em;
			z-index: 1;
			background-color: rgb(var(--color-background));
		}

		.float {
			bottom: 0;
		}

		nav {
			top: 0;
		}
	}

	nav {
		div {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		@media (min-width: 768px) {
			margin-top: 4em;
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

	:global(::selection) {
		background-color: rgb(var(--color-accent));
		color: rgb(var(--color-background));
	}
</style>
