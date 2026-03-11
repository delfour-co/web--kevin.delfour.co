<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getAccessibilityPanel } from '$lib/stores/accessibility.svelte';

	const panel = getAccessibilityPanel();

	const STORAGE_KEY = 'accessibility-preferences';

	const defaults = {
		fontSize: 'normal' as string,
		contentWidth: 'normal' as string,
		lineHeight: 'normal' as string,
		letterSpacing: 'normal' as string,
		wordSpacing: 'normal' as string,
		highContrast: false,
		dyslexiaFont: false
	};

	const multipliers: Record<string, Record<string, number>> = {
		fontSize: { small: 0.875, normal: 1, large: 1.125 },
		contentWidth: { narrow: 0.8, normal: 1, wide: 1.2 },
		lineHeight: { tight: 0.75, normal: 1, loose: 1.125 },
		letterSpacing: { tight: 0.5, normal: 1, wide: 1.5 },
		wordSpacing: { tight: 0.5, normal: 1, wide: 1.5 }
	};

	let prefs = $state({ ...defaults });

	function loadPrefs() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				prefs = { ...defaults, ...parsed };
			}
		} catch {
			// ignore
		}
	}

	function savePrefs() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
		} catch {
			// ignore
		}
	}

	function applyPrefs() {
		if (!browser) return;
		const root = document.documentElement;

		root.style.setProperty('--a11y-font-size-mult', String(multipliers.fontSize[prefs.fontSize] || 1));
		root.style.setProperty('--a11y-content-width-mult', String(multipliers.contentWidth[prefs.contentWidth] || 1));
		root.style.setProperty('--a11y-line-height-mult', String(multipliers.lineHeight[prefs.lineHeight] || 1));
		root.style.setProperty('--a11y-letter-spacing-mult', String(multipliers.letterSpacing[prefs.letterSpacing] || 1));
		root.style.setProperty('--a11y-word-spacing-mult', String(multipliers.wordSpacing[prefs.wordSpacing] || 1));

		if (prefs.highContrast) {
			root.setAttribute('data-contrast', 'high');
		} else {
			root.removeAttribute('data-contrast');
		}

		if (prefs.dyslexiaFont) {
			root.setAttribute('data-dyslexia-font', 'true');
			loadDyslexiaFont();
		} else {
			root.removeAttribute('data-dyslexia-font');
		}
	}

	function loadDyslexiaFont() {
		if (document.getElementById('dyslexia-font-stylesheet')) return;
		const link = document.createElement('link');
		link.id = 'dyslexia-font-stylesheet';
		link.rel = 'stylesheet';
		link.href = 'https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.2.5/index.min.css';
		document.head.appendChild(link);
	}

	function setPref(key: string, value: string | boolean) {
		(prefs as any)[key] = value;
		savePrefs();
		applyPrefs();
	}

	function toggleBoolean(key: 'highContrast' | 'dyslexiaFont') {
		prefs[key] = !prefs[key];
		savePrefs();
		applyPrefs();
	}

	function resetAll() {
		prefs = { ...defaults };
		savePrefs();
		applyPrefs();
	}

	function close() {
		panel.open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && panel.open) {
			close();
			return;
		}

		if (e.key === 'Tab' && panel.open) {
			const panelEl = document.getElementById('a11y-panel');
			if (!panelEl) return;
			const focusable = panelEl.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const panelEl = document.getElementById('a11y-panel');
		if (panel.open && panelEl && !panelEl.contains(e.target as Node)) {
			close();
		}
	}

	function focusPanel() {
		requestAnimationFrame(() => {
			const closeBtn = document.querySelector<HTMLElement>('.a11y-close');
			closeBtn?.focus();
		});
	}

	$effect(() => {
		if (panel.open) {
			focusPanel();
		}
	});

	onMount(() => {
		loadPrefs();
		applyPrefs();
	});

	const sizeOptions = [
		{ value: 'small', label: 'Petit' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'large', label: 'Grand' }
	];

	const widthOptions = [
		{ value: 'narrow', label: 'Étroit' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'wide', label: 'Large' }
	];

	const lineHeightOptions = [
		{ value: 'tight', label: 'Serré' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'loose', label: 'Aéré' }
	];

	const spacingOptions = [
		{ value: 'tight', label: 'Serré' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'wide', label: 'Large' }
	];
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleClickOutside} />

{#if panel.open}
	<div class="a11y-overlay" aria-hidden="true"></div>
	<div id="a11y-panel" class="a11y-panel" role="dialog" aria-label="Paramètres d'accessibilité" aria-modal="true">
		<div class="a11y-panel-header">
			<h2>Accessibilité</h2>
			<button class="a11y-close" onclick={close} aria-label="Fermer">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>
		</div>

		<div class="a11y-group">
			<span class="a11y-label">Taille de police</span>
			<div class="a11y-options">
				{#each sizeOptions as opt}
					<button
						class="a11y-btn"
						class:active={prefs.fontSize === opt.value}
						aria-pressed={prefs.fontSize === opt.value}
						onclick={() => setPref('fontSize', opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
		</div>

		<div class="a11y-group">
			<span class="a11y-label">Largeur du contenu</span>
			<div class="a11y-options">
				{#each widthOptions as opt}
					<button
						class="a11y-btn"
						class:active={prefs.contentWidth === opt.value}
						aria-pressed={prefs.contentWidth === opt.value}
						onclick={() => setPref('contentWidth', opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
		</div>

		<div class="a11y-group">
			<span class="a11y-label">Hauteur de ligne</span>
			<div class="a11y-options">
				{#each lineHeightOptions as opt}
					<button
						class="a11y-btn"
						class:active={prefs.lineHeight === opt.value}
						aria-pressed={prefs.lineHeight === opt.value}
						onclick={() => setPref('lineHeight', opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
		</div>

		<div class="a11y-group">
			<span class="a11y-label">Espacement des lettres</span>
			<div class="a11y-options">
				{#each spacingOptions as opt}
					<button
						class="a11y-btn"
						class:active={prefs.letterSpacing === opt.value}
						aria-pressed={prefs.letterSpacing === opt.value}
						onclick={() => setPref('letterSpacing', opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
		</div>

		<div class="a11y-group">
			<span class="a11y-label">Espacement des mots</span>
			<div class="a11y-options">
				{#each spacingOptions as opt}
					<button
						class="a11y-btn"
						class:active={prefs.wordSpacing === opt.value}
						aria-pressed={prefs.wordSpacing === opt.value}
						onclick={() => setPref('wordSpacing', opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
		</div>

		<div class="a11y-group">
			<div class="a11y-toggle-row">
				<span class="a11y-label">Contraste élevé</span>
				<button
					class="a11y-toggle-btn"
					class:active={prefs.highContrast}
					aria-checked={prefs.highContrast}
					role="switch"
					onclick={() => toggleBoolean('highContrast')}
				>
					{prefs.highContrast ? 'Activé' : 'Désactivé'}
				</button>
			</div>
		</div>

		<div class="a11y-group">
			<div class="a11y-toggle-row">
				<span class="a11y-label">Police dyslexie</span>
				<button
					class="a11y-toggle-btn"
					class:active={prefs.dyslexiaFont}
					aria-checked={prefs.dyslexiaFont}
					role="switch"
					onclick={() => toggleBoolean('dyslexiaFont')}
				>
					{prefs.dyslexiaFont ? 'Activé' : 'Désactivé'}
				</button>
			</div>
		</div>

		<button class="a11y-reset" onclick={resetAll}>Réinitialiser tout</button>
	</div>
{/if}

<style>
	.a11y-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 60;
	}

	.a11y-panel {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 340px;
		max-width: 90vw;
		background: rgba(10, 10, 10, 0.95);
		backdrop-filter: blur(16px);
		border-left: 1px solid var(--border);
		z-index: 70;
		overflow-y: auto;
		padding: var(--gap);
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.a11y-panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.a11y-panel-header h2 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		margin: 0;
	}

	.a11y-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: none;
		background: none;
		color: var(--secondary);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: var(--transition);
	}

	.a11y-close:hover {
		background: var(--accent-light);
		color: var(--accent);
	}

	.a11y-group {
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}

	.a11y-label {
		display: block;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 8px;
	}

	.a11y-options {
		display: flex;
		gap: 6px;
	}

	.a11y-btn {
		flex: 1;
		font-family: var(--font-ui);
		font-size: 13px;
		padding: 8px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		color: var(--secondary);
		cursor: pointer;
		transition: var(--transition);
	}

	.a11y-btn:hover {
		border-color: var(--accent-border);
		color: var(--primary);
	}

	.a11y-btn.active {
		background: var(--accent-light);
		border-color: var(--accent);
		color: var(--accent);
		font-weight: 600;
	}

	.a11y-toggle-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.a11y-toggle-row .a11y-label {
		margin-bottom: 0;
	}

	.a11y-toggle-btn {
		font-family: var(--font-ui);
		font-size: 13px;
		padding: 6px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		color: var(--secondary);
		cursor: pointer;
		transition: var(--transition);
	}

	.a11y-toggle-btn.active {
		background: var(--accent);
		border-color: var(--accent);
		color: #000;
	}

	.a11y-reset {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		color: var(--secondary);
		cursor: pointer;
		transition: var(--transition);
		margin-top: auto;
	}

	.a11y-reset:hover {
		border-color: var(--accent-border);
		color: var(--accent);
	}
</style>
