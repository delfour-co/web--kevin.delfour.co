<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import GenerateurPostMortem from '$lib/components/tools/GenerateurPostMortem.svelte';
</script>

<SEO
	title="Générateur de post-mortem"
	description="Structure ton post-mortem d'incident : timeline, root cause, impact, actions. Export Markdown prêt à partager."
	url="https://kevin.delfour.co/outils/generateur-post-mortem/"
/>

<ToolShell
	title="Générateur de post-mortem"
	description="Structure un post-mortem d'incident avec timeline, analyse des causes, impact et actions. L'objectif n'est pas de blâmer — c'est de comprendre et d'améliorer."
	command="./generateur-post-mortem"
>
	<GenerateurPostMortem />
</ToolShell>
