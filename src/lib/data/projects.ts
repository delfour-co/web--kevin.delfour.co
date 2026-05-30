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
	{ slug: 'githero', stage: 'beta' },
	{ slug: 'open-event-orchestrator', stage: 'dev' },
	{ slug: 'repolens', stage: 'production' },
	{ slug: 'claude-pulse', stage: 'production' },
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

/**
 * Projets de la home — liste maintenue à la main à partir des dépôts des orgs
 * delfour-co / exec-d / systm-d (relevés via `gh`). Les dépôts privés sont marqués
 * `private: true` (pas de lien public) ; `href` pointe vers la page projet du
 * site quand elle existe. Exclus volontairement : web--kevin.delfour.co (ce
 * site), my-infra, my-projects, claude-team-sandbox.
 */
export interface HomeProject {
	name: string;
	desc: string;
	lang: string;
	href: string | null;
	private: boolean;
}

export const homeProjects: HomeProject[] = [
	{ name: 'asteroids', desc: 'Arcade shooter néon. Flutter + Flame.', lang: 'Dart', href: '/projets/asteroids/', private: false },
	{ name: 'notch', desc: 'SMS chiffrés par Enigma. Pas de serveur.', lang: 'Dart', href: '/projets/notch/', private: true },
	{ name: 'githero', desc: "App mobile de livres-jeux interactifs via l'historique git.", lang: 'Dart', href: '/projets/githero/', private: true },
	{ name: 'claude-pulse', desc: 'Monitore tes agents Claude Code en temps réel.', lang: 'JavaScript', href: '/projets/claude-pulse/', private: false },
	{ name: 'open-event-orchestrator', desc: 'Control plane open source pour événements.', lang: 'TypeScript', href: '/projets/open-event-orchestrator/', private: false },
	{ name: 'arcane-craft', desc: 'Action-RPG avec craft de sorts. Flutter + Flame.', lang: 'Dart', href: '/projets/arcane-craft/', private: true },
	{ name: 'repolens', desc: "CLI d'audit de dépôts GitHub : bonnes pratiques, sécurité, compliance.", lang: 'Rust', href: '/projets/repolens/', private: false },
	{ name: 'deus', desc: 'God-game, hommage à Populous. Flutter + Flame.', lang: 'Dart', href: null, private: true },
	{ name: 'tachikoma', desc: 'Speech-to-text avec traitement vocal IA. Flutter.', lang: 'Dart', href: null, private: true },
	{ name: 'trademind', desc: 'Agent de trading crypto assisté (Binance).', lang: 'Dart', href: null, private: true },
	{ name: 'dashboard', desc: 'Tableau de bord santé des projets mobiles delfour-co.', lang: 'Dart', href: null, private: true },
	{ name: 'd4-dark-ds', desc: 'Design system sombre TRON partagé pour les apps Flutter.', lang: 'Dart', href: null, private: true },
	{ name: 'cli-lotto-statistics', desc: 'Système de prédiction loto (calcul quantique, deep learning).', lang: 'Python', href: null, private: true },
	{ name: 'hinotes', desc: 'Transcription et résumé local pour le HiDock P1. 100% Rust.', lang: 'Rust', href: null, private: true },
	{ name: 'neon-echappement', desc: '', lang: 'Dart', href: null, private: true },
	{ name: 'guardians', desc: '', lang: 'Rust', href: null, private: true },
	{ name: 'claudettes', desc: '', lang: 'Rust', href: null, private: true },
	{ name: 'cavalio', desc: '', lang: 'Dart', href: null, private: true },
	{ name: 'dart-agent-graph', desc: '', lang: 'Dart', href: null, private: true },
	{ name: 'dark-ink', desc: '', lang: 'Dart', href: null, private: true },
	{ name: 'tui--survey-builder', desc: "Outil d'audit en Rust : audits complets de projets.", lang: 'Rust', href: 'https://github.com/delfour-co/tui--survey-builder', private: false },
	{ name: 'workspace--gk', desc: 'Alternative auto-hébergeable à Google Workspace.', lang: 'Rust', href: 'https://github.com/delfour-co/workspace--gk', private: false },
	{ name: 'workshop--motive_mappers', desc: 'Outil de management pour comprendre les motivations.', lang: 'TeX', href: 'https://github.com/delfour-co/workshop--motive_mappers', private: false },
	{ name: 'webapp--majikku-shisutemu', desc: '', lang: 'SCSS', href: 'https://github.com/delfour-co/webapp--majikku-shisutemu', private: false },
	{ name: 'web--welovegreenit.com', desc: 'Site We Love Green IT.', lang: 'HTML', href: 'https://github.com/delfour-co/web--welovegreenit.com', private: false },
	{ name: 'stoat_github_notify', desc: 'GitHub Action légère pour publier les événements CI / release / déploiement.', lang: 'TypeScript', href: 'https://github.com/systm-d/stoat_github_notify', private: false },
	{ name: 'dart_snapshot_store', desc: '', lang: 'Dart', href: 'https://github.com/systm-d/dart_snapshot_store', private: false },
	{ name: 'dart_slide', desc: '', lang: 'Dart', href: null, private: true }
];
