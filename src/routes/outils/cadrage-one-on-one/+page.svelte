<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import CadrageOneOnOne from '$lib/components/tools/CadrageOneOnOne.svelte';
</script>

<SEO
	title="Cadrage 1:1"
	description="Structure tes entretiens 1:1 avec un cadre de reflexion. Preparation, themes, actions."
	url="https://kevin.delfour.co/outils/cadrage-one-on-one/"
/>

<ToolShell
	title="Cadrage 1:1"
	description="Un cadre pour preparer et structurer tes entretiens individuels. Pas un script — des reperes."
	command="./cadrage-one-on-one"
>
	<CadrageOneOnOne />
</ToolShell>
