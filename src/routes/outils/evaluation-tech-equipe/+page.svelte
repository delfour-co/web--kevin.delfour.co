<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import EvaluationTechEquipe from '$lib/components/tools/EvaluationTechEquipe.svelte';
</script>

<SEO
	title="Evaluation tech equipe"
	description="Cartographie les competences techniques de ton equipe. Identifie les forces, les gaps et les bus factors."
	url="https://kevin.delfour.co/outils/evaluation-tech-equipe/"
/>

<ToolShell
	title="Evaluation tech equipe"
	description="Cartographie les competences techniques de ton equipe. Identifie les forces, les gaps et le bus factor par competence."
	command="./evaluation-tech-equipe"
>
	<EvaluationTechEquipe />
</ToolShell>
