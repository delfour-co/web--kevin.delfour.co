<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PlanificationStaffing from '$lib/components/tools/PlanificationStaffing.svelte';
</script>

<SEO
	title="Planification staffing"
	description="Anticipe tes besoins de recrutement. Timeline capacite vs charge, projection attrition, plan de hiring."
	url="https://kevin.delfour.co/outils/planification-staffing/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">></span>
		<span>Planification staffing</span>
	</nav>

	<header class="tool-header">
		<h1>Planification staffing</h1>
		<p class="tool-description">
			Anticipe les besoins de recrutement en croisant roadmap, capacite actuelle et risque d'attrition. Un repere pour structurer la reflexion, pas une prevision definitive.
		</p>
	</header>

	<PlanificationStaffing />
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
