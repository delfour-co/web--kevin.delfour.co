export const projectStages = [
	{ key: 'ideation', label: 'Idéation', icon: '💡' },
	{ key: 'design', label: 'Conception', icon: '📐' },
	{ key: 'prototype', label: 'Prototype', icon: '🧪' },
	{ key: 'dev', label: 'Développement', icon: '⚙️' },
	{ key: 'alpha', label: 'Alpha', icon: '🔒' },
	{ key: 'beta', label: 'Bêta', icon: '🔓' },
	{ key: 'release', label: 'Release', icon: '🚀' },
	{ key: 'production', label: 'Production', icon: '✅' }
] as const;

export type ProjectStageKey = (typeof projectStages)[number]['key'];

export interface FeaturedProject {
	slug: string;
	stage: ProjectStageKey;
}

export const featuredProjects: FeaturedProject[] = [
	{ slug: 'asteroids', stage: 'alpha' },
	{ slug: 'notch', stage: 'alpha' },
	{ slug: 'open-event-orchestrator', stage: 'dev' },
	{ slug: 'repolens', stage: 'production' },
	{ slug: 'arcane-craft', stage: 'prototype' }
];

export function getProjectStage(slug: string): ProjectStageKey | undefined {
	return featuredProjects.find((p) => p.slug === slug)?.stage;
}

export function getProjectStageLabel(slug: string): string | undefined {
	const key = getProjectStage(slug);
	return projectStages.find((s) => s.key === key)?.label;
}

export interface Project {
	nom: string;
	url: string;
	description: string;
	langage: string;
	technologies: string[];
}

export interface ProjectCategory {
	label: string;
	projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
	{
		label: 'Katas TypeScript',
		projects: [
			{
				nom: 'game-of-life',
				url: 'https://github.com/delfour-co/kata--game-of-life',
				description: "Implémentation du Game of Life de Conway. Automate cellulaire avec TDD.",
				langage: 'TypeScript',
				technologies: ['TypeScript', 'TDD', 'Modélisation']
			},
			{
				nom: 'roman-2-numerals',
				url: 'https://github.com/delfour-co/kata--roman-2-numerals',
				description: 'Conversion de nombres arabes en chiffres romains avec TDD.',
				langage: 'TypeScript',
				technologies: ['TypeScript', 'TDD', 'Algorithmique']
			},
			{
				nom: 'fizzbuzz-typescript',
				url: 'https://github.com/delfour-co/kata--fizzbuzz-typescript',
				description: 'Kata classique FizzBuzz en TypeScript avec TDD.',
				langage: 'TypeScript',
				technologies: ['TypeScript', 'TDD']
			},
			{
				nom: 'bowling',
				url: 'https://github.com/delfour-co/kata--bowling',
				description: 'Calcul de score de bowling avec strikes et spares. TDD et modélisation.',
				langage: 'TypeScript',
				technologies: ['TypeScript', 'TDD', 'Modélisation']
			}
		]
	},
	{
		label: 'Katas JavaScript',
		projects: [
			{
				nom: 'xtreme-carpaccio-js-server',
				url: 'https://github.com/delfour-co/kata--xtreme-carpaccio-js-server',
				description: "Serveur pour animer l'atelier Extreme Carpaccio.",
				langage: 'JavaScript',
				technologies: ['JavaScript', 'Node.js', 'Atelier']
			},
			{
				nom: 'xtreme-carpaccio-js-client',
				url: 'https://github.com/delfour-co/kata--xtreme-carpaccio-js-client',
				description: "Client pour l'atelier Extreme Carpaccio. Découpage itératif et communication HTTP.",
				langage: 'JavaScript',
				technologies: ['JavaScript', 'HTTP', 'TDD']
			},
			{
				nom: 'fizzbuzz',
				url: 'https://github.com/delfour-co/kata--fizzbuzz',
				description: 'Kata classique FizzBuzz en JavaScript.',
				langage: 'JavaScript',
				technologies: ['JavaScript', 'TDD']
			}
		]
	},
	{
		label: 'Katas Python',
		projects: [
			{
				nom: 'roman-2-numerals-python',
				url: 'https://github.com/delfour-co/kata--roman-2-numerals-python',
				description: 'Conversion bidirectionnelle entre nombres arabes et chiffres romains avec pytest.',
				langage: 'Python',
				technologies: ['Python', 'pytest', 'TDD']
			}
		]
	}
];
