<script lang="ts">
	import { projectStages, type ProjectStageKey } from '$lib/data/projects';

	interface Props {
		stage: ProjectStageKey;
	}

	let { stage }: Props = $props();

	let currentIndex = $derived(projectStages.findIndex((s) => s.key === stage));
	let currentLabel = $derived(projectStages[currentIndex]?.label ?? '');
</script>

<div class="progress">
	<div class="progress-track">
		<div class="progress-fill" style="width: {((currentIndex) / (projectStages.length - 1)) * 100}%"></div>
	</div>
	<div class="progress-steps">
		{#each projectStages as s, i}
			<div
				class="progress-step"
				class:progress-step--done={i <= currentIndex}
				class:progress-step--current={i === currentIndex}
				class:progress-step--future={i > currentIndex}
			>
				<div class="step-marker">
					{#if i < currentIndex}
						<svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/></svg>
					{:else if i === currentIndex}
						<div class="step-pulse"></div>
					{/if}
				</div>
				<span class="step-label">{s.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.progress {
		position: relative;
		padding: 8px 0;
	}

	.progress-track {
		position: absolute;
		top: 19px;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--border);
		border-radius: 2px;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--accent), rgba(6, 182, 212, 0.6));
		border-radius: 2px;
		transition: width 0.5s ease;
	}

	.progress-steps {
		position: relative;
		display: flex;
		justify-content: space-between;
	}

	.progress-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		z-index: 1;
	}

	.step-marker {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg, #000);
		border: 2px solid var(--border);
		color: var(--tertiary);
		transition: all 0.3s ease;
	}

	.progress-step--done .step-marker {
		background: var(--accent);
		border-color: var(--accent);
		color: #000;
	}

	.progress-step--current .step-marker {
		border-color: var(--accent);
		background: rgba(6, 182, 212, 0.15);
		box-shadow: 0 0 12px rgba(6, 182, 212, 0.4), 0 0 4px rgba(6, 182, 212, 0.2);
	}

	.step-pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.6; transform: scale(0.7); }
	}

	.step-label {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--tertiary);
		white-space: nowrap;
		transition: color 0.3s ease;
		letter-spacing: 0.02em;
	}

	.progress-step--done .step-label {
		color: var(--accent);
	}

	.progress-step--current .step-label {
		color: var(--accent);
		font-weight: 700;
		font-size: 11px;
	}

	@media (max-width: 640px) {
		.step-label {
			font-size: 8px;
		}

		.progress-step--current .step-label {
			font-size: 9px;
		}

		.step-marker {
			width: 18px;
			height: 18px;
		}

		.progress-track {
			top: 16px;
		}
	}
</style>
