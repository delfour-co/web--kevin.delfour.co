<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import FsTree from '$lib/components/dbrain/fs/FsTree.svelte';
	import { getDir } from '$lib/dbrain/filesystem';

	let selectedId = $state('brain');
	const active = $derived(getDir(selectedId));
</script>

<LabShell title="File Tree" command="render fs-tree" accent={active.color}>
	{#snippet stage()}
		<div class="wrap"><FsTree {selectedId} onselect={(id) => (selectedId = id)} /></div>
	{/snippet}
	{#snippet panel()}
		<section>
			<span class="lab-grp-h">// SELECTED</span>
			<p class="sel">{selectedId}</p>
		</section>
		<p class="lab-note">
			L'arbre n'affiche que les <b>dossiers</b> — les fichiers vivent dans le listing central.
			Clique un dossier pour le sélectionner ; la branche se déplie.
		</p>
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		top: 22px;
		bottom: 22px;
		left: 22px;
		width: 280px;
		display: flex;
	}
	.sel {
		font-size: 0.82rem;
		color: var(--lab-fg);
		margin: 0;
	}
</style>
