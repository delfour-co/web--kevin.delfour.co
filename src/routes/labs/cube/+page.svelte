<script lang="ts">
	import ConsciousnessCube from '$lib/components/dbrain/ConsciousnessCube.svelte';
	import LabShell from '$lib/components/labs/LabShell.svelte';
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

<LabShell title="Consciousness Cube" command="render --component cube" accent={color}>
	{#snippet stage()}
		<ConsciousnessCube {activity} {color} />
		<p class="lab-caption">// {current.desc}</p>
	{/snippet}

	{#snippet panel()}
		<section>
			<span class="lab-grp-h">// STATE</span>
			<div class="lab-btns">
				{#each activities as a}
					<button class="lab-btn" class:on={activity === a.id} onclick={() => (activity = a.id)}>
						{a.label}
					</button>
				{/each}
			</div>
		</section>

		<section>
			<span class="lab-grp-h">// CLUSTER</span>
			<div class="lab-btns">
				{#each clusters as c}
					<button
						class="lab-btn lab-chip"
						class:on={color === c.hex}
						style="--c: {c.hex}"
						onclick={() => (color = c.hex)}
					>
						<i class="dot" style="background: {c.hex}"></i>{c.label}
					</button>
				{/each}
			</div>
		</section>

		<section class="lab-readout">
			<span class="lab-grp-h">// READOUT</span>
			<dl>
				<div><dt>activity</dt><dd>{activity}</dd></div>
				<div><dt>cluster</dt><dd style="color: {color}">{color}</dd></div>
				<div><dt>renderer</dt><dd>webgl · glow</dd></div>
				<div><dt>motion</dt><dd>respects reduced</dd></div>
			</dl>
		</section>

		<p class="lab-note">
			Prototype du Cube Conscience (Phase 2). Composant <code>&lt;ConsciousnessCube&gt;</code>,
			Three.js lazy-loadé, fallback statique sans WebGL.
		</p>
	{/snippet}
</LabShell>
