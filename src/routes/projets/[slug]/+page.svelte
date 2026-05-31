<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import GameProject from '$lib/components/project/templates/GameProject.svelte';
	import MobileProject from '$lib/components/project/templates/MobileProject.svelte';
	import CliProject from '$lib/components/project/templates/CliProject.svelte';
	import LibProject from '$lib/components/project/templates/LibProject.svelte';
	import WebProject from '$lib/components/project/templates/WebProject.svelte';

	let { data } = $props();
	const project = $derived(data.project);

	const templates = {
		game: GameProject,
		mobile: MobileProject,
		cli: CliProject,
		lib: LibProject,
		web: WebProject
	};
	const Template = $derived(templates[project.type]);
</script>

<SEO
	title={project.name}
	description={project.seoDescription ?? project.tagline ?? project.desc}
	url={`https://kevin.delfour.co/projets/${project.slug}/`}
/>

<Template {project} />
