<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import MaturiteDevLead from '$lib/components/tools/MaturiteDevLead.svelte';
</script>

<SEO
	title="Maturité dev → lead"
	description="Évalue la maturité d'un développeur pour une transition vers un rôle de lead. 8 axes, radar, recommandations."
	url="https://kevin.delfour.co/outils/maturite-dev-lead/"
/>

<ToolShell
	title="Maturité dev &rarr; lead"
	description="Évalue la maturité d'un développeur pour une transition vers un rôle de tech lead. 8 axes d'observation, pas un jugement — des repères."
>
	<MaturiteDevLead />
</ToolShell>
