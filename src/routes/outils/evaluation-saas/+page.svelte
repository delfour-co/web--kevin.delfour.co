<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import EvaluationSaaS from '$lib/components/tools/EvaluationSaaS.svelte';
</script>

<SEO
	title="Évaluation SaaS"
	description="Grille d'évaluation structurée pour choisir un SaaS. Coût, lock-in, sécurité, intégration, support."
	url="https://kevin.delfour.co/outils/evaluation-saas/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Outil</span>
		<h1>Évaluation SaaS</h1>
		<p class="page-description">Évalue une solution SaaS sur 8 critères pondérés. Un cadre pour objectiver la décision.</p>
	</header>
	<EvaluationSaaS />
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
