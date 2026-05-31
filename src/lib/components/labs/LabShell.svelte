<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/labs/lab.css';

	let {
		title,
		command = undefined,
		status = 'online',
		accent = '#00e5ff',
		stage,
		panel = undefined
	}: {
		title: string;
		command?: string;
		status?: string;
		accent?: string;
		stage: Snippet;
		panel?: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>D-Brain OS — {title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="lab" style="--lab-accent: {accent}">
	<header class="lab-bar">
		<a class="lab-brand" href="/labs">D-BRAIN&nbsp;OS</a>
		<span class="lab-bar-sub">{command ?? title}</span>
		<span class="lab-bar-status"><i style="background: {accent}"></i> {status}</span>
	</header>

	<main class="lab-main" class:no-panel={!panel}>
		<div class="lab-stage">
			<div class="lab-corner tl"></div>
			<div class="lab-corner tr"></div>
			<div class="lab-corner bl"></div>
			<div class="lab-corner br"></div>
			{@render stage()}
		</div>

		{#if panel}
			<aside class="lab-panel">
				{@render panel()}
			</aside>
		{/if}
	</main>
</div>
