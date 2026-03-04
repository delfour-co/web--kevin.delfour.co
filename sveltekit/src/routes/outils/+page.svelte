<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { tools } from '$lib/data/tools';
</script>

<SEO
	title="Outils"
	description="Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion."
	url="https://kevin.delfour.co/outils/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Outils</h1>
		<p class="page-description">
			Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion.
		</p>
		<p class="page-privacy">Chaque outil fonctionne entièrement dans ton navigateur. Rien n'est envoyé à un serveur — tes données restent chez toi.</p>
	</header>

	<div class="outils-grid">
		{#each tools as tool}
			{#if tool.statut === 'disponible'}
				<a href={tool.url} class="tool-card">
					<div class="tool-card-header">
						<h2 class="tool-card-title">{tool.nom}</h2>
						<span class="tool-badge tool-badge--available">Disponible</span>
					</div>
					<p class="tool-card-desc">{tool.description}</p>
					<span class="tool-category">{tool.categorie}</span>
				</a>
			{:else}
				<div class="tool-card tool-card--upcoming">
					<div class="tool-card-header">
						<h2 class="tool-card-title">{tool.nom}</h2>
						<span class="tool-badge tool-badge--upcoming">À venir</span>
					</div>
					<p class="tool-card-desc">{tool.description}</p>
					<span class="tool-category">{tool.categorie}</span>
				</div>
			{/if}
		{/each}
	</div>
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
		color: var(--secondary);
		font-style: italic;
	}

	.outils-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--gap);
	}

	.tool-card {
		display: block;
		padding: var(--gap);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	a.tool-card:hover {
		border-color: var(--accent-border);
		box-shadow: var(--shadow-md);
		text-decoration: none;
		transform: translateY(-2px);
	}

	.tool-card--upcoming {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.tool-card-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}

	.tool-card-title {
		font-size: 1.1rem;
		margin: 0;
	}

	.tool-badge {
		display: inline-block;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.tool-badge--available {
		background: var(--accent-light);
		color: var(--accent);
		border: 1px solid var(--accent-border);
	}

	.tool-badge--upcoming {
		background: transparent;
		color: var(--secondary);
		border: 1px solid var(--border);
	}

	.tool-card-desc {
		font-size: 0.9rem;
		color: var(--secondary);
		line-height: 1.5;
		margin: 0 0 12px 0;
	}

	.tool-category {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		text-transform: capitalize;
	}

	@media (max-width: 600px) {
		.outils-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
