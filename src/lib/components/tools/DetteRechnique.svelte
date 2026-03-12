<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-dette-technique';
	const TOOL_URL = 'https://kevin.delfour.co/outils/evaluation-dette-technique/';

	interface Zone {
		id: string;
		name: string;
		description: string;
		hint: string;
	}

	const zones: Zone[] = [
		{
			id: 'code',
			name: 'Code',
			description: 'Lisibilité, duplication, conventions',
			hint: 'Ce que j\u2019observe souvent : quand la lecture du code demande plus d\u2019effort que sa modification, c\u2019est un signal. La remise en forme du code (refactoring) régulière aide à garder cette dette sous contrôle.'
		},
		{
			id: 'tests',
			name: 'Tests',
			description: 'Couverture, fiabilité, temps d\u2019exécution',
			hint: 'Ce que j\u2019observe souvent : des tests lents ou fragiles finissent par être ignorés. La confiance dans le déploiement s\u2019érode.'
		},
		{
			id: 'infra',
			name: 'Infrastructure',
			description: 'Supervision, passage à l\u2019échelle, automatisation',
			hint: 'Ce que j\u2019observe souvent : quand le déploiement repose sur une seule personne ou un wiki obsolète, la fragilité est déjà là.'
		},
		{
			id: 'docs',
			name: 'Documentation',
			description: 'À jour, intégration des nouveaux, ADR (traces de décisions)',
			hint: 'Ce que j\u2019observe souvent : l\u2019absence de documentation n\u2019est pas un choix, c\u2019est une dette qui se paie à chaque nouvel arrivant.'
		},
		{
			id: 'deps',
			name: 'Dependances',
			description: 'Versions, vulnérabilités, dépendance fournisseur',
			hint: 'Ce que j\u2019observe souvent : les dépendances oubliées deviennent des bombes à retardement. Un audit régulier évite les surprises.'
		},
		{
			id: 'archi',
			name: 'Architecture',
			description: 'Couplage, complexité, évolutivité',
			hint: 'Ce que j\u2019observe souvent : une architecture trop couplée rend chaque changement risqué. Le couplage se mesure au nombre de fichiers touchés par fonctionnalité.'
		}
	];

	let scores = $state<Record<string, number>>(
		Object.fromEntries(zones.map((z) => [z.id, 5]))
	);
	let impacts = $state<Record<string, number>>(
		Object.fromEntries(zones.map((z) => [z.id, 3]))
	);
	let efforts = $state<Record<string, number>>(
		Object.fromEntries(zones.map((z) => [z.id, 3]))
	);

	let copyFeedback = $state(false);
	let expandedZone = $state<string | null>(null);

	// Weighted average: weight = impact for each zone
	const overallScore = $derived.by(() => {
		let totalWeight = 0;
		let weightedSum = 0;
		for (const z of zones) {
			const w = impacts[z.id];
			weightedSum += scores[z.id] * w;
			totalWeight += w;
		}
		if (totalWeight === 0) return 0;
		return Math.round((weightedSum / totalWeight) * 10) / 10;
	});

	const debtLevel = $derived.by(() => {
		const s = overallScore;
		if (s <= 3) return { label: 'Saine', color: 'var(--dt-accent)' };
		if (s <= 5) return { label: 'Gerable', color: 'var(--dt-accent2)' };
		if (s <= 7) return { label: 'Preoccupante', color: 'var(--dt-warning)' };
		return { label: 'Critique', color: 'var(--dt-danger)' };
	});

	// Priority: sorted by impact desc, then effort asc
	const priorities = $derived.by(() => {
		return zones
			.map((z) => ({
				...z,
				score: scores[z.id],
				impact: impacts[z.id],
				effort: efforts[z.id],
				ratio: impacts[z.id] / Math.max(efforts[z.id], 0.1)
			}))
			.sort((a, b) => b.ratio - a.ratio);
	});

	const top3 = $derived.by(() => priorities.slice(0, 3));

	// Matrix quadrants
	const matrixZones = $derived.by(() => {
		return zones.map((z) => ({
			id: z.id,
			name: z.name,
			score: scores[z.id],
			impact: impacts[z.id],
			effort: efforts[z.id],
			quadrant: getQuadrant(impacts[z.id], efforts[z.id])
		}));
	});

	function getQuadrant(impact: number, effort: number): string {
		if (impact >= 3 && effort <= 3) return 'quick-win';
		if (impact >= 3 && effort > 3) return 'projet-majeur';
		if (impact < 3 && effort <= 3) return 'amelioration';
		return 'a-surveiller';
	}

	function getQuadrantLabel(q: string): string {
		switch (q) {
			case 'quick-win': return 'Gain rapide';
			case 'projet-majeur': return 'Projet majeur';
			case 'amelioration': return 'Amélioration facile';
			case 'a-surveiller': return 'À surveiller';
			default: return '';
		}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ scores, impacts, efforts, date: new Date().toISOString().split('T')[0] })
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.scores) {
					for (const z of zones) {
						if (typeof d.scores[z.id] === 'number') scores[z.id] = Math.min(10, Math.max(0, d.scores[z.id]));
						if (d.impacts && typeof d.impacts[z.id] === 'number') impacts[z.id] = Math.min(5, Math.max(1, d.impacts[z.id]));
						if (d.efforts && typeof d.efforts[z.id] === 'number') efforts[z.id] = Math.min(5, Math.max(1, d.efforts[z.id]));
					}
				}
			}
		} catch {}
	}

	function handleScoreInput(id: string, value: number) {
		scores[id] = value;
		save();
	}

	function handleImpactInput(id: string, value: number) {
		impacts[id] = value;
		save();
	}

	function handleEffortInput(id: string, value: number) {
		efforts[id] = value;
		save();
	}

	function handleReset() {
		for (const z of zones) {
			scores[z.id] = 5;
			impacts[z.id] = 3;
			efforts[z.id] = 3;
		}
		expandedZone = null;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function toggleZone(id: string) {
		expandedZone = expandedZone === id ? null : id;
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const level = debtLevel;
		const p = top3;

		const md = [
			'# Évaluation dette technique',
			'',
			`**Date :** ${today}`,
			`**Score global :** ${overallScore}/10 — ${level.label}`,
			'',
			'## Scores par zone',
			'',
			...zones.map(
				(z) =>
					`- **${z.name}** : ${scores[z.id]}/10 (impact : ${impacts[z.id]}/5, effort : ${efforts[z.id]}/5)`
			),
			'',
			'## Top 3 priorités',
			'',
			...p.map(
				(item, i) =>
					`${i + 1}. **${item.name}** — score ${item.score}/10, impact ${item.impact}/5, effort ${item.effort}/5 (${getQuadrantLabel(getQuadrant(item.impact, item.effort))})`
			),
			'',
			'## Matrice impact / effort',
			'',
			'| Zone | Impact | Effort | Quadrant |',
			'|------|--------|--------|----------|',
			...matrixZones.map(
				(z) => `| ${z.name} | ${z.impact}/5 | ${z.effort}/5 | ${getQuadrantLabel(z.quadrant)} |`
			),
			'',
			'---',
			`Généré avec l'outil Evaluation dette technique — ${TOOL_URL}`
		].join('\n');

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

<div class="dt-container">
	<div class="dt-layout">
		<div class="dt-zones">
			{#each zones as zone}
				<div class="glass-card dt-zone-card">
					<button
						class="dt-zone-header"
						onclick={() => toggleZone(zone.id)}
						aria-expanded={expandedZone === zone.id}
					>
						<div class="dt-zone-title-row">
							<span class="dt-zone-name">{zone.name}</span>
							<span class="dt-zone-score" style="color: {scores[zone.id] <= 3 ? 'var(--dt-accent)' : scores[zone.id] <= 5 ? 'var(--dt-accent2)' : scores[zone.id] <= 7 ? 'var(--dt-warning)' : 'var(--dt-danger)'}">{scores[zone.id]}/10</span>
						</div>
						<span class="dt-zone-desc">{zone.description}</span>
						<span class="dt-zone-chevron" class:dt-zone-chevron--open={expandedZone === zone.id}>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</button>

					<div class="dt-zone-main-slider">
						<div class="dt-slider-label">
							<span class="dt-slider-name">Niveau de dette</span>
							<span class="dt-slider-value">{scores[zone.id]}/10</span>
						</div>
						<div class="dt-slider-row">
							<span class="dt-slider-bound">Faible</span>
							<input
								type="range"
								min="0"
								max="10"
								step="1"
								value={scores[zone.id]}
								class="dt-slider dt-slider--score"
								aria-label="{zone.name} — niveau de dette"
								oninput={(e) => handleScoreInput(zone.id, parseInt(e.currentTarget.value, 10))}
							/>
							<span class="dt-slider-bound">Forte</span>
						</div>
					</div>

					{#if expandedZone === zone.id}
						<div class="dt-zone-details">
							<p class="dt-zone-hint">{zone.hint}</p>

							<div class="dt-secondary-sliders">
								<div class="dt-secondary-slider">
									<div class="dt-slider-label">
										<span class="dt-slider-name">Impact sur le produit</span>
										<span class="dt-slider-value dt-slider-value--impact">{impacts[zone.id]}/5</span>
									</div>
									<div class="dt-slider-row">
										<span class="dt-slider-bound">Faible</span>
										<input
											type="range"
											min="1"
											max="5"
											step="1"
											value={impacts[zone.id]}
											class="dt-slider dt-slider--impact"
											aria-label="{zone.name} — impact"
											oninput={(e) => handleImpactInput(zone.id, parseInt(e.currentTarget.value, 10))}
										/>
										<span class="dt-slider-bound">Fort</span>
									</div>
								</div>

								<div class="dt-secondary-slider">
									<div class="dt-slider-label">
										<span class="dt-slider-name">Effort pour corriger</span>
										<span class="dt-slider-value dt-slider-value--effort">{efforts[zone.id]}/5</span>
									</div>
									<div class="dt-slider-row">
										<span class="dt-slider-bound">Faible</span>
										<input
											type="range"
											min="1"
											max="5"
											step="1"
											value={efforts[zone.id]}
											class="dt-slider dt-slider--effort"
											aria-label="{zone.name} — effort"
											oninput={(e) => handleEffortInput(zone.id, parseInt(e.currentTarget.value, 10))}
										/>
										<span class="dt-slider-bound">Fort</span>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}

			<div class="dt-actions">
				<button class="dt-btn dt-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Copier le bilan (format texte)'}
				</button>
				<button class="dt-btn dt-btn--secondary" onclick={handleReset}>
					Réinitialiser
				</button>
			</div>
		</div>

		<div class="dt-results" aria-live="polite" aria-atomic="true">
			<div class="glass-card dt-score-card">
				<div class="dt-score-header">Score global</div>
				<div class="dt-score-big" style="color: {debtLevel.color}">{overallScore}</div>
				<div class="dt-score-max">/10</div>
				<div class="dt-score-label" style="color: {debtLevel.color}">{debtLevel.label}</div>
				<div class="dt-score-bar-track">
					<div
						class="dt-score-bar-fill"
						style="width: {overallScore * 10}%; background: {debtLevel.color}"
					></div>
				</div>
			</div>

			<div class="glass-card dt-matrix-card">
				<div class="dt-card-title">Matrice impact / effort</div>
				<div class="dt-matrix">
					<div class="dt-matrix-grid">
						<!-- Axis labels -->
						<span class="dt-matrix-label dt-matrix-label--y">Impact</span>
						<span class="dt-matrix-label dt-matrix-label--x">Effort</span>

						<!-- Quadrant labels -->
						<span class="dt-matrix-quadrant dt-matrix-quadrant--tl">Gains rapides</span>
						<span class="dt-matrix-quadrant dt-matrix-quadrant--tr">Projets majeurs</span>
						<span class="dt-matrix-quadrant dt-matrix-quadrant--bl">Améliorations faciles</span>
						<span class="dt-matrix-quadrant dt-matrix-quadrant--br">À surveiller</span>

						<!-- Zone dots -->
						{#each matrixZones as z}
							<div
								class="dt-matrix-dot"
								style="
									left: {((z.effort - 1) / 4) * 100}%;
									bottom: {((z.impact - 1) / 4) * 100}%;
									--dot-size: {Math.max(24, z.score * 4)}px;
									--dot-color: {z.quadrant === 'quick-win' ? 'var(--dt-accent)' : z.quadrant === 'projet-majeur' ? 'var(--dt-accent2)' : z.quadrant === 'amelioration' ? 'var(--dt-accent3)' : 'var(--dt-secondary)'}
								"
								title="{z.name}: impact {z.impact}/5, effort {z.effort}/5, dette {z.score}/10"
							>
								<span class="dt-matrix-dot-label">{z.name.substring(0, 3)}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="glass-card dt-priorities-card">
				<div class="dt-card-title">Top 3 priorités</div>
				<ol class="dt-priorities-list">
					{#each top3 as item, i}
						<li class="dt-priority-item">
							<span class="dt-priority-rank">#{i + 1}</span>
							<div class="dt-priority-info">
								<span class="dt-priority-name">{item.name}</span>
								<span class="dt-priority-meta">
									Dette {item.score}/10 — Impact {item.impact}/5 — Effort {item.effort}/5
								</span>
								<span class="dt-priority-quadrant" style="color: {getQuadrant(item.impact, item.effort) === 'quick-win' ? 'var(--dt-accent)' : getQuadrant(item.impact, item.effort) === 'projet-majeur' ? 'var(--dt-accent2)' : getQuadrant(item.impact, item.effort) === 'amelioration' ? 'var(--dt-accent3)' : 'var(--dt-secondary)'}">
									{getQuadrantLabel(getQuadrant(item.impact, item.effort))}
								</span>
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<div class="glass-card dt-zones-summary">
				<div class="dt-card-title">Vue d'ensemble</div>
				{#each zones as zone}
					<div class="dt-summary-row">
						<span class="dt-summary-name">{zone.name}</span>
						<div class="dt-summary-bar-track">
							<div
								class="dt-summary-bar-fill"
								style="width: {scores[zone.id] * 10}%; background: {scores[zone.id] <= 3 ? 'var(--dt-accent)' : scores[zone.id] <= 5 ? 'var(--dt-accent2)' : scores[zone.id] <= 7 ? 'var(--dt-warning)' : 'var(--dt-danger)'}"
							></div>
						</div>
						<span class="dt-summary-value">{scores[zone.id]}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.dt-container {
		--dt-bg: #000;
		--dt-accent: #06b6d4;
		--dt-accent2: #8b5cf6;
		--dt-accent3: #ec4899;
		--dt-warning: #f59e0b;
		--dt-danger: #ef4444;
		--dt-surface: rgba(255, 255, 255, 0.05);
		--dt-border: rgba(255, 255, 255, 0.08);
		--dt-primary: #e4e4e7;
		--dt-secondary: #a1a1aa;
		--dt-font-ui: 'Space Grotesk', 'Inter', system-ui, sans-serif;
		--dt-radius: 12px;
		--dt-gap: 16px;

		background: var(--dt-bg);
		border-radius: var(--dt-radius);
		padding: calc(var(--dt-gap) * 1.5);
		color: var(--dt-primary);
		font-family: var(--dt-font-ui);
	}

	.glass-card {
		background: var(--dt-surface);
		border: 1px solid var(--dt-border);
		border-radius: var(--dt-radius);
		padding: var(--dt-gap);
		backdrop-filter: blur(8px);
	}

	.dt-layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: calc(var(--dt-gap) * 2);
		align-items: start;
	}

	/* Zones column */
	.dt-zones {
		display: flex;
		flex-direction: column;
		gap: var(--dt-gap);
	}

	.dt-zone-card {
		transition: border-color 0.2s ease;
	}

	.dt-zone-card:hover {
		border-color: rgba(255, 255, 255, 0.15);
	}

	.dt-zone-header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		gap: 2px 12px;
		width: 100%;
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		text-align: left;
		padding: 0;
		margin-bottom: 12px;
	}

	.dt-zone-title-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		grid-column: 1;
	}

	.dt-zone-name {
		font-size: 16px;
		font-weight: 600;
		color: var(--dt-primary);
	}

	.dt-zone-score {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 16px;
		font-weight: 700;
		margin-left: 12px;
	}

	.dt-zone-desc {
		font-size: 13px;
		color: var(--dt-secondary);
		grid-column: 1;
	}

	.dt-zone-chevron {
		grid-column: 2;
		grid-row: 1 / 3;
		align-self: center;
		color: var(--dt-secondary);
		transition: transform 0.2s ease;
		display: flex;
		align-items: center;
	}

	.dt-zone-chevron--open {
		transform: rotate(180deg);
	}

	/* Main slider */
	.dt-zone-main-slider {
		margin-bottom: 4px;
	}

	.dt-slider-label {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.dt-slider-name {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.dt-slider-value {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 13px;
		font-weight: 600;
		color: var(--dt-accent);
	}

	.dt-slider-value--impact {
		color: var(--dt-accent2);
	}

	.dt-slider-value--effort {
		color: var(--dt-accent3);
	}

	.dt-slider-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.dt-slider-bound {
		font-size: 11px;
		color: var(--dt-secondary);
		white-space: nowrap;
		min-width: fit-content;
		flex-shrink: 0;
	}

	/* Sliders */
	.dt-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--dt-border);
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.dt-slider:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.dt-slider:focus-visible {
		outline: 2px solid var(--dt-accent);
		outline-offset: 4px;
	}

	.dt-slider:focus:not(:focus-visible) {
		outline: none;
	}

	.dt-slider--score::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--dt-accent);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
		cursor: pointer;
	}

	.dt-slider--score::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--dt-accent);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
		cursor: pointer;
	}

	.dt-slider--impact::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt-accent2);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
		cursor: pointer;
	}

	.dt-slider--impact::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt-accent2);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
		cursor: pointer;
	}

	.dt-slider--effort::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt-accent3);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(236, 72, 153, 0.3);
		cursor: pointer;
	}

	.dt-slider--effort::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt-accent3);
		border: 2px solid var(--dt-bg);
		box-shadow: 0 0 8px rgba(236, 72, 153, 0.3);
		cursor: pointer;
	}

	.dt-slider::-moz-range-track {
		height: 6px;
		border-radius: 3px;
		background: var(--dt-border);
	}

	/* Zone details */
	.dt-zone-details {
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--dt-border);
	}

	.dt-zone-hint {
		font-size: 13px;
		line-height: 1.6;
		color: var(--dt-secondary);
		font-style: italic;
		margin: 0 0 16px 0;
	}

	.dt-secondary-sliders {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	/* Actions */
	.dt-actions {
		display: flex;
		gap: 12px;
		margin-top: 8px;
		flex-wrap: wrap;
	}

	.dt-btn {
		font-family: var(--dt-font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		min-height: 44px;
	}

	.dt-btn--primary {
		background: var(--dt-accent);
		color: #000;
	}

	.dt-btn--primary:hover {
		background: #22d3ee;
		box-shadow: 0 0 16px rgba(6, 182, 212, 0.3);
	}

	.dt-btn--secondary {
		background: transparent;
		color: var(--dt-secondary);
		border: 1px solid var(--dt-border);
	}

	.dt-btn--secondary:hover {
		border-color: rgba(255, 255, 255, 0.2);
		color: var(--dt-primary);
	}

	/* Results column */
	.dt-results {
		position: sticky;
		top: 80px;
		display: flex;
		flex-direction: column;
		gap: var(--dt-gap);
	}

	/* Score card */
	.dt-score-card {
		text-align: center;
		padding: calc(var(--dt-gap) * 1.5);
	}

	.dt-score-header {
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--dt-secondary);
		margin-bottom: 8px;
	}

	.dt-score-big {
		font-size: 56px;
		font-weight: 700;
		line-height: 1;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
	}

	.dt-score-max {
		font-size: 18px;
		color: var(--dt-secondary);
		margin-bottom: 4px;
	}

	.dt-score-label {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.dt-score-bar-track {
		width: 100%;
		height: 6px;
		background: var(--dt-border);
		border-radius: 3px;
		overflow: hidden;
	}

	.dt-score-bar-fill {
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s ease, background 0.3s ease;
	}

	/* Card titles */
	.dt-card-title {
		font-size: 14px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt-secondary);
		margin-bottom: 12px;
	}

	/* Matrix */
	.dt-matrix-card {
		padding: var(--dt-gap);
	}

	.dt-matrix-grid {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		background:
			linear-gradient(to right, var(--dt-border) 1px, transparent 1px),
			linear-gradient(to bottom, var(--dt-border) 1px, transparent 1px);
		background-size: 50% 50%;
		border: 1px solid var(--dt-border);
		border-radius: 4px;
	}

	.dt-matrix-label {
		position: absolute;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--dt-secondary);
	}

	.dt-matrix-label--y {
		top: -18px;
		left: 0;
	}

	.dt-matrix-label--x {
		bottom: -18px;
		right: 0;
	}

	.dt-matrix-quadrant {
		position: absolute;
		font-size: 9px;
		color: rgba(255, 255, 255, 0.2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		pointer-events: none;
	}

	.dt-matrix-quadrant--tl {
		top: 6px;
		left: 6px;
	}

	.dt-matrix-quadrant--tr {
		top: 6px;
		right: 6px;
		text-align: right;
	}

	.dt-matrix-quadrant--bl {
		bottom: 6px;
		left: 6px;
	}

	.dt-matrix-quadrant--br {
		bottom: 6px;
		right: 6px;
		text-align: right;
	}

	.dt-matrix-dot {
		position: absolute;
		width: var(--dot-size);
		height: var(--dot-size);
		border-radius: 50%;
		background: var(--dot-color);
		opacity: 0.85;
		transform: translate(-50%, 50%);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		cursor: default;
	}

	.dt-matrix-dot:hover {
		opacity: 1;
		transform: translate(-50%, 50%) scale(1.15);
		z-index: 1;
	}

	.dt-matrix-dot-label {
		font-size: 9px;
		font-weight: 700;
		color: #000;
		text-transform: uppercase;
	}

	/* Priorities */
	.dt-priorities-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.dt-priority-item {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.dt-priority-rank {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 14px;
		font-weight: 700;
		color: var(--dt-accent);
		min-width: 24px;
		flex-shrink: 0;
	}

	.dt-priority-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.dt-priority-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt-primary);
	}

	.dt-priority-meta {
		font-size: 12px;
		color: var(--dt-secondary);
	}

	.dt-priority-quadrant {
		font-size: 11px;
		font-weight: 600;
	}

	/* Zones summary */
	.dt-zones-summary {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.dt-summary-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.dt-summary-name {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt-secondary);
		min-width: 90px;
		flex-shrink: 0;
	}

	.dt-summary-bar-track {
		flex: 1;
		height: 6px;
		background: var(--dt-border);
		border-radius: 3px;
		overflow: hidden;
	}

	.dt-summary-bar-fill {
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s ease, background 0.3s ease;
		min-width: 2px;
	}

	.dt-summary-value {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt-primary);
		min-width: 20px;
		text-align: right;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.dt-layout {
			grid-template-columns: 1fr;
		}

		.dt-results {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.dt-container {
			padding: var(--dt-gap);
		}

		.dt-actions {
			flex-direction: column;
		}

		.dt-btn {
			width: 100%;
			text-align: center;
		}

		.dt-score-big {
			font-size: 42px;
		}
	}
</style>
