<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import SimulateurMigration from '$lib/components/tools/SimulateurMigration.svelte';
</script>

<SEO
	title="Simulateur de migration"
	description="Planifie ta migration technique : phases, risques, checklist pre-migration, timeline. Export plan complet."
	url="https://kevin.delfour.co/outils/simulateur-migration/"
/>

<ToolShell
	title="Simulateur de migration"
	description="Structure ta migration technique : découpe en phases, identifie les risques, vérifie ta checklist pre-migration. Un cadre pour ne rien oublier."
	command="./simulateur-migration"
>
	<SimulateurMigration />
</ToolShell>
