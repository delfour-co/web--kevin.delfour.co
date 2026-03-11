<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import EntretienAnnuel from '$lib/components/tools/EntretienAnnuel.svelte';
</script>

<SEO
	title="Entretien annuel tech"
	description="Structure l'entretien annuel d'un développeur. Bilan, objectifs, plan de développement."
	url="https://kevin.delfour.co/outils/entretien-annuel-tech/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Outil</span>
		<h1>Entretien annuel tech</h1>
		<p class="page-description">Un cadre pour structurer l'évaluation annuelle d'un développeur. Bilan technique, objectifs, plan de développement.</p>
	</header>
	<EntretienAnnuel />
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
