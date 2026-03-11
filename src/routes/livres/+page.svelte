<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();
</script>

<SEO
	title="Livres"
	description="Livres complets disponibles gratuitement en ligne. Des guides structurés pour donner des repères aux CTO et à la jeunesse tech."
	url="https://kevin.delfour.co/livres/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Livres gratuits</span>
		<h1>Livres</h1>
		<p class="page-description">
			Des livres complets, en accès libre. Des repères structurés, pas des leçons.
		</p>
	</header>

	<div class="books-grid">
		{#each data.books as book}
			<a href="/livres/{book.slug}/" class="book-card glass-card">
				{#if book.cover}
					<div class="book-cover">
						<img src={book.cover} alt="Couverture {book.title}" loading="lazy" />
					</div>
				{/if}
				<div class="book-info">
					<h2 class="book-title">{book.title}</h2>
					<p class="book-subtitle">{book.subtitle}</p>
					<p class="book-description">{book.description}</p>
					<span class="book-chapters">{book.chapterCount} chapitres</span>
				</div>
			</a>
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
		margin-bottom: calc(var(--gap) * 2);
	}

	.page-description {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	.books-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: calc(var(--gap) * 2);
	}

	.book-card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
	}

	.book-card:hover {
		text-decoration: none;
		box-shadow: var(--accent2-glow);
		border-color: var(--accent2-border);
	}

	.book-cover {
		aspect-ratio: 3 / 2;
		overflow: hidden;
		background: var(--surface);
	}

	.book-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.book-info {
		padding: calc(var(--gap) * 1.5);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.book-title {
		font-size: 1.3rem;
		margin: 0;
	}

	.book-subtitle {
		font-size: 0.9rem;
		color: var(--secondary);
		margin: 0;
		font-style: italic;
	}

	.book-description {
		font-size: 0.9rem;
		color: var(--secondary);
		margin: 0;
		line-height: 1.5;
	}

	.book-chapters {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--accent);
		font-weight: 600;
		margin-top: 4px;
	}

	@media (max-width: 640px) {
		.books-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
