<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = { id: string; label: string };

	const THEMES: Theme[] = [
		{ id: 'slate', label: 'Slate' },
		{ id: 'dracula', label: 'Dracula' },
		{ id: 'catppuccin', label: 'Catppuccin' },
		{ id: 'gruvbox', label: 'Gruvbox' },
		{ id: 'nord', label: 'Nord' },
		{ id: 'solarized', label: 'Solarized' },
		{ id: 'light', label: 'Light' },
		{ id: 'crt', label: 'CRT vert' },
		{ id: 'amber', label: 'Amber' }
	];

	let open = $state(false);
	let current = $state(browser ? document.documentElement.getAttribute('data-theme') || 'slate' : 'slate');

	function choose(id: string) {
		current = id;
		document.documentElement.setAttribute('data-theme', id);
		try {
			localStorage.setItem('theme', id);
		} catch (e) {}
		open = false;
	}
</script>

<div class="theme-menu">
	<button
		class="theme-trigger"
		onclick={() => (open = !open)}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Choisir un thème"
		title="Thème"
	>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"/></svg>
	</button>

	{#if open}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<ul class="theme-list" role="listbox" tabindex="-1">
			{#each THEMES as t}
				<li>
					<button
						class="theme-option"
						class:active={current === t.id}
						role="option"
						aria-selected={current === t.id}
						onclick={() => choose(t.id)}
					>
						<span class="swatch" data-swatch={t.id}></span>
						{t.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.theme-menu { position: relative; }
	.theme-trigger {
		display: flex; align-items: center; justify-content: center;
		width: 40px; height: 40px; padding: 0; border: none; background: none;
		color: var(--secondary); cursor: pointer; border-radius: var(--radius-sm);
		transition: var(--transition);
	}
	.theme-trigger:hover { background: var(--accent-light); color: var(--accent); }
	.theme-list {
		position: absolute; top: 48px; right: 0; z-index: 60;
		margin: 0; padding: 6px; list-style: none;
		background: var(--surface); border: 1px solid var(--border);
		border-radius: var(--radius-sm); box-shadow: var(--shadow-lg);
		min-width: 180px;
	}
	.theme-option {
		display: flex; align-items: center; gap: 10px; width: 100%;
		padding: 7px 10px; border: none; background: none; cursor: pointer;
		font-family: var(--font-ui); font-size: 13px; color: var(--content);
		border-radius: var(--radius-sm); text-align: left;
	}
	.theme-option:hover { background: var(--surface-hover); color: var(--accent); }
	.theme-option.active { color: var(--accent); }
	.swatch {
		width: 14px; height: 14px; border-radius: 4px; flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.swatch[data-swatch='slate'] { background: #2dd4bf; }
	.swatch[data-swatch='dracula'] { background: #ff79c6; }
	.swatch[data-swatch='catppuccin'] { background: #cba6f7; }
	.swatch[data-swatch='gruvbox'] { background: #b8bb26; }
	.swatch[data-swatch='nord'] { background: #88c0d0; }
	.swatch[data-swatch='solarized'] { background: #2aa198; }
	.swatch[data-swatch='light'] { background: #fdf6e3; }
	.swatch[data-swatch='crt'] { background: #33ff77; }
	.swatch[data-swatch='amber'] { background: #ffb000; }
</style>
