<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import EvaluationTechEquipe from '$lib/components/tools/EvaluationTechEquipe.svelte';
</script>

<SEO
	title="Evaluation tech equipe"
	description="Cartographie les competences techniques de ton equipe. Identifie les forces, les gaps et les bus factors."
	url="https://kevin.delfour.co/outils/evaluation-tech-equipe/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">></span>
		<span>Evaluation tech equipe</span>
	</nav>

	<header class="tool-header">
		<h1>Evaluation tech equipe</h1>
		<p class="tool-description">
			Cartographie les competences techniques de ton equipe. Identifie les forces, les gaps et le bus factor par competence.
		</p>
	</header>

	<EvaluationTechEquipe />
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
