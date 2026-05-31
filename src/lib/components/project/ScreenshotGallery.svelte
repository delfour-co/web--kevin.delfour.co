<script lang="ts">
	import type { ShotItem } from '$lib/data/projects';

	let { shots }: { shots: ShotItem[] } = $props();
	let selectedImage: string | null = $state(null);
</script>

<div class="screenshots-grid">
	{#each shots as s}
		<button class="screenshot-thumb" onclick={() => (selectedImage = s.src)}>
			<img src={s.src} alt={s.alt} loading="lazy" />
		</button>
	{/each}
</div>

{#if selectedImage}
	<div
		class="lightbox"
		role="dialog"
		aria-label="Image agrandie"
		tabindex="-1"
		onclick={() => (selectedImage = null)}
		onkeydown={(e) => e.key === 'Escape' && (selectedImage = null)}
	>
		<button class="lightbox-close" onclick={() => (selectedImage = null)} aria-label="Fermer">✕</button>
		<img src={selectedImage} alt="Capture d'écran agrandie" />
	</div>
{/if}

<style>
	.screenshots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 12px;
	}
	.screenshot-thumb {
		background: none;
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		transition: var(--transition);
	}
	.screenshot-thumb:hover {
		border-color: var(--accent);
		box-shadow: var(--accent-glow);
		transform: translateY(-2px);
	}
	.screenshot-thumb img {
		width: 100%;
		height: auto;
		display: block;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gap);
		cursor: pointer;
	}
	.lightbox img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: var(--radius);
		cursor: default;
	}
	.lightbox-close {
		position: absolute;
		top: 20px;
		right: 20px;
		background: none;
		border: none;
		color: var(--primary);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 8px;
	}

	@media (max-width: 640px) {
		.screenshots-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
