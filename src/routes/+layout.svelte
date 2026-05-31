<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { getAccessibilityPanel } from '$lib/stores/accessibility.svelte';
	import ThemeMenu from '$lib/components/ThemeMenu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AccessibilityPanel from '$lib/components/AccessibilityPanel.svelte';

	let { children } = $props();
	const a11yPanel = getAccessibilityPanel();

	const navItems = [
		{ label: 'projets/', href: '/projets/', icon: '▸' },
		{ label: 'outils/', href: '/outils/', icon: '▸' },
		{ label: 'livres/', href: '/livres/', icon: '▸' },
		{ label: 'about.md', href: '/a-propos/', icon: '≡' },
		{ label: 'contact', href: '/contact/', icon: '@' }
	];

	const pathLabel = $derived.by(() => {
		const p = page.url.pathname.replace(/^\/+|\/+$/g, '');
		return p === '' ? 'lieu' : p;
	});
	const isHome = $derived(page.url.pathname === '/');
	// Le bac-à-sable D-Brain OS (/labs) n'utilise pas la fenêtre terminal.
	const bare = $derived(page.url.pathname.startsWith('/labs'));

	function toggleAccessibility(e: MouseEvent) {
		e.stopPropagation();
		a11yPanel.toggle();
	}
</script>

{#if bare}
	{@render children()}
{:else}
<a href="#main-content" class="skip-link">Aller au contenu</a>

<div class="win">
	<header class="win-bar">
		<div class="win-ctl" aria-hidden="true">
			<b style="--cc: var(--accent3)"></b>
			<b style="--cc: var(--warning)"></b>
			<b style="--cc: var(--accent)"></b>
		</div>

		<a class="win-title" href="/">kevin@delfour: ~/{pathLabel} — zsh</a>

		<div class="win-actions">
			<a href="/search/" class="ico" aria-label="Rechercher" title="Rechercher">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
			</a>
			<ThemeMenu />
			<button
				class="ico"
				onclick={toggleAccessibility}
				aria-label="Paramètres d'accessibilité"
				title="Paramètres d'accessibilité"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
			</button>
		</div>
	</header>

	<div class="win-body">
		<nav class="side" aria-label="Navigation principale">
			<a class="side-head" href="/" class:active={isHome}>~ / LIEU</a>
			{#each navItems as item}
				<a
					class="side-row"
					href={item.href}
					class:active={page.url.pathname.startsWith(item.href)}
				>
					<span class="tw">{item.icon}</span> {item.label}
				</a>
			{/each}
		</nav>

		<main id="main-content" class="main">
			{@render children()}
		</main>
	</div>

	<Footer />

	<div class="win-status" aria-hidden="true">
		<span class="seg mode">NORMAL</span>
		<span class="seg path">~/{pathLabel}</span>
		<span class="sp"></span>
		<span class="seg">lyon</span>
		<span class="seg">17y</span>
		<span class="seg">utf-8</span>
	</div>
</div>

<AccessibilityPanel />
{/if}

<style>
	.win {
		max-width: var(--home-width-a11y);
		margin: calc(var(--gap) * 1.5) auto;
		background: var(--theme);
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		display: flex;
		flex-direction: column;
		min-height: calc(100dvh - var(--gap) * 3);
	}

	/* Barre de titre */
	.win-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	/* Contrôles « cyberpunk » — chips néon angulaires (remplacent les pastilles macOS) */
	.win-ctl {
		display: flex;
		gap: 8px;
		flex-shrink: 0;
		padding-left: 2px;
	}
	.win-ctl b {
		width: 12px;
		height: 12px;
		background: var(--cc);
		clip-path: polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px);
		box-shadow: 0 0 6px var(--cc), 0 0 2px var(--cc);
		transition: var(--transition);
	}
	.win-bar:hover .win-ctl b {
		box-shadow: 0 0 11px var(--cc), 0 0 4px var(--cc);
	}

	.win-title {
		flex: 1;
		min-width: 0;
		text-align: center;
		color: var(--tertiary);
		font-size: 0.75rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: none;
	}
	.win-title:hover {
		color: var(--accent);
		text-decoration: none;
	}

	.win-actions {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}
	.win-actions :global(.theme-trigger) {
		width: 32px;
		height: 32px;
	}

	.ico {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		border: none;
		background: none;
		color: var(--secondary);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: var(--transition);
		text-decoration: none;
	}
	.ico:hover {
		background: var(--accent-light);
		color: var(--accent);
		text-decoration: none;
	}

	/* Corps : sidebar (nav unique) + contenu */
	.win-body {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.side {
		width: 188px;
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		padding: 14px 0;
		font-size: 0.75rem;
	}
	.side-head {
		display: block;
		color: var(--tertiary);
		font-size: 0.625rem;
		letter-spacing: 0.14em;
		padding: 0 16px 10px;
		text-decoration: none;
		transition: var(--transition);
	}
	.side-head:hover,
	.side-head.active {
		color: var(--accent);
		text-decoration: none;
	}
	.side-row {
		display: flex;
		gap: 7px;
		align-items: center;
		padding: 5px 16px;
		color: var(--content);
		text-decoration: none;
		transition: var(--transition);
	}
	.side-row:hover {
		background: var(--surface-hover);
		color: var(--accent);
		text-decoration: none;
	}
	.side-row.active {
		color: var(--accent);
		background: var(--accent-light);
	}
	.side-row .tw {
		color: var(--tertiary);
	}
	.side-row.active .tw {
		color: var(--accent);
	}

	.main {
		flex: 1;
		min-width: 0;
		min-height: 0;
		padding: 0;
	}

	/* Barre de statut (type tmux) */
	.win-status {
		display: flex;
		align-items: stretch;
		font-size: 0.6875rem;
		background: var(--surface);
		border-top: 1px solid var(--border);
	}
	.win-status .seg {
		display: flex;
		align-items: center;
		padding: 5px 12px;
		color: var(--tertiary);
	}
	.win-status .mode {
		background: var(--accent);
		color: var(--theme);
		font-weight: 700;
	}
	.win-status .path {
		color: var(--accent2);
	}
	.win-status .sp {
		flex: 1;
	}

	/* Responsive — la sidebar devient des onglets qui passent à la ligne (aucun scroll horizontal) */
	@media (max-width: 760px) {
		.win {
			margin: var(--gap) var(--gap) calc(var(--gap) * 2);
			min-height: 0;
		}
		.win-body {
			flex-direction: column;
		}
		.side {
			width: auto;
			border-right: none;
			border-bottom: 1px solid var(--border);
			display: flex;
			flex-wrap: wrap;
			gap: 4px;
			padding: 10px 12px;
		}
		.side-head {
			width: 100%;
			padding: 0 4px 6px;
		}
		.side-row {
			padding: 4px 9px;
			border-radius: 6px;
			white-space: nowrap;
		}
	}

	@media (max-width: 560px) {
		.win-bar {
			gap: 8px;
			padding: 8px 10px;
		}
		.win-title {
			font-size: 0.6875rem;
		}
	}
</style>
