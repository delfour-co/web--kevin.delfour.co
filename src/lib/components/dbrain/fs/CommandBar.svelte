<script lang="ts">
	import { ancestors } from '$lib/dbrain/filesystem';

	let {
		selectedId = 'brain',
		onselect
	}: { selectedId?: string; onselect?: (id: string) => void } = $props();

	const tabs = [
		{ label: 'CORE', id: 'brain' },
		{ label: 'PROJECTS', id: 'projects' },
		{ label: 'TOOLS', id: 'tools' },
		{ label: 'KNOWLEDGE', id: 'knowledge' },
		{ label: 'SIGNALS', id: 'signals' },
		{ label: 'ABOUT', id: 'identity' }
	];

	// On surligne l'onglet de la branche courante (ancêtre du dossier sélectionné).
	const branchIds = $derived(new Set(ancestors(selectedId).map((d) => d.id)));
	const cmd = $derived(selectedId === 'brain' ? 'ls /brain' : `open ${selectedId}`);
</script>

<footer class="termbar">
	<span class="term-prompt"><b>dbrain</b>:~$ {cmd} <span class="cursor">▌</span></span>
	<nav class="term-tabs">
		{#each tabs as t}
			<button class:on={branchIds.has(t.id)} onclick={() => onselect?.(t.id)}>{t.label}</button>
		{/each}
	</nav>
</footer>

<style>
	.termbar {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 10px 18px;
		border-top: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(5, 7, 13, 0.9);
		flex-shrink: 0;
	}
	.term-prompt {
		font-size: 0.74rem;
		color: var(--lab-fg, #eaf7ff);
	}
	.term-prompt b {
		color: var(--lab-accent, #00e5ff);
	}
	.cursor {
		color: var(--lab-accent, #00e5ff);
	}
	@media (prefers-reduced-motion: no-preference) {
		.cursor {
			animation: blink 1.1s steps(1) infinite;
		}
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	.term-tabs {
		margin-left: auto;
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}
	.term-tabs button {
		font-family: inherit;
		font-size: 0.64rem;
		letter-spacing: 0.08em;
		color: var(--lab-dim, #7c8ea3);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		padding: 4px 10px;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.term-tabs button:hover {
		color: var(--lab-fg, #eaf7ff);
	}
	.term-tabs button.on {
		color: var(--lab-accent, #00e5ff);
		border-bottom-color: var(--lab-accent, #00e5ff);
	}
</style>
