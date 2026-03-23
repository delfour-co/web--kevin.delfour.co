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
		categories?: string[];
		tags?: string[];
		breadcrumbs?: { label: string; href?: string }[];
	}

	const SITE_NAME = 'Kevin Delfour';
	const SITE_URL = 'https://kevin.delfour.co';
	const DEFAULT_DESCRIPTION = 'CTO · 17 ans de terrain. Je donne des repères. Pas des leçons.';
	const DEFAULT_IMAGE = `${SITE_URL}/images/kevin-delfour.png`;

	let {
		title = '',
		description = DEFAULT_DESCRIPTION,
		url = SITE_URL,
		image = DEFAULT_IMAGE,
		type = 'website',
		publishedDate = '',
		modifiedDate = '',
		noindex = false,
		categories = [],
		tags = [],
		breadcrumbs = []
	}: Props = $props();

	let fullTitle = $derived(title ? `${title} — ${SITE_NAME}` : SITE_NAME);

	const personSchema = {
		'@type': 'Person',
		name: SITE_NAME,
		url: SITE_URL,
		jobTitle: 'CTO',
		sameAs: [
			'https://github.com/kdelfour',
			'https://linkedin.com/in/kevindelfour'
		]
	};

	let jsonLdSchemas = $derived(() => {
		const schemas: object[] = [];

		if (type === 'article') {
			const articleSchema: Record<string, unknown> = {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: title,
				description,
				url,
				image,
				inLanguage: 'fr',
				datePublished: publishedDate,
				dateModified: modifiedDate || publishedDate,
				author: personSchema
			};
			if (categories.length > 0) {
				articleSchema.articleSection = categories[0];
			}
			if (tags.length > 0) {
				articleSchema.keywords = tags.join(', ');
			}
			schemas.push(articleSchema);
		} else {
			schemas.push({
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: SITE_NAME,
				url: SITE_URL,
				description,
				inLanguage: 'fr',
				author: personSchema,
				potentialAction: {
					'@type': 'SearchAction',
					target: `${SITE_URL}/search/?q={search_term_string}`,
					'query-input': 'required name=search_term_string'
				}
			});
		}

		if (breadcrumbs.length > 0) {
			schemas.push({
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
					...breadcrumbs.map((crumb, i) => ({
						'@type': 'ListItem',
						position: i + 2,
						name: crumb.label,
						...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {})
					}))
				]
			});
		}

		return schemas;
	});
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
	{#each jsonLdSchemas() as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema).replace(/<\//g, '<\\/')}</script>`}
	{/each}
</svelte:head>
