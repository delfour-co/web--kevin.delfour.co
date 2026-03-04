<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	function formatTotalTime(minutes: number): string {
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		if (h === 0) return `${m}min`;
		if (m === 0) return `${h}h`;
		return `${h}h ${m}min`;
	}
</script>

<SEO
	title={data.book.title}
	description={data.book.description}
	url="https://kevin.delfour.co/livres/{data.book.slug}/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/">Accueil</a>
		<span aria-hidden="true">»</span>
		<a href="/livres/">Guides & livres</a>
	</nav>

	<header class="book-header">
		<h1>{data.book.title}</h1>
		<p class="book-subtitle">{data.book.subtitle}</p>
	</header>

	<section class="toc-card">
		<div class="toc-header">
			<h2>Table des matières</h2>
			<span class="toc-total">(environ {formatTotalTime(data.totalReadingTime)} de lecture en prenant son temps)</span>
		</div>
		<ol class="chapter-list">
			{#each data.chapters as chapter, i}
				<li>
					<a href="/livres/{data.book.slug}/{chapter.slug}/" class="chapter-link">
						<span class="chapter-number">{chapter.chapterNumber || String(i).padStart(2, '0')}</span>
						<span class="chapter-title">{chapter.title}</span>
						<span class="chapter-time">{chapter.readingTime} min</span>
					</a>
				</li>
			{/each}
		</ol>
	</section>

	{#if data.chapters.length > 0}
		<div class="start-reading">
			<a href="/livres/{data.book.slug}/{data.chapters[0].slug}/" class="btn-start">
				Commencer la lecture »
			</a>
		</div>
	{/if}
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: var(--gap) var(--gap) calc(var(--gap) * 2);
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.875rem;
		color: var(--secondary);
		margin-bottom: var(--gap);
	}

	.breadcrumb a {
		color: var(--secondary);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	/* Header compact */
	.book-header {
		margin-bottom: var(--gap);
	}

	.book-header h1 {
		font-size: 2rem;
		margin-bottom: 4px;
	}

	.book-subtitle {
		font-size: 1rem;
		color: var(--secondary);
		font-style: italic;
		margin: 0;
	}

	/* Table des matières — card style comme Hugo */
	.toc-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem 1.5rem;
		margin-top: var(--gap);
	}

	.toc-header {
		display: flex;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 0.75rem;
	}

	.toc-header h2 {
		font-size: 1.15rem;
		font-weight: 700;
		margin: 0;
	}

	.toc-total {
		font-size: 0.85rem;
		color: var(--secondary);
	}

	/* Chapter list — compact */
	.chapter-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.chapter-link {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 6px 0;
		text-decoration: none;
		color: inherit;
		transition: color 0.15s ease;
		border-bottom: 1px solid transparent;
	}

	.chapter-link:hover {
		text-decoration: none;
	}

	.chapter-link:hover .chapter-title {
		color: var(--accent);
	}

	.chapter-number {
		font-family: var(--font-mono, monospace);
		font-size: 0.85rem;
		color: var(--secondary);
		min-width: 2.5rem;
		flex-shrink: 0;
	}

	.chapter-title {
		flex: 1;
		font-weight: 500;
		font-size: 0.95rem;
		transition: color 0.15s ease;
	}

	.chapter-time {
		font-size: 0.85rem;
		color: var(--secondary);
		white-space: nowrap;
		flex-shrink: 0;
		text-align: right;
	}

	/* Start reading */
	.start-reading {
		margin-top: var(--gap);
	}

	.btn-start {
		display: inline-block;
		padding: 10px 20px;
		background: var(--accent);
		color: white;
		border-radius: var(--radius);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
		transition: var(--transition);
	}

	.btn-start:hover {
		opacity: 0.9;
		text-decoration: none;
	}

	@media (max-width: 640px) {
		.toc-header {
			flex-direction: column;
			gap: 4px;
		}

		.chapter-number {
			min-width: 2rem;
			font-size: 0.8rem;
		}
	}
</style>
