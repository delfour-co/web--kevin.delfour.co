<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	// Group articles by year
	let groupedByYear = $derived(() => {
		const groups: Record<string, typeof data.posts> = {};
		for (const post of data.posts) {
			const year = new Date(post.date).getFullYear().toString();
			if (!groups[year]) groups[year] = [];
			groups[year].push(post);
		}
		return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
	});

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
	}
</script>

<SEO
	title="Archives"
	description="Tous les articles classés par année."
	url="https://kevin.delfour.co/archives/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Archives</h1>
		<p class="page-description">{data.posts.length} articles</p>
	</header>

	{#each groupedByYear() as [year, posts]}
		<section class="year-section">
			<h2 class="year-title">{year} <span class="year-count">({posts.length})</span></h2>
			<ul class="articles-list">
				{#each posts as post}
					<li>
						<a href="/articles/{post.slug}/" class="archive-link">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span class="archive-title">{post.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; }

	.year-section { margin-bottom: calc(var(--gap) * 2); }

	.year-title {
		font-size: 1.3rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.year-count {
		font-size: 0.8rem;
		color: var(--secondary);
		font-weight: 400;
	}

	.articles-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.archive-link {
		display: flex;
		align-items: baseline;
		gap: 16px;
		padding: 8px 12px;
		border-radius: 6px;
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.archive-link:hover {
		background: var(--accent-light);
		text-decoration: none;
	}

	.archive-link time {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		min-width: 60px;
		flex-shrink: 0;
	}

	.archive-title {
		font-size: 0.95rem;
		line-height: 1.3;
	}
</style>
