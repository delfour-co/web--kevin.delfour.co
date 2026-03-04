<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import BuildVsBuy from '$lib/components/tools/BuildVsBuy.svelte';
</script>

<SEO
	title="Build vs Buy vs Partner"
	description="Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou s'associer."
	url="https://kevin.delfour.co/outils/build-vs-buy/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Build vs Buy vs Partner</span>
	</nav>

	<header class="tool-header">
		<h1>Build vs Buy vs Partner</h1>
		<p class="tool-description">
			Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou t'associer. Ce n'est qu'un repère — pas une réponse définitive.
		</p>
	</header>

	<BuildVsBuy />

	<div class="tool-article-link">
		<a href="/articles/build-vs-buy-vs-partner-cadre-decision/">Lire l'article de fond</a>
	</div>
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

	.tool-article-link {
		margin-top: calc(var(--gap) * 2);
		padding-top: var(--gap);
		border-top: 1px solid var(--border);
	}

	.tool-article-link a {
		font-family: var(--font-ui);
		font-size: 14px;
	}
</style>
