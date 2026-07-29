/**
 * Source unique des faits publiés sur le site.
 * Tout chiffre ou affirmation affiché ailleurs doit venir d'ici, et refléter
 * le CV (`static/cv/kevin-delfour-cv.pdf`). Rien d'inventé, rien d'arrondi.
 */

export const IDENTITY = {
	name: 'Kevin Delfour',
	role: 'Engineering Leader',
	targetRoles: 'Engineering Manager · Head of Engineering · VP Engineering',
	location: 'Lyon, France',
	years: '17 ans',
	/** Message central du site. */
	tagline:
		"Je construis des organisations d'ingénierie où les gens et les produits s'épanouissent.",
	subline: 'La technologie compte. Elle ne fait rien toute seule.'
} as const;

export const CONTACT = {
	email: 'delfour.k@gmail.com',
	linkedin: 'https://linkedin.com/in/kevindelfour',
	github: 'https://github.com/kdelfour',
	linkedinLabel: 'in/kevindelfour',
	githubLabel: 'github.com/kdelfour'
} as const;

/** CV téléchargeable (version anglaise). */
export const CV_PDF = '/cv/kevin-delfour-cv.pdf';

export type Stat = { value: string; label: string };

/** Leadership Snapshot — repris tel quel du CV. */
export const SNAPSHOT: Stat[] = [
	{ value: '17 ans', label: "d'expérience en ingénierie logicielle" },
	{ value: '30+', label: 'ingénieurs recrutés, des centaines d’entretiens menés' },
	{ value: '~30', label: "ingénieurs dans la plus grande organisation que j'ai menée" },
	{ value: '0 → 12', label: 'consultants — agence d’ingénierie créée de zéro' },
	{ value: '1 brevet', label: 'déposé, et une startup deep-tech co-fondée' }
];

export type Experience = {
	period: string;
	/** Pour trier et repérer le poste courant. */
	current?: boolean;
	title: string;
	org: string;
	impact: string;
	scope: string[];
};

/** Parcours professionnel, du plus récent au plus ancien. */
export const EXPERIENCE: Experience[] = [
	{
		period: 'Mai 2026 → aujourd’hui',
		current: true,
		title: 'Lead Backend Engineer',
		org: 'Second Brain',
		impact:
			"Je mène l'ingénierie backend d'une plateforme IA B2B internationale : adoption de l'IA, expérience développeur et exigence d'ingénierie à l'échelle de l'organisation — sans lâcher le clavier. 40+ pull requests revues et 20+ entretiens techniques sur le premier mois.",
		scope: [
			'12 ingénieurs (4 Tech Leads, 1 PO)',
			'Adoption de l’IA',
			'Recrutement',
			'Python · FastAPI · PostgreSQL · AWS · Kubernetes · Terraform'
		]
	},
	{
		period: 'Sept. 2025 – mai 2026',
		title: 'Chief Technology Officer',
		org: 'Shiroo (Araïko)',
		impact:
			"J'ai défini la stratégie d'ingénierie, l'architecture cloud et l'organisation cible d'un nouveau produit IA. Le projet s'est arrêté après l'acquisition de la maison mère, avant le spin-off prévu.",
		scope: [
			'Stratégie d’ingénierie',
			'Roadmap technique',
			'Gestion du budget',
			'Design organisationnel'
		]
	},
	{
		period: 'Avr. – juil. 2025',
		title: 'Founding Engineer',
		org: 'JOBO Interim',
		impact:
			"J'ai transformé un prototype Airtable/n8n en plateforme IA cloud-native, en concevant l'architecture et en introduisant une automatisation qui a ramené des processus métier de plusieurs jours à quelques minutes.",
		scope: ['Architecture', 'Stratégie IA', 'Product engineering', 'Python · TypeScript · Azure · Terraform']
	},
	{
		period: 'Janv. 2023 – avr. 2025',
		title: 'Associate Director — Strategy & Operations',
		org: 'MAX Digital Services',
		impact:
			"J'ai créé et fait grandir l'agence d'ingénierie lyonnaise de 0 à 12 consultants, recruté plus de 30 ingénieurs et construit les career ladders ainsi que les cadres de recrutement et de rémunération.",
		scope: [
			'Comité exécutif',
			'Recrutement',
			'Gestion du budget',
			'Stratégie business',
			'Coaching'
		]
	},
	{
		period: 'Mars 2021 – déc. 2022',
		title: 'Chief Technology Officer',
		org: 'Hiveo',
		impact:
			"J'ai mené l'ingénierie pendant une acquisition internationale, pour une organisation d'environ 30 ingénieurs, en définissant la stratégie technique, la gouvernance et les indicateurs d'ingénierie.",
		scope: [
			'~30 ingénieurs',
			'Direction exécutive',
			'Design organisationnel',
			'Gouvernance d’ingénierie'
		]
	},
	{
		period: 'Oct. 2020 – mars 2021',
		title: 'Head of Digital Training & Technical Lead',
		org: 'Conserto',
		impact:
			"J'ai créé une communauté nationale d'experts en ingénierie, conçu les parcours d'apprentissage techniques et accompagné les missions de conseil stratégique, tout en restant hands-on.",
		scope: ['Animation de communauté', 'Leadership technique', 'Formation', 'Avant-vente']
	},
	{
		period: 'Mai 2015 – déc. 2018',
		title: 'Lead Developer & Business Developer',
		org: 'Sogilis',
		impact:
			"J'ai combiné architecture logicielle, leadership technique et développement commercial pour accompagner des clients stratégiques dans la construction de solutions cloud-native.",
		scope: ['Architecture', 'Conseil', 'Développement commercial']
	},
	{
		period: 'Févr. 2016 – janv. 2018',
		title: 'Co-Founder & Inventor',
		org: 'iBubble (Notilo+)',
		impact:
			"J'ai co-fondé une startup deep-tech développant l'une des premières caméras sous-marines autonomes au monde, en portant le produit du concept au marché et en obtenant un brevet.",
		scope: ['Entrepreneuriat', 'Stratégie produit', 'R&D', 'Brevet']
	},
	{
		period: '2008 – 2015',
		title: 'Software Engineer → Agile Manager',
		org: 'Astek · ASPLine · IRD · Geomatys',
		impact:
			"J'ai développé des logiciels d'entreprise dans plusieurs secteurs, en construisant mon expertise en architecture logicielle, en coaching agile et en systèmes distribués.",
		scope: ['Java', 'Agilité', 'Logiciel d’entreprise']
	}
];

export const SKILLS = {
	leadership: [
		'Engineering management',
		'Recrutement',
		'Coaching',
		'Design organisationnel',
		'Stratégie technique',
		'Delivery',
		'Gestion de budget'
	],
	technique: [
		'Python',
		'FastAPI',
		'TypeScript',
		'Java',
		'Kubernetes',
		'AWS',
		'Azure',
		'PostgreSQL',
		'Terraform'
	],
	ia: ['Cursor', 'Claude', 'Codex', 'LLM locaux', 'Développement assisté par IA']
} as const;

export type Engagement = {
	title: string;
	role: string;
	/** Période d’activité. Tous ces engagements sont en pause, cf. COMMUNITY_STATUS. */
	period: string;
	description: string;
};

/**
 * Statut courant des engagements communautaires et du mentorat.
 * Affiché partout où ces engagements sont listés, pour qu’une période close
 * ne se lise pas comme un abandon silencieux.
 */
export const COMMUNITY_STATUS = 'Ces engagements sont en pause depuis 2026.';

export const COMMUNITY: Engagement[] = [
	{
		title: 'CTO de Lyon',
		role: 'Co-créateur',
		period: '2023 – 2025',
		description:
			"Un espace d'échange indépendant et bénévole entre CTO et leaders tech lyonnais — des gens qui portent des responsabilités d'organisation et qui ont besoin de pairs pour en parler franchement."
	},
	{
		title: 'Tech’Work & Tech & Wine',
		role: 'Organisateur bénévole',
		period: '2023 – 2025',
		description:
			"Organisation d'événements tech à Lyon avec Maxime Deroullers (Cloud Alpes). Des rendez-vous authentiques, loin des conférences corporate."
	},
	{
		title: 'Digital League — club tech4tech',
		role: 'Animateur',
		period: '2022 – 2025',
		description:
			"Animation mensuelle du club tech4tech de Digital League et organisation d'événements pour la communauté tech locale."
	},
	{
		title: 'Eden School',
		role: 'Parrain',
		period: '2018 – 2025',
		description:
			"Parrainage d'enfants de l'école Eden School. Un engagement pour l'éducation et l'accompagnement d'enfants en difficulté."
	}
];

export type SpeakingTopic = { title: string; description: string };

export const SPEAKING_TOPICS: SpeakingTopic[] = [
	{
		title: 'Engineering leadership',
		description:
			"Ce que mener des ingénieurs veut dire concrètement, au-delà des frameworks : arbitrer, protéger, décider, et assumer."
	},
	{
		title: "L'IA pour les ingénieurs",
		description:
			"Ce qui change vraiment dans le métier et dans l'organisation, sans science-fiction ni panique — retours d'une plateforme IA en production."
	},
	{
		title: 'Construire des équipes',
		description:
			"Recruter, onboarder, faire tenir une équipe dans la durée. Retours de 30+ recrutements et de centaines d'entretiens."
	},
	{
		title: 'Stratégie technique',
		description:
			"Décider quand tout le monde a un avis : ADR, arbitrage de la dette, build vs buy, et la discipline d'écrire ses décisions."
	},
	{
		title: 'Software craftsmanship',
		description:
			'La qualité comme pratique collective et comme choix économique, pas comme dogme individuel.'
	},
	{
		title: 'L’agilité au-delà de Scrum',
		description:
			"Ce qui reste des méthodes quand on enlève les cérémonies, et ce qu'on gagne à les enlever."
	}
];

export type Talk = {
	/**
	 * `2024`, `2024-08` ou `2024-08-29` — on met la précision dont on dispose,
	 * jamais une date inventée. Le tri lexicographique reste correct.
	 */
	date: string;
	event: string;
	title: string;
	location: string;
	/** Conférence · Meetup · Table ronde · Podcast · Interne */
	type: string;
	/** Co-intervenants ou animateur, quand ce n’était pas une intervention solo. */
	withWhom?: string;
	/** Une phrase à la première personne. Pas le résumé marketing de l’événement. */
	summary?: string;
	/**
	 * Page de session, rediffusion ou podcast — pas de dépôt de slides : les decks
	 * sont destinés à être réenregistrés en podcasts, seuls liens à publier ensuite.
	 */
	url?: string;
	/** Libellé du lien. Défaut : « En savoir plus ». */
	urlLabel?: string;
};

/**
 * Interventions passées, de la plus récente à la plus ancienne.
 * Liste non exhaustive : d’anciennes interventions restent à dater.
 */
export const TALKS: Talk[] = [
	{
		date: '2026-06-18',
		event: 'Tech’Work Lyon 2026',
		title: 'Devons-nous sacrifier la qualité avec l’IA ?',
		location: 'Lyon',
		type: 'Conférence',
		summary:
			'Ce que « qualité » veut encore dire quand une IA sait régénérer, refactorer et tester en masse — et la part que l’ego du développeur joue dans la réponse.',
		url: 'https://techwork.events/sessions/cmn2z82un005t01prv9hvn0y9/',
		urlLabel: 'Voir la session'
	},
	{
		date: '2025-03-20',
		event: 'Max Lyon, MAX Digital Services',
		title: 'L’IA en dev — booster vos devs, éviter les embûches',
		location: 'Lyon',
		type: 'Meetup'
	},
	{
		date: '2025-02-20',
		event: 'Max Lyon, MAX Digital Services',
		title: 'Vue vs React Battle — que le match commence !',
		location: 'Lyon',
		type: 'Meetup',
		withWhom: 'Avec Ibrahim Yatim, développeur React et React Native'
	},
	{
		date: '2025-01-23',
		event: 'Max Lyon, MAX Digital Services',
		title: 'La théorie de l’évolution de Darwin appliquée au développement de produit IT',
		location: 'Lyon',
		type: 'Meetup',
		summary:
			'Une analogie tenue jusqu’au bout : ce que la sélection, la variation et l’adaptation disent de la façon dont un produit IT évolue — ou meurt.'
	},
	{
		date: '2024-08-29',
		event: 'Digital Summ’r 2024',
		title: 'La qualité, sans déshabiller le produit pour habiller la tech’ (et inversement)',
		location: 'Charbonnières-les-Bains',
		type: 'Conférence',
		withWhom: 'Avec Xavier Barry, CTO de pHack-Man'
	},
	{
		date: '2024-08-29',
		event: 'Digital Summ’r 2024',
		title: 'L’envers du décor des entreprises libérées !',
		location: 'Charbonnières-les-Bains',
		type: 'Table ronde',
		withWhom:
			'Animée par Aliocha Iordanoff (Sémawé), avec Hicham Ben Hassin (Algosecure), Jean-Luc Vecchio et Pascal Charrier (Efalia)'
	}
];
