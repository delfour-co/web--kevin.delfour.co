export interface BookData {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	cover?: string;
}

export const books: BookData[] = [
	{
		slug: 'en-quete-d-experience-edition-2025',
		title: "En Quête d'Expérience",
		subtitle: 'Le Guide professionnel du développement moderne — 2ème Édition 2025',
		description:
			"Guide stratégique pour naviguer dans l'écosystème professionnel du développement en 2025. Conseils pratiques, stratégies concrètes et expérience de terrain pour développer sa carrière avec méthode, intelligence et professionnalisme.",
		cover: '/livres/en-quete-d-experience-edition-2023.webp'
	},
	{
		slug: 'etre-ou-ne-pas-etre-cto',
		title: 'Être ou ne pas être CTO',
		subtitle: 'Un livre écrit par des CTOs pour des (futur.e.s) CTOs',
		description:
			"Un guide collaboratif écrit par des CTOs pour partager leur expérience avec ceux qui aspirent à ce rôle ou qui débutent. L'approche se veut pratique et humaine, mêlant conseils opérationnels et retours d'expérience authentiques.",
		cover: '/livres/etre-ou-ne-pas-etre-cto.webp'
	}
];
