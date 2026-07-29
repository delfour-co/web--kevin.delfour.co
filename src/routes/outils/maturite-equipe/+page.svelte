<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import MaturiteEquipe from '$lib/components/tools/MaturiteEquipe.svelte';
</script>

<SEO
	title="Évaluation maturité équipe"
	description="Diagnostiquez la maturité d'une équipe sur 6 axes : autonomie, qualité, delivery, communication, apprentissage, collaboration."
	url="https://kevin.delfour.co/outils/maturite-equipe/"
/>

<ToolShell
	title="Évaluation maturité équipe"
	description="Évaluez la maturité d'une équipe technique sur 6 axes. Un repère pour identifier les dynamiques à renforcer — pas un jugement."
>
	<MaturiteEquipe />
</ToolShell>
