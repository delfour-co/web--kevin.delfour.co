<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		note = "Tout tourne dans votre navigateur — rien n'est envoyé à un serveur, vos données restent chez vous.",
		children
	}: {
		title: string;
		description?: string;
		note?: string | null;
		children: Snippet;
	} = $props();
</script>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd">Boîte à outils</div>
		<h1>{title}</h1>
		{#if description}<p class="term-lead">{description}</p>{/if}
		{#if note}<p class="term-note">{note}</p>{/if}
	</header>

	{@render children()}
</div>
