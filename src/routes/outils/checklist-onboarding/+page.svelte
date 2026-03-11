<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ChecklistOnboarding from '$lib/components/tools/ChecklistOnboarding.svelte';
</script>

<SEO
	title="Checklist onboarding dev"
	description="Structure l'onboarding d'un nouveau développeur en 30/60/90 jours. Checklist, progression, export."
	url="https://kevin.delfour.co/outils/checklist-onboarding/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Outil</span>
		<h1>Checklist onboarding dev</h1>
		<p class="page-description">Un cadre 30/60/90 jours pour structurer l'arrivée d'un nouveau développeur. Adaptable à chaque contexte.</p>
	</header>
	<ChecklistOnboarding />
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; }
</style>
