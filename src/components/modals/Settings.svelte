<script>
	import { hardMode, darkMode } from '../../store';
</script>

<div class="control">
	<div>
		<label for="hardmode">Hard mode</label>
		<span>Randomize map rotation</span>
	</div>
	<input id="hardmode" type="checkbox" bind:checked={$hardMode} />
</div>

<div class="control">
	<label for="darkmode">Dark theme</label>
	<input id="darkmode" type="checkbox" bind:checked={$darkMode} />
</div>

<style type="text/scss">
	.control {
		display: flex;
		justify-content: space-between;

		&:not(:last-child) {
			margin-bottom: 1em;
		}
	}

	label {
		margin-right: 2em;
	}

	span {
		display: block;
		opacity: 0.5;
		font-size: 0.7em;
	}

	input[type='checkbox'] {
		width: 0;
		cursor: pointer;
		opacity: 0.9;

		&:hover {
			opacity: 0.7;
		}

		&:before {
			content: '';
			margin: -0.625em 0 0 -1.25em;
			background: url(/toggle_off_black_24dp.svg);
			opacity: 1;
			display: inline-block;
			width: 2.5em;
			height: 2.5em;
			background-size: 100% 100%;
		}

		&:checked:before {
			background: url(/toggle_on_black_24dp.svg);
			background-size: 100% 100%;
		}

		:global(.dark) & {
			filter: invert(1);
		}
	}
</style>
