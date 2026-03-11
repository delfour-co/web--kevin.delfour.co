<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-maturite-equipe';
	const TOOL_URL = 'https://kevin.delfour.co/outils/maturite-equipe/';

	const axes = [
		{
			id: 'autonomie',
			name: 'Autonomie',
			description: 'Capacité à prendre des décisions sans escalade systématique.'
		},
		{
			id: 'qualite',
			name: 'Qualité',
			description: 'Rigueur technique, code review, testing, respect des standards.'
		},
		{
			id: 'delivery',
			name: 'Delivery',
			description: 'Prévisibilité, respect des engagements, flux continu.'
		},
		{
			id: 'communication',
			name: 'Communication',
			description: 'Transparence, feedback, documentation, partage de contexte.'
		},
		{
			id: 'apprentissage',
			name: 'Apprentissage',
			description: 'Veille, rétros, amélioration continue, mentoring.'
		},
		{
			id: 'collaboration',
			name: 'Collaboration',
			description: 'Pair programming, mob, entraide, cross-fonctionnel.'
		}
	];

	const suggestions: Record<string, string> = {
		autonomie:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles commencent par clarifier les périmètres de décision. Quand chacun sait ce qu'il peut décider seul, l'escalade diminue naturellement. Un cadre explicite — même imparfait — libère plus qu'un flou bienveillant.",
		qualite:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles ritualisent la qualité plutôt que de la décréter. Une code review systématique, un seuil de couverture raisonnable, un standard partagé et écrit. La rigueur vient rarement de la volonté individuelle — elle vient du cadre collectif.",
		delivery:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles réduisent la taille de ce qu'elles livrent. Des incréments plus petits, plus fréquents, avec moins de dépendances. La prévisibilité n'est pas une question de vélocité — c'est une question de découpage.",
		communication:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles documentent les décisions, pas seulement les résultats. Un canal dédié aux choix techniques, des rétros où on parle vrai, des post-mortems sans blame. La transparence se construit par la pratique, pas par l'intention.",
		apprentissage:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles créent du temps protégé pour apprendre. Une demi-journée de veille, un format lightning talk, un binôme junior/senior sur un sujet nouveau. L'apprentissage ne se décrète pas — il se rend possible.",
		collaboration:
			"Ce que j'ai observé dans les équipes qui progressent sur cet axe : elles commencent petit. Un créneau de mob programming hebdomadaire, un ticket traité en binôme. La collaboration cross-fonctionnelle suit souvent : quand on s'habitue à travailler ensemble, les frontières d'équipe s'assouplissent."
	};

	function getLevel(score: number): { label: string; color: string } {
		if (score <= 3) return { label: 'Émergent', color: '#f97316' };
		if (score <= 6) return { label: 'Structuré', color: '#8b5cf6' };
		if (score <= 8) return { label: 'Performant', color: '#06b6d4' };
		return { label: 'Autonome', color: '#ec4899' };
	}

	let scores = $state<Record<string, number>>(
		Object.fromEntries(axes.map((a) => [a.id, 5]))
	);

	let copyFeedback = $state(false);

	const average = $derived(
		Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / axes.length) * 10) / 10
	);

	const averageLevel = $derived(getLevel(Math.round(average)));

	const sortedAxes = $derived.by(() => {
		return [...axes].sort((a, b) => scores[b.id] - scores[a.id]);
	});

	const strongest = $derived.by(() => {
		return sortedAxes[0];
	});

	const weakest = $derived.by(() => {
		return sortedAxes[sortedAxes.length - 1];
	});

	const twoWeakest = $derived.by(() => {
		return [sortedAxes[sortedAxes.length - 1], sortedAxes[sortedAxes.length - 2]];
	});

	// Radar chart SVG computation
	const radarPoints = $derived.by(() => {
		const cx = 150;
		const cy = 150;
		const maxR = 120;
		const n = axes.length;
		return axes.map((a, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			const r = (scores[a.id] / 10) * maxR;
			return {
				x: cx + r * Math.cos(angle),
				y: cy + r * Math.sin(angle),
				labelX: cx + (maxR + 20) * Math.cos(angle),
				labelY: cy + (maxR + 20) * Math.sin(angle),
				name: a.name
			};
		});
	});

	const radarPolygon = $derived(
		radarPoints.map((p) => `${p.x},${p.y}`).join(' ')
	);

	function gridPoints(level: number): string {
		const cx = 150;
		const cy = 150;
		const maxR = 120;
		const n = axes.length;
		const r = (level / 10) * maxR;
		return axes
			.map((_, i) => {
				const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
				return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
			})
			.join(' ');
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ scores }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.scores) {
					for (const a of axes) {
						const val = parseInt(d.scores[a.id], 10);
						if (!isNaN(val) && val >= 0 && val <= 10) {
							scores[a.id] = val;
						}
					}
				}
			}
		} catch {}
	}

	function handleReset() {
		for (const a of axes) {
			scores[a.id] = 5;
		}
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const weak = twoWeakest;
		const lines = [
			'# Évaluation Maturité Équipe',
			'',
			`**Date :** ${today}`,
			`**Moyenne :** ${average}/10 — ${averageLevel.label}`,
			'',
			'## Scores par axe',
			'',
			...axes.map((a) => `- ${a.name} : ${scores[a.id]}/10 — ${getLevel(scores[a.id]).label}`),
			'',
			`**Point fort :** ${strongest.name} (${scores[strongest.id]}/10)`,
			`**Axe de progression :** ${weakest.name} (${scores[weakest.id]}/10)`,
			'',
			'## Pistes de progression',
			'',
			...weak.map((a) => [`### ${a.name}`, '', suggestions[a.id], '']).flat(),
			'---',
			`_Généré avec l'Évaluation Maturité Équipe — ${TOOL_URL}_`
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
	<div class="tool-layout">
		<div class="tool-sliders">
			{#each axes as axis}
				{@const level = getLevel(scores[axis.id])}
				<div class="slider-group">
					<div class="slider-label">
						<span class="slider-name">{axis.name}</span>
						<span class="slider-value-group">
							<span class="slider-value">{scores[axis.id]}/10</span>
							<span class="slider-level" style="color: {level.color}">{level.label}</span>
						</span>
					</div>
					<p class="slider-hint">{axis.description}</p>
					<input
						type="range"
						min="0"
						max="10"
						step="1"
						value={scores[axis.id]}
						class="slider"
						aria-label="{axis.name} : {scores[axis.id]} sur 10 — {level.label}"
						oninput={(e) => {
							scores[axis.id] = parseInt(e.currentTarget.value, 10);
						}}
					/>
				</div>
			{/each}

			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Réinitialiser</button>
			</div>
		</div>

		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Profil de l'équipe</div>

			<div class="radar-container">
				<svg viewBox="0 0 300 300" class="radar-svg" aria-hidden="true">
					<!-- Grid -->
					{#each [2, 4, 6, 8, 10] as level}
						<polygon points={gridPoints(level)} class="radar-grid" />
					{/each}

					<!-- Axes lines -->
					{#each radarPoints as point}
						<line x1="150" y1="150" x2={point.x} y2={point.y} class="radar-axis" />
					{/each}

					<!-- Data polygon -->
					<polygon points={radarPolygon} class="radar-data" />

					<!-- Data points -->
					{#each radarPoints as point}
						<circle cx={point.x} cy={point.y} r="4" class="radar-dot" />
					{/each}

					<!-- Labels -->
					{#each radarPoints as point}
						<text
							x={point.labelX}
							y={point.labelY}
							class="radar-label"
							text-anchor="middle"
							dominant-baseline="central"
						>{point.name}</text>
					{/each}
				</svg>
			</div>

			<div class="result-summary">
				<div class="summary-row">
					<span class="summary-label">Maturité globale</span>
					<span class="summary-value">
						{average}/10
						<span class="summary-level" style="color: {averageLevel.color}">
							{averageLevel.label}
						</span>
					</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Point fort</span>
					<span class="summary-value summary-value--accent">{strongest.name}</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Axe de progression</span>
					<span class="summary-value">{weakest.name}</span>
				</div>
			</div>

			<div class="suggestions">
				<div class="suggestions-title">Pistes de progression</div>
				{#each twoWeakest as axis}
					{@const level = getLevel(scores[axis.id])}
					<div class="suggestion-block">
						<div class="suggestion-axis">
							<span>{axis.name}</span>
							<span class="suggestion-score" style="color: {level.color}">{scores[axis.id]}/10 — {level.label}</span>
						</div>
						<p class="suggestion-text">{suggestions[axis.id]}</p>
					</div>
				{/each}
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
		/* individual */
	}

	.slider-label {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 2px;
	}

	.slider-name {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.slider-value-group {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.slider-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		color: var(--accent);
	}

	.slider-level {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.slider-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 6px 0;
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

	/* Radar */
	.radar-container {
		margin-bottom: var(--content-gap);
	}

	.radar-svg {
		width: 100%;
		max-width: 300px;
		margin: 0 auto;
		display: block;
	}

	.radar-grid {
		fill: none;
		stroke: var(--border);
		stroke-width: 0.5;
	}

	.radar-axis {
		stroke: var(--border);
		stroke-width: 0.5;
	}

	.radar-data {
		fill: var(--accent);
		fill-opacity: 0.15;
		stroke: var(--accent);
		stroke-width: 2;
		transition: all 0.3s ease;
	}

	.radar-dot {
		fill: var(--accent);
		transition: all 0.3s ease;
	}

	:global(.radar-label) {
		font-family: var(--font-ui);
		font-size: 11px;
		fill: var(--secondary);
	}

	/* Summary */
	.result-summary {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: var(--content-gap);
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 4px 0;
	}

	.summary-label {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
	}

	.summary-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.summary-value--accent {
		color: var(--accent);
	}

	.summary-level {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		margin-left: 6px;
	}

	/* Suggestions */
	.suggestions {
		border-top: 1px solid var(--border);
		padding-top: var(--content-gap);
	}

	.suggestions-title {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 12px;
	}

	.suggestion-block {
		margin-bottom: 16px;
	}

	.suggestion-block:last-child {
		margin-bottom: 0;
	}

	.suggestion-axis {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 4px;
	}

	.suggestion-score {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
	}

	.suggestion-text {
		font-size: 13px;
		line-height: 1.6;
		color: var(--secondary);
		margin: 0;
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
		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
