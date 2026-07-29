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
		{ label: 'Leadership', href: '/leadership/' },
		{ label: 'Projets', href: '/projets/' },
		{ label: 'Livres', href: '/livres/' },
		{ label: 'Conférences', href: '/conferences/' },
		// Communauté est en pied de page, comme Outils et Projets : les engagements
		// sont en pause depuis 2026, la page reste accessible sans occuper la nav.
		{ label: 'À propos', href: '/a-propos/' },
		{ label: 'CV', href: '/cv/' },
		{ label: 'Contact', href: '/contact/' }
	];

	function isActive(href: string) {
		return page.url.pathname.startsWith(href);
	}
</script>

<a href="#main-content" class="skip-link">Aller au contenu</a>

<header class="site-header" data-pagefind-ignore>
	<div class="shell header-inner">
		<a class="wordmark" href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined}>
			Kevin Delfour
		</a>

		<nav class="nav" aria-label="Navigation principale">
			{#each navItems as item}
				<a class="nav-link" href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="actions">
			<a href="/search/" class="ico" aria-label="Rechercher" title="Rechercher">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.8" y2="16.8" />
				</svg>
			</a>
			<ThemeMenu />
			<button
				class="ico"
				onclick={(e) => {
					e.stopPropagation();
					a11yPanel.toggle();
				}}
				aria-label="Paramètres d'accessibilité"
				title="Paramètres d'accessibilité"
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="3" />
					<path
						d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15Z"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<main id="main-content" class="shell" data-pagefind-body>
	{@render children()}
</main>

<Footer />

<AccessibilityPanel />

<style>
	:global(.shell) {
		width: 100%;
		max-width: var(--home-width-a11y);
		margin: 0 auto;
		padding-inline: clamp(20px, 4vw, 40px);
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--theme) 88%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.header-inner {
		display: flex;
		align-items: center;
		gap: 28px;
		min-height: var(--header-height);
	}

	.wordmark {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
		color: var(--primary);
		white-space: nowrap;
		flex-shrink: 0;
	}
	.wordmark:hover {
		color: var(--primary);
		text-decoration: none;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.nav-link {
		position: relative;
		padding: 8px 10px;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--secondary);
		white-space: nowrap;
	}
	.nav-link:hover {
		color: var(--primary);
		background: var(--surface-hover);
		text-decoration: none;
	}
	.nav-link[aria-current='page'] {
		color: var(--primary);
	}
	.nav-link[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: -13px;
		height: 2px;
		background: var(--accent);
		border-radius: 2px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}

	.ico {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		padding: 0;
		border: none;
		background: none;
		color: var(--secondary);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: var(--transition);
	}
	.ico:hover {
		background: var(--surface-hover);
		color: var(--primary);
		text-decoration: none;
	}

	/* Sous 1040px la nav passe sur sa propre ligne, défilable horizontalement. */
	@media (max-width: 1040px) {
		.header-inner {
			flex-wrap: wrap;
			gap: 0 16px;
			padding-block: 10px;
		}
		.wordmark {
			flex: 1;
		}
		.nav {
			order: 3;
			flex-basis: 100%;
			overflow-x: auto;
			scrollbar-width: none;
			padding-bottom: 2px;
			margin-inline: calc(clamp(20px, 4vw, 40px) * -1);
			padding-inline: clamp(20px, 4vw, 40px);
			mask-image: linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%);
		}
		.nav::-webkit-scrollbar {
			display: none;
		}
		.nav-link[aria-current='page']::after {
			bottom: 0;
		}
	}
</style>
