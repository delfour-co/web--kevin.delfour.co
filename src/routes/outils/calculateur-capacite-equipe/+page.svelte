<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import CapaciteEquipe from '$lib/components/tools/CapaciteEquipe.svelte';
</script>

<SEO
	title="Calculateur capacité équipe"
	description="Estime la capacité réelle de ton équipe vs la capacité théorique. Visualise l'impact des cérémonies, support et absences."
	url="https://kevin.delfour.co/outils/calculateur-capacite-equipe/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Calculateur capacité équipe</span>
	</nav>

	<header class="tool-header">
		<h1>Calculateur capacité équipe</h1>
		<p class="tool-description">
			Estime la capacité réelle de ton équipe en tenant compte des cérémonies, du support, des absences et du temps non productif. Un repère pour dimensionner tes sprints.
		</p>
	</header>

	<CapaciteEquipe />
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
