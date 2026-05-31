<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import ChecklistOnboarding from '$lib/components/tools/ChecklistOnboarding.svelte';
</script>

<SEO
	title="Checklist onboarding dev"
	description="Structure l'onboarding d'un nouveau développeur en 30/60/90 jours. Checklist, progression, export."
	url="https://kevin.delfour.co/outils/checklist-onboarding/"
/>

<ToolShell
	title="Checklist onboarding dev"
	description="Un cadre 30/60/90 jours pour structurer l'arrivée d'un nouveau développeur. Adaptable à chaque contexte."
	command="./checklist-onboarding"
>
	<ChecklistOnboarding />
</ToolShell>
