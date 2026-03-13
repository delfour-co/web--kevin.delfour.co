<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data } = $props();

	let metadata = $derived(data.metadata);
	let Component = $derived(data.component);

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<ScrollProgress />

<SEO
	title={metadata.title}
	description={metadata.description}
	url="https://kevin.delfour.co/articles/{metadata.slug}/"
	type="article"
	publishedDate={metadata.date}
	categories={metadata.categories || []}
	tags={metadata.tags || []}
	breadcrumbs={[
		{ label: 'Articles', href: '/articles/' },
		{ label: metadata.title }
	]}
/>

<article class="article">
	<Breadcrumbs
		items={[
			{ label: 'Articles', href: '/articles/' },
			{ label: metadata.title }
		]}
	/>

	<header class="article-header">
		<div class="article-meta">
			<time datetime={metadata.date}>{formatDate(metadata.date)}</time>
			{#if metadata.readingTime}
				<span class="reading-time">{metadata.readingTime} min de lecture</span>
			{/if}
			{#each metadata.categories || [] as cat}
				<a href="/articles/?cat={cat}" class="article-pill pill">{cat}</a>
			{/each}
		</div>
		<h1>{metadata.title}</h1>
		{#if metadata.description}
			<p class="article-description">{metadata.description}</p>
		{/if}
	</header>

	{#if metadata.ShowToc}
		<TableOfContents open={metadata.TocOpen ?? false} />
	{/if}

	<div class="post-content" data-pagefind-body>
		<Component />
	</div>

	<nav class="article-nav" aria-label="Articles précédent et suivant">
		{#if data.prevPost}
			<a href="/articles/{data.prevPost.slug}/" class="nav-link glass-card">
				<span class="nav-label">← Précédent</span>
				<span class="nav-title">{data.prevPost.title}</span>
			</a>
		{:else}
			<div></div>
		{/if}
		{#if data.nextPost}
			<a href="/articles/{data.nextPost.slug}/" class="nav-link nav-next glass-card">
				<span class="nav-label">Suivant →</span>
				<span class="nav-title">{data.nextPost.title}</span>
			</a>
		{:else}
			<div></div>
		{/if}
	</nav>
</article>

<style>
	.article {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.article-header {
		margin-bottom: calc(var(--gap) * 2);
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--tertiary);
		margin-bottom: 12px;
	}

	.reading-time {
		color: var(--tertiary);
	}

	.article-pill {
		text-decoration: none;
		transition: var(--transition);
		text-transform: capitalize;
	}

	.article-pill:hover {
		background: var(--accent);
		color: #000;
		border-color: var(--accent);
	}

	.article-description {
		font-size: 1.1rem;
		color: var(--secondary);
		margin-top: 8px;
	}

	.article-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
		margin-top: calc(var(--gap) * 3);
		padding-top: calc(var(--gap) * 2);
		border-top: 1px solid var(--border);
	}

	.nav-link {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		text-decoration: none;
		color: inherit;
	}

	.nav-link:hover {
		text-decoration: none;
		box-shadow: var(--accent-glow);
	}

	.nav-next {
		text-align: right;
	}

	.nav-label {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.nav-title {
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.3;
	}

	@media (max-width: 640px) {
		.article-nav {
			grid-template-columns: 1fr;
		}

		.nav-next {
			text-align: left;
		}
	}
</style>
