<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import QuickAccess from '$lib/components/dbrain/fs/QuickAccess.svelte';
</script>

<LabShell title="Quick Access" command="render quick-access">
	{#snippet stage()}
		<div class="wrap"><QuickAccess /></div>
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		inset: 0;
		margin: auto;
		width: min(320px, 86%);
		height: max-content;
	}
</style>
