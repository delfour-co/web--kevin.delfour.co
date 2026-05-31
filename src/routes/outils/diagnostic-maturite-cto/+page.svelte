<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ToolShell from '$lib/components/tools/ToolShell.svelte';
	import DiagnosticCTO from '$lib/components/tools/DiagnosticCTO.svelte';
</script>

<SEO
	title="Diagnostic Maturité CTO"
	description="Évalue ta posture CTO sur 6 axes : leadership, décision, craft, organisation, pratiques, parcours."
	url="https://kevin.delfour.co/outils/diagnostic-maturite-cto/"
/>

<ToolShell
	title="Diagnostic Maturité CTO"
	description="Auto-évalue ta posture CTO sur 6 axes. Ce n'est pas un jugement — c'est une photo à un instant t pour identifier où tu en es et ce qui mérite attention."
	command="./diagnostic-maturite-cto"
>
	<DiagnosticCTO />
</ToolShell>
