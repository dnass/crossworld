<script>
	import { trackEvent } from '../utils';
	import { currentPuzzleDate, win } from '../store';

	$: trackEvent('puzzle_start', $currentPuzzleDate);

	$: if ($win) {
		trackEvent('puzzle_win', $currentPuzzleDate);
	}
</script>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LWPX77NRSS"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-LWPX77NRSS');
	</script>
</svelte:head>
