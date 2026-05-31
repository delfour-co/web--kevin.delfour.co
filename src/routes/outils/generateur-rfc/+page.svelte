<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import GenerateurRFC from '$lib/components/tools/GenerateurRFC.svelte';
</script>

<SEO
	title="Générateur de RFC"
	description="Structure une Request for Comments avec des repères contextuels issus du terrain. Export Markdown."
	url="https://kevin.delfour.co/outils/generateur-rfc/"
/>

<ToolShell
	title="Générateur de RFC"
	description="Structure une Request for Comments technique avec un formulaire guidé. Chaque section est accompagnée de repères pour t'aider à formaliser ta réflexion."
	command="./generateur-rfc"
>
	<GenerateurRFC />
</ToolShell>
