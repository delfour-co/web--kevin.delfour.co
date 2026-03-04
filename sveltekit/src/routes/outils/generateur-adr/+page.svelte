<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import GenerateurADR from '$lib/components/tools/GenerateurADR.svelte';
</script>

<SEO
	title="Générateur d'ADR"
	description="Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Export Markdown."
	url="https://kevin.delfour.co/outils/generateur-adr/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Générateur d'ADR</span>
	</nav>

	<header class="tool-header">
		<h1>Générateur d'ADR</h1>
		<p class="tool-description">
			Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Remplis les champs, exporte en Markdown — prêt pour ton repo.
		</p>
	</header>

	<GenerateurADR />
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
