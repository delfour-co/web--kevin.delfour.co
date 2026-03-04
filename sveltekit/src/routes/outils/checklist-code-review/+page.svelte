<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ChecklistCodeReview from '$lib/components/tools/ChecklistCodeReview.svelte';
</script>

<SEO
	title="Checklist code review"
	description="Checklist interactive pour structurer tes revues de code. Annotable et exportable en Markdown."
	url="https://kevin.delfour.co/outils/checklist-code-review/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Checklist code review</span>
	</nav>

	<header class="tool-header">
		<h1>Checklist code review</h1>
		<p class="tool-description">
			Une checklist structurée pour tes revues de code. Coche, annote, exporte — pour ne rien oublier sans alourdir le processus.
		</p>
	</header>

	<ChecklistCodeReview />
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
