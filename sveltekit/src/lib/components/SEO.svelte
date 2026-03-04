<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		url?: string;
		image?: string;
		type?: 'website' | 'article';
		publishedDate?: string;
		modifiedDate?: string;
		noindex?: boolean;
	}

	const SITE_NAME = 'Kevin Delfour';
	const SITE_URL = 'https://kevin.delfour.co';
	const DEFAULT_DESCRIPTION = 'CTO · 17 ans de terrain. Je donne des repères. Pas des leçons.';
	const DEFAULT_IMAGE = `${SITE_URL}/images/kevin-delfour.webp`;

	let {
		title = '',
		description = DEFAULT_DESCRIPTION,
		url = SITE_URL,
		image = DEFAULT_IMAGE,
		type = 'website',
		publishedDate = '',
		modifiedDate = '',
		noindex = false
	}: Props = $props();

	let fullTitle = $derived(title ? `${title} — ${SITE_NAME}` : SITE_NAME);

	let jsonLd = $derived(
		type === 'article'
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: title,
					description,
					url,
					image,
					datePublished: publishedDate,
					dateModified: modifiedDate || publishedDate,
					author: {
						'@type': 'Person',
						name: SITE_NAME,
						url: SITE_URL
					}
				})
			: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: SITE_NAME,
					url: SITE_URL,
					description
				})
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:site_name" content={SITE_NAME} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${jsonLd.replace(/<\//g, '<\\/')}</script>`}
</svelte:head>
