<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		command,
		note = "Tout tourne dans ton navigateur — rien n'est envoyé à un serveur, tes données restent chez toi.",
		children
	}: {
		title: string;
		description?: string;
		command?: string;
		note?: string | null;
		children: Snippet;
	} = $props();
</script>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd"><span class="p">$</span> {command ?? title}</div>
		<h1 class="visually-hidden">{title}</h1>
		{#if description}<p class="term-lead">{description}</p>{/if}
		{#if note}<p class="term-note">{note}</p>{/if}
	</header>

	{@render children()}
</div>
