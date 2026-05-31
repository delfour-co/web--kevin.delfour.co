import { error } from '@sveltejs/kit';
import { getProject, detailSlugs } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return detailSlugs().map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project || !project.hasPage || !project.visible) {
		throw error(404, 'Projet introuvable');
	}
	return { project };
};
