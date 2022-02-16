<script>
	export let spin = false;
</script>

<span class:spin />

<style type="text/scss">
	span {
		&:before {
			content: '🌍';
			filter: grayscale(1) sepia(1) saturate(3) hue-rotate(202deg);
			display: inline-block;
			transform-style: preserve-3d;
		}

		&.spin:before {
			animation: globe 6s infinite linear;
		}
	}

	@keyframes globe {
		0% {
			content: '🌍';
			transform: rotateY(0deg);
		}

		8.3% {
			transform: rotateY(90deg);
		}

		16.7% {
			content: '🌏';
			transform: rotateX(0deg);
		}

		25% {
			transform: rotateX(90deg);
		}

		33.3% {
			content: '🌎';
			transform: rotateY(0deg);
		}

		41.7% {
			transform: rotateY(90deg);
		}

		50% {
			content: '🌍';
			transform: rotateX(0deg);
		}

		58.3% {
			transform: rotateX(90deg);
		}

		66.7% {
			content: '🌏';
			transform: rotateY(0deg);
		}

		75% {
			transform: rotateY(90deg);
		}

		83.3% {
			content: '🌎';
			transform: rotateX(0deg);
		}

		91.7% {
			transform: rotateX(90deg);
		}
	}
</style>
