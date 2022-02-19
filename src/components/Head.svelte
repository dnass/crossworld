<script>
	import { darkMode } from '../store';

	$: themeStyle = `<style> :root { --color-foreground: ${
		$darkMode ? '250, 250, 250' : '5, 5, 5'
	}; --color-background: ${
		$darkMode ? '10, 10, 10' : '252, 252, 252'
	}; --color-accent: 123, 104, 238; }</style>`;

	const title = 'Crossworld: A geographic crossword puzzle';
	const description = 'Solve crossword clues to fill in the world map.';
	const image = 'https://crossworld.world/crossworld-share.png';
</script>

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%20style=%22filter:%20grayscale(1)%20sepia(1)%20saturate(3)%20hue-rotate(202deg);%22%3E%3Ctext%20y=%22.9em%22%20font-size=%2290%22%3E%F0%9F%8C%8D%3C/text%3E%3C/svg%3E"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:image" content={image} />
	<meta name="theme-color" content={$darkMode ? 'rgb(10, 10, 10)' : 'rgb(250, 250, 250)'} />

	{@html themeStyle}
</svelte:head>
