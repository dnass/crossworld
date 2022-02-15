<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let title,
		store,
		delay = 0;

	const closeModal = () => store.set(false);

	onMount(() => {
		const listener = ({ key }) => key === 'Escape' && closeModal();
		document.addEventListener('keydown', listener);
		return () => document.removeEventListener('keydown', listener);
	});
</script>

<div
	in:fade={{ delay, duration: 100 }}
	out:fade={{ duration: 100 }}
	class="modal"
	on:click={closeModal}
>
	<div class="panel" on:click|stopPropagation>
		{#if title}
			<h2>
				{title}
			</h2>
		{/if}
		<button class="close" aria-label="close" on:click={closeModal}>
			<img alt="" src="/close_black_24dp.svg" />
		</button>
		<slot name="content" />
	</div>
</div>

<style type="text/scss">
	.modal {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(var(--color-background), 0.8);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.title {
		display: flex;
		justify-content: space-between;
	}

	.panel {
		width: 100%;
		max-width: 350px;
		position: relative;
		background: rgb(var(--color-background));
		padding: 20px;
		border: 1px solid rgba(var(--color-foreground), 0.1);
		margin-top: 10vh;

		@media (max-width: 480px) {
			max-width: 100%;
			height: 100%;
			margin-top: 0;
		}
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 1em;
		line-height: 0;
		padding: 10px;
		border: transparent;
		background: transparent;
		cursor: pointer;
		color: rgb(var(--color-foreground));
		opacity: 0.7;

		&:hover {
			opacity: 0.5;
		}

		img {
			width: 1em;
		}
	}

	h2 {
		margin: 0 0 1em;
		text-align: center;
		font-size: 1em;
		text-transform: uppercase;
	}
</style>
