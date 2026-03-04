<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import DiagnosticCTO from '$lib/components/tools/DiagnosticCTO.svelte';
</script>

<SEO
	title="Diagnostic Maturité CTO"
	description="Évalue ta posture CTO sur 6 axes : leadership, décision, craft, organisation, pratiques, parcours."
	url="https://kevin.delfour.co/outils/diagnostic-maturite-cto/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Diagnostic Maturité CTO</span>
	</nav>

	<header class="tool-header">
		<h1>Diagnostic Maturité CTO</h1>
		<p class="tool-description">
			Auto-évalue ta posture CTO sur 6 axes. Ce n'est pas un jugement — c'est une photo à un instant t pour identifier où tu en es et ce qui mérite attention.
		</p>
	</header>

	<DiagnosticCTO />
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
