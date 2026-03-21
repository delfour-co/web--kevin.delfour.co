<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ProjectProgress from '$lib/components/ProjectProgress.svelte';
	import { getProjectStage } from '$lib/data/projects';
</script>

<SEO
	title="Git Hero"
	description="App mobile de livres-jeux interactifs pilotés par l'historique git. Apprendre git en jouant."
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
				<p class="project-tagline">App mobile de livres-jeux interactifs où l'historique git pilote la narration. Apprendre git en jouant.</p>
			</div>
		</div>
		<div class="project-links">
			<a href="https://github.com/delfour-co/githero" target="_blank" rel="noopener" class="btn-primary">Voir sur GitHub →</a>
		</div>
	</header>

	<div class="progress-section">
		<ProjectProgress stage={getProjectStage('githero')!} />
	</div>

	<section class="project-section">
		<h2>Le concept</h2>
		<p>Git Hero transforme l'apprentissage de git en aventure interactive. Chaque livre-jeu utilise un vrai historique git comme moteur narratif : les branches deviennent des choix, les commits des étapes, et les merges des résolutions. Le lecteur progresse en manipulant git pour avancer dans l'histoire.</p>
	</section>

	<section class="project-section">
		<h2>Fonctionnalités</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Livres-jeux interactifs</h3>
				<p>Des aventures narratives où chaque choix correspond à une opération git.</p>
			</div>
			<div class="feature glass-card">
				<h3>Historique git comme moteur</h3>
				<p>L'arbre git réel pilote la progression et les embranchements de l'histoire.</p>
			</div>
			<div class="feature glass-card">
				<h3>Apprentissage par la pratique</h3>
				<p>Comprendre branch, merge, rebase et cherry-pick en contexte narratif.</p>
			</div>
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

	@media (max-width: 640px) {
		.project-header {
			flex-direction: column;
		}
	}
</style>
