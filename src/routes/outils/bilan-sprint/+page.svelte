<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import BilanSprint from '$lib/components/tools/BilanSprint.svelte';
</script>

<SEO
	title="Bilan de sprint"
	description="Structure ton bilan de sprint : delivery, retrospective, metriques qualite, actions. Export complet."
	url="https://kevin.delfour.co/outils/bilan-sprint/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">></span>
		<span>Bilan de sprint</span>
	</nav>

	<header class="tool-header">
		<h1>Bilan de sprint</h1>
		<p class="tool-description">
			Un cadre pour structurer le bilan de sprint. Delivery, retro, qualite et actions — oriente amelioration continue.
		</p>
	</header>

	<BilanSprint />
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
