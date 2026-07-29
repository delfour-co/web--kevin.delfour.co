<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import CapaciteEquipe from '$lib/components/tools/CapaciteEquipe.svelte';
</script>

<SEO
	title="Calculateur capacité équipe"
	description="Estimez la capacité réelle d'une équipe face à sa capacité théorique. Visualisez l'impact des cérémonies, du support et des absences."
	url="https://kevin.delfour.co/outils/calculateur-capacite-equipe/"
/>

<ToolShell
	title="Calculateur capacité équipe"
	description="Estimez la capacité réelle d'une équipe en tenant compte des cérémonies, du support, des absences et du temps non productif. Un repère pour dimensionner les sprints."
>
	<CapaciteEquipe />
</ToolShell>
