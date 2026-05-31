<script lang="ts">
	import { onMount } from 'svelte';
	import type { CubeActivity, CubeController } from '$lib/dbrain/cube';

	let {
		activity = 'idle',
		color = '#00E5FF'
	}: { activity?: CubeActivity; color?: string } = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let controller: CubeController | null = null;
	let failed = $state(false);

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let io: IntersectionObserver | null = null;
		let ro: ResizeObserver | null = null;
		let alive = true;

		(async () => {
			try {
				const { createCubeScene } = await import('$lib/dbrain/cube');
				if (!alive) return;
				controller = createCubeScene(canvas, { color });
				controller.setActivity(activity);
				controller.resize();

				ro = new ResizeObserver(() => controller?.resize());
				ro.observe(host);

				if (reduced) {
					controller.renderOnce();
				} else {
					io = new IntersectionObserver(
						(entries) => {
							for (const e of entries) {
								if (e.isIntersecting) controller?.start();
								else controller?.stop();
							}
						},
						{ threshold: 0.05 }
					);
					io.observe(host);
				}
			} catch (err) {
				console.error('[ConsciousnessCube] WebGL init failed', err);
				failed = true;
			}
		})();

		return () => {
			alive = false;
			io?.disconnect();
			ro?.disconnect();
			controller?.dispose();
			controller = null;
		};
	});

	$effect(() => {
		activity;
		controller?.setActivity(activity);
	});
	$effect(() => {
		color;
		controller?.setColor(color);
	});
</script>

<div bind:this={host} class="cube" style="--accent: {color}">
	<canvas bind:this={canvas} class:is-hidden={failed}></canvas>
	{#if failed}
		<div class="fallback" aria-hidden="true"></div>
	{/if}
</div>

<style>
	.cube {
		position: relative;
		width: 100%;
		height: 100%;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
	canvas.is-hidden {
		display: none;
	}

	/* Fallback statique (pas de WebGL) : losange néon qui respire. */
	.fallback {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 40%;
		aspect-ratio: 1;
		max-width: 260px;
		border: 1px solid var(--accent);
		transform: rotate(45deg);
		box-shadow:
			0 0 44px -6px var(--accent),
			inset 0 0 32px -10px var(--accent);
		opacity: 0.8;
	}
	@media (prefers-reduced-motion: no-preference) {
		.fallback {
			animation: cube-breathe 4s ease-in-out infinite;
		}
	}
	@keyframes cube-breathe {
		0%,
		100% {
			opacity: 0.55;
		}
		50% {
			opacity: 0.95;
		}
	}
</style>
