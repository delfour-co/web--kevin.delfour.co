<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import DetteRechnique from '$lib/components/tools/DetteRechnique.svelte';
</script>

<SEO
	title="Évaluation dette technique"
	description="Quantifie et priorise ta dette technique sur 6 axes. Matrice impact/effort pour identifier les quick wins."
	url="https://kevin.delfour.co/outils/evaluation-dette-technique/"
/>

<ToolShell
	title="Évaluation dette technique"
	description="Quantifie et priorise ta dette technique sur 6 axes. La matrice impact/effort aide à identifier les quick wins — là où l'effort est faible et l'impact fort."
	command="./evaluation-dette-technique"
>
	<DetteRechnique />
</ToolShell>
