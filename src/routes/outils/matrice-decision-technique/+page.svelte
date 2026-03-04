<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import MatriceDecision from '$lib/components/tools/MatriceDecision.svelte';
</script>

<SEO
	title="Matrice de décision technique"
	description="Scoring multicritères pondéré pour les décisions tech. Générique et adaptable. Export Markdown."
	url="https://kevin.delfour.co/outils/matrice-decision-technique/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Matrice de décision technique</span>
	</nav>

	<header class="tool-header">
		<h1>Matrice de décision technique</h1>
		<p class="tool-description">
			Compare des options techniques avec un scoring multicritères pondéré. Définis tes critères, ajuste les poids, note chaque option — le classement se calcule en temps réel.
		</p>
	</header>

	<MatriceDecision />
</div>

<style>
	.tool-page {
		max-width: var(--home-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.breadcrumb {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-bottom: var(--gap);
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.breadcrumb a {
		color: var(--accent);
	}

	.tool-header {
		margin-bottom: calc(var(--gap) * 2);
	}

	.tool-description {
		color: var(--secondary);
		font-size: 1.05rem;
	}
</style>
