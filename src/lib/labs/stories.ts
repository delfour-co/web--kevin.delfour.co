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
	},
	{
		id: 'core',
		title: 'Cognitive Filesystem',
		group: 'Écrans',
		href: '/labs/core',
		status: 'wip',
		blurb: 'Home v2 assemblée : arbre /brain, listing des pages, cube core, statut, observations.'
	},
	{
		id: 'cognitive-core',
		title: 'Cognitive Core',
		group: 'Filesystem',
		href: '/labs/cognitive-core',
		status: 'stable',
		blurb: 'Widget du cube : état + couleur du cluster, fond transparent.'
	},
	{
		id: 'fs-tree',
		title: 'File Tree',
		group: 'Filesystem',
		href: '/labs/fs-tree',
		status: 'stable',
		blurb: 'Arbre /brain — dossiers uniquement, branche sélectionnée dépliée.'
	},
	{
		id: 'fs-listing',
		title: 'File Listing',
		group: 'Filesystem',
		href: '/labs/fs-listing',
		status: 'stable',
		blurb: 'Listing d’un dossier : sous-dossiers en cartes, ou fichiers en table.'
	},
	{
		id: 'core-status',
		title: 'Core Status',
		group: 'Filesystem',
		href: '/labs/core-status',
		status: 'stable',
		blurb: 'Panneau de statut : state / mode / focus / nodes… + sparklines.'
	},
	{
		id: 'observations',
		title: 'System Observations',
		group: 'Filesystem',
		href: '/labs/observations',
		status: 'stable',
		blurb: 'Observations système contextuelles selon le dossier actif.'
	},
	{
		id: 'quick-access',
		title: 'Quick Access',
		group: 'Filesystem',
		href: '/labs/quick-access',
		status: 'stable',
		blurb: 'Grille d’accès rapides (recherche, graph, cube, contact, lab).'
	},
	{
		id: 'command-bar',
		title: 'Command Bar',
		group: 'Filesystem',
		href: '/labs/command-bar',
		status: 'stable',
		blurb: 'Barre terminal + onglets de navigation entre clusters.'
	},
	{
		id: 'fs-welcome',
		title: 'Welcome',
		group: 'Filesystem',
		href: '/labs/fs-welcome',
		status: 'stable',
		blurb: 'Encart d’accueil de la racine /brain : bienvenue + comment naviguer.'
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
