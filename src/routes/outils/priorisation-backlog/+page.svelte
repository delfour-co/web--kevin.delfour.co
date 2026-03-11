<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PriorisationBacklog from '$lib/components/tools/PriorisationBacklog.svelte';
</script>

<SEO
	title="Priorisation backlog technique"
	description="Priorise ton backlog technique avec un scoring multicriteres : impact, confiance, effort, urgence."
	url="https://kevin.delfour.co/outils/priorisation-backlog/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">&rsaquo;</span>
		<span>Priorisation backlog technique</span>
	</nav>

	<header class="tool-header">
		<h1>Priorisation backlog technique</h1>
		<p class="tool-description">
			Scoring multicriteres adapte au backlog technique. Impact, confiance, urgence et effort pour objectiver les priorites.
		</p>
	</header>

	<PriorisationBacklog />
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
