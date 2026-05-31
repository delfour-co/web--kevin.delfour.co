<script lang="ts">
	import ConsciousnessCube from '$lib/components/dbrain/ConsciousnessCube.svelte';
	import type { CubeActivity } from '$lib/dbrain/cube';

	let {
		activity = 'idle',
		color = '#00E5FF'
	}: { activity?: CubeActivity; color?: string } = $props();

	const stateLabel = $derived(activity.toUpperCase());
</script>

<section class="hud core-widget" style="--c: {color}">
	<div class="core-head">
		<span class="hud-h">// COGNITIVE CORE</span>
		<span class="core-state">{stateLabel}</span>
	</div>
	<div class="mini-stage">
		<ConsciousnessCube {activity} {color} zoom={1.1} />
	</div>
</section>

<style>
	.hud {
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(8, 11, 18, 0.55);
		border-radius: 10px;
		padding: 13px 15px;
	}
	.core-widget {
		display: flex;
		flex-direction: column;
	}
	.core-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.hud-h {
		font-size: 0.6rem;
		letter-spacing: 0.16em;
		color: var(--c);
		opacity: 0.9;
		transition: color 0.3s ease;
	}
	.core-state {
		font-size: 0.58rem;
		letter-spacing: 0.12em;
		color: var(--lab-dim, #7c8ea3);
	}
	.mini-stage {
		position: relative;
		width: 100%;
		aspect-ratio: 1.25;
		min-height: 0;
	}
	.mini-stage :global(.cube) {
		width: 100%;
		height: 100%;
		/* Le moteur rend déjà en fond transparent — pas besoin de masque (qui
		   risquerait de rogner le cube agrandi). */
	}
</style>
