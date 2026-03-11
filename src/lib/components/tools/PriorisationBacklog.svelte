<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-priorisation-backlog';
	const TOOL_URL = 'https://kevin.delfour.co/outils/priorisation-backlog/';

	type ItemType = 'dette-technique' | 'feature' | 'infrastructure' | 'refactoring' | 'sécurité';

	interface BacklogItem {
		id: string;
		nom: string;
		type: ItemType;
		impact: number;
		confiance: number;
		effort: number;
		urgence: number;
	}

	interface ScoredItem {
		item: BacklogItem;
		score: number;
		isQuickWin: boolean;
	}

	const typeLabels: Record<ItemType, string> = {
		'dette-technique': 'Dette technique',
		feature: 'Feature',
		infrastructure: 'Infrastructure',
		refactoring: 'Refactoring',
		'sécurité': 'Sécurité'
	};

	const typeColors: Record<ItemType, string> = {
		'dette-technique': '#f59e0b',
		feature: '#06b6d4',
		infrastructure: '#8b5cf6',
		refactoring: '#10b981',
		'sécurité': '#ef4444'
	};

	const effortLabels: Record<number, string> = {
		1: 'XS',
		2: 'S',
		3: 'M',
		4: 'L',
		5: 'XL'
	};

	let items = $state<BacklogItem[]>([
		{ id: 'i1', nom: '', type: 'dette-technique', impact: 3, confiance: 3, effort: 3, urgence: 3 }
	]);

	let copyFeedback = $state(false);
	let nextId = $state(10);
	let isMobile = $state(false);

	function genId() {
		return 'i' + nextId++;
	}

	const scoredItems = $derived.by(() => {
		return items
			.map((item) => {
				const score = (item.impact * item.confiance * item.urgence) / Math.max(item.effort, 1);
				const isQuickWin = score >= 15 && item.effort <= 2;
				return { item, score: Math.round(score * 10) / 10, isQuickWin } as ScoredItem;
			})
			.sort((a, b) => b.score - a.score);
	});

	const maxScore = $derived.by(() => {
		if (scoredItems.length === 0) return 1;
		return Math.max(...scoredItems.map((s) => s.score), 1);
	});

	const typeDistribution = $derived.by(() => {
		const dist: Record<ItemType, number> = {
			'dette-technique': 0,
			feature: 0,
			infrastructure: 0,
			refactoring: 0,
			'sécurité': 0
		};
		for (const item of items) {
			dist[item.type]++;
		}
		return Object.entries(dist)
			.filter(([, count]) => count > 0)
			.map(([type, count]) => ({ type: type as ItemType, count, pct: Math.round((count / items.length) * 100) }));
	});

	const top5 = $derived.by(() => {
		return scoredItems.slice(0, 5);
	});

	const quickWins = $derived.by(() => {
		return scoredItems.filter((s) => s.isQuickWin);
	});

	function addItem() {
		items.push({
			id: genId(),
			nom: '',
			type: 'dette-technique',
			impact: 3,
			confiance: 3,
			effort: 3,
			urgence: 3
		});
	}

	function removeItem(index: number) {
		if (items.length <= 1) return;
		items.splice(index, 1);
	}

	function getBarColor(score: number): string {
		const ratio = score / maxScore;
		if (ratio >= 0.66) return '#06b6d4';
		if (ratio >= 0.33) return '#8b5cf6';
		return '#ef4444';
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, nextId }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (Array.isArray(d.items) && d.items.length > 0) items = d.items;
				if (d.nextId) nextId = d.nextId;
			}
		} catch {}
	}

	function handleReset() {
		items = [
			{ id: 'i1', nom: '', type: 'dette-technique', impact: 3, confiance: 3, effort: 3, urgence: 3 }
		];
		nextId = 10;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const ranked = scoredItems;
		const lines = [
			'# Priorisation backlog technique',
			'',
			`**Date :** ${today}`,
			`**Nombre d'items :** ${items.length}`,
			'',
			'## Classement par score',
			'',
			'| Rang | Nom | Type | Impact | Confiance | Urgence | Effort | Score |',
			'| --- | --- | --- | --- | --- | --- | --- | --- |',
			...ranked.map(
				(r, i) =>
					`| ${i + 1} | ${r.item.nom || '\u2014'} | ${typeLabels[r.item.type]} | ${r.item.impact}/5 | ${r.item.confiance}/5 | ${r.item.urgence}/5 | ${effortLabels[r.item.effort]} | **${r.score}** |`
			)
		];

		if (quickWins.length > 0) {
			lines.push('', '## Quick wins', '');
			for (const qw of quickWins) {
				lines.push(`- **${qw.item.nom || '\u2014'}** (score : ${qw.score}, effort : ${effortLabels[qw.item.effort]})`);
			}
		}

		lines.push('', '## Distribution par type', '');
		for (const d of typeDistribution) {
			lines.push(`- ${typeLabels[d.type]} : ${d.count} item${d.count > 1 ? 's' : ''} (${d.pct}%)`);
		}

		lines.push('', '---', `_Score = (Impact x Confiance x Urgence) / Effort_`);
		lines.push(`_Genere avec la Priorisation backlog technique \u2014 ${TOOL_URL}_`);

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

	function checkMobile() {
		if (browser) {
			isMobile = window.innerWidth < 900;
		}
	}

	$effect(() => {
		save();
	});

	onMount(() => {
		load();
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});
</script>

<div class="tool-layout" class:tool-layout--mobile={isMobile}>
	<!-- LEFT: Form -->
	<div class="tool-form">
		<fieldset class="section-card">
			<legend>Items du backlog</legend>
			<p class="form-hint">
				Formule : (Impact x Confiance x Urgence) / Effort. Plus le score est eleve, plus l'item est prioritaire.
			</p>

			{#each items as item, i}
				<div class="item-card glass-card">
					<div class="item-header">
						<span class="item-number">{i + 1}</span>
						<input
							type="text"
							bind:value={item.nom}
							placeholder="Nom de l'item"
							class="item-name-input"
							aria-label="Nom de l'item {i + 1}"
						/>
						{#if items.length > 1}
							<button class="remove-btn" onclick={() => removeItem(i)} aria-label="Supprimer {item.nom || 'item ' + (i + 1)}">
								&times;
							</button>
						{/if}
					</div>

					<div class="item-fields">
						<div class="field-group">
							<label for="type-{item.id}">Type</label>
							<select id="type-{item.id}" bind:value={item.type} class="field-select">
								{#each Object.entries(typeLabels) as [value, label]}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<div class="field-group">
							<label for="impact-{item.id}">Impact <span class="field-hint">valeur business</span></label>
							<div class="slider-row">
								<input
									id="impact-{item.id}"
									type="range"
									min="1"
									max="5"
									step="1"
									bind:value={item.impact}
									class="score-slider"
								/>
								<span class="score-value">{item.impact}/5</span>
							</div>
						</div>

						<div class="field-group">
							<label for="confiance-{item.id}">Confiance <span class="field-hint">certitude de l'impact</span></label>
							<div class="slider-row">
								<input
									id="confiance-{item.id}"
									type="range"
									min="1"
									max="5"
									step="1"
									bind:value={item.confiance}
									class="score-slider"
								/>
								<span class="score-value">{item.confiance}/5</span>
							</div>
						</div>

						<div class="field-group">
							<label for="urgence-{item.id}">Urgence <span class="field-hint">risque du delai</span></label>
							<div class="slider-row">
								<input
									id="urgence-{item.id}"
									type="range"
									min="1"
									max="5"
									step="1"
									bind:value={item.urgence}
									class="score-slider"
								/>
								<span class="score-value">{item.urgence}/5</span>
							</div>
						</div>

						<div class="field-group">
							<label for="effort-{item.id}">Effort <span class="field-hint">{effortLabels[item.effort]}</span></label>
							<div class="slider-row">
								<input
									id="effort-{item.id}"
									type="range"
									min="1"
									max="5"
									step="1"
									bind:value={item.effort}
									class="score-slider"
								/>
								<span class="score-value">{item.effort}/5</span>
							</div>
						</div>
					</div>
				</div>
			{/each}

			<button class="add-btn" onclick={addItem}>+ Ajouter un item</button>
		</fieldset>

		<div class="tool-actions">
			<button class="tool-btn tool-btn--primary" onclick={handleExport}>
				{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
			</button>
			<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Reinitialiser</button>
		</div>
	</div>

	<!-- RIGHT: Results (sticky) -->
	<div class="tool-results" class:tool-results--mobile={isMobile}>
		<div class="results-sticky">
			<!-- Ranked list -->
			<div class="result-panel" aria-live="polite">
				<h3 class="result-title">Classement</h3>
				<div class="result-chart">
					{#each scoredItems as r, i}
						<div class="result-bar-row">
							<span class="result-rank">{i + 1}.</span>
							<div class="result-info">
								<span class="result-name">{r.item.nom || '\u2014'}</span>
								<span class="result-type-badge" style="--type-color: {typeColors[r.item.type]}">{typeLabels[r.item.type]}</span>
							</div>
							<div class="result-bar-track">
								<div
									class="result-bar-fill"
									style="width: {maxScore > 0 ? (r.score / maxScore) * 100 : 0}%; background: {getBarColor(r.score)}"
								></div>
							</div>
							<span class="result-score" style="color: {getBarColor(r.score)}">{r.score}</span>
							{#if r.isQuickWin}
								<span class="quick-win-badge">QW</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Quick wins -->
			{#if quickWins.length > 0}
				<div class="result-panel quick-wins-panel">
					<h3 class="result-title">Quick wins</h3>
					<p class="panel-hint">Score eleve + effort faible (XS ou S)</p>
					<div class="quick-wins-list">
						{#each quickWins as qw}
							<div class="quick-win-item">
								<span class="quick-win-name">{qw.item.nom || '\u2014'}</span>
								<span class="quick-win-detail">Score {qw.score} / Effort {effortLabels[qw.item.effort]}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Distribution by type -->
			{#if typeDistribution.length > 0}
				<div class="result-panel">
					<h3 class="result-title">Distribution par type</h3>
					<div class="type-distribution">
						{#each typeDistribution as d}
							<div class="type-dist-row">
								<div class="type-dist-label">
									<span class="type-dot" style="background: {typeColors[d.type]}"></span>
									<span>{typeLabels[d.type]}</span>
								</div>
								<div class="type-dist-bar-track">
									<div
										class="type-dist-bar-fill"
										style="width: {d.pct}%; background: {typeColors[d.type]}"
									></div>
								</div>
								<span class="type-dist-count">{d.count} ({d.pct}%)</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Top 5 breakdown -->
			{#if top5.length > 0}
				<div class="result-panel">
					<h3 class="result-title">Top {Math.min(5, top5.length)} — detail</h3>
					<div class="top5-list">
						{#each top5 as r, i}
							<div class="top5-item">
								<div class="top5-header">
									<span class="top5-rank">{i + 1}.</span>
									<span class="top5-name">{r.item.nom || '\u2014'}</span>
									<span class="top5-score" style="color: {getBarColor(r.score)}">{r.score}</span>
								</div>
								<div class="top5-breakdown">
									<span>Impact {r.item.impact}</span>
									<span>Confiance {r.item.confiance}</span>
									<span>Urgence {r.item.urgence}</span>
									<span>Effort {effortLabels[r.item.effort]}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Layout */
	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.tool-layout--mobile {
		grid-template-columns: 1fr;
	}

	.tool-form {
		min-width: 0;
	}

	.tool-results {
		min-width: 0;
	}

	.results-sticky {
		position: sticky;
		top: calc(var(--gap) * 2);
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	.tool-results--mobile .results-sticky {
		position: static;
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

	.form-hint {
		font-size: 13px;
		color: var(--secondary);
		margin: 0 0 12px 0;
		font-style: italic;
	}

	/* Item cards */
	.item-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 16px;
		margin-bottom: 12px;
		background: rgba(255, 255, 255, 0.02);
	}

	.item-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
	}

	.item-number {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		background: var(--border);
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.item-name-input {
		flex: 1;
		font-family: var(--font-body);
		font-size: 15px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
		width: 100%;
		box-sizing: border-box;
	}

	.item-name-input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	.item-fields {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.field-group label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
	}

	.field-hint {
		font-weight: 400;
		color: var(--secondary);
		font-size: 11px;
	}

	.field-select {
		font-family: var(--font-ui);
		font-size: 14px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		width: 100%;
		box-sizing: border-box;
	}

	.slider-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.score-slider {
		-webkit-appearance: none;
		appearance: none;
		flex: 1;
		height: 4px;
		border-radius: 2px;
		background: var(--border);
		cursor: pointer;
	}

	.score-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		cursor: pointer;
	}

	.score-slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--theme);
		cursor: pointer;
	}

	.score-value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		min-width: 28px;
		text-align: right;
	}

	/* Remove button */
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

	/* Add button */
	.add-btn {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--accent);
		background: none;
		border: 1px dashed var(--accent-border);
		border-radius: var(--radius);
		padding: 10px;
		width: 100%;
		cursor: pointer;
		transition: var(--transition);
	}

	.add-btn:hover {
		background: var(--accent-light);
	}

	/* Result panels */
	.result-panel {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		margin: 0 0 12px 0;
	}

	.panel-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 10px 0;
		font-style: italic;
	}

	/* Result chart */
	.result-chart {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.result-bar-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.result-rank {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		min-width: 20px;
		flex-shrink: 0;
	}

	.result-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 80px;
		max-width: 120px;
		flex-shrink: 0;
	}

	.result-name {
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.result-type-badge {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--type-color);
		opacity: 0.8;
	}

	.result-bar-track {
		flex: 1;
		height: 18px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
		min-width: 40px;
	}

	.result-bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s ease;
		min-width: 2px;
	}

	.result-score {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 700;
		min-width: 32px;
		text-align: right;
		flex-shrink: 0;
	}

	.quick-win-badge {
		font-family: var(--font-ui);
		font-size: 9px;
		font-weight: 700;
		color: #10b981;
		border: 1px solid rgba(16, 185, 129, 0.4);
		border-radius: 3px;
		padding: 1px 4px;
		flex-shrink: 0;
	}

	/* Quick wins panel */
	.quick-wins-panel {
		border-color: rgba(16, 185, 129, 0.3);
		background: rgba(16, 185, 129, 0.05);
	}

	.quick-wins-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.quick-win-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		font-size: 13px;
	}

	.quick-win-name {
		font-weight: 500;
	}

	.quick-win-detail {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--secondary);
		flex-shrink: 0;
	}

	/* Type distribution */
	.type-distribution {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.type-dist-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.type-dist-label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		min-width: 100px;
		flex-shrink: 0;
	}

	.type-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.type-dist-bar-track {
		flex: 1;
		height: 14px;
		background: var(--border);
		border-radius: 3px;
		overflow: hidden;
	}

	.type-dist-bar-fill {
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s ease;
		min-width: 2px;
	}

	.type-dist-count {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--secondary);
		min-width: 55px;
		text-align: right;
		flex-shrink: 0;
	}

	/* Top 5 */
	.top5-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.top5-item {
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.top5-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.top5-header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 4px;
	}

	.top5-rank {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
	}

	.top5-name {
		font-size: 14px;
		font-weight: 500;
		flex: 1;
	}

	.top5-score {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
	}

	.top5-breakdown {
		display: flex;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--secondary);
		padding-left: 20px;
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

	@media (max-width: 900px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.results-sticky {
			position: static;
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

		.result-info {
			min-width: 60px;
			max-width: 80px;
		}

		.type-dist-label {
			min-width: 80px;
		}

		.top5-breakdown {
			flex-wrap: wrap;
			gap: 8px;
		}
	}
</style>
