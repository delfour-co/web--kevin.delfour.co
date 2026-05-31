<script lang="ts">
	import type { Snippet } from 'svelte';

	let { cmd, title, children }: { cmd: string; title: string; children: Snippet } = $props();
</script>

<section class="term-sec">
	<div class="term-cmd"><span class="p">$</span> {cmd}</div>
	<h2 class="visually-hidden">{title}</h2>
	{@render children()}
</section>
