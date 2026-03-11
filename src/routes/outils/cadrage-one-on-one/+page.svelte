<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import CadrageOneOnOne from '$lib/components/tools/CadrageOneOnOne.svelte';
</script>

<SEO
	title="Cadrage 1:1"
	description="Structure tes entretiens 1:1 avec un cadre de reflexion. Preparation, themes, actions."
	url="https://kevin.delfour.co/outils/cadrage-one-on-one/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">></span>
		<span>Cadrage 1:1</span>
	</nav>

	<header class="tool-header">
		<h1>Cadrage 1:1</h1>
		<p class="tool-description">
			Un cadre pour preparer et structurer tes entretiens individuels. Pas un script — des reperes.
		</p>
	</header>

	<CadrageOneOnOne />
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
