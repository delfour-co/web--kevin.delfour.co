<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-evaluation-saas';
	const TOOL_URL = 'https://kevin.delfour.co/outils/evaluation-saas/';

	const categories = [
		'Monitoring',
		'CI/CD',
		'Hébergement',
		'BDD',
		'Auth',
		'Paiement',
		'Communication',
		'Analytics',
		'Autre'
	] as const;

	interface Criterion {
		id: string;
		name: string;
		hint: string;
	}

	const criteria: Criterion[] = [
		{
			id: 'tco',
			name: 'Coût total (TCO)',
			hint: "Ce que j'observe souvent : le prix d'entrée est attractif, c'est le prix à l'échelle qui pose problème."
		},
		{
			id: 'lockin',
			name: 'Lock-in',
			hint: "Un bon SaaS permet d'exporter ses données facilement. Si ce n'est pas le cas, c'est un signal fort."
		},
		{
			id: 'security',
			name: 'Sécurité & Conformité',
			hint: "Ce que j'observe souvent : la sécurité est rarement un problème... jusqu'au jour de l'audit."
		},
		{
			id: 'integration',
			name: 'Intégration',
			hint: "La qualité de l'API est souvent le meilleur indicateur de la maturité d'un SaaS."
		},
		{
			id: 'reliability',
			name: 'Fiabilité',
			hint: 'Regarder la status page des 12 derniers mois. C\'est plus fiable que n\'importe quelle promesse commerciale.'
		},
		{
			id: 'support',
			name: 'Support',
			hint: "Un bon support technique est celui qu'on n'a presque jamais besoin de contacter."
		},
		{
			id: 'evolution',
			name: 'Évolutivité',
			hint: "Un SaaS qui n'évolue plus est un SaaS qui va mourir. Vérifier la roadmap et les changelogs."
		},
		{
			id: 'adoption',
			name: 'Adoption équipe',
			hint: "L'outil le plus puissant ne vaut rien si l'équipe ne l'utilise pas."
		}
	];

	const weightLabels: Record<number, string> = {
		1: 'Faible',
		2: 'Moyen',
		3: 'Critique'
	};

	const scoreLabels: Record<number, string> = {
		1: 'Insuffisant',
		2: 'Faible',
		3: 'Acceptable',
		4: 'Bon',
		5: 'Excellent'
	};

	// Context
	let solutionName = $state('');
	let category = $state('Autre');
	let alternative = $state('');

	// Scores and weights
	let scores = $state<Record<string, number>>(
		Object.fromEntries(criteria.map((c) => [c.id, 3]))
	);
	let weights = $state<Record<string, number>>(
		Object.fromEntries(criteria.map((c) => [c.id, 2]))
	);

	let expandedHints = $state<Record<string, boolean>>({});
	let copyFeedback = $state(false);

	// Computed results
	let results = $derived.by(() => {
		let totalWeightedScore = 0;
		let totalMaxScore = 0;

		const details: Array<{
			id: string;
			name: string;
			score: number;
			weight: number;
			weighted: number;
			maxWeighted: number;
			pct: number;
		}> = [];

		for (const c of criteria) {
			const score = scores[c.id];
			const weight = weights[c.id];
			const weighted = score * weight;
			const maxWeighted = 5 * weight;

			totalWeightedScore += weighted;
			totalMaxScore += maxWeighted;

			details.push({
				id: c.id,
				name: c.name,
				score,
				weight,
				weighted,
				maxWeighted,
				pct: Math.round((weighted / maxWeighted) * 100)
			});
		}

		const globalScore = totalMaxScore > 0 ? Math.round((totalWeightedScore / totalMaxScore) * 100) : 0;

		let level: string;
		let levelClass: string;
		if (globalScore < 40) {
			level = 'À éviter';
			levelClass = 'level--avoid';
		} else if (globalScore < 60) {
			level = 'Acceptable';
			levelClass = 'level--acceptable';
		} else if (globalScore < 80) {
			level = 'Recommandé';
			levelClass = 'level--recommended';
		} else {
			level = 'Excellent';
			levelClass = 'level--excellent';
		}

		const sorted = [...details].sort((a, b) => b.pct - a.pct);
		const strengths = sorted.slice(0, 3);
		const weaknesses = [...details].sort((a, b) => a.pct - b.pct).slice(0, 3);

		let verdict: string;
		if (globalScore < 40) {
			verdict =
				'Les scores pondérés sont bas. Avant de poursuivre, il peut être utile de vérifier si les critères faibles sont acceptables dans ton contexte.';
		} else if (globalScore < 60) {
			verdict =
				"Le scoring est mitigé. Certains axes méritent une attention particulière avant de s'engager.";
		} else if (globalScore < 80) {
			verdict =
				'Le profil est globalement solide. Les points de vigilance identifiés peuvent servir de base pour la négociation ou le cadrage.';
		} else {
			verdict =
				"Le scoring est élevé sur l'ensemble des axes pondérés. Reste à confronter cette analyse au retour terrain de l'équipe.";
		}

		return { globalScore, level, levelClass, details, strengths, weaknesses, verdict };
	});

	function toggleHint(id: string) {
		expandedHints[id] = !expandedHints[id];
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					solutionName,
					category,
					alternative,
					scores,
					weights,
					date: new Date().toISOString().split('T')[0]
				})
			);
		} catch {
			// ignore
		}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (!saved) return;
			const parsed = JSON.parse(saved);
			if (parsed.solutionName) solutionName = parsed.solutionName;
			if (parsed.category) category = parsed.category;
			if (parsed.alternative) alternative = parsed.alternative;
			if (parsed.scores) {
				for (const c of criteria) {
					const val = parseInt(parsed.scores[c.id], 10);
					if (!isNaN(val) && val >= 1 && val <= 5) {
						scores[c.id] = val;
					}
				}
			}
			if (parsed.weights) {
				for (const c of criteria) {
					const val = parseInt(parsed.weights[c.id], 10);
					if (!isNaN(val) && val >= 1 && val <= 3) {
						weights[c.id] = val;
					}
				}
			}
		} catch {
			// ignore
		}
	}

	function handleScoreInput(id: string, value: number) {
		scores[id] = value;
		save();
	}

	function handleWeightChange(id: string, value: number) {
		weights[id] = value;
		save();
	}

	function handleContextChange() {
		save();
	}

	function handleReset() {
		solutionName = '';
		category = 'Autre';
		alternative = '';
		for (const c of criteria) {
			scores[c.id] = 3;
			weights[c.id] = 2;
		}
		expandedHints = {};
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const { globalScore, level, strengths, weaknesses, verdict } = results;

		const lines = [
			'# Évaluation SaaS' + (solutionName ? ' — ' + solutionName : ''),
			'',
			'Date : ' + today,
			''
		];

		if (solutionName || category !== 'Autre' || alternative) {
			lines.push('## Contexte', '');
			if (solutionName) lines.push('- Solution : ' + solutionName);
			if (category !== 'Autre') lines.push('- Catégorie : ' + category);
			if (alternative) lines.push('- Alternative envisagée : ' + alternative);
			lines.push('');
		}

		lines.push('## Grille d\'évaluation', '');
		lines.push('| Critère | Score | Poids | Pondéré |');
		lines.push('|---------|-------|-------|---------|');
		for (const d of results.details) {
			lines.push(
				'| ' + d.name + ' | ' + d.score + '/5 | ' + weightLabels[d.weight] + ' | ' + d.weighted + '/' + d.maxWeighted + ' |'
			);
		}
		lines.push('');

		lines.push('## Résultat', '');
		lines.push('- **Score global : ' + globalScore + '/100**');
		lines.push('- Niveau : ' + level);
		lines.push('');

		lines.push('### Points forts');
		for (const s of strengths) {
			lines.push('- ' + s.name + ' (' + s.pct + ' %)');
		}
		lines.push('');

		lines.push('### Points de vigilance');
		for (const w of weaknesses) {
			lines.push('- ' + w.name + ' (' + w.pct + ' %)');
		}
		lines.push('');

		lines.push('## Verdict', '');
		lines.push(verdict);
		lines.push('');
		lines.push('---');
		lines.push('Généré avec l\'outil Évaluation SaaS — ' + TOOL_URL);

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
	<div class="tool-layout">
		<div class="tool-form">
			<!-- Contexte -->
			<section class="glass-card">
				<h2 class="section-title">Contexte</h2>
				<div class="context-fields">
					<div class="field">
						<label for="solution-name">Nom de la solution</label>
						<input
							id="solution-name"
							type="text"
							bind:value={solutionName}
							oninput={handleContextChange}
							placeholder="Ex : Datadog, PagerDuty, Auth0..."
							class="text-input"
						/>
					</div>
					<div class="field">
						<label for="solution-category">Catégorie</label>
						<select
							id="solution-category"
							bind:value={category}
							onchange={handleContextChange}
							class="select-input"
						>
							{#each categories as cat}
								<option value={cat}>{cat}</option>
							{/each}
						</select>
					</div>
					<div class="field">
						<label for="solution-alternative">Alternative envisagée <span class="optional">(optionnel)</span></label>
						<input
							id="solution-alternative"
							type="text"
							bind:value={alternative}
							oninput={handleContextChange}
							placeholder="Ex : self-hosted, concurrent X..."
							class="text-input"
						/>
					</div>
				</div>
			</section>

			<!-- Grille d'évaluation -->
			<section class="glass-card">
				<h2 class="section-title">Grille d'évaluation</h2>
				{#each criteria as criterion}
					<div class="criterion-group">
						<div class="criterion-header">
							<div class="criterion-label">
								<span class="criterion-name">{criterion.name}</span>
								<span class="criterion-score">{scores[criterion.id]}/5 — {scoreLabels[scores[criterion.id]]}</span>
							</div>
							<button
								class="hint-toggle"
								onclick={() => toggleHint(criterion.id)}
								aria-expanded={expandedHints[criterion.id] || false}
								aria-label="Afficher le repère pour {criterion.name}"
							>
								{expandedHints[criterion.id] ? '−' : '?'}
							</button>
						</div>

						{#if expandedHints[criterion.id]}
							<p class="hint-text">{criterion.hint}</p>
						{/if}

						<div class="criterion-controls">
							<div class="slider-row">
								<span class="slider-bound">1</span>
								<input
									type="range"
									min="1"
									max="5"
									step="1"
									value={scores[criterion.id]}
									class="slider"
									aria-label="Score pour {criterion.name}"
									oninput={(e) => handleScoreInput(criterion.id, parseInt(e.currentTarget.value, 10))}
								/>
								<span class="slider-bound">5</span>
							</div>
							<div class="weight-selector">
								<span class="weight-label">Poids :</span>
								{#each [1, 2, 3] as w}
									<button
										class="weight-btn"
										class:weight-btn--active={weights[criterion.id] === w}
										onclick={() => handleWeightChange(criterion.id, w)}
										aria-label="Poids {weightLabels[w]} pour {criterion.name}"
										aria-pressed={weights[criterion.id] === w}
									>
										{weightLabels[w]}
									</button>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</section>

			<!-- Actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Réinitialiser
				</button>
			</div>
		</div>

		<!-- Résultats -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Résultat</div>

			<!-- Score global -->
			<div class="global-score">
				<div class="score-number {results.levelClass}">{results.globalScore}</div>
				<div class="score-meta">
					<span class="score-max">/ 100</span>
					<span class="score-level {results.levelClass}">{results.level}</span>
				</div>
			</div>

			{#if solutionName}
				<div class="result-solution">{solutionName}</div>
			{/if}

			<!-- Bar chart -->
			<div class="result-bars">
				{#each results.details as d}
					<div class="bar-group">
						<div class="bar-info">
							<span class="bar-label">{d.name}</span>
							<span class="bar-score">{d.weighted}/{d.maxWeighted}</span>
						</div>
						<div class="bar-track">
							<div
								class="bar-fill"
								class:bar-fill--high={d.pct >= 70}
								class:bar-fill--mid={d.pct >= 40 && d.pct < 70}
								class:bar-fill--low={d.pct < 40}
								style="width: {d.pct}%"
							></div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Points forts -->
			<div class="result-section">
				<div class="result-section-title">Points forts</div>
				<ul class="result-list result-list--strengths">
					{#each results.strengths as s}
						<li>{s.name} <span class="result-pct">{s.pct} %</span></li>
					{/each}
				</ul>
			</div>

			<!-- Points de vigilance -->
			<div class="result-section">
				<div class="result-section-title">Points de vigilance</div>
				<ul class="result-list result-list--weaknesses">
					{#each results.weaknesses as w}
						<li>{w.name} <span class="result-pct">{w.pct} %</span></li>
					{/each}
				</ul>
			</div>

			<!-- Verdict -->
			<div class="result-verdict">
				{results.verdict}
			</div>
		</div>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
	}

	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.tool-form {
		display: flex;
		flex-direction: column;
		gap: calc(var(--gap) * 1.5);
	}

	/* Glass card */
	.glass-card {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 var(--content-gap) 0;
	}

	/* Context fields */
	.context-fields {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.field label {
		display: block;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--secondary);
		margin-bottom: 4px;
	}

	.optional {
		font-weight: 400;
		color: var(--tertiary);
	}

	.text-input,
	.select-input {
		width: 100%;
		padding: 8px 12px;
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
		background: var(--theme);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		transition: var(--transition);
		box-sizing: border-box;
	}

	.text-input::placeholder {
		color: var(--tertiary);
	}

	.text-input:focus,
	.select-input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	/* Criterion groups */
	.criterion-group {
		padding-bottom: var(--content-gap);
		margin-bottom: var(--content-gap);
		border-bottom: 1px solid var(--border);
	}

	.criterion-group:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.criterion-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
		margin-bottom: 8px;
	}

	.criterion-label {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.criterion-name {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.criterion-score {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--accent);
	}

	.hint-toggle {
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--secondary);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: var(--transition);
	}

	.hint-toggle:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.hint-text {
		font-size: 13px;
		line-height: 1.5;
		color: var(--secondary);
		font-style: italic;
		margin: 0 0 10px 0;
		padding: 8px 12px;
		background: var(--theme);
		border-radius: var(--radius);
		border-left: 3px solid var(--accent);
	}

	/* Slider */
	.criterion-controls {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.slider-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.slider-bound {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--tertiary);
		min-width: 14px;
		text-align: center;
		flex-shrink: 0;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--border);
		cursor: pointer;
		transition: var(--transition);
	}

	.slider:hover {
		background: var(--tertiary);
	}

	.slider:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 4px;
	}

	.slider:focus:not(:focus-visible) {
		outline: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		transition: var(--transition);
	}

	.slider::-webkit-slider-thumb:hover {
		background: var(--accent-hover);
		transform: scale(1.15);
	}

	.slider::-moz-range-thumb {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
	}

	.slider::-moz-range-track {
		height: 6px;
		border-radius: 3px;
		background: var(--border);
	}

	/* Weight selector */
	.weight-selector {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.weight-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--tertiary);
		margin-right: 2px;
	}

	.weight-btn {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: transparent;
		color: var(--secondary);
		cursor: pointer;
		transition: var(--transition);
		min-height: 28px;
	}

	.weight-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.weight-btn--active {
		background: var(--accent);
		color: #fff;
		border-color: var(--accent);
	}

	.weight-btn--active:hover {
		background: var(--accent-hover);
		color: #fff;
	}

	/* Result panel */
	.tool-result {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		position: sticky;
		top: calc(var(--header-height) + var(--gap));
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: var(--content-gap);
	}

	/* Global score */
	.global-score {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 8px;
	}

	.score-number {
		font-family: var(--font-heading);
		font-size: 48px;
		font-weight: 700;
		line-height: 1;
	}

	.score-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.score-max {
		font-family: var(--font-mono);
		font-size: 16px;
		color: var(--tertiary);
	}

	.score-level {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
	}

	.level--avoid {
		color: #dc2626;
	}

	.level--acceptable {
		color: var(--accent);
	}

	.level--recommended {
		color: #16a34a;
	}

	.level--excellent {
		color: #059669;
	}

	.result-solution {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		margin-bottom: var(--content-gap);
	}

	/* Bar chart */
	.result-bars {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: var(--content-gap);
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.bar-group {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.bar-info {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.bar-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	.bar-score {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--primary);
	}

	.bar-track {
		height: 8px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 2px;
	}

	.bar-fill--high {
		background: #16a34a;
	}

	.bar-fill--mid {
		background: var(--accent);
	}

	.bar-fill--low {
		background: #dc2626;
	}

	/* Result sections */
	.result-section {
		margin-bottom: var(--content-gap);
	}

	.result-section-title {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 6px;
	}

	.result-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.result-list li {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.result-list--strengths li::before {
		content: '+ ';
		color: #16a34a;
		font-weight: 700;
		margin-right: 4px;
	}

	.result-list--weaknesses li::before {
		content: '- ';
		color: #dc2626;
		font-weight: 700;
		margin-right: 4px;
	}

	.result-pct {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--tertiary);
		flex-shrink: 0;
	}

	/* Verdict */
	.result-verdict {
		font-size: 14px;
		line-height: 1.6;
		color: var(--secondary);
		font-style: italic;
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	/* Actions */
	.tool-actions {
		display: flex;
		gap: 12px;
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

	@media (max-width: 768px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.weight-selector {
			flex-wrap: wrap;
		}

		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}

		.global-score {
			flex-wrap: wrap;
		}
	}
</style>
