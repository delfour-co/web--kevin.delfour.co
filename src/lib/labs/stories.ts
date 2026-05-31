// Registre des « stories » du lab de composants D-Brain OS.
// Ajouter un composant = ajouter une entrée ici + créer sa page sous src/routes/labs/<id>/.

export type LabStatus = 'stable' | 'wip' | 'idea';

export interface LabStory {
	id: string;
	title: string;
	group: string;
	href: string;
	status: LabStatus;
	blurb: string;
}

export const labStories: LabStory[] = [
	{
		id: 'cube',
		title: 'Consciousness Cube',
		group: 'Noyau 3D',
		href: '/labs/cube',
		status: 'stable',
		blurb: 'Cube conscience — 3 états (idle/exploration/response), 6 clusters, socle radar instrumenté.'
	}
];

export const statusLabel: Record<LabStatus, string> = {
	stable: 'stable',
	wip: 'wip',
	idea: 'idée'
};

export interface LabGroup {
	name: string;
	stories: LabStory[];
}

/** Stories regroupées par `group`, dans l'ordre de première apparition. */
export function groupedStories(): LabGroup[] {
	const groups: LabGroup[] = [];
	for (const story of labStories) {
		let g = groups.find((x) => x.name === story.group);
		if (!g) {
			g = { name: story.group, stories: [] };
			groups.push(g);
		}
		g.stories.push(story);
	}
	return groups;
}
