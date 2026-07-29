<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = 'dark' | 'light';

	function read(): Theme {
		if (!browser) return 'dark';
		return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
	}

	let current = $state<Theme>(read());

	function toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', current);
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', current === 'light' ? '#ffffff' : '#0c0e12');
		try {
			localStorage.setItem('theme', current);
		} catch (e) {
			// stockage indisponible : le thème reste valable pour la session
		}
	}
</script>

<button
	class="theme-trigger"
	onclick={toggle}
	aria-label={current === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
	title={current === 'dark' ? 'Thème clair' : 'Thème sombre'}
>
	{#if current === 'dark'}
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
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	{:else}
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
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
		</svg>
	{/if}
</button>

<style>
	.theme-trigger {
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
	.theme-trigger:hover {
		background: var(--surface-hover);
		color: var(--primary);
	}
</style>
