<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import MatriceDecision from '$lib/components/tools/MatriceDecision.svelte';
</script>

<SEO
	title="Matrice de décision technique"
	description="Scoring multicritères pondéré pour les décisions tech. Générique et adaptable. Export Markdown."
	url="https://kevin.delfour.co/outils/matrice-decision-technique/"
/>

<ToolShell
	title="Matrice de décision technique"
	description="Compare des options techniques avec un scoring multicritères pondéré. Définis tes critères, ajuste les poids, note chaque option — le classement se calcule en temps réel."
	command="./matrice-decision-technique"
>
	<MatriceDecision />
</ToolShell>
