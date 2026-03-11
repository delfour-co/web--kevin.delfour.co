<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Arcane Craft"
	description="Action-RPG mobile top-down avec craft de sorts dans une grille 3×3. Donjons procéduraux, puzzles élémentaires, boss. Flutter + Flame."
	url="https://kevin.delfour.co/projets/arcane-craft/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Arcane Craft</span>
	</nav>

	<header class="app-header">
		<div class="app-identity">
			<img src="/images/apps/arcane-craft/app_icon.png" alt="Icône Arcane Craft" class="app-icon" />
			<div>
				<span class="badge">Jeu mobile</span>
				<h1>Arcane Craft</h1>
				<p class="app-tagline">Action-RPG top-down où tu fabriques tes propres sorts. Structure Zelda 2D : overworld, donjons procéduraux, puzzles élémentaires, boss.</p>
			</div>
		</div>
		<span class="status-pill">En développement</span>
	</header>

	<img src="/images/apps/arcane-craft/forging.png" alt="Système de craft de sorts — Arcane Craft" class="hero-image" />

	<section class="app-section">
		<h2>Le concept</h2>
		<p>Le joueur place des runes élémentaires dans une grille de craft 3×3. La position dans la grille affecte la puissance. Les interactions entre éléments sont gérées par un système de tags data-driven : pas de recettes codées en dur, mais des principes logiques que le joueur apprend et applique.</p>
	</section>

	<section class="app-section">
		<h2>Mécaniques</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Craft de sorts 3×3</h3>
				<p>8 éléments — Feu, Eau, Glace, Foudre, Terre, Vent, Lumière, Ombre. La position de chaque rune dans la grille modifie le résultat.</p>
			</div>
			<div class="feature glass-card">
				<h3>Donjons procéduraux</h3>
				<p>100 étages générés, avec puzzles élémentaires et boss. Progression verticale à travers les niveaux.</p>
			</div>
			<div class="feature glass-card">
				<h3>Progression en 5 paliers</h3>
				<p>De 2 éléments à 8. Sorts combinés, chaînés et réactifs se débloquent progressivement.</p>
			</div>
			<div class="feature glass-card">
				<h3>Overworld Zelda 2D</h3>
				<p>Exploration top-down avec zones à découvrir, PNJs et accès aux donjons.</p>
			</div>
			<div class="feature glass-card">
				<h3>Système de tags</h3>
				<p>Interactions élémentaires définies en JSON. Data-driven, extensible, logique à découvrir.</p>
			</div>
			<div class="feature glass-card">
				<h3>100% offline</h3>
				<p>Zéro serveur, zéro connexion. Persistance locale avec Hive.</p>
			</div>
		</div>
	</section>

	<section class="app-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">Flutter 3.41+</span>
			<span class="pill">Flame 1.35+</span>
			<span class="pill">Dart 3.7+</span>
			<span class="pill">Hive</span>
			<span class="pill">Provider</span>
			<span class="pill">Android</span>
		</div>
	</section>

	<footer class="app-footer">
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

	.app-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--gap);
		margin-bottom: calc(var(--gap) * 2);
		flex-wrap: wrap;
	}

	.app-identity {
		display: flex;
		gap: calc(var(--gap) * 1.2);
		align-items: flex-start;
	}

	.app-icon {
		width: 80px;
		height: 80px;
		border-radius: 18px;
		flex-shrink: 0;
	}

	.app-identity h1 {
		margin: 4px 0 8px;
	}

	.app-tagline {
		color: var(--secondary);
		font-size: 1rem;
		max-width: 500px;
		line-height: 1.5;
	}

	.status-pill {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--accent2);
		border: 1px solid var(--accent2);
		padding: 4px 14px;
		border-radius: 9999px;
		white-space: nowrap;
	}

	.hero-image {
		width: 100%;
		border-radius: var(--radius);
		margin-bottom: calc(var(--gap) * 2);
		border: 1px solid var(--border);
	}

	.app-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.app-section h2 {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.app-section p {
		color: var(--secondary);
		line-height: 1.6;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
		margin: 0;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.app-footer {
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
		.app-header {
			flex-direction: column;
		}

		.app-icon {
			width: 60px;
			height: 60px;
		}
	}
</style>
