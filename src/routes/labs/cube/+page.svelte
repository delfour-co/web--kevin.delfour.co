<script lang="ts">
	import ConsciousnessCube from '$lib/components/dbrain/ConsciousnessCube.svelte';
	import type { CubeActivity } from '$lib/dbrain/cube';

	const clusters = [
		{ id: 'focus', label: 'focus', hex: '#00E5FF' },
		{ id: 'tech', label: 'tech', hex: '#2979FF' },
		{ id: 'creative', label: 'créa', hex: '#B026FF' },
		{ id: 'open', label: 'open', hex: '#39FF88' },
		{ id: 'signal', label: 'veille', hex: '#FFB020' },
		{ id: 'alert', label: 'alerte', hex: '#FF3864' }
	];

	const activities: { id: CubeActivity; label: string; desc: string }[] = [
		{ id: 'idle', label: 'IDLE', desc: 'Core stable. Monitoring environment.' },
		{ id: 'exploration', label: 'EXPLORATION', desc: 'Scanning knowledge network.' },
		{ id: 'response', label: 'RESPONSE', desc: 'Generating response. Core resonance.' }
	];

	let activity = $state<CubeActivity>('idle');
	let color = $state('#00E5FF');

	const current = $derived(activities.find((a) => a.id === activity)!);
</script>

<svelte:head>
	<title>D-Brain OS — Consciousness Cube</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="lab">
	<header class="lab-bar">
		<span class="brand">D-BRAIN&nbsp;OS</span>
		<span class="bar-sub">consciousness core · sandbox</span>
		<span class="bar-status"><i style="background:{color}"></i> online</span>
	</header>

	<main class="lab-main">
		<div class="stage">
			<div class="corner tl"></div>
			<div class="corner tr"></div>
			<div class="corner bl"></div>
			<div class="corner br"></div>
			<ConsciousnessCube {activity} {color} />
			<p class="caption">// {current.desc}</p>
		</div>

		<aside class="panel">
			<section class="grp">
				<span class="grp-h">// STATE</span>
				<div class="btns">
					{#each activities as a}
						<button class="btn" class:on={activity === a.id} onclick={() => (activity = a.id)}>
							{a.label}
						</button>
					{/each}
				</div>
			</section>

			<section class="grp">
				<span class="grp-h">// CLUSTER</span>
				<div class="btns">
					{#each clusters as c}
						<button
							class="btn chip"
							class:on={color === c.hex}
							style="--c: {c.hex}"
							onclick={() => (color = c.hex)}
						>
							<i class="dot" style="background:{c.hex}"></i>{c.label}
						</button>
					{/each}
				</div>
			</section>

			<section class="grp readout">
				<span class="grp-h">// READOUT</span>
				<dl>
					<div><dt>activity</dt><dd>{activity}</dd></div>
					<div><dt>cluster</dt><dd style="color:{color}">{color}</dd></div>
					<div><dt>renderer</dt><dd>webgl · glow</dd></div>
					<div><dt>motion</dt><dd>respects reduced</dd></div>
				</dl>
			</section>

			<p class="note">
				Prototype du Cube Conscience (Phase 2). Composant <code>&lt;ConsciousnessCube&gt;</code>,
				Three.js lazy-loadé, fallback statique sans WebGL.
			</p>
		</aside>
	</main>
</div>

<style>
	.lab {
		min-height: 100dvh;
		background:
			radial-gradient(1200px 600px at 50% -10%, rgba(0, 229, 255, 0.08), transparent 60%),
			#05070d;
		color: #eaf7ff;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		display: flex;
		flex-direction: column;
	}

	.lab-bar {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 14px 22px;
		border-bottom: 1px solid rgba(0, 229, 255, 0.18);
	}
	.brand {
		font-weight: 700;
		letter-spacing: 0.18em;
		color: #00e5ff;
		text-shadow: 0 0 16px rgba(0, 229, 255, 0.5);
	}
	.bar-sub {
		color: #7c8ea3;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
	}
	.bar-status {
		margin-left: auto;
		font-size: 0.72rem;
		color: #7c8ea3;
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.bar-status i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		box-shadow: 0 0 10px currentColor;
	}

	.lab-main {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 300px;
		grid-template-rows: 1fr;
		gap: 0;
		min-height: 0;
	}

	.stage {
		position: relative;
		min-width: 0;
		min-height: 0;
	}
	.stage :global(.cube) {
		width: 100%;
		height: 100%;
	}
	.caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 26px;
		text-align: center;
		color: #7c8ea3;
		font-size: 0.74rem;
		letter-spacing: 0.04em;
		margin: 0;
	}

	.corner {
		position: absolute;
		width: 22px;
		height: 22px;
		border: 1px solid rgba(0, 229, 255, 0.3);
		pointer-events: none;
	}
	.corner.tl {
		top: 26px;
		left: 26px;
		border-right: 0;
		border-bottom: 0;
	}
	.corner.tr {
		top: 26px;
		right: 26px;
		border-left: 0;
		border-bottom: 0;
	}
	.corner.bl {
		bottom: 26px;
		left: 26px;
		border-right: 0;
		border-top: 0;
	}
	.corner.br {
		bottom: 26px;
		right: 26px;
		border-left: 0;
		border-top: 0;
	}

	.panel {
		border-left: 1px solid rgba(0, 229, 255, 0.18);
		background: rgba(8, 11, 18, 0.6);
		padding: 22px 20px;
		display: flex;
		flex-direction: column;
		gap: 26px;
	}
	.grp-h {
		display: block;
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		color: #00e5ff;
		opacity: 0.8;
		margin-bottom: 11px;
	}
	.btns {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.btn {
		font-family: inherit;
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		color: #7c8ea3;
		background: rgba(13, 17, 28, 0.8);
		border: 1px solid rgba(0, 229, 255, 0.18);
		border-radius: 6px;
		padding: 7px 12px;
		cursor: pointer;
		transition: all 0.18s ease;
	}
	.btn:hover {
		color: #eaf7ff;
		border-color: rgba(0, 229, 255, 0.5);
	}
	.btn.on {
		color: #05070d;
		background: #00e5ff;
		border-color: #00e5ff;
		box-shadow: 0 0 18px rgba(0, 229, 255, 0.4);
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.chip .dot {
		width: 9px;
		height: 9px;
		border-radius: 2px;
		box-shadow: 0 0 8px var(--c);
	}
	.chip.on {
		color: #05070d;
		background: var(--c);
		border-color: var(--c);
		box-shadow: 0 0 18px color-mix(in srgb, var(--c) 50%, transparent);
	}
	.chip.on .dot {
		background: #05070d !important;
		box-shadow: none;
	}

	.readout dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.readout dl > div {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
		border-bottom: 1px dashed rgba(124, 142, 163, 0.18);
		padding-bottom: 5px;
	}
	.readout dt {
		color: #7c8ea3;
	}
	.readout dd {
		margin: 0;
		color: #eaf7ff;
	}

	.note {
		margin: auto 0 0;
		color: #56697d;
		font-size: 0.68rem;
		line-height: 1.6;
	}
	.note code {
		color: #7c8ea3;
	}

	@media (max-width: 760px) {
		.lab-main {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
		}
		.stage {
			min-height: 56vh;
		}
		.panel {
			border-left: 0;
			border-top: 1px solid rgba(0, 229, 255, 0.18);
		}
	}
</style>
