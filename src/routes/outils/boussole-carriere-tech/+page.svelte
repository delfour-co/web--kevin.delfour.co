<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import BoussoleCarriere from '$lib/components/tools/BoussoleCarriere.svelte';
</script>

<SEO
	title="Boussole Carrière Tech"
	description="Aide-toi à te situer dans ton parcours tech et identifie les repères pour la suite."
	url="https://kevin.delfour.co/outils/boussole-carriere-tech/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Boussole Carrière Tech</span>
	</nav>

	<header class="tool-header">
		<h1>Boussole Carrière Tech</h1>
		<p class="tool-description">
			6 questions pour te situer dans ton parcours. Pas de bonne ou mauvaise réponse — juste des repères pour mieux comprendre ce qui te fait avancer.
		</p>
	</header>

	<BoussoleCarriere />
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
