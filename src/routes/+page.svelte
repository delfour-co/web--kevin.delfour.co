<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { onMount } from 'svelte';
	import { toolCategories } from '$lib/data/tools';
	import { getProjectStageLabel } from '$lib/data/projects';

	let { data } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Flatten all tools for homepage display (max 6)
	const featuredTools = toolCategories.flatMap((c) => c.tools).slice(0, 6);

	onMount(() => {
		// Scroll reveal with IntersectionObserver
		const reveals = document.querySelectorAll('.reveal');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);
		reveals.forEach((el) => observer.observe(el));

		// Mouse-following glow on glass-cards
		const cards = document.querySelectorAll('.glass-card');
		function handleMouseMove(e: MouseEvent) {
			const card = e.currentTarget as HTMLElement;
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
			card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
		}
		cards.forEach((card) => {
			card.addEventListener('mousemove', handleMouseMove as EventListener);
		});

		return () => {
			observer.disconnect();
			cards.forEach((card) => {
				card.removeEventListener('mousemove', handleMouseMove as EventListener);
			});
		};
	});
</script>

<SEO
	description="CTO Hands-on · 17 ans de terrain. Outils de décision, livres gratuits et projets open source."
	url="https://kevin.delfour.co/"
/>

<div class="home">
	<!-- Hero -->
	<section class="hero">
		<!-- Animated background -->
		<div class="hero-bg" aria-hidden="true">
			<div class="hero-orb hero-orb--1"></div>
			<div class="hero-orb hero-orb--2"></div>
			<div class="hero-orb hero-orb--3"></div>
			<div class="hero-glow"></div>
		</div>

		<div class="hero-content">
			<div class="hero-avatar-wrapper">
				<div class="avatar-ring"></div>
				<div class="avatar-glow"></div>
				<img src="/images/kevin-delfour.webp" alt="Kevin Delfour" class="hero-avatar" width="140" height="140" />
			</div>
			<h1 class="hero-title gradient-text">Kevin Delfour</h1>
			<p class="hero-subtitle">CTO Hands-on · 17 ans de terrain</p>
			<p class="hero-tagline">Je donne des repères. Pas des leçons.</p>
			<div class="hero-actions">
				<a href="/outils/" class="btn-primary">Voir les outils</a>
				<a href="/livres/" class="btn-secondary">Lire les livres</a>
			</div>
		</div>

		<div class="scroll-indicator" aria-hidden="true">
			<span class="scroll-label">Scroll</span>
			<div class="scroll-chevrons">
				<div class="scroll-chevron scroll-chevron-1"></div>
				<div class="scroll-chevron scroll-chevron-2"></div>
				<div class="scroll-chevron scroll-chevron-3"></div>
			</div>
		</div>
	</section>

	<!-- Outils -->
	<section class="home-section reveal">
		<span class="section-badge badge">Boîte à outils</span>
		<h2>Outils d'aide à la décision</h2>
		<div class="home-grid grid-3">
			{#each featuredTools as tool, i}
				<a href={tool.url} class="home-card glass-card reveal reveal-delay-{(i % 3) + 1}">
					<div class="tool-icon-sm">
						<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
							{@html tool.icon}
						</svg>
					</div>
					<h3 class="card-title">{tool.nom}</h3>
					<p class="card-desc">{tool.description}</p>
				</a>
			{/each}
		</div>
		<p class="section-more"><a href="/outils/">Voir tous les outils →</a></p>
	</section>

	<!-- Projets -->
	<section class="home-section reveal">
		<span class="section-badge badge">Projets</span>
		<h2>Ce que je construis</h2>
		<div class="home-grid grid-2">
			<a href="/projets/asteroids/" class="home-card glass-card home-card--app reveal reveal-delay-1">
				<img src="/images/apps/asteroids/icon.webp" alt="Neon Asteroids" class="card-icon" />
				<div>
					<h3 class="card-title">Neon Asteroids</h3>
					<p class="card-desc">Arcade shooter néon. Flutter + Flame.</p>
					<span class="card-stage">{getProjectStageLabel('asteroids')}</span>
				</div>
			</a>
			<a href="/projets/notch/" class="home-card glass-card home-card--app reveal reveal-delay-2">
				<img src="/images/apps/notch/icon.webp" alt="Notch" class="card-icon" />
				<div>
					<h3 class="card-title">Notch</h3>
					<p class="card-desc">SMS chiffrés par Enigma. Pas de serveur.</p>
					<span class="card-stage">{getProjectStageLabel('notch')}</span>
				</div>
			</a>
			<a href="/projets/open-event-orchestrator/" class="home-card glass-card home-card--app reveal reveal-delay-3">
				<img src="/images/apps/oeo/icon.webp" alt="Open Event Orchestrator" class="card-icon" />
				<div>
					<h3 class="card-title">Open Event Orchestrator</h3>
					<p class="card-desc">Plateforme open source de gestion d'événements. CFP, planning, billetterie, CRM.</p>
					<span class="card-stage">{getProjectStageLabel('open-event-orchestrator')}</span>
				</div>
			</a>
			<a href="/projets/repolens/" class="home-card glass-card home-card--app reveal reveal-delay-4">
				<img src="/images/apps/repolens/icon.webp" alt="RepoLens" class="card-icon" />
				<div>
					<h3 class="card-title">RepoLens</h3>
					<p class="card-desc">CLI d'audit de dépôts GitHub. Bonnes pratiques, sécurité, compliance.</p>
					<span class="card-stage">{getProjectStageLabel('repolens')}</span>
				</div>
			</a>
		</div>
		<p class="section-more"><a href="/projets/">Voir tous les projets →</a></p>
	</section>

	<!-- Livres -->
	<section class="home-section reveal">
		<span class="section-badge badge">Livres gratuits</span>
		<h2>Livres</h2>
		<div class="home-grid grid-2">
			{#each data.books as livre, i}
				<a href="/livres/{livre.slug}/" class="home-card glass-card home-card--book reveal reveal-delay-{i + 1}">
					{#if livre.cover}
						<div class="book-cover-wrapper">
							<img src={livre.cover} alt="Couverture {livre.title}" class="card-book-cover" loading="lazy" />
						</div>
					{/if}
					<div class="book-card-info">
						<h3 class="card-title">{livre.title}</h3>
						<p class="card-subtitle">{livre.subtitle}</p>
						<span class="card-meta">{livre.chapterCount} chapitres · Gratuit</span>
					</div>
				</a>
			{/each}
		</div>
		<p class="section-more"><a href="/livres/">Voir les livres →</a></p>
	</section>

	<!-- Derniers articles -->
	{#if data.latestPosts.length > 0}
		<section class="home-section reveal">
			<span class="section-badge badge">Blog</span>
			<h2>Derniers articles</h2>
			<div class="articles-list">
				{#each data.latestPosts.slice(0, 4) as post, i}
					<article class="post-entry reveal reveal-delay-{(i % 4) + 1}">
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

	<!-- Suivre -->
	<section class="home-section reveal">
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
		position: relative;
	}

	/* Hero */
	.hero {
		position: relative;
		overflow: hidden;
		margin: 0 calc(var(--gap) * -1);
		padding: calc(var(--gap) * 6) var(--gap) calc(var(--gap) * 4);
		min-height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Hero background layers */
	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.hero-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
	}

	.hero-orb--1 {
		width: 400px;
		height: 400px;
		background: rgba(6, 182, 212, 0.12);
		top: 10%;
		left: 15%;
		animation: orb-float-1 12s ease-in-out infinite;
	}

	.hero-orb--2 {
		width: 350px;
		height: 350px;
		background: rgba(139, 92, 246, 0.1);
		top: 20%;
		right: 10%;
		animation: orb-float-2 15s ease-in-out infinite;
	}

	.hero-orb--3 {
		width: 300px;
		height: 300px;
		background: rgba(236, 72, 153, 0.08);
		bottom: 10%;
		left: 40%;
		animation: orb-float-3 18s ease-in-out infinite;
	}

	.hero-glow {
		position: absolute;
		top: 54%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
		border-radius: 50%;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.hero-avatar-wrapper {
		position: relative;
		width: 148px;
		height: 148px;
		margin: 0 auto calc(var(--gap) * 2);
	}

	.avatar-ring {
		position: absolute;
		inset: -8px;
		border-radius: 50%;
		background: conic-gradient(from 0deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
		animation: ring-rotate 6s linear infinite;
	}

	.avatar-ring::after {
		content: '';
		position: absolute;
		inset: 5px;
		border-radius: 50%;
		background: #000;
	}

	.avatar-ring::before {
		content: '';
		position: absolute;
		inset: -8px;
		border-radius: 50%;
		background: conic-gradient(from 0deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3), rgba(236,72,153,0.3), rgba(6,182,212,0.3));
		filter: blur(10px);
		animation: ring-rotate 6s linear infinite;
		z-index: -1;
	}

	.avatar-glow {
		position: absolute;
		inset: -30px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%);
		animation: glow-pulse 3s ease-in-out infinite;
	}

	.hero-avatar {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.hero-title {
		font-size: 4rem;
		margin-bottom: 12px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.hero-subtitle {
		font-family: var(--font-ui);
		font-size: 1.2rem;
		color: var(--secondary);
		margin-bottom: 16px;
		letter-spacing: 0.02em;
	}

	.hero-tagline {
		font-family: var(--font-body);
		font-size: 1.5rem;
		color: var(--accent);
		margin-bottom: calc(var(--gap) * 2.5);
		text-shadow: 0 0 40px rgba(6, 182, 212, 0.4);
	}

	.hero-actions {
		display: flex;
		justify-content: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	/* Sections */
	.home-section {
		padding: calc(var(--gap) * 1) 0;
	}

	.home-section::before {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2), transparent);
		margin-bottom: calc(var(--gap) * 1);
		animation: circuit-pulse 4s ease-in-out infinite;
	}

	@keyframes circuit-pulse {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 1; }
	}

	.section-badge {
		display: block;
		margin-bottom: 8px;
	}

	.home-section h2 {
		margin-top: 0;
		font-size: 1.6rem;
	}

	.section-more {
		margin-top: calc(var(--gap) * 1.5);
	}

	.section-more a {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		position: relative;
	}

	.section-more a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--accent);
		transition: width 0.3s ease;
	}

	.section-more a:hover::after {
		width: 100%;
	}

	.section-more a:hover {
		text-decoration: none;
	}

	/* Tool icon */
	.tool-icon-sm {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		color: var(--accent);
		margin-bottom: 12px;
		transition: all 0.3s ease;
	}

	.home-card:hover .tool-icon-sm {
		background: var(--accent);
		color: #000;
		box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
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
		transition: all 0.3s ease;
	}

	.entry-link:hover {
		text-decoration: none;
		padding-left: 12px;
	}

	.entry-link:hover .entry-title {
		color: var(--accent);
	}

	.entry-title {
		font-size: 1.15rem;
		margin: 0 0 4px 0;
		transition: all 0.3s ease;
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
		border: 1px solid rgba(6, 182, 212, 0.15);
		box-shadow: 0 0 6px rgba(6, 182, 212, 0.05);
		transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}

	.home-card:hover .card-icon {
		transform: scale(1.08);
		border-color: rgba(6, 182, 212, 0.4);
		box-shadow: 0 0 12px rgba(6, 182, 212, 0.2);
	}

	.home-card--book {
		flex-direction: row;
		display: flex;
		gap: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.book-cover-wrapper {
		flex-shrink: 0;
		width: 120px;
		border-radius: var(--radius-sm);
		overflow: hidden;
		border: 1px solid rgba(6, 182, 212, 0.15);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}

	.card-book-cover {
		width: 100%;
		height: auto;
		display: block;
	}

	.home-card:hover .book-cover-wrapper {
		transform: scale(1.03);
		border-color: rgba(6, 182, 212, 0.4);
		box-shadow: 0 6px 20px rgba(6, 182, 212, 0.15);
	}

	.book-card-info {
		flex: 1;
		min-width: 0;
		padding-top: 4px;
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

	.card-stage {
		display: inline-block;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		color: var(--accent);
		border: 1px solid var(--accent-border);
		background: var(--accent-light);
		padding: 2px 10px;
		border-radius: 9999px;
		margin-top: 4px;
	}

	/* Follow */
	.follow-text {
		color: var(--secondary);
	}

	/* Scroll indicator — mobile only */
	.scroll-indicator {
		display: none;
		position: absolute;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.scroll-label {
		font-family: var(--font-ui);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--secondary);
	}

	.scroll-chevrons {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.scroll-chevron {
		width: 14px;
		height: 8px;
		border-left: 2px solid var(--accent);
		border-right: 2px solid var(--accent);
		border-bottom: 2px solid var(--accent);
		border-radius: 0 0 6px 6px;
		transform: rotate(0deg);
		opacity: 0.2;
	}

	.scroll-chevron-1 {
		animation: scroll-chevron 1.6s ease-in-out infinite;
	}

	.scroll-chevron-2 {
		animation: scroll-chevron 1.6s ease-in-out infinite 0.15s;
	}

	.scroll-chevron-3 {
		animation: scroll-chevron 1.6s ease-in-out infinite 0.3s;
	}

	@keyframes scroll-chevron {
		0% { transform: translateY(0); opacity: 0.1; }
		40% { transform: translateY(3px); opacity: 0.7; }
		80%, 100% { transform: translateY(6px); opacity: 0; }
	}

	/* Responsive */
	@media (max-width: 768px) {
		.scroll-indicator {
			display: flex;
		}
		.hero {
			min-height: 70vh;
			padding: calc(var(--gap) * 4) var(--gap) calc(var(--gap) * 3);
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-tagline {
			font-size: 1.1rem;
		}

		.grid-3 {
			grid-template-columns: 1fr;
		}

		.grid-2 {
			grid-template-columns: 1fr;
		}

		.hero-avatar-wrapper {
			width: 160px;
			height: 160px;
		}

		.hero-avatar {
			width: 150px;
			height: 150px;
		}

		.hero-orb--1 { width: 200px; height: 200px; }
		.hero-orb--2 { width: 180px; height: 180px; }
		.hero-orb--3 { width: 150px; height: 150px; }
	}
</style>
