<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectDetail from '../ProjectDetail.svelte';

	let { project }: { project: Project } = $props();
</script>

<!-- Template « Jeux ». Personnaliser ici si ce type doit diverger de la base. -->
<ProjectDetail {project} />
