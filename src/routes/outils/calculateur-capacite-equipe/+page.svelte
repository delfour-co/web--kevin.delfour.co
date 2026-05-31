<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import CapaciteEquipe from '$lib/components/tools/CapaciteEquipe.svelte';
</script>

<SEO
	title="Calculateur capacité équipe"
	description="Estime la capacité réelle de ton équipe vs la capacité théorique. Visualise l'impact des cérémonies, support et absences."
	url="https://kevin.delfour.co/outils/calculateur-capacite-equipe/"
/>

<ToolShell
	title="Calculateur capacité équipe"
	description="Estime la capacité réelle de ton équipe en tenant compte des cérémonies, du support, des absences et du temps non productif. Un repère pour dimensionner tes sprints."
	command="./calculateur-capacite-equipe"
>
	<CapaciteEquipe />
</ToolShell>
