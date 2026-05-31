<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import PriorisationBacklog from '$lib/components/tools/PriorisationBacklog.svelte';
</script>

<SEO
	title="Priorisation backlog technique"
	description="Priorise ton backlog technique avec un scoring multicriteres : impact, confiance, effort, urgence."
	url="https://kevin.delfour.co/outils/priorisation-backlog/"
/>

<ToolShell
	title="Priorisation backlog technique"
	description="Scoring multicriteres adapte au backlog technique. Impact, confiance, urgence et effort pour objectiver les priorites."
	command="./priorisation-backlog"
>
	<PriorisationBacklog />
</ToolShell>
