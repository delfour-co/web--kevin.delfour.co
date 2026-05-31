<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import TechRadar from '$lib/components/tools/TechRadar.svelte';
</script>

<SEO
	title="Tech Radar personnel"
	description="Crée ton propre tech radar interactif : Adopt, Trial, Assess, Hold. Export Markdown."
	url="https://kevin.delfour.co/outils/tech-radar-personnel/"
/>

<ToolShell
	title="Tech Radar personnel"
	description="Construis ton propre tech radar. Classe tes technologies en Adopt, Trial, Assess ou Hold — un outil pour clarifier ta posture technique, pas pour suivre les tendances."
	command="./tech-radar-personnel"
>
	<TechRadar />
</ToolShell>
