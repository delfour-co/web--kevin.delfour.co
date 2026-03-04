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
	description="CTO · 17 ans de terrain. Je donne des repères. Pas des leçons."
	url="https://kevin.delfour.co/"
/>

<div class="home">
	<!-- Hero -->
	<section class="hero">
		<img src="/images/kevin-delfour.webp" alt="Kevin Delfour" class="hero-avatar" width="120" height="120" />
		<h1 class="hero-title">Kevin Delfour</h1>
		<p class="hero-subtitle">CTO · 17 ans de terrain</p>
		<p class="hero-tagline">Je donne des repères. Pas des leçons.</p>
		<div class="hero-actions">
			<a href="/articles/" class="btn-primary">Lire les articles</a>
			<a href="/vision/" class="btn-secondary">Ma vision</a>
		</div>
	</section>

	<!-- Derniers articles -->
	{#if data.latestPosts.length > 0}
		<section class="home-section">
			<h2>Derniers articles</h2>
			<div class="articles-list">
				{#each data.latestPosts as post}
					<article class="post-entry">
						<a href="/articles/{post.slug}/" class="entry-link">
							<h3 class="entry-title">{post.title}</h3>
							<p class="entry-desc">{post.description}</p>
							<footer class="entry-meta">
								<time datetime={post.date}>{formatDate(post.date)}</time>
								{#if post.readingTime}
									<span>{post.readingTime} min</span>
								{/if}
								{#each post.categories as cat}
									<span class="entry-pill">{cat}</span>
								{/each}
							</footer>
						</a>
					</article>
				{/each}
			</div>
			<p class="section-more"><a href="/articles/">Voir tous les articles →</a></p>
		</section>
	{/if}

	<!-- Projets -->
	<section class="home-section">
		<h2>Projets</h2>
		<div class="home-grid grid-3">
			{#each data.projects as projet}
				<a href={projet.url} class="home-card" target="_blank" rel="noopener noreferrer">
					<h3 class="card-title">{projet.nom}</h3>
					<p class="card-desc">{projet.description}</p>
					<span class="card-meta">{projet.langage}</span>
				</a>
			{/each}
		</div>
		<p class="section-more"><a href="/projets/">Voir tous les projets →</a></p>
	</section>

	<!-- Livres -->
	<section class="home-section">
		<h2>Livres</h2>
		<div class="home-grid grid-2">
			{#each data.books as livre}
				<a href="/livres/{livre.slug}/" class="home-card home-card--large">
					{#if livre.cover}
						<img src={livre.cover} alt="Couverture {livre.title}" class="card-cover" loading="lazy" />
					{/if}
					<h3 class="card-title">{livre.title}</h3>
					<p class="card-subtitle">{livre.subtitle}</p>
					<span class="card-meta">{livre.chapterCount} chapitres · Gratuit</span>
				</a>
			{/each}
		</div>
		<p class="section-more"><a href="/livres/">Voir les livres →</a></p>
	</section>

	<!-- Vision -->
	<section class="home-section">
		<h2>Vision</h2>
		<blockquote class="vision-quote">
			<p>Je transmets gratuitement quand cela aide à grande échelle. Je mets un cadre quand cela demande du temps individuel.</p>
		</blockquote>
		<p class="section-more"><a href="/vision/">En savoir plus →</a></p>
	</section>

	<!-- Suivre -->
	<section class="home-section">
		<h2>Suivre</h2>
		<p class="follow-text">Un nouvel article chaque mois. Pas de spam, pas d'algorithme.</p>
		<div class="hero-actions" style="justify-content: flex-start; margin-top: 1rem;">
			<a href="https://github.com/kdelfour" class="btn-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
			<a href="https://linkedin.com/in/kevindelfour" class="btn-secondary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
		</div>
	</section>
</div>

<style>
	.home {
		max-width: var(--home-width-a11y);
		margin: 0 auto;
		padding: 0 var(--gap);
	}

	/* Hero */
	.hero {
		text-align: center;
		padding: calc(var(--gap) * 3) 0;
	}

	.hero-avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 0 auto var(--gap);
		object-fit: cover;
	}

	.hero-title {
		font-size: 2.5rem;
		margin-bottom: 4px;
	}

	.hero-subtitle {
		font-family: var(--font-ui);
		font-size: 1.1rem;
		color: var(--secondary);
		margin-bottom: 8px;
	}

	.hero-tagline {
		font-family: var(--font-body);
		font-size: 1.2rem;
		color: var(--accent);
		font-style: italic;
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.hero-actions {
		display: flex;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	/* Sections */
	.home-section {
		padding: calc(var(--gap) * 2) 0;
		border-top: 1px solid var(--border);
	}

	.home-section h2 {
		margin-top: 0;
	}

	.section-more {
		margin-top: var(--gap);
	}

	.section-more a {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
	}

	/* Articles list */
	.articles-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.post-entry {
		border-bottom: 1px solid var(--border);
	}

	.entry-link {
		display: block;
		padding: var(--content-gap) 0;
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.entry-link:hover {
		text-decoration: none;
	}

	.entry-link:hover .entry-title {
		color: var(--accent);
	}

	.entry-title {
		font-size: 1.15rem;
		margin: 0 0 4px 0;
		transition: var(--transition);
	}

	.entry-desc {
		font-size: 0.9rem;
		color: var(--secondary);
		margin: 0 0 6px 0;
		line-height: 1.5;
	}

	.entry-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	.entry-pill {
		display: inline-block;
		padding: 1px 8px;
		background: var(--accent-light);
		color: var(--accent);
		border-radius: 10px;
		font-size: 11px;
		font-weight: 500;
		text-transform: capitalize;
	}

	/* Cards grid */
	.home-grid {
		display: grid;
		gap: var(--gap);
	}

	.grid-3 {
		grid-template-columns: repeat(3, 1fr);
	}

	.grid-2 {
		grid-template-columns: repeat(2, 1fr);
	}

	.home-card {
		display: block;
		padding: var(--gap);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.home-card:hover {
		border-color: var(--accent-border);
		box-shadow: var(--shadow-md);
		text-decoration: none;
	}

	.card-cover {
		width: 100%;
		height: 140px;
		object-fit: cover;
		border-radius: 6px;
		margin-bottom: 12px;
	}

	.card-title {
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 8px 0;
	}

	.card-subtitle {
		font-family: var(--font-ui);
		font-size: 0.85rem;
		color: var(--accent);
		margin: 0 0 8px 0;
	}

	.card-desc {
		font-size: 0.875rem;
		color: var(--secondary);
		line-height: 1.5;
		margin: 0 0 8px 0;
	}

	.card-meta {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	/* Vision */
	.vision-quote {
		margin: var(--gap) 0;
		padding: var(--content-gap) var(--gap);
		border-left: 3px solid var(--accent);
		background: var(--accent-light);
		border-radius: 0 var(--radius) var(--radius) 0;
		font-style: italic;
		font-size: 1.1rem;
	}

	.vision-quote p {
		margin: 0;
	}

	/* Follow */
	.follow-text {
		color: var(--secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2rem;
		}

		.grid-3 {
			grid-template-columns: 1fr;
		}

		.grid-2 {
			grid-template-columns: 1fr;
		}
	}
</style>
