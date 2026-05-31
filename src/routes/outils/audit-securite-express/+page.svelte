<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import AuditSecurite from '$lib/components/tools/AuditSecurite.svelte';
</script>

<SEO
	title="Audit sécurité express"
	description="Checklist sécurité OWASP-inspired par couche : auth, données, infra, CI/CD, application, organisation. Score et priorités."
	url="https://kevin.delfour.co/outils/audit-securite-express/"
/>

<ToolShell
	title="Audit sécurité express"
	description="Passe en revue ta posture sécurité sur 6 couches. Ce n'est pas un audit formel — c'est un premier repère pour identifier les angles morts les plus exposés."
	command="./audit-securite-express"
>
	<AuditSecurite />
</ToolShell>
