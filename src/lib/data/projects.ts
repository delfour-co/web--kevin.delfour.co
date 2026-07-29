import data from './projects.json';

/**
 * Source de vérité des projets — pilotée par `projects.json`.
 * Chaque projet a un `type` (qui détermine son template et sa catégorie),
 * un `visible` (pour l'afficher ou non) et, s'il a une page (`hasPage`), un
 * contenu détaillé sous forme de `sections[]` typées rendues par les composants
 * de `$lib/components/project/`.
 */

export type ProjectType = 'game' | 'mobile' | 'cli' | 'lib' | 'web';

export interface ProjectLink {
	label: string;
	href: string;
}
export interface FeatureItem {
	title: string;
	desc: string;
}
export interface CommandItem {
	cmd: string;
	desc: string;
}
export interface RowItem {
	label: string;
	values: string[];
}
export interface StatItem {
	value: string;
	label: string;
}
export interface VersionItem {
	name: string;
	price: string;
	desc: string;
	featured?: boolean;
}
export interface ShotItem {
	src: string;
	alt: string;
}

export type ProjectSection =
	| { kind: 'text'; cmd: string; title: string; paragraphs: string[]; callout?: string }
	| { kind: 'features'; cmd: string; title: string; items: FeatureItem[] }
	| { kind: 'steps'; cmd: string; title: string; items: FeatureItem[] }
	| { kind: 'commands'; cmd: string; title: string; items: CommandItem[] }
	| { kind: 'rows'; cmd: string; title: string; items: RowItem[] }
	| { kind: 'stats'; cmd: string; title: string; items: StatItem[] }
	| { kind: 'versions'; cmd: string; title: string; items: VersionItem[] }
	| { kind: 'chips'; cmd: string; title: string; items: string[] }
	| { kind: 'links'; cmd: string; title: string; items: ProjectLink[] }
	| { kind: 'gallery'; cmd: string; title: string; shots: ShotItem[] };

export interface Project {
	slug: string;
	name: string;
	type: ProjectType;
	lang: string;
	private: boolean;
	visible: boolean;
	hasPage: boolean;
	status: string;
	statusNote?: string;
	tagline?: string;
	desc: string;
	problem?: string;
	how?: string;
	repoUrl?: string;
	/** Site public du projet (landing, distribution). Prioritaire sur repoUrl pour la carte. */
	siteUrl?: string;
	seoDescription?: string;
	icon?: string;
	iconText?: string;
	heroImage?: string;
	heroLinks?: ProjectLink[];
	sections?: ProjectSection[];
}

export const projects = data as unknown as Project[];

export const typeOrder: ProjectType[] = ['game', 'mobile', 'cli', 'lib', 'web'];

export const typeLabel: Record<ProjectType, string> = {
	game: 'Jeux',
	mobile: 'Apps mobiles',
	cli: 'Outils & CLI',
	lib: 'Libs & design',
	web: 'Web & plateformes'
};

export const visibleProjects: Project[] = projects.filter((p) => p.visible);

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

/** Slugs des projets qui ont une page de détail (pour le prerender). */
export function detailSlugs(): string[] {
	return projects.filter((p) => p.visible && p.hasPage).map((p) => p.slug);
}

/** Destination d'une carte projet : page de détail, sinon site public, sinon dépôt, sinon rien. */
export function cardHref(p: Project): string | null {
	if (p.hasPage) return `/projets/${p.slug}/`;
	return p.siteUrl ?? p.repoUrl ?? null;
}

export interface ProjectGroup {
	type: ProjectType;
	label: string;
	items: Project[];
}

/** Projets visibles regroupés par type, dans l'ordre de `typeOrder`. */
export function groupedProjects(): ProjectGroup[] {
	return typeOrder
		.map((type) => ({ type, label: typeLabel[type], items: visibleProjects.filter((p) => p.type === type) }))
		.filter((g) => g.items.length > 0);
}
