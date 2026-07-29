<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import EvaluationSaaS from '$lib/components/tools/EvaluationSaaS.svelte';
</script>

<SEO
	title="Évaluation SaaS"
	description="Grille d'évaluation structurée pour choisir un SaaS. Coût, lock-in, sécurité, intégration, support."
	url="https://kevin.delfour.co/outils/evaluation-saas/"
/>

<ToolShell
	title="Évaluation SaaS"
	description="Évalue une solution SaaS sur 8 critères pondérés. Un cadre pour objectiver la décision."
>
	<EvaluationSaaS />
</ToolShell>
