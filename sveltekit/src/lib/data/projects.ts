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
		label: 'Projets complexes',
		projects: [
			{
				nom: 'workspace--gk',
				url: 'https://github.com/delfour-co/workspace--gk',
				description:
					"Alternative self-hosted à Google Workspace avec interface conversationnelle IA. Système email complet (SMTP/IMAP) en Rust, intégration LLM locale (Ollama), protocole MCP, administration complète (SPF/DKIM/DMARC, backups, SSL).",
				langage: 'Rust',
				technologies: ['Rust', 'SMTP/IMAP', 'WebAssembly', 'LLM', 'MCP', 'Architecture distribuée']
			},
			{
				nom: 'tui--survey-builder',
				url: 'https://github.com/delfour-co/tui--survey-builder',
				description:
					"Outil d'audit technique et business en Rust avec interface TUI dans le navigateur (Ratzilla/WebAssembly). Questionnaires structurés par catégories, génération automatique de recommandations, export/import YAML.",
				langage: 'Rust',
				technologies: ['Rust', 'WebAssembly', 'Ratzilla', 'TUI', 'YAML']
			},
			{
				nom: 'workshop--motive_mappers',
				url: 'https://github.com/delfour-co/workshop--motive_mappers',
				description:
					"Extension de Moving Motivators (Jurgen Appello) pour comprendre les motivations intrinsèques d'une équipe. Version papier LaTeX avec compilation automatisée.",
				langage: 'LaTeX',
				technologies: ['LaTeX', 'Management', 'Facilitation']
			}
		]
	},
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
	},
	{
		label: 'Applications Web',
		projects: [
			{
				nom: 'majikku-shisutemu',
				url: 'https://github.com/delfour-co/webapp--majikku-shisutemu',
				description: 'Application web avec système de design personnalisé.',
				langage: 'SCSS',
				technologies: ['SCSS', 'Web']
			}
		]
	}
];
