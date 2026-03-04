<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';

	let query = $state('');
	let results = $state<any[]>([]);
	let pagefind: any = null;
	let loading = $state(false);
	let ready = $state(false);
	let devMode = $state(false);

	onMount(async () => {
		try {
			const pagefindPath = `${window.location.origin}/pagefind/pagefind.js`;
			pagefind = await import(/* @vite-ignore */ pagefindPath);
			await pagefind.init();
			ready = true;
		} catch {
			devMode = true;
		}
	});

	async function search() {
		if (!pagefind || !query.trim()) {
			results = [];
			return;
		}

		loading = true;
		try {
			const response = await pagefind.search(query);
			const data = await Promise.all(response.results.slice(0, 10).map((r: any) => r.data()));
			results = data;
		} catch {
			results = [];
		}
		loading = false;
	}

	function handleInput() {
		search();
	}
</script>

<SEO
	title="Rechercher"
	description="Rechercher un article ou un outil sur kevin.delfour.co"
	url="https://kevin.delfour.co/search/"
	noindex={true}
/>

<div class="search-page">
	<header class="page-header">
		<h1>Rechercher</h1>
	</header>

	{#if devMode}
		<div class="search-notice">
			<p>La recherche est disponible après <code>npm run build</code>. En mode développement, Pagefind n'a pas encore indexé le contenu.</p>
		</div>
	{:else}
		<div class="search-input-wrapper">
			<input
				type="search"
				bind:value={query}
				oninput={handleInput}
				placeholder="Rechercher un article, un outil…"
				class="search-input"
				aria-label="Rechercher"
			/>
		</div>

		{#if loading}
			<p class="search-status">Recherche en cours…</p>
		{:else if query && results.length === 0}
			<p class="search-status">Aucun résultat pour "{query}".</p>
		{:else if !query}
			<p class="search-hint">Tape un mot-clé pour chercher dans les articles et outils.</p>
		{/if}

		{#if results.length > 0}
			<div class="search-results">
				{#each results as result}
					<a href={result.url} class="search-result">
						<h2 class="result-title">{result.meta?.title || result.url}</h2>
						<p class="result-excerpt">{@html result.excerpt}</p>
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.search-page {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}

	.page-header {
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.search-notice {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
	}

	.search-notice code {
		font-family: var(--font-mono);
		background: var(--code-bg);
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 13px;
	}

	.search-input-wrapper {
		margin-bottom: var(--gap);
	}

	.search-input {
		width: 100%;
		font-family: var(--font-ui);
		font-size: 16px;
		padding: 12px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-light);
	}

	.search-input::placeholder {
		color: var(--tertiary);
	}

	.search-status,
	.search-hint {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
	}

	.search-results {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.search-result {
		display: block;
		padding: var(--content-gap) 0;
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		color: inherit;
		transition: var(--transition);
	}

	.search-result:hover {
		text-decoration: none;
	}

	.search-result:hover .result-title {
		color: var(--accent);
	}

	.result-title {
		font-size: 1.1rem;
		margin: 0 0 4px 0;
		transition: var(--transition);
	}

	.result-excerpt {
		font-size: 0.9rem;
		color: var(--secondary);
		line-height: 1.5;
		margin: 0;
	}

	.result-excerpt :global(mark) {
		background: var(--accent-light);
		color: var(--accent);
		padding: 1px 2px;
		border-radius: 2px;
	}
</style>
