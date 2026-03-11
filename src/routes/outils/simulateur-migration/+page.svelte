<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import SimulateurMigration from '$lib/components/tools/SimulateurMigration.svelte';
</script>

<SEO
	title="Simulateur de migration"
	description="Planifie ta migration technique : phases, risques, checklist pre-migration, timeline. Export plan complet."
	url="https://kevin.delfour.co/outils/simulateur-migration/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Simulateur de migration</span>
	</nav>

	<header class="tool-header">
		<h1>Simulateur de migration</h1>
		<p class="tool-description">
			Structure ta migration technique : découpe en phases, identifie les risques, vérifie ta checklist pre-migration. Un cadre pour ne rien oublier.
		</p>
	</header>

	<SimulateurMigration />
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
