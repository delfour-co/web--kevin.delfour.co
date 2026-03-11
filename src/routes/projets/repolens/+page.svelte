<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="RepoLens"
	description="CLI d'audit de dépôts GitHub. Bonnes pratiques, sécurité, compliance. Génère un plan de corrections applicable automatiquement."
	url="https://kevin.delfour.co/projets/repolens/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>RepoLens</span>
	</nav>

	<header class="project-header">
		<div>
			<span class="badge">CLI · Rust</span>
			<h1>RepoLens</h1>
			<p class="project-tagline">Audite tes dépôts GitHub pour les bonnes pratiques, la sécurité et la compliance. Génère un plan de corrections et les applique.</p>
		</div>
		<a href="https://github.com/delfour-co/repolens" target="_blank" rel="noopener" class="github-link btn-secondary">Voir sur GitHub →</a>
	</header>

	<img src="/images/apps/repolens-social.png" alt="RepoLens" class="hero-image" />

	<section class="project-section">
		<h2>Le concept</h2>
		<p>Un dépôt GitHub bien configuré protège contre les failles, facilite les contributions et rassure les utilisateurs. RepoLens inspecte un dépôt, identifie les écarts par rapport aux bonnes pratiques et propose un plan de corrections concret — applicable automatiquement ou en mode interactif avec prévisualisation des diffs.</p>
	</section>

	<section class="project-section">
		<h2>Ce que RepoLens vérifie</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Secrets exposés</h3>
				<p>Détection de credentials, tokens et clés dans le code et la configuration.</p>
			</div>
			<div class="feature glass-card">
				<h3>Fichiers requis</h3>
				<p>README, LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, CODEOWNERS.</p>
			</div>
			<div class="feature glass-card">
				<h3>GitHub Actions</h3>
				<p>Validation des workflows et des Actions utilisées. Détection des versions non-pinées.</p>
			</div>
			<div class="feature glass-card">
				<h3>Licences</h3>
				<p>Vérification de compliance des licences à travers l'arbre de dépendances.</p>
			</div>
			<div class="feature glass-card">
				<h3>Bonnes pratiques</h3>
				<p>Branch protection, topics, description, templates d'issues et de PR.</p>
			</div>
			<div class="feature glass-card">
				<h3>Règles custom</h3>
				<p>Patterns regex et commandes shell personnalisées pour des vérifications métier.</p>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Workflow</h2>
		<div class="steps">
			<div class="step glass-card">
				<span class="step-number">1</span>
				<div>
					<h3>repolens init</h3>
					<p>Initialise la configuration. Presets disponibles : opensource, enterprise, strict.</p>
				</div>
			</div>
			<div class="step glass-card">
				<span class="step-number">2</span>
				<div>
					<h3>repolens plan</h3>
					<p>Génère un plan d'audit détaillé avec les corrections à appliquer.</p>
				</div>
			</div>
			<div class="step glass-card">
				<span class="step-number">3</span>
				<div>
					<h3>repolens apply</h3>
					<p>Applique les corrections. Mode dry-run, interactif avec diff, ou auto-accept.</p>
				</div>
			</div>
			<div class="step glass-card">
				<span class="step-number">4</span>
				<div>
					<h3>repolens report</h3>
					<p>Génère un rapport. Formats : terminal, JSON, SARIF, Markdown, HTML.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Distribution</h2>
		<div class="tech-table">
			<div class="tech-row">
				<span class="tech-label">macOS / Linux</span>
				<div class="tech-pills">
					<span class="pill">Homebrew</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Windows</span>
				<div class="tech-pills">
					<span class="pill">Scoop</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Arch Linux</span>
				<div class="tech-pills">
					<span class="pill">AUR</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Conteneur</span>
				<div class="tech-pills">
					<span class="pill">Docker</span>
					<span class="pill">GHCR</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Rust</span>
				<div class="tech-pills">
					<span class="pill">Cargo</span>
				</div>
			</div>
			<div class="tech-row">
				<span class="tech-label">Binaires</span>
				<div class="tech-pills">
					<span class="pill">Linux x86/ARM</span>
					<span class="pill">macOS Intel/Apple Silicon</span>
					<span class="pill">Windows</span>
				</div>
			</div>
		</div>
	</section>

	<section class="project-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">Rust</span>
			<span class="pill">Cargo</span>
			<span class="pill">TOML</span>
			<span class="pill">JSON Schema</span>
			<span class="pill">SARIF</span>
			<span class="pill">GitHub Actions</span>
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

	/* Steps */
	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	.step {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		padding: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.step-number {
		font-family: var(--font-ui);
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--accent);
		border-radius: 50%;
	}

	.step h3 {
		font-size: 0.95rem;
		margin: 0 0 4px;
		font-family: var(--font-mono, var(--font-ui));
	}

	.step p {
		font-size: 0.85rem;
		margin: 0;
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
		min-width: 110px;
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

		.tech-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}
	}
</style>
