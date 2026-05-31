<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import CognitiveCore from '$lib/components/dbrain/fs/CognitiveCore.svelte';
	import type { CubeActivity } from '$lib/dbrain/cube';

	const clusters = [
		{ label: 'focus', hex: '#00E5FF' },
		{ label: 'tech', hex: '#2979FF' },
		{ label: 'créa', hex: '#B026FF' },
		{ label: 'open', hex: '#39FF88' },
		{ label: 'veille', hex: '#FFB020' },
		{ label: 'alerte', hex: '#FF3864' }
	];
	const activities: { id: CubeActivity; label: string }[] = [
		{ id: 'idle', label: 'IDLE' },
		{ id: 'exploration', label: 'EXPLORATION' },
		{ id: 'response', label: 'RESPONSE' }
	];

	let activity = $state<CubeActivity>('idle');
	let color = $state('#00E5FF');
</script>

<LabShell title="Cognitive Core" command="render cognitive-core" accent={color}>
	{#snippet stage()}
		<div class="wrap"><CognitiveCore {activity} {color} /></div>
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
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		inset: 0;
		margin: auto;
		width: min(380px, 84%);
		height: max-content;
	}
</style>
