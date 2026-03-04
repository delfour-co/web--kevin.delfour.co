<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-matrice-decision-technique';
	const TOOL_URL = 'https://kevin.delfour.co/outils/matrice-decision-technique/';

	interface Criterion {
		id: string;
		name: string;
		weight: number; // 1-5
	}

	interface Option {
		id: string;
		name: string;
		scores: Record<string, number>; // criterion id -> score 0-10
	}

	let decisionTitle = $state('');
	let criteria = $state<Criterion[]>([
		{ id: 'c1', name: 'Performance', weight: 3 },
		{ id: 'c2', name: 'Coût', weight: 3 },
		{ id: 'c3', name: 'Maintenabilité', weight: 3 }
	]);
	let options = $state<Option[]>([
		{ id: 'o1', name: 'Option A', scores: { c1: 5, c2: 5, c3: 5 } },
		{ id: 'o2', name: 'Option B', scores: { c1: 5, c2: 5, c3: 5 } }
	]);

	let copyFeedback = $state(false);
	let nextId = $state(10);

	function genId(prefix: string) {
		return prefix + nextId++;
	}

	// Computed scores
	const results = $derived(() => {
		return options.map((opt) => {
			let weightedSum = 0;
			let totalWeight = 0;
			for (const c of criteria) {
				const score = opt.scores[c.id] ?? 5;
				weightedSum += score * c.weight;
				totalWeight += c.weight * 10;
			}
			const pct = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;
			return { option: opt, weightedSum, pct };
		}).sort((a, b) => b.pct - a.pct);
	});

	function addCriterion() {
		const id = genId('c');
		criteria.push({ id, name: '', weight: 3 });
		for (const opt of options) {
			opt.scores[id] = 5;
		}
	}

	function removeCriterion(index: number) {
		if (criteria.length <= 1) return;
		const id = criteria[index].id;
		criteria.splice(index, 1);
		for (const opt of options) {
			delete opt.scores[id];
		}
	}

	function addOption() {
		const id = genId('o');
		const scores: Record<string, number> = {};
		for (const c of criteria) {
			scores[c.id] = 5;
		}
		options.push({ id, name: '', scores });
	}

	function removeOption(index: number) {
		if (options.length <= 2) return;
		options.splice(index, 1);
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisionTitle, criteria, options, nextId }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.decisionTitle) decisionTitle = d.decisionTitle;
				if (Array.isArray(d.criteria)) criteria = d.criteria;
				if (Array.isArray(d.options)) options = d.options;
				if (d.nextId) nextId = d.nextId;
			}
		} catch {}
	}

	function handleReset() {
		decisionTitle = '';
		criteria = [
			{ id: 'c1', name: 'Performance', weight: 3 },
			{ id: 'c2', name: 'Coût', weight: 3 },
			{ id: 'c3', name: 'Maintenabilité', weight: 3 }
		];
		options = [
			{ id: 'o1', name: 'Option A', scores: { c1: 5, c2: 5, c3: 5 } },
			{ id: 'o2', name: 'Option B', scores: { c1: 5, c2: 5, c3: 5 } }
		];
		nextId = 10;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const res = results();
		const lines = [
			`# Matrice de décision : ${decisionTitle || 'Sans titre'}`,
			'',
			`**Date :** ${today}`,
			'',
			'## Critères (pondération)',
			'',
			...criteria.map((c) => `- ${c.name || '—'} (poids : ${c.weight}/5)`),
			'',
			'## Scores',
			'',
			// Table header
			`| Option | ${criteria.map((c) => c.name || '—').join(' | ')} | **Score** |`,
			`| --- | ${criteria.map(() => '---').join(' | ')} | --- |`,
			// Table rows
			...res.map((r) =>
				`| ${r.option.name || '—'} | ${criteria.map((c) => `${r.option.scores[c.id] ?? 0}/10`).join(' | ')} | **${r.pct}%** |`
			),
			'',
			'## Résultat',
			'',
			`**Recommandation :** ${res[0]?.option.name || '—'} (${res[0]?.pct}%)`,
			'',
			'---',
			`_Généré avec la Matrice de décision technique — ${TOOL_URL}_`
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

	$effect(() => {
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="form-group" style="margin-bottom: var(--gap);">
		<label for="decision-title">Décision à prendre</label>
		<input id="decision-title" type="text" bind:value={decisionTitle} placeholder="Ex: Choix du framework frontend" />
	</div>

	<!-- Criteria -->
	<fieldset class="section-card">
		<legend>Critères</legend>
		<p class="form-hint">Définis les critères d'évaluation et leur poids (1 = faible, 5 = critique).</p>

		{#each criteria as c, i}
			<div class="criterion-row">
				<input
					type="text"
					bind:value={c.name}
					placeholder="Nom du critère"
					class="criterion-name"
				/>
				<div class="weight-group">
					<label for="weight-{c.id}" class="weight-label">Poids</label>
					<select id="weight-{c.id}" bind:value={c.weight} class="weight-select">
						{#each [1, 2, 3, 4, 5] as w}
							<option value={w}>{w}</option>
						{/each}
					</select>
				</div>
				{#if criteria.length > 1}
					<button class="remove-btn" onclick={() => removeCriterion(i)} aria-label="Supprimer {c.name}">
						&times;
					</button>
				{/if}
			</div>
		{/each}
		<button class="add-btn" onclick={addCriterion}>+ Ajouter un critère</button>
	</fieldset>

	<!-- Scoring matrix -->
	<div class="matrix-section">
		<div class="matrix-header">
			<h2>Évaluation</h2>
			<button class="add-btn add-btn--inline" onclick={addOption}>+ Option</button>
		</div>

		<div class="matrix-table-wrapper">
			<table class="matrix-table">
				<thead>
					<tr>
						<th class="th-option">Option</th>
						{#each criteria as c}
							<th class="th-criterion">
								{c.name || '—'}
								<span class="th-weight">(×{c.weight})</span>
							</th>
						{/each}
						<th class="th-score">Score</th>
					</tr>
				</thead>
				<tbody>
					{#each options as opt, oi}
						{@const r = results().find((r) => r.option.id === opt.id)}
						<tr>
							<td class="td-option">
								<div class="option-name-cell">
									<input type="text" bind:value={opt.name} placeholder="Option" class="option-name-input" />
									{#if options.length > 2}
										<button class="remove-btn remove-btn--small" onclick={() => removeOption(oi)} aria-label="Supprimer {opt.name}">
											&times;
										</button>
									{/if}
								</div>
							</td>
							{#each criteria as c}
								<td class="td-score">
									<input
										type="range"
										min="0"
										max="10"
										step="1"
										bind:value={opt.scores[c.id]}
										class="score-slider"
										aria-label="{opt.name} - {c.name}"
									/>
									<span class="score-value">{opt.scores[c.id]}</span>
								</td>
							{/each}
							<td class="td-total">
								<span class="total-pct" class:total-pct--best={r === results()[0]}>{r?.pct ?? 0}%</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Result bars -->
	{#if options.length > 0}
		<div class="result-panel" aria-live="polite">
			<h3 class="result-title">Classement</h3>
			{#each results() as r, i}
				<div class="result-bar-row">
					<span class="result-rank">{i + 1}.</span>
					<span class="result-name">{r.option.name || '—'}</span>
					<div class="result-bar-track">
						<div
							class="result-bar-fill"
							class:result-bar-fill--best={i === 0}
							style="width: {r.pct}%"
						></div>
					</div>
					<span class="result-pct">{r.pct}%</span>
				</div>
			{/each}
		</div>
	{/if}

	<div class="tool-actions">
		<button class="tool-btn tool-btn--primary" onclick={handleExport}>
			{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
		</button>
		<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Réinitialiser</button>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.form-group label {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.form-hint {
		font-size: 13px;
		color: var(--secondary);
		margin: 0 0 8px 0;
		font-style: italic;
	}

	input[type='text'] {
		font-family: var(--font-body);
		font-size: 15px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
		width: 100%;
		box-sizing: border-box;
	}

	input[type='text']:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	/* Section card */
	.section-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin: 0 0 var(--gap) 0;
	}

	.section-card legend {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		padding: 0 8px;
	}

	/* Criterion rows */
	.criterion-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.criterion-name {
		flex: 1;
	}

	.weight-group {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.weight-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	.weight-select {
		font-family: var(--font-ui);
		font-size: 14px;
		padding: 6px 8px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
	}

	.remove-btn {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--secondary);
		cursor: pointer;
		font-size: 16px;
		flex-shrink: 0;
		transition: var(--transition);
	}

	.remove-btn:hover {
		color: #c0392b;
		border-color: #c0392b;
	}

	.remove-btn--small {
		width: 22px;
		height: 22px;
		font-size: 14px;
	}

	.add-btn {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--accent);
		background: none;
		border: 1px dashed var(--accent-border);
		border-radius: var(--radius);
		padding: 8px;
		width: 100%;
		cursor: pointer;
		transition: var(--transition);
	}

	.add-btn:hover {
		background: var(--accent-light);
	}

	.add-btn--inline {
		width: auto;
		padding: 4px 12px;
		font-size: 13px;
	}

	/* Matrix */
	.matrix-section {
		margin-bottom: var(--gap);
	}

	.matrix-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.matrix-header h2 {
		font-size: 1.1rem;
		margin: 0;
	}

	.matrix-table-wrapper {
		overflow-x: auto;
	}

	.matrix-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.matrix-table th,
	.matrix-table td {
		padding: 8px 12px;
		border-bottom: 1px solid var(--border);
		text-align: center;
		vertical-align: middle;
	}

	.th-option {
		text-align: left;
		min-width: 120px;
	}

	.th-criterion {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		min-width: 100px;
	}

	.th-weight {
		display: block;
		font-size: 11px;
		font-weight: 400;
		color: var(--secondary);
	}

	.th-score {
		font-family: var(--font-ui);
		font-weight: 700;
		min-width: 60px;
	}

	.td-option {
		text-align: left;
	}

	.option-name-cell {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.option-name-input {
		font-size: 14px;
		padding: 6px 8px;
	}

	.td-score {
		min-width: 100px;
	}

	.score-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 80px;
		height: 4px;
		border-radius: 2px;
		background: var(--border);
		cursor: pointer;
	}

	.score-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		cursor: pointer;
	}

	.score-slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		cursor: pointer;
	}

	.score-value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		margin-left: 4px;
	}

	.td-total {
		font-family: var(--font-mono);
		font-weight: 700;
	}

	.total-pct--best {
		color: var(--accent);
	}

	/* Result panel */
	.result-panel {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		margin-bottom: var(--gap);
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		margin: 0 0 12px 0;
	}

	.result-bar-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.result-bar-row:last-child {
		margin-bottom: 0;
	}

	.result-rank {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--secondary);
		min-width: 20px;
	}

	.result-name {
		font-size: 14px;
		font-weight: 500;
		min-width: 80px;
		flex-shrink: 0;
	}

	.result-bar-track {
		flex: 1;
		height: 20px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.result-bar-fill {
		height: 100%;
		background: var(--secondary);
		border-radius: 4px;
		transition: width 0.3s ease;
		min-width: 2px;
	}

	.result-bar-fill--best {
		background: var(--accent);
	}

	.result-pct {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 600;
		min-width: 40px;
		text-align: right;
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
		.matrix-table {
			font-size: 13px;
		}

		.score-slider {
			width: 60px;
		}
	}

	@media (max-width: 600px) {
		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
