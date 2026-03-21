<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ProjectProgress from '$lib/components/ProjectProgress.svelte';
	import { getProjectStage } from '$lib/data/projects';
</script>

<SEO
	title="Claude Pulse"
	description="Monitore tes agents Claude Code en temps réel depuis le bureau. Multi-profils, suivi live, notifications desktop."
	url="https://kevin.delfour.co/projets/claude-pulse/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Claude Pulse</span>
	</nav>

	<header class="project-header">
		<div class="project-identity">
			<div>
				<span class="badge">Desktop · JavaScript</span>
				<h1>Claude Pulse</h1>
				<p class="project-tagline">Monitore tes agents Claude Code en temps réel depuis le bureau. Support multi-profils, suivi live et notifications desktop.</p>
			</div>
		</div>
		<div class="project-links">
			<a href="https://github.com/delfour-co/claude-pulse" target="_blank" rel="noopener" class="btn-primary">Voir sur GitHub →</a>
		</div>
	</header>

	<div class="progress-section">
		<ProjectProgress stage={getProjectStage('claude-pulse')!} />
	</div>

	<section class="project-section">
		<h2>Le concept</h2>
		<p>Quand on lance plusieurs agents Claude Code en parallèle, on perd vite la visibilité sur ce qui tourne, où ça en est, et ce qui attend une action. Claude Pulse centralise le suivi de tous les agents actifs dans une app desktop, avec des notifications pour ne rien rater.</p>
	</section>

	<section class="project-section">
		<h2>Fonctionnalités</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Suivi temps réel</h3>
				<p>Visualise l'état de chaque agent Claude Code en cours d'exécution.</p>
			</div>
			<div class="feature glass-card">
				<h3>Multi-profils</h3>
				<p>Gère plusieurs profils de travail et bascule entre eux.</p>
			</div>
			<div class="feature glass-card">
				<h3>Notifications desktop</h3>
				<p>Alertes natives quand un agent termine, échoue ou attend une action.</p>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">JavaScript</span>
			<span class="pill">Electron</span>
			<span class="pill">Desktop</span>
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
