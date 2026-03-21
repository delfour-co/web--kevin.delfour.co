<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ProjectProgress from '$lib/components/ProjectProgress.svelte';
	import { getProjectStage } from '$lib/data/projects';

	const screenshots = [
		{ src: '/images/apps/githero/git-hero_008.png', alt: 'Bibliothèque — liste des livres-jeux' },
		{ src: '/images/apps/githero/git-hero_007.png', alt: 'Fiche livre — Le Signal, thriller dev' },
		{ src: '/images/apps/githero/git-hero_001.png', alt: 'Écran de connexion — $ git login' },
		{ src: '/images/apps/githero/git-hero_002.png', alt: 'Inscription — $ git init --user' },
		{ src: '/images/apps/githero/git-hero_003.png', alt: 'Carte du livre — $ git log --graph' },
		{ src: '/images/apps/githero/git-hero_004.png', alt: 'Lecture d\'un commit sur une branche' },
		{ src: '/images/apps/githero/git-hero_005.png', alt: 'Choix de branche — $ git checkout' },
		{ src: '/images/apps/githero/git-hero_006.png', alt: 'Divergence détectée — choix multiples' }
	];

	let selectedImage: string | null = $state(null);
</script>

<SEO
	title="Git Hero"
	description="L'histoire vit dans les commits. Des livres-jeux interactifs où les branches git sont vos choix."
	url="https://kevin.delfour.co/projets/githero/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Git Hero</span>
	</nav>

	<header class="project-header">
		<div class="project-identity">
			<img src="/images/apps/githero/icon.png" alt="Icône Git Hero" class="project-icon" />
			<div>
				<span class="badge">Mobile · Dart</span>
				<h1>Git Hero</h1>
				<p class="project-tagline">L'histoire vit dans les commits. Des livres-jeux interactifs où les branches git sont vos choix.</p>
			</div>
		</div>
		<div class="project-links">
			<a href="http://githero.demo.delfour.co/" target="_blank" rel="noopener" class="btn-primary">Tester la démo →</a>
			<a href="https://github.com/delfour-co/githero" target="_blank" rel="noopener" class="btn-secondary">Voir sur GitHub →</a>
		</div>
	</header>

	<div class="progress-section">
		<ProjectProgress stage={getProjectStage('githero')!} />
	</div>

	<section class="project-section">
		<h2>Le concept</h2>
		<p>Des livres-jeux interactifs où les branches git sont vos choix. Chaque commit est un fragment narratif, chaque branche un embranchement de l'histoire. Aux points de divergence, le lecteur explore les chemins — chaque route mène à une fin différente.</p>
	</section>

	<section class="project-section">
		<h2>Comment ça marche</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Catalogue</h3>
				<p>Parcourez le catalogue et découvrez les détails de chaque histoire.</p>
			</div>
			<div class="feature glass-card">
				<h3>Lecture par commits</h3>
				<p>Chaque commit est un fragment narratif. Avancez dans le récit étape par étape.</p>
			</div>
			<div class="feature glass-card">
				<h3>Branches = choix</h3>
				<p>Aux points de divergence, explorez les branches — chaque chemin mène à une fin différente.</p>
			</div>
			<div class="feature glass-card">
				<h3>Git graph</h3>
				<p>Visualisez votre progression comme un git graph. Repérez les branches inexplorées.</p>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Au catalogue</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Le Signal</h3>
				<p>Un développeur reçoit un commit qu'il n'a jamais écrit. Le SHA est impossible.</p>
			</div>
			<div class="feature glass-card">
				<h3>La Faille</h3>
				<p>Une IA de code review commence à laisser des commentaires étranges sur les pull requests.</p>
			</div>
			<div class="feature glass-card">
				<h3>Comment planter sa startup</h3>
				<p>Tu viens de lever 500 000 €. Tu as un pitch deck en béton, un logo qui claque, et absolument aucune idée de ce que tu fais.</p>
			</div>
			<div class="feature glass-card">
				<h3>Le CTO qui savait tout</h3>
				<p>Tu viens d'être promu CTO. Tu étais le meilleur développeur de l'équipe, donc logiquement, tu seras le meilleur manager technique.</p>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Captures d'écran</h2>
		<div class="screenshots-grid">
			{#each screenshots as screenshot}
				<button class="screenshot-thumb" onclick={() => selectedImage = screenshot.src}>
					<img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
				</button>
			{/each}
		</div>
	</section>

	<section class="project-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">Dart</span>
			<span class="pill">Flutter</span>
			<span class="pill">Git</span>
		</div>
	</section>

	<footer class="project-footer">
		<a href="/projets/" class="back-link">← Retour aux projets</a>
	</footer>
</div>

{#if selectedImage}
	<div class="lightbox" role="dialog" aria-label="Image agrandie" onclick={() => selectedImage = null} onkeydown={(e) => e.key === 'Escape' && (selectedImage = null)}>
		<button class="lightbox-close" onclick={() => selectedImage = null} aria-label="Fermer">✕</button>
		<img src={selectedImage} alt="Capture d'écran agrandie" />
	</div>
{/if}

<style>
	.page-container {
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
	}

	.breadcrumb a {
		color: var(--secondary);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--gap);
		margin-bottom: calc(var(--gap) * 2);
		flex-wrap: wrap;
	}

	.project-identity {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.project-icon {
		width: 80px;
		height: 80px;
		border-radius: 18px;
		flex-shrink: 0;
	}

	.project-links {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.project-header h1 {
		margin: 4px 0 8px;
	}

	.project-tagline {
		color: var(--secondary);
		font-size: 1rem;
		max-width: 560px;
		line-height: 1.5;
	}

	.project-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.project-section h2 {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.project-section p {
		color: var(--secondary);
		line-height: 1.6;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--gap);
	}

	.feature {
		padding: calc(var(--gap) * 1.2);
	}

	.feature h3 {
		font-size: 0.95rem;
		margin: 0 0 6px;
		font-family: var(--font-ui);
	}

	.feature p {
		font-size: 0.85rem;
		color: var(--secondary);
		margin: 0;
		line-height: 1.5;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.progress-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.project-footer {
		padding-top: calc(var(--gap) * 1.5);
		border-top: 1px solid var(--border);
	}

	.back-link {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--accent);
	}

	/* Screenshots */
	.screenshots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: var(--gap);
	}

	.screenshot-thumb {
		background: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		transition: all 0.2s ease;
	}

	.screenshot-thumb:hover {
		border-color: var(--accent-border);
		box-shadow: var(--accent-glow);
	}

	.screenshot-thumb img {
		width: 100%;
		height: auto;
		display: block;
	}

	/* Lightbox */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gap);
		cursor: pointer;
	}

	.lightbox img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: var(--radius);
		cursor: default;
	}

	.lightbox-close {
		position: absolute;
		top: 20px;
		right: 20px;
		background: none;
		border: none;
		color: var(--primary);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 8px;
	}

	@media (max-width: 640px) {
		.project-header {
			flex-direction: column;
		}

		.screenshots-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
