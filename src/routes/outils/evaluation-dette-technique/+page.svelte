<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import DetteRechnique from '$lib/components/tools/DetteRechnique.svelte';
</script>

<SEO
	title="Évaluation dette technique"
	description="Quantifie et priorise ta dette technique sur 6 axes. Matrice impact/effort pour identifier les quick wins."
	url="https://kevin.delfour.co/outils/evaluation-dette-technique/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Évaluation dette technique</span>
	</nav>
	<header class="tool-header">
		<h1>Évaluation dette technique</h1>
		<p class="tool-description">Quantifie et priorise ta dette technique sur 6 axes. La matrice impact/effort aide à identifier les quick wins — là où l'effort est faible et l'impact fort.</p>
	</header>
	<DetteRechnique />
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
