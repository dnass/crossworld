<script>
	import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ delay: 500 }}>
	<h2>You won!</h2>
</div>

<style type="text/scss">
	div {
		width: 100%;
		height: 100%;
		top: 0;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(white, 0.5);
	}

	h2 {
		font-size: 3em;
		font-weight: 900;
		color: tomato;
		filter: drop-shadow(-4px 4px 0 rgba(tomato, 0.3));
	}
</style>
