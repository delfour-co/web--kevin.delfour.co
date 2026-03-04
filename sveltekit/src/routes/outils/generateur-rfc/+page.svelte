<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import GenerateurRFC from '$lib/components/tools/GenerateurRFC.svelte';
</script>

<SEO
	title="Générateur de RFC"
	description="Structure une Request for Comments avec des repères contextuels issus du terrain. Export Markdown."
	url="https://kevin.delfour.co/outils/generateur-rfc/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Générateur de RFC</span>
	</nav>

	<header class="tool-header">
		<h1>Générateur de RFC</h1>
		<p class="tool-description">
			Structure une Request for Comments technique avec un formulaire guidé. Chaque section est accompagnée de repères pour t'aider à formaliser ta réflexion.
		</p>
	</header>

	<GenerateurRFC />
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
