<script lang="ts">
	import { root, ancestors, fileCount } from '$lib/dbrain/filesystem';
	import type { FsDir } from '$lib/dbrain/filesystem';

	let {
		selectedId = 'brain',
		onselect
	}: { selectedId?: string; onselect?: (id: string) => void } = $props();

	// Les ancêtres du dossier sélectionné sont dépliés (le chemin reste ouvert).
	const expanded = $derived(new Set(ancestors(selectedId).map((d) => d.id)));

	function hasSubdirs(dir: FsDir): boolean {
		return dir.children.some((c) => c.node === 'dir');
	}
</script>

<section class="tree">
	<div class="tree-head">
		<span class="tree-title">D-BRAIN FILESYSTEM</span>
		<span class="tree-path">/brain</span>
	</div>

	<nav class="tree-body">
		<button
			class="tree-row root"
			class:active={selectedId === 'brain'}
			onclick={() => onselect?.('brain')}
		>
			<span class="caret">{expanded.has('brain') ? '▾' : '▸'}</span>
			<span class="folder-mini cyan"></span>
			<span class="tree-name root-name">/brain</span>
		</button>
		{#if expanded.has('brain')}
			{#each root.children as child}
				{#if child.node === 'dir'}{@render branch(child, 1)}{/if}
			{/each}
		{/if}
	</nav>

	<div class="capacity">
		<div class="cap-head"><span>BRAIN CAPACITY</span><span>68%</span></div>
		<div class="cap-bar"><i style="width: 68%"></i></div>
		<div class="cap-sub">167.3 GB / 250 GB</div>
	</div>
</section>

{#snippet branch(dir: FsDir, depth: number)}
	<button
		class="tree-row"
		class:active={selectedId === dir.id}
		style="--c: {dir.color}; --d: {depth}"
		onclick={() => onselect?.(dir.id)}
	>
		<span class="caret">{hasSubdirs(dir) ? (expanded.has(dir.id) ? '▾' : '▸') : '·'}</span>
		<span class="folder-mini" style="border-color: {dir.color}"></span>
		<span class="tree-name">{dir.name}</span>
		<span class="tree-count">{fileCount(dir)}</span>
	</button>
	{#if expanded.has(dir.id)}
		{#each dir.children as child}
			{#if child.node === 'dir'}{@render branch(child, depth + 1)}{/if}
		{/each}
	{/if}
{/snippet}

<style>
	.tree {
		height: 100%;
		min-height: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(8, 11, 18, 0.55);
		border-radius: 10px;
		padding: 14px;
	}
	.tree-head {
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-bottom: 14px;
	}
	.tree-title {
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		color: var(--lab-accent, #00e5ff);
	}
	.tree-path {
		font-size: 0.66rem;
		color: var(--lab-dim, #7c8ea3);
	}
	.tree-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding-right: 3px;
	}

	.folder-mini {
		display: inline-block;
		width: 14px;
		height: 11px;
		border: 1.4px solid var(--lab-dim, #7c8ea3);
		border-radius: 0 3px 3px 3px;
		position: relative;
		flex-shrink: 0;
	}
	.folder-mini::before {
		content: '';
		position: absolute;
		top: -4px;
		left: -1.4px;
		width: 7px;
		height: 4px;
		border: 1.4px solid;
		border-color: inherit;
		border-bottom: none;
		border-radius: 3px 3px 0 0;
	}
	.folder-mini.cyan {
		border-color: var(--lab-accent, #00e5ff);
	}

	.tree-row {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 5px 8px;
		padding-left: calc(6px + var(--d, 0) * 14px);
		border: 1px solid transparent;
		border-radius: 6px;
		background: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.74rem;
		color: var(--lab-fg, #eaf7ff);
		transition: all 0.14s ease;
		text-align: left;
	}
	.tree-row.root {
		padding-left: 2px;
		color: var(--lab-dim, #7c8ea3);
	}
	.tree-row:hover {
		background: rgba(255, 255, 255, 0.03);
	}
	.tree-row.active {
		background: color-mix(in srgb, var(--c, #00e5ff) 14%, transparent);
		border-color: color-mix(in srgb, var(--c, #00e5ff) 45%, transparent);
	}
	.caret {
		width: 9px;
		flex-shrink: 0;
		font-size: 0.6rem;
		color: var(--lab-dim, #7c8ea3);
	}
	.tree-name {
		flex: 1;
		color: var(--c, #00e5ff);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.root-name {
		color: var(--lab-fg, #eaf7ff);
	}
	.tree-count {
		font-size: 0.62rem;
		color: var(--lab-dim, #7c8ea3);
		font-variant-numeric: tabular-nums;
	}
	.capacity {
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		flex-shrink: 0;
	}
	.cap-head {
		display: flex;
		justify-content: space-between;
		font-size: 0.64rem;
		color: var(--lab-dim, #7c8ea3);
		margin-bottom: 6px;
	}
	.cap-bar {
		height: 5px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.06);
		overflow: hidden;
	}
	.cap-bar i {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, var(--lab-accent, #00e5ff), #2979ff);
		box-shadow: 0 0 10px var(--lab-accent, #00e5ff);
	}
	.cap-sub {
		font-size: 0.62rem;
		color: var(--lab-dimmer, #56697d);
		margin-top: 5px;
	}
</style>
