<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Open Event Orchestrator"
	description="Plateforme open source de gestion d'événements. CFP, planning, billetterie, CRM, sponsoring, budget. 4 538 tests unitaires, 533 tests E2E."
	url="https://kevin.delfour.co/projets/open-event-orchestrator/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Open Event Orchestrator</span>
	</nav>

	<header class="project-header">
		<div>
			<span class="badge">Plateforme web</span>
			<h1>Open Event Orchestrator</h1>
			<p class="project-tagline">Le control plane open source pour les événements. Conférences, meetups, communautés — tout au même endroit.</p>
		</div>
		<a href="https://github.com/delfour-co/open-event-orchestrator" target="_blank" rel="noopener" class="github-link btn-secondary">Voir sur GitHub →</a>
	</header>

	<img src="/images/apps/oeo-social.png" alt="Open Event Orchestrator" class="hero-image" />

	<section class="project-section">
		<h2>Le concept</h2>
		<p>Organiser un événement tech implique de jongler entre une dizaine d'outils : un pour le CFP, un pour le planning, un pour la billetterie, un pour le CRM, un pour les sponsors. Open Event Orchestrator consolide tout cela dans une plateforme unique, auto-hébergeable et open source.</p>
	</section>

	<section class="project-section">
		<h2>Fonctionnalités</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Call for Papers</h3>
				<p>Gestion des soumissions speakers avec système de review et notifications.</p>
			</div>
			<div class="feature glass-card">
				<h3>Planning</h3>
				<p>Création de programme avec drag-and-drop. Gestion des salles, créneaux et conflits.</p>
			</div>
			<div class="feature glass-card">
				<h3>Billetterie</h3>
				<p>Vente de billets et check-in avec QR codes. Scanner PWA avec support offline.</p>
			</div>
			<div class="feature glass-card">
				<h3>CRM</h3>
				<p>Suivi de la communauté à travers les événements. Historique des participations.</p>
			</div>
			<div class="feature glass-card">
				<h3>Sponsoring</h3>
				<p>Gestion des sponsors et packages. Portail dédié avec accès personnalisé.</p>
			</div>
			<div class="feature glass-card">
				<h3>Budget</h3>
				<p>Suivi des dépenses, revenus et factures. Vision consolidée par événement.</p>
			</div>
			<div class="feature glass-card">
				<h3>PWA Participant</h3>
				<p>Application mobile pour les participants : agenda personnel, notifications, plan.</p>
			</div>
			<div class="feature glass-card">
				<h3>Intégrations</h3>
				<p>Slack, Discord, webhooks. API headless pour s'intégrer à l'existant.</p>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Qualité</h2>
		<div class="stats-row">
			<div class="stat glass-card">
				<span class="stat-value">4 538</span>
				<span class="stat-label">Tests unitaires</span>
			</div>
			<div class="stat glass-card">
				<span class="stat-value">533</span>
				<span class="stat-label">Tests E2E</span>
			</div>
			<div class="stat glass-card">
				<span class="stat-value">98%</span>
				<span class="stat-label">Couverture</span>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Stack technique</h2>
		<div class="tech-table">
			<div class="tech-row">
				<span class="tech-label">Frontend</span>
				<div class="tech-pills">
					<span class="pill">SvelteKit</span>
					<span class="pill">TypeScript</span>
					<span class="pill">Tailwind CSS</span>
					<span class="pill">shadcn-svelte</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Backend</span>
				<div class="tech-pills">
					<span class="pill">PocketBase</span>
					<span class="pill">SQLite</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Tests</span>
				<div class="tech-pills">
					<span class="pill">Vitest</span>
					<span class="pill">Playwright</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Qualité</span>
				<div class="tech-pills">
					<span class="pill">Biome</span>
					<span class="pill">GitHub Actions</span>
				</div>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Architecture</h2>
		<p>Clean Architecture avec organisation par feature. Conventional Commits. CI/CD via GitHub Actions. Le projet est conçu pour être auto-hébergé — PocketBase embarque sa propre base SQLite, pas besoin d'infrastructure externe.</p>
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

	.project-header h1 {
		margin: 4px 0 8px;
	}

	.project-tagline {
		color: var(--secondary);
		font-size: 1rem;
		max-width: 560px;
		line-height: 1.5;
	}

	.github-link {
		white-space: nowrap;
		flex-shrink: 0;
	}

	.hero-image {
		width: 100%;
		border-radius: var(--radius);
		margin-bottom: calc(var(--gap) * 2);
		border: 1px solid var(--border);
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

	/* Stats */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
	}

	.stat {
		padding: calc(var(--gap) * 1.5);
		text-align: center;
	}

	.stat-value {
		display: block;
		font-family: var(--font-ui);
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent);
	}

	.stat-label {
		display: block;
		font-family: var(--font-ui);
		font-size: 0.8rem;
		color: var(--secondary);
		margin-top: 4px;
	}

	/* Tech table */
	.tech-table {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.tech-row {
		display: flex;
		align-items: center;
		gap: var(--gap);
	}

	.tech-label {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 80px;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
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

		.stats-row {
			grid-template-columns: 1fr;
		}

		.tech-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}
	}
</style>
