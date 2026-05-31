<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import BilanSprint from '$lib/components/tools/BilanSprint.svelte';
</script>

<SEO
	title="Bilan de sprint"
	description="Structure ton bilan de sprint : delivery, retrospective, metriques qualite, actions. Export complet."
	url="https://kevin.delfour.co/outils/bilan-sprint/"
/>

<ToolShell
	title="Bilan de sprint"
	description="Un cadre pour structurer le bilan de sprint. Delivery, retro, qualite et actions — oriente amelioration continue."
	command="./bilan-sprint"
>
	<BilanSprint />
</ToolShell>
