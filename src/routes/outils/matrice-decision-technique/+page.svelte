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
	description="Comparez des options techniques par scoring multicritères pondéré. Définissez les critères, ajustez les poids, notez chaque option — le classement se calcule en temps réel."
>
	<MatriceDecision />
</ToolShell>
