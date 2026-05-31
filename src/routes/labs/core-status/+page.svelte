<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import CoreStatus from '$lib/components/dbrain/fs/CoreStatus.svelte';
	import { getDir, root } from '$lib/dbrain/filesystem';

	const tops = root.children.filter((c) => c.node === 'dir');
	let selectedId = $state('brain');
	const active = $derived(getDir(selectedId));
</script>

<LabShell title="Core Status" command="render core-status" accent={active.color}>
	{#snippet stage()}
		<div class="wrap"><CoreStatus dir={active} /></div>
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
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		inset: 0;
		margin: auto;
		width: min(320px, 86%);
		height: max-content;
	}
</style>
