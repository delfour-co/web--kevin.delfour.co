export interface Tool {
	nom: string;
	slug: string;
	description: string;
	statut: 'disponible' | 'à venir';
	url: string;
	categorie: string;
}

export const tools: Tool[] = [
	{
		nom: 'Build vs Buy vs Partner',
		slug: 'build-vs-buy',
		description:
			"Évalue ta situation avec 5 critères pour identifier la tendance la plus adaptée entre construire, acheter ou s'associer.",
		statut: 'disponible',
		url: '/outils/build-vs-buy/',
		categorie: 'décision'
	},
	{
		nom: "Générateur d'ADR",
		slug: 'generateur-adr',
		description:
			"Produis un Architecture Decision Record structuré à partir d'un formulaire guidé. Export Markdown.",
		statut: 'disponible',
		url: '/outils/generateur-adr/',
		categorie: 'gouvernance'
	},
	{
		nom: 'Diagnostic Maturité CTO',
		slug: 'diagnostic-maturite-cto',
		description:
			'Évalue ta posture CTO sur 6 axes : leadership, décision, craft, organisation, pratiques, parcours.',
		statut: 'disponible',
		url: '/outils/diagnostic-maturite-cto/',
		categorie: 'leadership'
	},
	{
		nom: 'Tech Radar personnel',
		slug: 'tech-radar-personnel',
		description:
			'Crée ton propre tech radar interactif : Adopt, Trial, Assess, Hold. Export Markdown.',
		statut: 'disponible',
		url: '/outils/tech-radar-personnel/',
		categorie: 'décision'
	},
	{
		nom: 'Générateur de RFC',
		slug: 'generateur-rfc',
		description:
			'Structure une Request for Comments avec des repères contextuels issus du terrain.',
		statut: 'disponible',
		url: '/outils/generateur-rfc/',
		categorie: 'gouvernance'
	},
	{
		nom: 'Matrice de décision technique',
		slug: 'matrice-decision-technique',
		description:
			'Scoring multicritères pondéré pour les décisions tech. Générique et adaptable.',
		statut: 'disponible',
		url: '/outils/matrice-decision-technique/',
		categorie: 'décision'
	},
	{
		nom: 'Calculateur capacité équipe',
		slug: 'calculateur-capacite-equipe',
		description:
			'Estime la capacité réelle de ton équipe vs la capacité théorique. Visualise l\'impact des cérémonies, support et absences.',
		statut: 'disponible',
		url: '/outils/calculateur-capacite-equipe/',
		categorie: 'organisation'
	},
	{
		nom: 'Évaluation dette technique',
		slug: 'evaluation-dette-technique',
		description:
			'Quantifie et priorise ta dette technique sur 6 axes. Matrice impact/effort pour identifier les quick wins.',
		statut: 'disponible',
		url: '/outils/evaluation-dette-technique/',
		categorie: 'décision'
	},
	{
		nom: 'Évaluation maturité équipe',
		slug: 'maturite-equipe',
		description:
			'Diagnostique la maturité de ton équipe tech sur 6 axes : autonomie, qualité, delivery, communication, apprentissage, collaboration.',
		statut: 'disponible',
		url: '/outils/maturite-equipe/',
		categorie: 'organisation'
	},
	{
		nom: 'Audit sécurité express',
		slug: 'audit-securite-express',
		description:
			'Checklist sécurité OWASP-inspired par couche : auth, données, infra, CI/CD, application, organisation.',
		statut: 'disponible',
		url: '/outils/audit-securite-express/',
		categorie: 'sécurité'
	},
	{
		nom: 'Simulateur de migration',
		slug: 'simulateur-migration',
		description:
			'Planifie ta migration technique : phases, risques, checklist pre-migration, timeline. Export plan complet.',
		statut: 'disponible',
		url: '/outils/simulateur-migration/',
		categorie: 'décision'
	},
	{
		nom: 'Générateur de post-mortem',
		slug: 'generateur-post-mortem',
		description:
			"Structure un post-mortem d'incident : timeline, root cause, impact, actions. Blameless par design.",
		statut: 'disponible',
		url: '/outils/generateur-post-mortem/',
		categorie: 'gouvernance'
	},
];
