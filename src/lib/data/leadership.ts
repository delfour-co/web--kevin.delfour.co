import { tools, type Tool } from './tools';

const BOOK = '/livres/etre-ou-ne-pas-etre-cto';

export type Pillar = {
	id: string;
	title: string;
	/** Les thèmes couverts par ce pilier, affichés en étiquettes. */
	themes: string[];
	/** La conviction, en première personne. Deux à trois phrases. */
	conviction: string;
	/** Ce que ça donne en pratique — ancré dans le vécu, chiffré quand c'est possible. */
	practices: string[];
	/** Slugs d'outils du site qui servent cette pratique. */
	toolSlugs: string[];
	/** Chapitres du livre « Être ou ne pas être CTO » qui creusent le sujet. */
	chapters: { href: string; label: string }[];
};

export const PILLARS: Pillar[] = [
	{
		id: 'construire-les-equipes',
		title: 'Construire les équipes',
		themes: ['Recrutement', 'Constitution d’équipes', 'Onboarding'],
		conviction:
			"Recruter est un problème d'ingénierie, pas une formalité RH. Un processus qui ne dit pas ce qu'il évalue produit des décisions au feeling, et le feeling recrute des clones. J'ai mené des centaines d'entretiens : les meilleures embauches sont venues de critères écrits à l'avance et tenus jusqu'au bout.",
		practices: [
			'Plus de 30 ingénieurs recrutés, et les cadres de recrutement et de rémunération qui vont avec.',
			"Une agence d'ingénierie montée de zéro à 12 consultants — donc chaque poste défini, ouvert et pourvu à partir de rien.",
			"Un onboarding traité comme un livrable : 30/60/90 jours, avec ce qu'on attend à chaque palier.",
			"Sur mon poste actuel, 20+ entretiens techniques menés dès le premier mois."
		],
		toolSlugs: ['planification-staffing', 'calculateur-capacite-equipe', 'checklist-onboarding'],
		chapters: [{ href: `${BOOK}/04.01-recruter-et-fideliser-son-equipe/`, label: 'Recruter et fidéliser son équipe' }]
	},
	{
		id: 'faire-grandir-les-gens',
		title: 'Faire grandir les gens',
		themes: ['Career ladders', 'Culture', 'Coaching', 'Mentorat'],
		conviction:
			"Un career ladder n'est pas un document RH : c'est la réponse écrite à la question « qu'attend-on de moi pour progresser ? ». J'en ai conçu, et j'ai vu ce que ça change — les 1:1 cessent d'être des points météo et deviennent des conversations de trajectoire. Le droit à l'erreur, lui, n'est pas un slogan : c'est une pratique quotidienne, et on ne construit rien de solide là où les gens ont peur de se tromper.",
		practices: [
			'Career ladders et grilles de rémunération conçus et appliqués, pas seulement rédigés.',
			'Mentorat de Tech Leads et de CTO, sur la transition vers le management et les premières décisions d’organisation.',
			"Des 1:1 cadrés : un ordre du jour partagé, des sujets qui reviennent, des engagements qu'on relit.",
			"Une communauté nationale d'experts créée chez Conserto, avec ses parcours d'apprentissage."
		],
		toolSlugs: ['cadrage-one-on-one', 'entretien-annuel-tech', 'maturite-dev-lead', 'maturite-equipe'],
		chapters: [
			{ href: `${BOOK}/04.02-developper-et-motiver-les-talents/`, label: 'Développer et motiver les talents' },
			{ href: `${BOOK}/07.01-developpement-personnel-et-leadership/`, label: 'Développement personnel et leadership' }
		]
	},
	{
		id: 'decider-et-gouverner',
		title: 'Décider et gouverner',
		themes: ['Prise de décision', 'Design organisationnel', 'Gouvernance', 'Indicateurs'],
		conviction:
			"Une décision qu'on n'écrit pas se rejoue tous les six mois. La gouvernance n'est pas de la bureaucratie : c'est le minimum de traces qui permet à une organisation de ne pas réapprendre ce qu'elle sait déjà. Chez Hiveo, pendant une acquisition internationale, c'est ce qui a tenu l'ingénierie debout.",
		practices: [
			"Gouvernance et indicateurs d'ingénierie définis pour une organisation d'environ 30 ingénieurs.",
			'Décisions structurantes documentées en ADR et en RFC, post-mortems sans recherche de coupable.',
			'Budgets d’ingénierie portés, arbitrés et défendus en comité exécutif.',
			"Organisation cible dessinée pour un produit IA, du dimensionnement des équipes aux rôles."
		],
		toolSlugs: [
			'generateur-adr',
			'generateur-rfc',
			'generateur-post-mortem',
			'matrice-decision-technique',
			'diagnostic-maturite-cto'
		],
		chapters: [
			{ href: `${BOOK}/06.02-processus-et-organisation/`, label: 'Processus et organisation' },
			{ href: `${BOOK}/06.01-budget-et-ressources/`, label: 'Budget et ressources' }
		]
	},
	{
		id: 'strategie-et-delivery',
		title: 'Stratégie technique et delivery',
		themes: ['Stratégie technique', 'Delivery', 'Dette', 'Passage à l’échelle'],
		conviction:
			"La dette technique est le plus souvent de la dette organisationnelle déguisée : elle raconte qui décidait quoi, et avec quelles contraintes. La traiter comme un problème de code seul, c'est la voir revenir. Une stratégie technique tient en une phrase que l'équipe peut répéter — sinon ce n'est pas une stratégie, c'est une liste de courses.",
		practices: [
			"Stratégie technique et architecture cloud définies pour des produits en création comme en croissance.",
			"Un prototype no-code transformé en plateforme IA cloud-native : des processus métier passés de plusieurs jours à quelques minutes.",
			'Arbitrages de dette et de migration posés avec des critères explicites, pas au ressenti.',
			'Toujours hands-on : 40+ pull requests revues sur le premier mois de mon poste actuel.'
		],
		toolSlugs: [
			'evaluation-dette-technique',
			'simulateur-migration',
			'priorisation-backlog',
			'build-vs-buy',
			'bilan-sprint'
		],
		chapters: [
			{ href: `${BOOK}/05.01-architecture-et-choix-techniques/`, label: 'Architecture et choix techniques' },
			{ href: `${BOOK}/06.03-scaling-et-croissance/`, label: 'Scaling et croissance' }
		]
	},
	{
		id: 'ia-dans-l-ingenierie',
		title: 'L’IA dans l’ingénierie',
		themes: ['Adoption de l’IA', 'Expérience développeur', 'Exigence d’ingénierie'],
		conviction:
			"L'IA ne remplace pas le jugement d'ingénierie, elle en augmente le débit — et elle rend donc les mauvaises décisions plus rapides aussi. Ce qui compte n'est pas l'outil mais ce qu'on met autour : revue, tests, traçabilité des décisions. C'est ce qu'on met en place aujourd'hui, avec mon équipe, sur une plateforme IA B2B en production.",
		practices: [
			"Adoption de l'IA menée à l'échelle d'une organisation d'ingénierie, pas au niveau d'un poste isolé.",
			"Automatisation par IA introduite sur des processus métier réels, avec un gain mesuré en ordres de grandeur.",
			'Outillage pratiqué au quotidien : Cursor, Claude, Codex, LLM locaux.',
			"Une conviction : la revue de code compte plus, pas moins, quand la génération s'accélère."
		],
		toolSlugs: ['tech-radar-personnel', 'evaluation-saas'],
		chapters: [
			{ href: `${BOOK}/05.02-innovation-et-veille-technologique/`, label: 'Innovation et veille technologique' }
		]
	}
];

const bySlug = new Map(tools.map((t) => [t.slug, t]));

/** Outils d'un pilier, dans l'ordre déclaré. Ignore silencieusement un slug inconnu. */
export function pillarTools(pillar: Pillar): Tool[] {
	return pillar.toolSlugs.map((s) => bySlug.get(s)).filter((t): t is Tool => Boolean(t));
}
