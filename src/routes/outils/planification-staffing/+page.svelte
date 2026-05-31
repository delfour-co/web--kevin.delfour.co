<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import PlanificationStaffing from '$lib/components/tools/PlanificationStaffing.svelte';
</script>

<SEO
	title="Planification staffing"
	description="Anticipe tes besoins de recrutement. Timeline capacite vs charge, projection des departs, plan de recrutement."
	url="https://kevin.delfour.co/outils/planification-staffing/"
/>

<ToolShell
	title="Planification staffing"
	description="Anticipe les besoins de recrutement en croisant roadmap, capacite actuelle et risque de departs. Un repere pour structurer la reflexion, pas une prevision definitive."
	command="./planification-staffing"
>
	<PlanificationStaffing />
</ToolShell>
