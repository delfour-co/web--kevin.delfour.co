export interface Tool {
	nom: string;
	slug: string;
	description: string;
	url: string;
	categorie: 'décision' | 'évaluation' | 'équipe' | 'gouvernance';
	icon: string;
}

export interface ToolCategory {
	id: string;
	label: string;
	tools: Tool[];
}

export const tools: Tool[] = [
	// Décision
	{
		nom: 'Build vs Buy vs Partner',
		slug: 'build-vs-buy',
		description:
			"Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou s'associer.",
		url: '/outils/build-vs-buy/',
		categorie: 'décision',
		icon: '<path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Tech Radar personnel',
		slug: 'tech-radar-personnel',
		description:
			'Crée ton propre tech radar interactif : Adopt, Trial, Assess, Hold. Export Markdown.',
		url: '/outils/tech-radar-personnel/',
		categorie: 'décision',
		icon: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1" opacity="0.4"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1" opacity="0.4"/>'
	},
	{
		nom: 'Matrice de décision technique',
		slug: 'matrice-decision-technique',
		description:
			'Scoring multicritères pondéré pour les décisions tech. Générique et adaptable.',
		url: '/outils/matrice-decision-technique/',
		categorie: 'décision',
		icon: '<path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Priorisation backlog technique',
		slug: 'priorisation-backlog',
		description:
			'Priorise ton backlog technique avec un scoring multicritères : impact, confiance, urgence et effort.',
		url: '/outils/priorisation-backlog/',
		categorie: 'décision',
		icon: '<path d="M4 6h16M4 10h16M4 14h10M4 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M19 14l-3 4h6l-3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Simulateur de migration',
		slug: 'simulateur-migration',
		description:
			'Planifie ta migration technique : phases, risques, checklist pre-migration, timeline. Export plan complet.',
		url: '/outils/simulateur-migration/',
		categorie: 'décision',
		icon: '<path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	// Évaluation
	{
		nom: 'Évaluation SaaS',
		slug: 'evaluation-saas',
		description:
			"Grille d'évaluation structurée pour choisir un SaaS. Coût, lock-in, sécurité, intégration, support — 8 critères pondérés.",
		url: '/outils/evaluation-saas/',
		categorie: 'évaluation',
		icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7v4m-3-2h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Évaluation dette technique',
		slug: 'evaluation-dette-technique',
		description:
			'Quantifie et priorise ta dette technique sur 6 axes. Matrice impact/effort pour identifier les quick wins.',
		url: '/outils/evaluation-dette-technique/',
		categorie: 'évaluation',
		icon: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Diagnostic Maturité CTO',
		slug: 'diagnostic-maturite-cto',
		description:
			'Évalue ta posture CTO sur 6 axes : leadership, décision, craft, organisation, pratiques, parcours.',
		url: '/outils/diagnostic-maturite-cto/',
		categorie: 'évaluation',
		icon: '<path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Maturité dev → lead',
		slug: 'maturite-dev-lead',
		description:
			"Évalue la maturité d'un développeur pour une transition vers un rôle de lead. 8 axes, radar, recommandations.",
		url: '/outils/maturite-dev-lead/',
		categorie: 'évaluation',
		icon: '<path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Audit sécurité express',
		slug: 'audit-securite-express',
		description:
			'Checklist sécurité OWASP-inspired par couche : auth, données, infra, CI/CD, application, organisation.',
		url: '/outils/audit-securite-express/',
		categorie: 'évaluation',
		icon: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	// Équipe
	{
		nom: 'Calculateur capacité équipe',
		slug: 'calculateur-capacite-equipe',
		description:
			'Estime la capacité réelle de ton équipe vs la capacité théorique. Visualise l\'impact des cérémonies, support et absences.',
		url: '/outils/calculateur-capacite-equipe/',
		categorie: 'équipe',
		icon: '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Entretien annuel tech',
		slug: 'entretien-annuel-tech',
		description:
			"Structure l'entretien annuel d'un développeur : bilan technique, objectifs, plan de développement. Export Markdown.",
		url: '/outils/entretien-annuel-tech/',
		categorie: 'équipe',
		icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Checklist onboarding dev',
		slug: 'checklist-onboarding',
		description:
			"Structure l'onboarding d'un nouveau developpeur en 30/60/90 jours. Checklist, progression, export.",
		url: '/outils/checklist-onboarding/',
		categorie: 'équipe',
		icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 13v-6m-3 3h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Cadrage 1:1',
		slug: 'cadrage-one-on-one',
		description:
			'Structure tes entretiens 1:1 avec un cadre de reflexion. Preparation, themes, actions. Export Markdown.',
		url: '/outils/cadrage-one-on-one/',
		categorie: 'équipe',
		icon: '<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Bilan de sprint',
		slug: 'bilan-sprint',
		description:
			'Structure ton bilan de sprint : delivery, retrospective, metriques qualite, actions. Export Markdown.',
		url: '/outils/bilan-sprint/',
		categorie: 'équipe',
		icon: '<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Evaluation tech equipe',
		slug: 'evaluation-tech-equipe',
		description:
			'Cartographie les competences techniques de ton equipe. Identifie les forces, les gaps et le bus factor par competence.',
		url: '/outils/evaluation-tech-equipe/',
		categorie: 'équipe',
		icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Planification staffing',
		slug: 'planification-staffing',
		description:
			"Anticipe tes besoins de recrutement en croisant roadmap, capacité actuelle et risque d'attrition. Timeline visuelle.",
		url: '/outils/planification-staffing/',
		categorie: 'équipe',
		icon: '<path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Évaluation maturité équipe',
		slug: 'maturite-equipe',
		description:
			'Diagnostique la maturité de ton équipe tech sur 6 axes : autonomie, qualité, delivery, communication, apprentissage, collaboration.',
		url: '/outils/maturite-equipe/',
		categorie: 'équipe',
		icon: '<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	// Gouvernance
	{
		nom: "Générateur d'ADR",
		slug: 'generateur-adr',
		description:
			"Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Export Markdown.",
		url: '/outils/generateur-adr/',
		categorie: 'gouvernance',
		icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Générateur de RFC',
		slug: 'generateur-rfc',
		description:
			'Structure une Request for Comments avec des repères contextuels issus du terrain.',
		url: '/outils/generateur-rfc/',
		categorie: 'gouvernance',
		icon: '<path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	},
	{
		nom: 'Générateur de post-mortem',
		slug: 'generateur-post-mortem',
		description:
			"Structure un post-mortem d'incident : timeline, root cause, impact, actions. Blameless par design.",
		url: '/outils/generateur-post-mortem/',
		categorie: 'gouvernance',
		icon: '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
	}
];

export const toolCategories: ToolCategory[] = [
	{
		id: 'décision',
		label: 'Décision',
		tools: tools.filter((t) => t.categorie === 'décision')
	},
	{
		id: 'évaluation',
		label: 'Évaluation',
		tools: tools.filter((t) => t.categorie === 'évaluation')
	},
	{
		id: 'équipe',
		label: 'Équipe',
		tools: tools.filter((t) => t.categorie === 'équipe')
	},
	{
		id: 'gouvernance',
		label: 'Gouvernance',
		tools: tools.filter((t) => t.categorie === 'gouvernance')
	}
];
