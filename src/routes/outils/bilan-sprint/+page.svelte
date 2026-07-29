<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import BilanSprint from '$lib/components/tools/BilanSprint.svelte';
</script>

<SEO
	title="Bilan de sprint"
	description="Structurez un bilan de sprint : delivery, rétrospective, métriques qualité, actions. Export complet."
	url="https://kevin.delfour.co/outils/bilan-sprint/"
/>

<ToolShell
	title="Bilan de sprint"
	description="Un cadre pour structurer le bilan de sprint. Delivery, retro, qualité et actions — orienté amélioration continue."
>
	<BilanSprint />
</ToolShell>
