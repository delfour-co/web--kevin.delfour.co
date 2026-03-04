<script lang="ts">
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import { getAccessibilityPanel } from '$lib/stores/accessibility.svelte';

	let menuOpen = $state(false);
	const a11yPanel = getAccessibilityPanel();

	const navItems = [
		{ label: 'Articles', href: '/articles/' },
		{ label: 'Livres', href: '/livres/' },
		{ label: 'Outils', href: '/outils/' },
		{ label: 'Projets', href: '/projets/' },
		{ label: 'Vision', href: '/vision/' },
		{ label: 'À propos', href: '/a-propos/' },
		{ label: 'Contact', href: '/contact/' }
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		menuOpen = false;
		document.body.style.overflow = '';
	}

	function toggleAccessibility(e: MouseEvent) {
		e.stopPropagation();
		a11yPanel.toggle();
	}
</script>

<header class="header">
	<nav class="nav">
		<a href="/" class="logo">Kevin Delfour</a>

		<div class="nav-center">
			<ul class="nav-menu" class:open={menuOpen}>
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class:active={page.url.pathname.startsWith(item.href)}
							onclick={closeMenu}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="nav-actions">
			<ThemeToggle />

			<button
				class="a11y-toggle"
				onclick={toggleAccessibility}
				aria-label="Paramètres d'accessibilité"
				title="Paramètres d'accessibilité"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
			</button>

			<button
				class="menu-toggle"
				onclick={toggleMenu}
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
			>
				{#if menuOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
				{/if}
			</button>
		</div>
	</nav>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--theme);
		border-bottom: 1px solid var(--border);
		height: var(--header-height);
	}

	.nav {
		display: flex;
		align-items: center;
		max-width: var(--home-width);
		margin: 0 auto;
		padding: 0 var(--gap);
		height: 100%;
	}

	.logo {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--primary);
		text-decoration: none;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.logo:hover {
		color: var(--accent);
		text-decoration: none;
	}

	.nav-center {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}

	.a11y-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: none;
		background: none;
		color: var(--primary);
		cursor: pointer;
		border-radius: var(--radius);
		transition: var(--transition);
	}

	.a11y-toggle:hover {
		background: var(--accent-light);
		color: var(--accent);
	}

	.menu-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: none;
		background: none;
		color: var(--primary);
		cursor: pointer;
	}

	.nav-menu {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 4px;
	}

	.nav-menu a {
		display: block;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--secondary);
		text-decoration: none;
		padding: 8px 12px;
		border-radius: var(--radius);
		transition: var(--transition);
	}

	.nav-menu a:hover {
		color: var(--primary);
		background: var(--accent-light);
		text-decoration: none;
	}

	.nav-menu a.active {
		color: var(--accent);
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		.nav-menu {
			display: none;
			position: fixed;
			top: var(--header-height);
			left: 0;
			right: 0;
			bottom: 0;
			flex-direction: column;
			background: var(--theme);
			padding: var(--gap);
			gap: 0;
			z-index: 40;
			overflow-y: auto;
		}

		.nav-menu.open {
			display: flex;
		}

		.nav-menu a {
			font-size: 18px;
			padding: 14px 16px;
		}
	}
</style>
