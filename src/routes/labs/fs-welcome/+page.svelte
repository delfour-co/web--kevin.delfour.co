<script lang="ts">
	import LabShell from '$lib/components/labs/LabShell.svelte';
	import FsWelcome from '$lib/components/dbrain/fs/FsWelcome.svelte';
</script>

<LabShell title="Welcome" command="render fs-welcome">
	{#snippet stage()}
		<div class="wrap"><FsWelcome /></div>
	{/snippet}
</LabShell>

<style>
	.wrap {
		position: absolute;
		inset: 0;
		margin: auto;
		width: min(760px, 92%);
		height: max-content;
	}
</style>
