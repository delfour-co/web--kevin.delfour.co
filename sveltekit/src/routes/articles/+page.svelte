<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	const categories = ['tous', 'leadership', 'décision', 'craft', 'organisation', 'pratiques', 'parcours'];

	let activeFilter = $state('tous');

	// Read initial filter from URL
	if (browser) {
		const urlCat = new URL(window.location.href).searchParams.get('cat');
		if (urlCat && categories.includes(urlCat)) {
			activeFilter = urlCat;
		}
	}

	let filteredPosts = $derived(
		activeFilter === 'tous'
			? data.posts
			: data.posts.filter((p: any) => p.categories?.includes(activeFilter))
	);

	function setFilter(cat: string) {
		activeFilter = cat;
		if (browser) {
			const url = new URL(window.location.href);
			if (cat === 'tous') {
				url.searchParams.delete('cat');
			} else {
				url.searchParams.set('cat', cat);
			}
			history.replaceState({}, '', url.toString());
		}
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEO
	title="Articles"
	description="Articles sur le leadership tech, la gouvernance, le craft et les parcours."
	url="https://kevin.delfour.co/articles/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Articles</h1>
		<p class="page-description">Des repères pour CTO et leaders tech. Pas des leçons.</p>
	</header>

	<nav class="filters" aria-label="Filtrer par catégorie">
		{#each categories as cat}
			<button
				class="filter-btn"
				class:active={activeFilter === cat}
				onclick={() => setFilter(cat)}
				aria-pressed={activeFilter === cat}
			>
				{cat === 'tous' ? 'Tous' : cat}
			</button>
		{/each}
	</nav>

	<p class="results-count">{filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}</p>

	<div class="articles-list">
		{#each filteredPosts as post}
			<article class="article-entry">
				<a href="/articles/{post.slug}/" class="article-link">
					<h2 class="article-title">{post.title}</h2>
					<p class="article-desc">{post.description}</p>
					<footer class="article-meta">
						<time datetime={post.date}>{formatDate(post.date)}</time>
						{#if post.readingTime}
							<span class="reading-time">{post.readingTime} min</span>
						{/if}
						{#each post.categories as cat}
							<span class="article-pill">{cat}</span>
						{/each}
					</footer>
				</a>
			</article>
		{/each}
	</div>
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.page-header {
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.page-description {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: var(--gap);
	}

	.filter-btn {
		padding: 6px 16px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: transparent;
		color: var(--secondary);
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: var(--transition);
		text-transform: capitalize;
	}

	.filter-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.filter-btn.active {
		background: var(--accent);
		border-color: var(--accent);
		color: white;
	}

	.results-count {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-bottom: var(--gap);
	}

	.articles-list {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	.article-entry {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--gap);
	}

	.article-link {
		display: block;
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.article-link:hover {
		text-decoration: none;
	}

	.article-link:hover .article-title {
		color: var(--accent);
	}

	.article-title {
		font-size: 1.25rem;
		margin: 0 0 8px 0;
		transition: var(--transition);
	}

	.article-desc {
		color: var(--secondary);
		font-size: 0.95rem;
		margin: 0 0 8px 0;
		line-height: 1.5;
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	.reading-time {
		color: var(--secondary);
	}

	.article-pill {
		display: inline-block;
		padding: 2px 10px;
		background: var(--accent-light);
		color: var(--accent);
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
		text-transform: capitalize;
	}
</style>
