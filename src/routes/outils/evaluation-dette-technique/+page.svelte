<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import DetteRechnique from '$lib/components/tools/DetteRechnique.svelte';
</script>

<SEO
	title="Évaluation dette technique"
	description="Quantifiez et priorisez la dette technique sur 6 axes. Matrice impact/effort pour repérer les gains rapides."
	url="https://kevin.delfour.co/outils/evaluation-dette-technique/"
/>

<ToolShell
	title="Évaluation dette technique"
	description="Quantifiez et priorisez la dette technique sur 6 axes. La matrice impact/effort fait ressortir les gains rapides — là où l'effort est faible et l'impact fort."
>
	<DetteRechnique />
</ToolShell>
