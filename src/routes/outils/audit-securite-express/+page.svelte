<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import AuditSecurite from '$lib/components/tools/AuditSecurite.svelte';
</script>

<SEO
	title="Audit s\u00e9curit\u00e9 express"
	description="Checklist s\u00e9curit\u00e9 OWASP-inspired par couche : auth, donn\u00e9es, infra, CI/CD, application, organisation. Score et priorit\u00e9s."
	url="https://kevin.delfour.co/outils/audit-securite-express/"
/>

<div class="tool-page">
	<nav class="breadcrumb" aria-label="Fil d'Ariane">
		<a href="/outils/">Outils</a>
		<span aria-hidden="true">›</span>
		<span>Audit s\u00e9curit\u00e9 express</span>
	</nav>

	<header class="tool-header">
		<h1>Audit s\u00e9curit\u00e9 express</h1>
		<p class="tool-description">
			Passe en revue ta posture s\u00e9curit\u00e9 sur 6 couches. Ce n'est pas un audit formel — c'est un premier rep\u00e8re pour identifier les angles morts les plus expos\u00e9s.
		</p>
	</header>

	<AuditSecurite />
</div>

<style>
	.tool-page {
		max-width: var(--home-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.breadcrumb {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-bottom: var(--gap);
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.breadcrumb a {
		color: var(--accent);
	}

	.tool-header {
		margin-bottom: calc(var(--gap) * 2);
	}

	.tool-description {
		color: var(--secondary);
		font-size: 1.05rem;
	}
</style>
