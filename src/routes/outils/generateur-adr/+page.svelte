<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import GenerateurADR from '$lib/components/tools/GenerateurADR.svelte';
</script>

<SEO
	title="Générateur d'ADR"
	description="Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Export Markdown."
	url="https://kevin.delfour.co/outils/generateur-adr/"
/>

<ToolShell
	title="Générateur d'ADR"
	description="Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Remplis les champs, exporte en Markdown — prêt pour ton repo."
	command="./generateur-adr"
>
	<GenerateurADR />
</ToolShell>
