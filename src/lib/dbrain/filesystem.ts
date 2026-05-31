// Modèle de données hiérarchique du « Cognitive Filesystem » de D-Brain OS.
// Les contenus réels du site sont exposés comme une arborescence /brain/* :
//   /brain
//   ├── projects/  → games · mobile · cli · libs · web   (projets par type)
//   ├── tools/     → team · decision · maturity · tech · docs · product
//   ├── knowledge/ → livres
//   ├── signals/   → communautés
//   └── identity/  → profil & contact
// Les composants de présentation (FsTree, FsListing…) consomment ce module.

import { visibleProjects } from '$lib/data/projects';
import type { Project, ProjectType } from '$lib/data/projects';
import type { CubeActivity } from '$lib/dbrain/cube';

export interface FsFile {
	node: 'file';
	name: string;
	typeLabel: string;
	lang: string;
	status: string;
	nodes: number;
	size: string;
	href: string;
	external?: boolean;
	private?: boolean;
}

export interface FsDir {
	node: 'dir';
	id: string;
	name: string; // ex. "projects/"
	label: string; // ex. "PROJECTS"
	desc: string;
	color: string; // couleur du cluster
	activity: CubeActivity; // état du cube quand ce dossier est actif
	obs: string[]; // observations système contextuelles
	children: FsNode[];
}

export type FsNode = FsDir | FsFile;

// --- Métriques « flavor » déterministes (décor, pas de vraies données) --------
export function hash(s: string): number {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
	return Math.abs(h);
}

/** Points d'une mini-courbe (sparkline) déterministe, pour un viewBox 0 0 65 18. */
export function spark(seed: number): string {
	let v = seed % 97;
	const pts: string[] = [];
	for (let i = 0; i < 14; i++) {
		v = (v * 73 + 41) % 97;
		pts.push(`${i * 5},${2 + (v % 14)}`);
	}
	return pts.join(' ');
}

const faux = (slug: string) => ({
	nodes: 32 + (hash(slug) % 160),
	size: `${(5 + (hash(slug) % 380) / 10).toFixed(1)} MB`
});

// --- projects/ → projets réels, regroupés par type ----------------------------
const PROJECT_TYPES: { type: ProjectType; name: string; label: string; ext: string; typeLabel: string }[] =
	[
		{ type: 'game', name: 'games/', label: 'GAMES', ext: '.game', typeLabel: 'jeu' },
		{ type: 'mobile', name: 'mobile/', label: 'MOBILE', ext: '.app', typeLabel: 'app' },
		{ type: 'cli', name: 'cli/', label: 'CLI', ext: '.cli', typeLabel: 'cli' },
		{ type: 'lib', name: 'libs/', label: 'LIBS', ext: '.lib', typeLabel: 'lib' },
		{ type: 'web', name: 'web/', label: 'WEB', ext: '.web', typeLabel: 'web' }
	];

const PROJECTS_BLUE = '#2979FF';

function projectFile(p: Project, ext: string, typeLabel: string): FsFile {
	return {
		node: 'file',
		name: `${p.slug}${ext}`,
		typeLabel,
		lang: p.lang,
		status: p.status,
		...faux(p.slug),
		href: p.hasPage ? `/projets/${p.slug}/` : (p.repoUrl ?? '/projets/'),
		external: !p.hasPage && !!p.repoUrl,
		private: p.private
	};
}

const projectSubdirs: FsDir[] = PROJECT_TYPES.map((t) => {
	const items = visibleProjects.filter((p) => p.type === t.type);
	return {
		node: 'dir' as const,
		id: `projects/${t.type}`,
		name: t.name,
		label: t.label,
		desc: `Projets de type ${t.label.toLowerCase()}.`,
		color: PROJECTS_BLUE,
		activity: 'exploration' as CubeActivity,
		obs: [`${items.length} projet(s) dans ${t.name}`],
		children: items.map((p) => projectFile(p, t.ext, t.typeLabel))
	};
}).filter((d) => d.children.length > 0);

const projects: FsDir = {
	node: 'dir',
	id: 'projects',
	name: 'projects/',
	label: 'PROJECTS',
	desc: 'Les systèmes, applications et libs que je construis, livre et fais évoluer.',
	color: PROJECTS_BLUE,
	activity: 'exploration',
	obs: [
		'Forte activité dans le domaine open source.',
		'Nouvelles connexions entre projets détectées.',
		'Le graphe de connaissances s’étend.'
	],
	children: projectSubdirs
};

// --- tools/ → outils réels, regroupés par sous-catégorie ----------------------
const TOOLS_GREEN = '#39FF88';

const TOOL_CATEGORIES: { id: string; name: string; label: string; desc: string; slugs: string[] }[] = [
	{
		id: 'team',
		name: 'team/',
		label: 'TEAM',
		desc: 'Équipe & management : 1:1, onboarding, capacité, staffing.',
		slugs: [
			'cadrage-one-on-one', 'checklist-onboarding', 'entretien-annuel-tech',
			'calculateur-capacite-equipe', 'evaluation-tech-equipe', 'planification-staffing',
			'maturite-equipe', 'bilan-sprint'
		]
	},
	{
		id: 'decision',
		name: 'decision/',
		label: 'DECISION',
		desc: 'Aide à la décision : build vs buy, SaaS, arbitrages techniques.',
		slugs: ['build-vs-buy', 'evaluation-saas', 'matrice-decision-technique']
	},
	{
		id: 'maturity',
		name: 'maturity/',
		label: 'MATURITY',
		desc: 'Diagnostics de maturité : CTO, dev lead.',
		slugs: ['diagnostic-maturite-cto', 'maturite-dev-lead']
	},
	{
		id: 'tech',
		name: 'tech/',
		label: 'TECH',
		desc: 'Technique : dette, migration, radar, sécurité.',
		slugs: ['evaluation-dette-technique', 'simulateur-migration', 'tech-radar-personnel', 'audit-securite-express']
	},
	{
		id: 'docs',
		name: 'docs/',
		label: 'DOCS',
		desc: 'Génération de documents : ADR, RFC, post-mortem.',
		slugs: ['generateur-adr', 'generateur-rfc', 'generateur-post-mortem']
	},
	{
		id: 'product',
		name: 'product/',
		label: 'PRODUCT',
		desc: 'Produit : priorisation du backlog.',
		slugs: ['priorisation-backlog']
	}
];

function toolFile(slug: string): FsFile {
	return {
		node: 'file',
		name: `${slug}.tool`,
		typeLabel: 'outil',
		lang: 'Svelte',
		status: 'En ligne',
		...faux(slug),
		href: `/outils/${slug}/`
	};
}

const toolSubdirs: FsDir[] = TOOL_CATEGORIES.map((c) => ({
	node: 'dir' as const,
	id: `tools/${c.id}`,
	name: c.name,
	label: c.label,
	desc: c.desc,
	color: TOOLS_GREEN,
	activity: 'exploration' as CubeActivity,
	obs: [`${c.slugs.length} outil(s) dans ${c.name}`],
	children: c.slugs.map(toolFile)
}));

const tools: FsDir = {
	node: 'dir',
	id: 'tools',
	name: 'tools/',
	label: 'TOOLS',
	desc: 'Outils interactifs d’aide à la décision — faits, et utilisés au quotidien.',
	color: TOOLS_GREEN,
	activity: 'exploration',
	obs: ['Cluster outillage actif.', 'Outils de décision opérationnels.'],
	children: toolSubdirs
};

// --- knowledge/ → livres ------------------------------------------------------
const knowledge: FsDir = {
	node: 'dir',
	id: 'knowledge',
	name: 'knowledge/',
	label: 'KNOWLEDGE',
	desc: 'Livres gratuits, lisibles en ligne. Des objets finis, pas un blog.',
	color: '#B026FF',
	activity: 'response',
	obs: ['Cluster créatif : écriture longue.', '2 ouvrages indexés et lisibles en ligne.'],
	children: [
		{ node: 'file', name: 'etre-ou-ne-pas-etre-cto.book', typeLabel: 'livre', lang: 'Markdown', status: 'En ligne', ...faux('etre-ou-ne-pas-etre-cto'), href: '/livres/etre-ou-ne-pas-etre-cto/' },
		{ node: 'file', name: 'en-quete-d-experience-edition-2025.book', typeLabel: 'livre', lang: 'Markdown', status: 'En ligne', ...faux('en-quete'), href: '/livres/en-quete-d-experience-edition-2025/' }
	]
};

// --- signals/ → communautés ---------------------------------------------------
const signals: FsDir = {
	node: 'dir',
	id: 'signals',
	name: 'signals/',
	label: 'SIGNALS',
	desc: 'Communautés, événements, bénévolat. Là où je donne du temps.',
	color: '#FFB020',
	activity: 'exploration',
	obs: ['Cluster veille & communauté.', 'CTO de Lyon, Tech’Work.'],
	children: [
		{ node: 'file', name: 'cto-de-lyon.community', typeLabel: 'communauté', lang: '—', status: 'Actif', ...faux('cto-de-lyon'), href: '/benevolat/' },
		{ node: 'file', name: 'techwork.event', typeLabel: 'événement', lang: '—', status: 'Actif', ...faux('techwork'), href: '/benevolat/' }
	]
};

// --- identity/ → profil & contact --------------------------------------------
const identity: FsDir = {
	node: 'dir',
	id: 'identity',
	name: 'identity/',
	label: 'IDENTITY',
	desc: 'Qui je suis, et comment me joindre.',
	color: '#00E5FF',
	activity: 'idle',
	obs: ['Lead Tech, 17 ans de terrain, Lyon.', '« Mon lieu. Pas une mission. »'],
	children: [
		{ node: 'file', name: 'profil.about', typeLabel: 'profil', lang: 'Markdown', status: 'À jour', ...faux('profil'), href: '/a-propos/' },
		{ node: 'file', name: 'contact.card', typeLabel: 'contact', lang: '—', status: 'Ouvert', ...faux('contact'), href: '/contact/' },
		{ node: 'file', name: 'benevolat.md', typeLabel: 'doc', lang: 'Markdown', status: 'À jour', ...faux('benevolat'), href: '/benevolat/' }
	]
};

// --- racine /brain ------------------------------------------------------------
export const root: FsDir = {
	node: 'dir',
	id: 'brain',
	name: '/brain',
	label: 'BRAIN',
	desc: 'Racine du système cognitif. Explore les dossiers pour scanner chaque cluster.',
	color: '#00E5FF',
	activity: 'idle',
	obs: ['Core stable. Réseau cognitif en ligne.', 'En attente d’exploration.'],
	children: [projects, tools, knowledge, signals, identity]
};

// --- Index & helpers ----------------------------------------------------------
export const dirById: Record<string, FsDir> = {};
const parentOf: Record<string, string | null> = {};

(function index(dir: FsDir, parent: string | null) {
	dirById[dir.id] = dir;
	parentOf[dir.id] = parent;
	for (const child of dir.children) {
		if (child.node === 'dir') index(child, dir.id);
	}
})(root, null);

export function getDir(id: string): FsDir {
	return dirById[id] ?? root;
}

/** Chaîne d'ancêtres (racine → dossier), utile pour le fil d'Ariane et l'arbre. */
export function ancestors(id: string): FsDir[] {
	const chain: FsDir[] = [];
	let cur: string | null = id;
	while (cur) {
		const d = dirById[cur];
		if (!d) break;
		chain.unshift(d);
		cur = parentOf[cur];
	}
	return chain;
}

/** Nombre total de fichiers (feuilles) sous un dossier, récursivement. */
export function fileCount(dir: FsDir): number {
	let n = 0;
	for (const c of dir.children) n += c.node === 'file' ? 1 : fileCount(c);
	return n;
}

/** Un dossier ne contient-il que des sous-dossiers ? (sinon : que des fichiers) */
export function isDirOfDirs(dir: FsDir): boolean {
	return dir.children.length > 0 && dir.children.every((c) => c.node === 'dir');
}

export const totalNodes = fileCount(root);
