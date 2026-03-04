<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-build-vs-buy';
	const TOOL_URL = 'https://kevin.delfour.co/outils/build-vs-buy/';
	const DEFAULT_SCORE = 5;

	const criteria = [
		{
			id: 'differentiation',
			name: 'Différenciation compétitive',
			min: 'Commodity',
			max: 'Cœur de métier'
		},
		{
			id: 'complexity',
			name: 'Complexité technique',
			min: 'Simple / mature',
			max: 'Très complexe'
		},
		{
			id: 'urgency',
			name: 'Urgence',
			min: 'Peut attendre',
			max: 'Immédiat'
		},
		{
			id: 'competences',
			name: 'Compétences internes',
			min: 'Aucune expertise',
			max: 'Expertise forte'
		},
		{
			id: 'budget',
			name: 'Budget disponible',
			min: 'Très contraint',
			max: 'Large'
		}
	];

	const contextualTexts: Record<string, string> = {
		Build:
			"La différenciation forte et les compétences internes justifient un développement sur mesure. Pense à estimer le TCO sur 3 ans avant de t\u2019engager.",
		Buy:
			"L\u2019urgence et la faible différenciation orientent vers une solution existante. Vérifie le coût récurrent sur 3 ans \u2014 les surprises viennent souvent de là.",
		Partner:
			"La complexité et le potentiel de mutualisation rendent le partenariat intéressant. Définis clairement la gouvernance avant de t\u2019engager."
	};

	const CLOSE_SCORE_NUANCE =
		"Quand les scores sont aussi proches, le cadre de décision seul ne suffit pas. Prends le temps d\u2019évaluer le TCO sur 3 ans pour chaque option et de confronter l\u2019analyse à ton contexte d\u2019équipe.";

	let scores = $state<Record<string, number>>({
		differentiation: DEFAULT_SCORE,
		complexity: DEFAULT_SCORE,
		urgency: DEFAULT_SCORE,
		competences: DEFAULT_SCORE,
		budget: DEFAULT_SCORE
	});

	let copyFeedback = $state(false);

	function computeResults(s: Record<string, number>) {
		const d = s.differentiation;
		const cx = s.complexity;
		const u = s.urgency;
		const co = s.competences;
		const b = s.budget;

		const rawBuild = Math.max(d * 2 + co + (10 - u) + b - cx, 0);
		const rawBuy = Math.max((10 - d) + u * 2 + cx - co + b, 0);
		const rawPartner = Math.max(cx + (10 - co) + (10 - b) + d * 0.5, 0);

		let total = rawBuild + rawBuy + rawPartner;
		if (total === 0) total = 1;

		const pctBuild = Math.round((rawBuild / total) * 100);
		const pctBuy = Math.round((rawBuy / total) * 100);
		const pctPartner = 100 - pctBuild - pctBuy;

		const results = [
			{ label: 'Build', pct: pctBuild },
			{ label: 'Buy', pct: pctBuy },
			{ label: 'Partner', pct: pctPartner }
		].sort((a, b) => b.pct - a.pct);

		const dominant = results[0];
		const second = results[1];
		const isClose = dominant.pct - second.pct < 15;

		return { results, dominant, isClose };
	}

	let computed = $derived(computeResults(scores));

	function saveScores() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					scores,
					date: new Date().toISOString().split('T')[0]
				})
			);
		} catch {
			// ignore
		}
	}

	function loadScores() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed?.scores) {
					for (const c of criteria) {
						const val = parseInt(parsed.scores[c.id], 10);
						if (!isNaN(val) && val >= 0 && val <= 10) {
							scores[c.id] = val;
						}
					}
				}
			}
		} catch {
			// ignore
		}
	}

	function handleSliderInput(id: string, value: number) {
		scores[id] = value;
		saveScores();
	}

	function handleReset() {
		for (const c of criteria) {
			scores[c.id] = DEFAULT_SCORE;
		}
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}

	async function handleExport() {
		const { results } = computed;
		const today = new Date().toISOString().split('T')[0];

		const md = [
			'# Analyse Build vs Buy vs Partner',
			'',
			'Date : ' + today,
			'',
			'## Scores par critère',
			'',
			'- Différenciation compétitive : ' + scores.differentiation + '/10',
			'- Complexité technique : ' + scores.complexity + '/10',
			'- Urgence : ' + scores.urgency + '/10',
			'- Compétences internes : ' + scores.competences + '/10',
			'- Budget disponible : ' + scores.budget + '/10',
			'',
			'## Résultat',
			'',
			'- ' + results[0].label + ' : ' + results[0].pct + ' %',
			'- ' + results[1].label + ' : ' + results[1].pct + ' %',
			'- ' + results[2].label + ' : ' + results[2].pct + ' %',
			'',
			'**Tendance : ' + results[0].label + '**',
			'',
			'---',
			'Généré avec l\u2019outil Build vs Buy \u2014 ' + TOOL_URL
		].join('\n');

		try {
			await navigator.clipboard.writeText(md);
			copyFeedback = true;
			setTimeout(() => (copyFeedback = false), 2000);
		} catch {
			// fallback
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
		loadScores();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<div class="tool-sliders">
			{#each criteria as criterion}
				<div class="slider-group">
					<div class="slider-label">
						<span class="slider-name">{criterion.name}</span>
						<span class="slider-value">{scores[criterion.id]}/10</span>
					</div>
					<div class="slider-row">
						<span class="slider-bound">{criterion.min}</span>
						<input
							type="range"
							min="0"
							max="10"
							step="1"
							value={scores[criterion.id]}
							class="slider"
							aria-label={criterion.name}
							oninput={(e) => handleSliderInput(criterion.id, parseInt(e.currentTarget.value, 10))}
						/>
						<span class="slider-bound">{criterion.max}</span>
					</div>
				</div>
			{/each}

			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Réinitialiser
				</button>
			</div>
		</div>

		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Résultat</div>

			<div class="result-bars">
				{#each computed.results as r}
					<div class="bar-group">
						<span class="bar-label">{r.label}</span>
						<div class="bar-track">
							<div
								class="bar-fill"
								class:bar-fill--dominant={r.label === computed.dominant.label}
								class:bar-fill--secondary={r.label !== computed.dominant.label}
								style="width: {r.pct}%"
							></div>
						</div>
						<span class="bar-percent">{r.pct}&nbsp;%</span>
					</div>
				{/each}
			</div>

			<div class="result-tendency">
				{#if computed.isClose}
					Les scores sont proches — la décision mérite une analyse plus approfondie.
				{:else}
					Ce scoring suggère une tendance vers <strong>{computed.dominant.label}</strong>.
				{/if}
			</div>

			<div class="result-nuance">
				{#if computed.isClose}
					{CLOSE_SCORE_NUANCE}
				{:else}
					{contextualTexts[computed.dominant.label] || ''}
				{/if}
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

	.tool-sliders {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	.slider-group {
		/* individual slider group */
	}

	.slider-label {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.slider-name {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.slider-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		color: var(--accent);
	}

	.slider-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.slider-bound {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
		white-space: nowrap;
		min-width: fit-content;
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

	/* Result */
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

	.result-bars {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: var(--content-gap);
	}

	.bar-group {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.bar-label {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		min-width: 64px;
	}

	.bar-track {
		flex: 1;
		height: 24px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
		min-width: 2px;
	}

	.bar-fill--dominant {
		background: var(--accent);
	}

	.bar-fill--secondary {
		background: var(--secondary);
	}

	.bar-percent {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		min-width: 42px;
		text-align: right;
	}

	.result-tendency {
		font-size: 16px;
		line-height: 1.6;
		color: var(--content);
		margin-bottom: 12px;
	}

	.result-tendency strong {
		color: var(--accent);
	}

	.result-nuance {
		font-size: 14px;
		line-height: 1.6;
		color: var(--secondary);
		font-style: italic;
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

	@media (max-width: 768px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.bar-group {
			flex-wrap: wrap;
		}

		.bar-label {
			min-width: 100%;
			margin-bottom: -4px;
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
