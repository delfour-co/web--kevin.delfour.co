<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { getProjectStageLabel } from '$lib/data/projects';
</script>

<SEO
	title="Projets"
	description="Applications mobiles, outils CLI, plateforme événementielle et jeux — les projets en cours de développement."
	url="https://kevin.delfour.co/projets/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Projets</span>
		<h1>Projets en cours</h1>
		<p class="page-description">Les projets sur lesquels je travaille actuellement. Applications mobiles, outils CLI, plateforme web et jeu RPG.</p>
	</header>

	<!-- Jeux mobiles -->
	<section class="category-section">
		<h2>Jeux mobiles</h2>
		<div class="apps-grid">
			<a href="/projets/asteroids/" class="app-card glass-card">
				<img src="/images/apps/asteroids/icon.webp" alt="Icône Neon Asteroids" class="app-card-icon" />
				<div class="app-card-content">
					<h3>Neon Asteroids</h3>
					<p>Arcade shooter néon avec Flutter et Flame. Vagues progressives, UFOs, power-ups, combos.</p>
					<div class="project-meta">
						<span class="project-lang">Flutter</span>
						<span class="project-tech pill">Flame</span>
						<span class="project-tech pill">Dart</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('asteroids')}</span>
				</div>
			</a>
			<a href="/projets/arcane-craft/" class="app-card glass-card">
				<img src="/images/apps/arcane-craft/app_icon.png" alt="Icône Arcane Craft" class="app-card-icon" />
				<div class="app-card-content">
					<h3>Arcane Craft</h3>
					<p>Action-RPG top-down avec craft de sorts 3×3. Donjons procéduraux, puzzles élémentaires, boss.</p>
					<div class="project-meta">
						<span class="project-lang">Flutter</span>
						<span class="project-tech pill">Flame</span>
						<span class="project-tech pill">RPG</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('arcane-craft')}</span>
				</div>
			</a>
		</div>
	</section>

	<!-- App mobile -->
	<section class="category-section">
		<h2>Applications mobiles</h2>
		<div class="apps-grid">
			<a href="/projets/notch/" class="app-card glass-card">
				<img src="/images/apps/notch/icon.webp" alt="Icône Notch" class="app-card-icon" />
				<div class="app-card-content">
					<h3>Notch</h3>
					<p>Messagerie SMS chiffrée par Enigma. Pas de serveur, pas d'internet. Juste des rotors et des SMS.</p>
					<div class="project-meta">
						<span class="project-lang">Flutter</span>
						<span class="project-tech pill">Enigma</span>
						<span class="project-tech pill">SMS</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('notch')}</span>
				</div>
			</a>
			<a href="/projets/githero/" class="app-card glass-card">
				<img src="/images/apps/githero/icon.png" alt="Icône Git Hero" class="app-card-icon" />
				<div class="app-card-content">
					<h3>Git Hero</h3>
					<p>L'histoire vit dans les commits. Des livres-jeux interactifs où les branches git sont vos choix.</p>
					<div class="project-meta">
						<span class="project-lang">Flutter</span>
						<span class="project-tech pill">Dart</span>
						<span class="project-tech pill">Git</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('githero')}</span>
				</div>
			</a>
		</div>
	</section>

	<!-- Web app -->
	<section class="category-section">
		<h2>Web app</h2>
		<div class="apps-grid">
			<a href="/projets/open-event-orchestrator/" class="app-card glass-card">
				<img src="/images/apps/oeo/icon.webp" alt="Icône Open Event Orchestrator" class="app-card-icon" />
				<div class="app-card-content">
					<h3>Open Event Orchestrator</h3>
					<p>Plateforme open source de gestion d'événements. CFP, planning, billetterie, CRM, sponsoring, budget.</p>
					<div class="project-meta">
						<span class="project-lang">TypeScript</span>
						<span class="project-tech pill">SvelteKit</span>
						<span class="project-tech pill">PocketBase</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('open-event-orchestrator')}</span>
				</div>
			</a>
		</div>
	</section>

	<!-- Desktop -->
	<section class="category-section">
		<h2>Desktop</h2>
		<div class="apps-grid">
			<a href="/projets/claude-pulse/" class="app-card glass-card">
				<div class="app-card-icon-placeholder">CP</div>
				<div class="app-card-content">
					<h3>Claude Pulse</h3>
					<p>Monitore tes agents Claude Code en temps réel depuis le bureau. Multi-profils, suivi live, notifications desktop.</p>
					<div class="project-meta">
						<span class="project-lang">JavaScript</span>
						<span class="project-tech pill">Electron</span>
						<span class="project-tech pill">Desktop</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('claude-pulse')}</span>
				</div>
			</a>
		</div>
	</section>

	<!-- CLI -->
	<section class="category-section">
		<h2>CLI</h2>
		<div class="apps-grid">
			<a href="/projets/repolens/" class="app-card glass-card">
				<img src="/images/apps/repolens/icon.webp" alt="Icône RepoLens" class="app-card-icon" />
				<div class="app-card-content">
					<h3>RepoLens</h3>
					<p>CLI d'audit de dépôts GitHub. Bonnes pratiques, sécurité, compliance. Export JSON, SARIF, Markdown, HTML.</p>
					<div class="project-meta">
						<span class="project-lang">Rust</span>
						<span class="project-tech pill">CLI</span>
						<span class="project-tech pill">GitHub</span>
					</div>
					<span class="status-stage"><span class="status-label">Étape :</span> {getProjectStageLabel('repolens')}</span>
				</div>
			</a>
		</div>
	</section>

</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; }

	.category-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.category-section h2 {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.section-subtitle {
		color: var(--tertiary);
		font-size: 0.85rem;
		margin: -8px 0 var(--gap) 0;
	}

	/* App cards (mobile apps with icons) */
	.apps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: var(--gap);
	}

	.app-card {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		padding: calc(var(--gap) * 1.2);
		text-decoration: none;
		color: inherit;
		align-items: flex-start;
	}

	.app-card:hover {
		text-decoration: none;
		box-shadow: var(--accent-glow);
		border-color: var(--accent-border);
	}

	.app-card-icon {
		width: 56px;
		height: 56px;
		border-radius: 14px;
		flex-shrink: 0;
	}

	.app-card-icon-placeholder {
		width: 56px;
		height: 56px;
		border-radius: 14px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		color: var(--accent);
		font-family: var(--font-ui);
		font-weight: 700;
		font-size: 16px;
	}

	.app-card-content h3 {
		font-size: 1rem;
		margin: 0 0 6px;
		font-family: var(--font-ui);
	}

	.app-card-content p {
		font-size: 0.85rem;
		color: var(--secondary);
		margin: 0 0 8px;
		line-height: 1.5;
	}

	/* Project cards */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--gap);
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: calc(var(--gap) * 1.2);
		text-decoration: none;
		color: inherit;
	}

	.project-card:hover {
		text-decoration: none;
		box-shadow: var(--accent-glow);
		border-color: var(--accent-border);
	}

	.project-card--wip {
		opacity: 0.7;
		border-style: dashed;
	}

	.project-name {
		font-size: 1rem;
		margin: 0;
		font-family: var(--font-ui);
	}

	.project-desc {
		font-size: 0.85rem;
		color: var(--secondary);
		margin: 0;
		line-height: 1.5;
	}

	.project-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-top: 4px;
	}

	.project-lang {
		font-family: var(--font-ui);
		font-size: 11px;
		padding: 2px 10px;
		background: var(--accent);
		color: #000;
		border-radius: 9999px;
		font-weight: 600;
	}

	.status-stage {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		color: var(--accent);
		border: 1px solid var(--accent-border);
		background: var(--accent-light);
		padding: 2px 10px;
		border-radius: 9999px;
		margin-top: 6px;
	}

	.status-label {
		font-weight: 400;
		color: var(--secondary);
	}

	/* Katas collapsible */
	.other-projects {
		margin-top: calc(var(--gap) * 2);
		border-top: 1px solid var(--border);
		padding-top: calc(var(--gap) * 1.5);
	}

	.other-projects summary {
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 600;
		color: var(--secondary);
		cursor: pointer;
		padding: 8px 0;
		margin-bottom: var(--gap);
	}

	.other-projects summary:hover {
		color: var(--accent);
	}

	.sub-category {
		font-size: 1rem;
		margin-bottom: calc(var(--gap) * 0.8);
		padding-bottom: 6px;
		border-bottom: 1px solid var(--border);
		color: var(--secondary);
	}

	@media (max-width: 640px) {
		.apps-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
