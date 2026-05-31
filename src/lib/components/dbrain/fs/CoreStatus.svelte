<script lang="ts">
	import { spark, hash, totalNodes } from '$lib/dbrain/filesystem';
	import type { FsDir } from '$lib/dbrain/filesystem';

	let { dir }: { dir: FsDir } = $props();

	const rows = $derived([
		{ l: 'STATE', v: dir.activity.toUpperCase(), dot: true },
		{ l: 'MODE', v: 'Filesystem Explorer' },
		{ l: 'FOCUS', v: dir.name },
		{ l: 'NODES', v: String(totalNodes) },
		{ l: 'CONNECTIONS', v: '1.2K' },
		{ l: 'SYNC', v: '100%' },
		{ l: 'TEMP', v: '42°C' }
	]);
</script>

<section class="hud" style="--c: {dir.color}">
	<span class="hud-h">// CORE STATUS</span>
	<dl class="status">
		{#each rows as r, i}
			<div>
				<dt>{r.l}</dt>
				<dd>{#if r.dot}<i class="st-dot"></i>{/if}{r.v}</dd>
				<svg class="spark" viewBox="0 0 65 18" preserveAspectRatio="none" aria-hidden="true">
					<polyline points={spark(hash(r.l) + i)} />
				</svg>
			</div>
		{/each}
	</dl>
</section>

<style>
	.hud {
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(8, 11, 18, 0.55);
		border-radius: 10px;
		padding: 13px 15px;
	}
	.hud-h {
		display: block;
		font-size: 0.6rem;
		letter-spacing: 0.16em;
		color: var(--c, #00e5ff);
		opacity: 0.9;
		transition: color 0.3s ease;
	}
	.status {
		margin: 10px 0 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.status > div {
		display: grid;
		grid-template-columns: 0.9fr 1fr 65px;
		align-items: center;
		gap: 8px;
		font-size: 0.66rem;
	}
	.status dt {
		color: var(--lab-dim, #7c8ea3);
		letter-spacing: 0.06em;
	}
	.status dd {
		margin: 0;
		color: var(--lab-fg, #eaf7ff);
		display: flex;
		align-items: center;
		gap: 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.st-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--c, #00e5ff);
		box-shadow: 0 0 7px var(--c, #00e5ff);
		flex-shrink: 0;
	}
	.spark {
		width: 65px;
		height: 16px;
	}
	.spark polyline {
		fill: none;
		stroke: var(--c, #00e5ff);
		stroke-width: 1;
		opacity: 0.5;
	}
</style>
