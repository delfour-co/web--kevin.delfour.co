<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import MaturiteEquipe from '$lib/components/tools/MaturiteEquipe.svelte';
</script>

<SEO
	title="Évaluation maturité équipe"
	description="Diagnostique la maturité de ton équipe tech sur 6 axes : autonomie, qualité, delivery, communication, apprentissage, collaboration."
	url="https://kevin.delfour.co/outils/maturite-equipe/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Évaluation maturité équipe</span>
	</nav>

	<header class="tool-header">
		<h1>Évaluation maturité équipe</h1>
		<p class="tool-description">
			Évalue la maturité de ton équipe technique sur 6 axes. Un repère pour identifier les dynamiques à renforcer — pas un jugement.
		</p>
	</header>

	<MaturiteEquipe />
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
