<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import GenerateurPostMortem from '$lib/components/tools/GenerateurPostMortem.svelte';
</script>

<SEO
	title="Générateur de post-mortem"
	description="Structure ton post-mortem d'incident : timeline, root cause, impact, actions. Export Markdown prêt à partager."
	url="https://kevin.delfour.co/outils/generateur-post-mortem/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Générateur de post-mortem</span>
	</nav>

	<header class="tool-header">
		<h1>Générateur de post-mortem</h1>
		<p class="tool-description">
			Structure un post-mortem d'incident avec timeline, analyse des causes, impact et
			actions. L'objectif n'est pas de blâmer — c'est de comprendre et d'améliorer.
		</p>
	</header>

	<GenerateurPostMortem />
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
