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
		nom: 'Boussole Carrière Tech',
		slug: 'boussole-carriere-tech',
		description:
			'Aide-toi à te situer dans ton parcours tech et identifie les repères pour la suite.',
		statut: 'disponible',
		url: '/outils/boussole-carriere-tech/',
		categorie: 'carrière'
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
		nom: 'Checklist code review',
		slug: 'checklist-code-review',
		description:
			'Checklist interactive pour structurer tes revues de code. Annotable et exportable.',
		statut: 'disponible',
		url: '/outils/checklist-code-review/',
		categorie: 'pratiques'
	}
];
