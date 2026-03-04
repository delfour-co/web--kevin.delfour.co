<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import BookNav from '$lib/components/BookNav.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';

	let { data } = $props();

	let Component = $derived(data.chapter.component);
</script>

<ScrollProgress />

<SEO
	title="{data.chapter.title} — {data.book.title}"
	description="Chapitre {data.currentIndex}/{data.totalChapters} de {data.book.title}"
	url="https://kevin.delfour.co/livres/{data.book.slug}/"
/>

<article class="chapter">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/livres/">Livres</a>
		<span aria-hidden="true">/</span>
		<a href="/livres/{data.book.slug}/">{data.book.title}</a>
		<span aria-hidden="true">/</span>
		<span>{data.chapter.title}</span>
	</nav>

	<header class="chapter-header">
		<div class="chapter-meta">
			<span class="chapter-count">Chapitre {data.currentIndex} / {data.totalChapters}</span>
			{#if data.chapter.readingTime}
				<span class="chapter-reading-time">{data.chapter.readingTime} min de lecture</span>
			{/if}
		</div>
		<h1>{data.chapter.title}</h1>
	</header>

	<div class="post-content" data-pagefind-body>
		<Component />
	</div>

	<BookNav
		bookSlug={data.book.slug}
		bookTitle={data.book.title}
		prevChapter={data.prevChapter}
		nextChapter={data.nextChapter}
		currentIndex={data.currentIndex}
		totalChapters={data.totalChapters}
	/>
</article>

<style>
	.chapter {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-bottom: calc(var(--gap) * 1.5);
		flex-wrap: wrap;
	}

	.breadcrumb a {
		color: var(--secondary);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.chapter-header {
		margin-bottom: calc(var(--gap) * 2);
	}

	.chapter-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 8px;
	}

	.chapter-count {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	.chapter-reading-time {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}
</style>
