<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEO
	title="Catégorie : {data.category}"
	description="Articles dans la catégorie {data.category}."
	url="https://kevin.delfour.co/categories/{data.category}/"
/>

<div class="page-container">
	<header class="page-header">
		<h1 class="category-title">{data.category}</h1>
		<p class="page-description">{data.posts.length} article{data.posts.length > 1 ? 's' : ''}</p>
	</header>

	<div class="articles-list">
		{#each data.posts as post}
			<article class="article-entry">
				<a href="/articles/{post.slug}/" class="article-link">
					<h2 class="article-title">{post.title}</h2>
					<p class="article-desc">{post.description}</p>
					<footer class="article-meta">
						<time datetime={post.date}>{formatDate(post.date)}</time>
						{#if post.readingTime}
							<span>{post.readingTime} min</span>
						{/if}
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
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.category-title { text-transform: capitalize; }
	.page-description { color: var(--secondary); font-size: 1.1rem; }

	.articles-list { display: flex; flex-direction: column; gap: var(--gap); }

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

	.article-link:hover .article-title { color: var(--accent); }
	.article-link:hover { text-decoration: none; }

	.article-title { font-size: 1.25rem; margin: 0 0 8px 0; transition: var(--transition); }

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
</style>
