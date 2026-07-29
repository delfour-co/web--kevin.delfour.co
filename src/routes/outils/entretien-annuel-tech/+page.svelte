<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import EntretienAnnuel from '$lib/components/tools/EntretienAnnuel.svelte';
</script>

<SEO
	title="Entretien annuel tech"
	description="Structure l'entretien annuel d'un développeur. Bilan, objectifs, plan de développement."
	url="https://kevin.delfour.co/outils/entretien-annuel-tech/"
/>

<ToolShell
	title="Entretien annuel tech"
	description="Un cadre pour structurer l'évaluation annuelle d'un développeur. Bilan technique, objectifs, plan de développement."
>
	<EntretienAnnuel />
</ToolShell>
