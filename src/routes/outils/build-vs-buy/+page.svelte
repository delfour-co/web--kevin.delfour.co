<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import BuildVsBuy from '$lib/components/tools/BuildVsBuy.svelte';
</script>

<SEO
	title="Build vs Buy vs Partner"
	description="Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou s'associer."
	url="https://kevin.delfour.co/outils/build-vs-buy/"
/>

<ToolShell
	title="Build vs Buy vs Partner"
	description="Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou t'associer. Ce n'est qu'un repère — pas une réponse définitive."
	command="./build-vs-buy"
>
	<BuildVsBuy />
</ToolShell>
