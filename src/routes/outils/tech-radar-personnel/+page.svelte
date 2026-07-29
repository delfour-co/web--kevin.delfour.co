<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import TechRadar from '$lib/components/tools/TechRadar.svelte';
</script>

<SEO
	title="Tech Radar personnel"
	description="Construisez votre tech radar interactif : Adopt, Trial, Assess, Hold. Export Markdown."
	url="https://kevin.delfour.co/outils/tech-radar-personnel/"
/>

<ToolShell
	title="Tech Radar personnel"
	description="Construisez votre tech radar. Classez les technologies en Adopt, Trial, Assess ou Hold — un outil pour clarifier une posture technique, pas pour suivre les tendances."
>
	<TechRadar />
</ToolShell>
