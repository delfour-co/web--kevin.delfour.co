<script lang="ts">
	import { page } from '$app/state';
	import { getAccessibilityPanel } from '$lib/stores/accessibility.svelte';

	let menuOpen = $state(false);
	const a11yPanel = getAccessibilityPanel();

	const navItems = [
		{ label: 'Outils', href: '/outils/' },
		{ label: 'Livres', href: '/livres/' },
		{ label: 'Articles', href: '/articles/' },
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

		<div class="nav-center desktop-only">
			<ul class="nav-links">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class:active={page.url.pathname.startsWith(item.href)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="nav-actions">
			<a
				href="/search/"
				class="search-toggle"
				aria-label="Rechercher"
				title="Rechercher"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
			</a>
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

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mobile-overlay" onclick={closeMenu} onkeydown={() => {}}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<nav class="mobile-menu" onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
			<ul>
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
				<li>
					<a
						href="/search/"
						class:active={page.url.pathname.startsWith('/search/')}
						onclick={closeMenu}
					>
						Rechercher
					</a>
				</li>
			</ul>
		</nav>
	</div>
{/if}

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(12px);
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
		font-weight: 700;
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
		margin-left: auto;
	}

	.search-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		color: var(--secondary);
		border-radius: var(--radius-sm);
		transition: var(--transition);
		text-decoration: none;
	}

	.search-toggle:hover {
		background: var(--accent-light);
		color: var(--accent);
		text-decoration: none;
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
		color: var(--secondary);
		cursor: pointer;
		border-radius: var(--radius-sm);
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

	/* Desktop nav links */
	.nav-links {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 4px;
	}

	.nav-links a {
		display: block;
		position: relative;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--secondary);
		text-decoration: none;
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		transition: var(--transition);
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: var(--accent);
		border-radius: 1px;
		transition: width 0.3s ease;
		box-shadow: none;
	}

	.nav-links a:hover {
		color: var(--primary);
		background: var(--surface);
		text-decoration: none;
	}

	.nav-links a:hover::after {
		width: 60%;
	}

	.nav-links a.active {
		color: var(--accent);
		font-weight: 600;
		text-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
	}

	.nav-links a.active::after {
		width: 80%;
		box-shadow: 0 0 8px rgba(6, 182, 212, 0.6), 0 0 16px rgba(6, 182, 212, 0.3);
	}

	/* Mobile overlay — outside header stacking context */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		top: var(--header-height);
		z-index: 100;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	.mobile-menu {
		background: rgba(10, 10, 10, 0.98);
		border-bottom: 1px solid var(--border);
		padding: var(--gap) 0;
		max-height: calc(100dvh - var(--header-height));
		overflow-y: auto;
	}

	.mobile-menu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-menu a {
		display: block;
		font-family: var(--font-ui);
		font-size: 18px;
		font-weight: 500;
		color: var(--secondary);
		text-decoration: none;
		padding: 14px calc(var(--gap) * 1.5);
		transition: var(--transition);
	}

	.mobile-menu a:hover {
		color: var(--primary);
		background: var(--surface);
		text-decoration: none;
	}

	.mobile-menu a.active {
		color: var(--accent);
		font-weight: 600;
		border-left: 3px solid var(--accent);
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		.desktop-only {
			display: none;
		}
	}
</style>
