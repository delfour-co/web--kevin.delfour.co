<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import CommandBar from '$lib/components/dbrain/fs/CommandBar.svelte';
	import { getDir } from '$lib/dbrain/filesystem';

	let selectedId = $state('brain');
	const active = $derived(getDir(selectedId));
</script>

<LabShell title="Command Bar" command="render command-bar" accent={active.color}>
	{#snippet stage()}
		<div class="wrap"><CommandBar {selectedId} onselect={(id) => (selectedId = id)} /></div>
	{/snippet}
	{#snippet panel()}
		<section>
			<span class="lab-grp-h">// SELECTED</span>
			<p class="sel">{selectedId}</p>
		</section>
		<p class="lab-note">
			Les onglets pilotent la navigation entre clusters ; l'onglet de la branche courante est
			surligné. La commande reflète le dossier ouvert.
		</p>
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.sel {
		font-size: 0.82rem;
		color: var(--lab-fg);
		margin: 0;
	}
</style>
