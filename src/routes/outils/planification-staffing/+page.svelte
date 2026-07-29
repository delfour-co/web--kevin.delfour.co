<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import PlanificationStaffing from '$lib/components/tools/PlanificationStaffing.svelte';
</script>

<SEO
	title="Planification staffing"
	description="Anticipez les besoins de recrutement : timeline capacité contre charge, projection des départs, plan de recrutement."
	url="https://kevin.delfour.co/outils/planification-staffing/"
/>

<ToolShell
	title="Planification staffing"
	description="Anticipe les besoins de recrutement en croisant roadmap, capacité actuelle et risque de departs. Un repère pour structurer la réflexion, pas une prevision definitive."
>
	<PlanificationStaffing />
</ToolShell>
