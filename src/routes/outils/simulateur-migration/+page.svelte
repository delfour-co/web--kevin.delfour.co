<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import SimulateurMigration from '$lib/components/tools/SimulateurMigration.svelte';
</script>

<SEO
	title="Simulateur de migration"
	description="Planifiez une migration technique : phases, risques, checklist pré-migration, timeline. Export du plan complet."
	url="https://kevin.delfour.co/outils/simulateur-migration/"
/>

<ToolShell
	title="Simulateur de migration"
	description="Structurez une migration technique : découpage en phases, identification des risques, checklist pré-migration. Un cadre pour ne rien oublier."
>
	<SimulateurMigration />
</ToolShell>
