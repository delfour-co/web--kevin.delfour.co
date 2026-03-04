<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import TechRadar from '$lib/components/tools/TechRadar.svelte';
</script>

<SEO
	title="Tech Radar personnel"
	description="Crée ton propre tech radar interactif : Adopt, Trial, Assess, Hold. Export Markdown."
	url="https://kevin.delfour.co/outils/tech-radar-personnel/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Tech Radar personnel</span>
	</nav>

	<header class="tool-header">
		<h1>Tech Radar personnel</h1>
		<p class="tool-description">
			Construis ton propre tech radar. Classe tes technologies en Adopt, Trial, Assess ou Hold — un outil pour clarifier ta posture technique, pas pour suivre les tendances.
		</p>
	</header>

	<TechRadar />
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
