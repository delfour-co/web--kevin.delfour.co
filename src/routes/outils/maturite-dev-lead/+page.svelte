<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import MaturiteDevLead from '$lib/components/tools/MaturiteDevLead.svelte';
</script>

<SEO
	title="Maturit\u00e9 dev \u2192 lead"
	description="\u00c9value la maturit\u00e9 d'un d\u00e9veloppeur pour une transition vers un r\u00f4le de lead. 8 axes, radar, recommandations."
	url="https://kevin.delfour.co/outils/maturite-dev-lead/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Outil</span>
		<h1>Maturit\u00e9 dev &rarr; lead</h1>
		<p class="page-description">\u00c9value la maturit\u00e9 d'un d\u00e9veloppeur pour une transition vers un r\u00f4le de tech lead. 8 axes d'observation, pas un jugement — des rep\u00e8res.</p>
	</header>
	<MaturiteDevLead />
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
