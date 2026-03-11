<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';
</script>

<SEO
	title="Outils"
	description="Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion."
	url="https://kevin.delfour.co/outils/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Boîte à outils</span>
		<h1>Outils</h1>
		<p class="page-description">
			Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion.
		</p>
		<p class="page-privacy">Chaque outil fonctionne entièrement dans ton navigateur. Rien n'est envoyé à un serveur — tes données restent chez toi.</p>
	</header>

	{#each toolCategories as category}
		<section class="tool-section">
			<h2 class="tool-section-title">{category.label}</h2>
			<div class="outils-grid">
				{#each category.tools as tool}
					<a href={tool.url} class="tool-card glass-card">
						<div class="tool-card-icon">
							<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
								{@html tool.icon}
							</svg>
						</div>
						<div class="tool-card-content">
							<h3 class="tool-card-title">{tool.nom}</h3>
							<p class="tool-card-desc">{tool.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.page-container {
		max-width: var(--home-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.page-header {
		margin-bottom: calc(var(--gap) * 2);
	}

	.page-description {
		color: var(--secondary);
		font-size: 1.1rem;
	}

	.page-privacy {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--tertiary);
		font-style: italic;
	}

	.tool-section {
		margin-bottom: calc(var(--gap) * 2);
	}

	.tool-section-title {
		font-size: 1.2rem;
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.outils-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--gap);
	}

	.tool-card {
		display: flex;
		gap: calc(var(--gap) * 0.8);
		padding: var(--gap);
		text-decoration: none;
		color: inherit;
		align-items: flex-start;
	}

	.tool-card:hover {
		text-decoration: none;
		box-shadow: var(--accent-glow);
		border-color: var(--accent-border);
	}

	.tool-card:hover .tool-card-icon {
		color: var(--accent);
	}

	.tool-card-icon {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--secondary);
		transition: color 0.2s ease;
	}

	.tool-card-content {
		flex: 1;
		min-width: 0;
	}

	.tool-card-title {
		font-size: 1rem;
		margin: 0 0 6px 0;
	}

	.tool-card-desc {
		font-size: 0.85rem;
		color: var(--secondary);
		line-height: 1.5;
		margin: 0;
	}

	@media (max-width: 600px) {
		.outils-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
