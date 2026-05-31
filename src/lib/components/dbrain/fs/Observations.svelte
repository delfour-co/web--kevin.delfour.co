<script lang="ts">
	import type { FsDir } from '$lib/dbrain/filesystem';

	let { dir }: { dir: FsDir } = $props();
</script>

<section class="hud" style="--c: {dir.color}">
	<span class="hud-h">// SYSTEM OBSERVATIONS</span>
	<p class="obs-lead">{dir.obs.length} signaux détectés.</p>
	<ul class="obs">
		{#each dir.obs as o}
			<li>{o}</li>
		{/each}
	</ul>
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
	.obs-lead {
		margin: 10px 0 8px;
		font-size: 0.72rem;
		color: var(--lab-fg, #eaf7ff);
	}
	.obs {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.obs li {
		font-size: 0.7rem;
		color: var(--lab-dim, #7c8ea3);
		padding-left: 14px;
		position: relative;
		line-height: 1.5;
	}
	.obs li::before {
		content: '▸';
		position: absolute;
		left: 0;
		color: var(--c, #00e5ff);
	}
</style>
