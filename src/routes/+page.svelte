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
	description="CTO Hands-on · 17 ans de terrain. Je donne des repères. Pas des leçons."
	url="https://kevin.delfour.co/"
/>

<div class="home">
	<!-- Hero -->
	<section class="hero">
		<img src="/images/kevin-delfour.webp" alt="Kevin Delfour" class="hero-avatar" width="120" height="120" />
		<h1 class="hero-title gradient-text">Kevin Delfour</h1>
		<p class="hero-subtitle">CTO Hands-on · 17 ans de terrain</p>
		<p class="hero-tagline glow">Je donne des repères. Pas des leçons.</p>
		<div class="hero-actions">
			<a href="/articles/" class="btn-primary">Lire les articles</a>
			<a href="/vision/" class="btn-secondary">Ma vision</a>
		</div>
	</section>

	<!-- Projets -->
	<section class="home-section">
		<span class="section-badge badge">Projets</span>
		<h2>Ce que je construis</h2>
		<div class="home-grid grid-2">
			<a href="/projets/asteroids/" class="home-card glass-card home-card--app">
				<img src="/images/apps/asteroids/icon.webp" alt="Neon Asteroids" class="card-icon" />
				<div>
					<h3 class="card-title">Neon Asteroids</h3>
					<p class="card-desc">Arcade shooter néon. Flutter + Flame.</p>
					<span class="card-meta">Test fermé · Google Play</span>
				</div>
			</a>
			<a href="/projets/notch/" class="home-card glass-card home-card--app">
				<img src="/images/apps/notch/icon.webp" alt="Notch" class="card-icon" />
				<div>
					<h3 class="card-title">Notch</h3>
					<p class="card-desc">SMS chiffrés par Enigma. Pas de serveur.</p>
					<span class="card-meta">Test fermé · Google Play</span>
				</div>
			</a>
			<a href="/projets/open-event-orchestrator/" class="home-card glass-card">
				<h3 class="card-title">Open Event Orchestrator</h3>
				<p class="card-desc">Plateforme open source de gestion d'événements. CFP, planning, billetterie, CRM.</p>
				<span class="card-meta">TypeScript · SvelteKit · PocketBase</span>
			</a>
			<a href="/projets/repolens/" class="home-card glass-card">
				<h3 class="card-title">RepoLens</h3>
				<p class="card-desc">CLI d'audit de dépôts GitHub. Bonnes pratiques, sécurité, compliance.</p>
				<span class="card-meta">Rust · CLI · Open source</span>
			</a>
		</div>
		<p class="section-more"><a href="/projets/">Voir tous les projets →</a></p>
	</section>

	<!-- Derniers articles -->
	{#if data.latestPosts.length > 0}
		<section class="home-section">
			<span class="section-badge badge">Blog</span>
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
									<span class="entry-pill pill">{cat}</span>
								{/each}
							</footer>
						</a>
					</article>
				{/each}
			</div>
			<p class="section-more"><a href="/articles/">Voir tous les articles →</a></p>
		</section>
	{/if}

	<!-- Livres -->
	<section class="home-section">
		<span class="section-badge badge">Livres gratuits</span>
		<h2>Livres</h2>
		<div class="home-grid grid-2">
			{#each data.books as livre}
				<a href="/livres/{livre.slug}/" class="home-card glass-card home-card--large">
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

	<!-- Suivre -->
	<section class="home-section">
		<span class="section-badge badge">Connexion</span>
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
		padding: calc(var(--gap) * 4) 0 calc(var(--gap) * 3);
	}

	.hero-avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 0 auto var(--gap);
		object-fit: cover;
		border: 2px solid var(--border);
		box-shadow: 0 0 40px rgba(6, 182, 212, 0.15);
	}

	.hero-title {
		font-size: 3rem;
		margin-bottom: 4px;
		font-weight: 700;
	}

	.hero-subtitle {
		font-family: var(--font-ui);
		font-size: 1.1rem;
		color: var(--secondary);
		margin-bottom: 8px;
	}

	.hero-tagline {
		font-family: var(--font-body);
		font-size: 1.3rem;
		color: var(--accent);
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

	.section-badge {
		display: block;
		margin-bottom: 8px;
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
		color: var(--tertiary);
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
		text-decoration: none;
		color: inherit;
	}

	.home-card:hover {
		text-decoration: none;
		box-shadow: var(--accent-glow);
	}

	.home-card--app {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.card-icon {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		flex-shrink: 0;
	}

	.card-cover {
		width: 100%;
		height: 140px;
		object-fit: cover;
		border-radius: var(--radius-sm);
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
		color: var(--accent2);
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
		color: var(--tertiary);
	}

	/* Vision */
	.vision-quote {
		margin: var(--gap) 0;
		padding: var(--content-gap) var(--gap);
		border-left: 3px solid var(--accent2);
		background: var(--accent2-light);
		border-radius: 0 var(--radius) var(--radius) 0;
		font-style: italic;
		font-size: 1.1rem;
		color: var(--secondary);
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
			font-size: 2.25rem;
		}

		.grid-3 {
			grid-template-columns: 1fr;
		}

		.grid-2 {
			grid-template-columns: 1fr;
		}
	}
</style>
