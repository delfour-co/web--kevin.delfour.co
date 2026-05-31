<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import FsListing from '$lib/components/dbrain/fs/FsListing.svelte';
	import { getDir, root } from '$lib/dbrain/filesystem';

	const tops = root.children.filter((c) => c.node === 'dir');
	let selectedId = $state('projects');
	const active = $derived(getDir(selectedId));
</script>

<LabShell title="File Listing" command="render fs-listing" accent={active.color}>
	{#snippet stage()}
		<div class="wrap"><FsListing dir={active} onselect={(id) => (selectedId = id)} /></div>
	{/snippet}
	{#snippet panel()}
		<section>
			<span class="lab-grp-h">// DOSSIER</span>
			<div class="lab-btns">
				<button class="lab-btn" class:on={selectedId === 'brain'} onclick={() => (selectedId = 'brain')}>
					/brain
				</button>
				{#each tops as t}
					{#if t.node === 'dir'}
						<button class="lab-btn" class:on={selectedId === t.id} onclick={() => (selectedId = t.id)}>
							{t.name}
						</button>
					{/if}
				{/each}
			</div>
		</section>
		<p class="lab-note">
			Un dossier de sous-dossiers s'affiche en <b>cartes</b> (cliquables pour descendre) ; un dossier
			de fichiers en <b>table</b> (liens vers les pages réelles).
		</p>
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		inset: 18px;
		display: flex;
	}
</style>
