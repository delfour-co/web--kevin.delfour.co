<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import EvaluationTechEquipe from '$lib/components/tools/EvaluationTechEquipe.svelte';
</script>

<SEO
	title="Évaluation tech équipe"
	description="Cartographiez les compétences techniques d'une équipe : forces, manques et bus factor."
	url="https://kevin.delfour.co/outils/evaluation-tech-equipe/"
/>

<ToolShell
	title="Évaluation tech équipe"
	description="Cartographiez les compétences techniques d'une équipe : forces, manques et bus factor par compétence."
>
	<EvaluationTechEquipe />
</ToolShell>
