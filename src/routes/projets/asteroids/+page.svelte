<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const screenshots = [
		{ src: '/images/apps/asteroids/asteroids_01.png', alt: 'Écran titre Neon Asteroids' },
		{ src: '/images/apps/asteroids/asteroids_02.png', alt: 'Gameplay — vagues d\'astéroïdes' },
		{ src: '/images/apps/asteroids/asteroids_03.png', alt: 'Power-ups et effets néon' },
		{ src: '/images/apps/asteroids/asteroids_04.png', alt: 'UFO Scout et Hunter' },
		{ src: '/images/apps/asteroids/asteroids_05.png', alt: 'Combo system et score' },
		{ src: '/images/apps/asteroids/asteroids_06.png', alt: 'Shield et multi-shot' },
		{ src: '/images/apps/asteroids/asteroids_07.png', alt: 'Vagues avancées' },
		{ src: '/images/apps/asteroids/asteroids_08.png', alt: 'Leaderboard local' },
		{ src: '/images/apps/asteroids/asteroids_09.png', alt: 'Galaxy background' }
	];

	let selectedImage: string | null = $state(null);
</script>

<SEO
	title="Neon Asteroids"
	description="Arcade shooter néon avec Flutter et Flame. Vagues progressives, UFOs, power-ups, combos. En test fermé sur Google Play."
	url="https://kevin.delfour.co/projets/asteroids/"
/>

<div class="page-container">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/projets/">Projets</a>
		<span aria-hidden="true">/</span>
		<span>Neon Asteroids</span>
	</nav>

	<header class="app-header">
		<div class="app-identity">
			<img src="/images/apps/asteroids/icon.webp" alt="Icône Neon Asteroids" class="app-icon" />
			<div>
				<span class="badge">Jeu mobile</span>
				<h1>Neon Asteroids</h1>
				<p class="app-tagline">Arcade shooter néon. Pilote ton vaisseau à travers des vagues d'astéroïdes, esquive les UFOs, collecte les power-ups.</p>
			</div>
		</div>
		<span class="status-pill">Test fermé · Google Play</span>
	</header>

	<img src="/images/apps/asteroids/presentation.webp" alt="Présentation Neon Asteroids" class="hero-image" />

	<section class="app-section">
		<h2>Le concept</h2>
		<p>Un jeu d'arcade classique revisité avec une esthétique néon. Le gameplay reprend les fondamentaux d'Asteroids — piloter, tirer, survivre — avec des mécaniques modernes : vagues progressives, ennemis variés, power-ups et un système de combos.</p>
	</section>

	<section class="app-section">
		<h2>Caractéristiques</h2>
		<div class="features-grid">
			<div class="feature glass-card">
				<h3>Vagues progressives</h3>
				<p>Difficulté croissante avec des astéroïdes de plus en plus nombreux et rapides.</p>
			</div>
			<div class="feature glass-card">
				<h3>UFOs ennemis</h3>
				<p>Scout dès la vague 3, Hunter dès la vague 6. Chacun avec son comportement propre.</p>
			</div>
			<div class="feature glass-card">
				<h3>Power-ups</h3>
				<p>Bouclier, multi-shot et slow-motion pour survivre aux vagues les plus intenses.</p>
			</div>
			<div class="feature glass-card">
				<h3>Combos & scores</h3>
				<p>Système de combos avec popups de score. Leaderboard local top 10.</p>
			</div>
			<div class="feature glass-card">
				<h3>Easter eggs</h3>
				<p>Débris spatiaux à repérer : Starlink, ISS/MIR, Tesla Roadster.</p>
			</div>
			<div class="feature glass-card">
				<h3>Effets visuels</h3>
				<p>Screen shake, flash, nébulose Antennae en arrière-plan. Esthétique néon complète.</p>
			</div>
		</div>
	</section>

	<section class="app-section">
		<h2>Stack technique</h2>
		<div class="tech-pills">
			<span class="pill">Flutter 3.41</span>
			<span class="pill">Flame 1.35</span>
			<span class="pill">Dart 3.11</span>
			<span class="pill">Android</span>
		</div>
	</section>

	<section class="app-section">
		<h2>Captures d'écran</h2>
		<div class="screenshots-grid">
			{#each screenshots as screenshot}
				<button class="screenshot-thumb" onclick={() => selectedImage = screenshot.src}>
					<img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
				</button>
			{/each}
		</div>
	</section>

	<footer class="app-footer">
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
		color: var(--accent3);
		border: 1px solid var(--accent3);
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
		.app-header {
			flex-direction: column;
		}

		.app-icon {
			width: 60px;
			height: 60px;
		}

		.screenshots-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
