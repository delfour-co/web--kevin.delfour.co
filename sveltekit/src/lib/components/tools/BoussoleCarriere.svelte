<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-boussole-carriere-tech';
	const TOOL_URL = 'https://kevin.delfour.co/outils/boussole-carriere-tech/';

	interface Question {
		id: string;
		question: string;
		options: { label: string; tags: string[] }[];
	}

	const questions: Question[] = [
		{
			id: 'motivation',
			question: 'Ce qui te motive le plus au quotidien ?',
			options: [
				{ label: 'Résoudre des problèmes techniques complexes', tags: ['expert', 'craft'] },
				{ label: 'Faire grandir les gens autour de moi', tags: ['manager', 'leadership'] },
				{ label: "Créer quelque chose qui n'existait pas", tags: ['entrepreneur', 'craft'] },
				{ label: 'Organiser et structurer pour que ça tourne', tags: ['manager', 'organisation'] }
			]
		},
		{
			id: 'satisfaction',
			question: 'Ta plus grande satisfaction récente ?',
			options: [
				{ label: 'Un bug complexe résolu après investigation', tags: ['expert', 'craft'] },
				{ label: 'Un junior qui a progressé grâce à mon aide', tags: ['manager', 'leadership'] },
				{ label: 'Un produit livré qui crée de la valeur', tags: ['entrepreneur', 'leadership'] },
				{ label: 'Une architecture qui tient la charge', tags: ['expert', 'craft'] }
			]
		},
		{
			id: 'frustration',
			question: 'Ce qui te frustre le plus ?',
			options: [
				{ label: 'Ne plus avoir le temps de coder', tags: ['expert', 'craft'] },
				{ label: 'Des décisions prises sans concertation', tags: ['manager', 'leadership'] },
				{ label: "L'impression de stagner dans ma carrière", tags: ['entrepreneur', 'parcours'] },
				{ label: 'Le manque de rigueur dans les pratiques', tags: ['expert', 'organisation'] }
			]
		},
		{
			id: 'cinqans',
			question: 'Dans 5 ans, tu te vois plutôt...',
			options: [
				{ label: 'Référent technique reconnu dans mon domaine', tags: ['expert', 'craft'] },
				{ label: 'VP Engineering ou CTO', tags: ['manager', 'leadership'] },
				{ label: 'Créer ou co-fonder un produit', tags: ['entrepreneur', 'parcours'] },
				{ label: 'Freelance / consultant indépendant', tags: ['entrepreneur', 'parcours'] }
			]
		},
		{
			id: 'energie',
			question: 'Ce qui te donne de l\'énergie ?',
			options: [
				{ label: 'Apprendre une nouvelle techno en profondeur', tags: ['expert', 'craft'] },
				{ label: 'Les 1-on-1 avec mon équipe', tags: ['manager', 'leadership'] },
				{ label: 'Prototyper une idée rapidement', tags: ['entrepreneur', 'craft'] },
				{ label: 'Mettre en place des process qui marchent', tags: ['manager', 'organisation'] }
			]
		},
		{
			id: 'force',
			question: 'Ta force principale selon tes collègues ?',
			options: [
				{ label: 'Expertise technique profonde', tags: ['expert', 'craft'] },
				{ label: 'Capacité à fédérer et écouter', tags: ['manager', 'leadership'] },
				{ label: 'Vision produit et sens business', tags: ['entrepreneur', 'leadership'] },
				{ label: 'Rigueur et fiabilité', tags: ['expert', 'organisation'] }
			]
		}
	];

	interface Profile {
		id: string;
		name: string;
		description: string;
		strengths: string[];
		watchPoints: string[];
	}

	const profiles: Profile[] = [
		{
			id: 'expert',
			name: 'Expert technique',
			description:
				'Tu es dans ton élément quand tu plonges dans les problèmes techniques. Ta valeur vient de ta profondeur, pas de ta largeur.',
			strengths: ['Résolution de problèmes complexes', 'Architecture logicielle', 'Mentorat technique'],
			watchPoints: [
				'Attention à ne pas t\'isoler dans la technique',
				'Apprends à communiquer tes décisions aux non-techs'
			]
		},
		{
			id: 'manager',
			name: 'Leader & Manager',
			description:
				'Tu tires ta satisfaction des gens. Faire grandir une équipe, structurer, protéger — c\'est là que tu es le plus utile.',
			strengths: ['Développement des talents', 'Organisation d\'équipe', 'Communication'],
			watchPoints: [
				'Garde un pied dans la technique pour rester crédible',
				'Ne confonds pas être occupé et être utile'
			]
		},
		{
			id: 'entrepreneur',
			name: 'Entrepreneur / Bâtisseur',
			description:
				'Tu veux créer, expérimenter, livrer. La valeur pour toi, c\'est ce qui existe dans le monde réel — pas les slides.',
			strengths: ['Vision produit', 'Exécution rapide', 'Prise de risque calculée'],
			watchPoints: [
				'Apprends à consolider avant de passer au suivant',
				'Entoure-toi de profils complémentaires'
			]
		}
	];

	let answers = $state<Record<string, number>>({});
	let copyFeedback = $state(false);

	const currentQuestion = $derived(
		questions.findIndex((q) => !(q.id in answers))
	);

	const isComplete = $derived(currentQuestion === -1);

	const result = $derived(() => {
		if (!isComplete) return null;
		const tagCounts: Record<string, number> = {};
		for (const q of questions) {
			const chosen = answers[q.id];
			if (chosen !== undefined) {
				const opt = q.options[chosen];
				for (const tag of opt.tags) {
					tagCounts[tag] = (tagCounts[tag] || 0) + 1;
				}
			}
		}

		const profileScores = profiles.map((p) => ({
			profile: p,
			score: tagCounts[p.id] || 0
		}));
		profileScores.sort((a, b) => b.score - a.score);

		return {
			primary: profileScores[0],
			secondary: profileScores[1],
			tags: tagCounts
		};
	});

	function selectAnswer(questionId: string, optionIndex: number) {
		answers[questionId] = optionIndex;
		save();
	}

	function handleReset() {
		answers = {};
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.answers) answers = d.answers;
			}
		} catch {}
	}

	async function handleExport() {
		const r = result();
		if (!r) return;
		const today = new Date().toISOString().split('T')[0];
		const lines = [
			'# Boussole Carrière Tech',
			'',
			`**Date :** ${today}`,
			'',
			`## Profil dominant : ${r.primary.profile.name}`,
			'',
			r.primary.profile.description,
			'',
			'**Forces :**',
			...r.primary.profile.strengths.map((s) => `- ${s}`),
			'',
			'**Points de vigilance :**',
			...r.primary.profile.watchPoints.map((s) => `- ${s}`),
			'',
			`## Profil secondaire : ${r.secondary.profile.name}`,
			'',
			r.secondary.profile.description,
			'',
			'## Réponses',
			'',
			...questions.map((q) => {
				const idx = answers[q.id];
				return `- ${q.question} → **${q.options[idx]?.label || '—'}**`;
			}),
			'',
			'---',
			`_Généré avec la Boussole Carrière Tech — ${TOOL_URL}_`
		];

		const md = lines.join('\n');
		try {
			await navigator.clipboard.writeText(md);
			copyFeedback = true;
			setTimeout(() => (copyFeedback = false), 2000);
		} catch {
			const textarea = document.createElement('textarea');
			textarea.value = md;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			copyFeedback = true;
			setTimeout(() => (copyFeedback = false), 2000);
		}
	}

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	{#if !isComplete}
		<div class="quiz-progress">
			<div class="progress-bar">
				<div
					class="progress-fill"
					style="width: {(Object.keys(answers).length / questions.length) * 100}%"
				></div>
			</div>
			<span class="progress-text">{Object.keys(answers).length}/{questions.length}</span>
		</div>

		{#each questions as q, qi}
			{#if qi === currentQuestion}
				<div class="question-card">
					<h2 class="question-text">{q.question}</h2>
					<div class="options-list">
						{#each q.options as opt, oi}
							<button
								class="option-btn"
								onclick={() => selectAnswer(q.id, oi)}
							>
								{opt.label}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		{/each}

		{#if Object.keys(answers).length > 0}
			<button class="reset-link" onclick={handleReset}>Recommencer</button>
		{/if}
	{:else}
		{@const r = result()}
		{#if r}
			<div class="result-card">
				<div class="result-primary">
					<span class="result-badge">Profil dominant</span>
					<h2 class="result-profile-name">{r.primary.profile.name}</h2>
					<p class="result-description">{r.primary.profile.description}</p>

					<div class="result-lists">
						<div>
							<h3>Forces</h3>
							<ul>
								{#each r.primary.profile.strengths as s}
									<li>{s}</li>
								{/each}
							</ul>
						</div>
						<div>
							<h3>Points de vigilance</h3>
							<ul>
								{#each r.primary.profile.watchPoints as s}
									<li>{s}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				{#if r.secondary}
					<div class="result-secondary">
						<span class="result-badge result-badge--secondary">Profil secondaire</span>
						<h3 class="result-secondary-name">{r.secondary.profile.name}</h3>
						<p class="result-description">{r.secondary.profile.description}</p>
					</div>
				{/if}
			</div>

			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Recommencer</button>
			</div>
		{/if}
	{/if}
</div>

<style>
	.tool-container {
		max-width: 640px;
	}

	/* Progress */
	.quiz-progress {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: calc(var(--gap) * 2);
	}

	.progress-bar {
		flex: 1;
		height: 6px;
		background: var(--border);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 3px;
		transition: width 0.3s ease;
	}

	.progress-text {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--secondary);
		white-space: nowrap;
	}

	/* Question */
	.question-card {
		margin-bottom: var(--gap);
	}

	.question-text {
		font-size: 1.25rem;
		margin-bottom: var(--gap);
		line-height: 1.4;
	}

	.options-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.option-btn {
		display: block;
		width: 100%;
		text-align: left;
		padding: 14px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		font-size: 15px;
		line-height: 1.4;
		cursor: pointer;
		transition: var(--transition);
		font-family: var(--font-body);
	}

	.option-btn:hover {
		border-color: var(--accent-border);
		background: var(--accent-light);
	}

	.option-btn:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.reset-link {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-top: var(--gap);
	}

	.reset-link:hover {
		color: var(--accent);
	}

	/* Result */
	.result-card {
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.result-primary {
		padding: var(--gap);
		background: var(--accent-light);
	}

	.result-badge {
		display: inline-block;
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 8px;
		border-radius: 4px;
		background: var(--accent);
		color: #fff;
		margin-bottom: 8px;
	}

	.result-badge--secondary {
		background: transparent;
		color: var(--secondary);
		border: 1px solid var(--border);
	}

	.result-profile-name {
		font-size: 1.5rem;
		margin: 0 0 8px 0;
	}

	.result-description {
		color: var(--secondary);
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0;
	}

	.result-lists {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
		margin-top: var(--gap);
	}

	.result-lists h3 {
		font-size: 0.9rem;
		margin: 0 0 6px 0;
		color: var(--primary);
	}

	.result-lists ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.result-lists li {
		font-size: 0.85rem;
		color: var(--secondary);
		padding: 3px 0;
		line-height: 1.4;
	}

	.result-secondary {
		padding: var(--gap);
		border-top: 1px solid var(--border);
	}

	.result-secondary-name {
		font-size: 1.1rem;
		margin: 0 0 6px 0;
	}

	/* Actions */
	.tool-actions {
		display: flex;
		gap: 12px;
		margin-top: var(--gap);
		flex-wrap: wrap;
	}

	.tool-btn {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: var(--radius);
		cursor: pointer;
		transition: var(--transition);
		border: none;
		min-height: 44px;
	}

	.tool-btn--primary {
		background: var(--accent);
		color: #fff;
	}

	.tool-btn--primary:hover {
		background: var(--accent-hover);
	}

	.tool-btn--secondary {
		background: transparent;
		color: var(--secondary);
		border: 1px solid var(--border);
	}

	.tool-btn--secondary:hover {
		border-color: var(--tertiary);
		color: var(--primary);
	}

	@media (max-width: 600px) {
		.result-lists {
			grid-template-columns: 1fr;
		}

		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
