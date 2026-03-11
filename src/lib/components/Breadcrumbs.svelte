<script lang="ts">
	let { items } = $props<{
		items: { label: string; href?: string }[];
	}>();
</script>

<nav class="breadcrumbs" aria-label="Fil d'Ariane">
	{#each items as item, i}
		{#if i > 0}
			<span class="breadcrumb-sep" aria-hidden="true">/</span>
		{/if}
		{#if item.href}
			<a href={item.href} class="breadcrumb-link">{item.label}</a>
		{:else}
			<span class="breadcrumb-current" aria-current="page">{item.label}</span>
		{/if}
	{/each}
</nav>

<style>
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--tertiary);
		margin-bottom: calc(var(--gap) * 1.5);
		flex-wrap: wrap;
	}

	.breadcrumb-link {
		color: var(--tertiary);
		text-decoration: none;
	}

	.breadcrumb-link:hover {
		color: var(--accent);
	}

	.breadcrumb-current {
		color: var(--secondary);
	}
</style>
