<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectHero from './ProjectHero.svelte';
	import SectionBlock from './SectionBlock.svelte';

	let { project }: { project: Project } = $props();
</script>

<div class="term-page">
	<ProjectHero {project} />

	{#each project.sections ?? [] as section}
		<SectionBlock {section} />
	{/each}

	<footer class="term-foot">
		<a href="/projets/" class="term-back">← cd ~/projets</a>
	</footer>
</div>
