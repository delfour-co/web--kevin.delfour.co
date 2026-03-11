<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-diagnostic-maturite-cto';
	const TOOL_URL = 'https://kevin.delfour.co/outils/diagnostic-maturite-cto/';

	interface MaturityLevel {
		label: string;
		color: string;
	}

	function getAxisMaturity(score: number): MaturityLevel {
		if (score <= 3) return { label: 'Découverte', color: '#f59e0b' };
		if (score <= 6) return { label: 'Structuration', color: 'var(--accent2)' };
		if (score <= 8) return { label: 'Maîtrise', color: 'var(--accent)' };
		return { label: 'Référence', color: 'var(--accent3)' };
	}

	function getOverallMaturity(avg: number): MaturityLevel {
		if (avg <= 3) return { label: 'Phase de découverte', color: '#f59e0b' };
		if (avg <= 5) return { label: 'En construction', color: 'var(--accent2)' };
		if (avg <= 7) return { label: 'Posture solide', color: 'var(--accent)' };
		return { label: 'CTO de référence', color: 'var(--accent3)' };
	}

	const axes = [
		{
			id: 'leadership',
			name: 'Leadership',
			description: 'Capacité à porter une vision, embarquer les équipes, incarner une posture.',
			guidance: "Ce que j'ai observé : le leadership technique se construit rarement par la théorie. Il émerge souvent en prenant des décisions visibles, même imparfaites, et en assumant leurs conséquences devant l'équipe. Un cadre possible : commencer par clarifier ce que l'on attend de soi dans ce rôle, avant de chercher à inspirer."
		},
		{
			id: 'decision',
			name: 'Décision',
			description: 'Qualité des arbitrages techniques, gouvernance, gestion des trade-offs.',
			guidance: "Ce que j'ai observé : les meilleures décisions techniques ne sont pas toujours les plus brillantes. Elles sont souvent celles qui ont été documentées, partagées et réversibles. Un cadre possible : mettre en place un format léger (ADR, RFC) pour rendre les arbitrages traçables, sans alourdir le quotidien."
		},
		{
			id: 'craft',
			name: 'Craft',
			description: 'Maîtrise technique, architecture, qualité du code et des systèmes.',
			guidance: "Avec le recul, la maîtrise technique d'un CTO ne se mesure pas au nombre de lignes écrites. Elle se lit dans la capacité à poser des contraintes d'architecture claires et à reconnaître quand on n'est plus la bonne personne pour coder un module. Un cadre possible : identifier les zones où l'on apporte encore de la valeur technique directe, et déléguer le reste."
		},
		{
			id: 'organisation',
			name: 'Organisation',
			description: 'Structuration des équipes, culture, sécurité psychologique.',
			guidance: "Ce que j'ai observé : la sécurité psychologique ne se décrète pas. Elle se construit par des actes répétés — reconnaître ses erreurs, protéger le droit à l'expérimentation, ne pas sanctionner les mauvaises nouvelles. Un cadre possible : commencer par observer comment les désaccords se règlent dans l'équipe, avant de changer quoi que ce soit."
		},
		{
			id: 'pratiques',
			name: 'Pratiques',
			description: 'Processus de développement, CI/CD, code review, testing.',
			guidance: "Avec le recul, les pratiques de développement les plus durables sont celles que l'équipe s'approprie, pas celles qu'on impose. Un processus adopté à 80 % vaut mieux qu'un processus parfait ignoré. Un cadre possible : partir de ce qui frotte au quotidien (temps de review, flakiness des tests) et traiter un irritant à la fois."
		},
		{
			id: 'parcours',
			name: 'Parcours',
			description: 'Conscience de sa trajectoire, mentorat, apprentissage continu.',
			guidance: "Ce que j'ai observé : les CTO qui durent sont souvent ceux qui ont appris à nommer ce qu'ils ne savent pas, et à chercher des pairs plutôt que des réponses. La trajectoire se clarifie rarement seul. Un cadre possible : trouver un espace d'échange régulier avec d'autres leaders tech, sans enjeu hiérarchique."
		}
	];

	let scores = $state<Record<string, number>>(
		Object.fromEntries(axes.map((a) => [a.id, 5]))
	);

	let copyFeedback = $state(false);

	const average = $derived(
		Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / axes.length) * 10) / 10
	);

	const overallMaturity = $derived(getOverallMaturity(average));

	const strongest = $derived.by(() => {
		let max = 0;
		let name = '';
		for (const a of axes) {
			if (scores[a.id] > max) {
				max = scores[a.id];
				name = a.name;
			}
		}
		return name;
	});

	const weakest = $derived.by(() => {
		let min = 11;
		let name = '';
		for (const a of axes) {
			if (scores[a.id] < min) {
				min = scores[a.id];
				name = a.name;
			}
		}
		return name;
	});

	const weakestTwo = $derived.by(() => {
		const sorted = [...axes].sort((a, b) => scores[a.id] - scores[b.id]);
		return sorted.slice(0, 2);
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
		const overall = getOverallMaturity(average);
		const lines = [
			'# Diagnostic Maturité CTO',
			'',
			`**Date :** ${today}`,
			`**Moyenne :** ${average}/10`,
			`**Niveau global :** ${overall.label}`,
			'',
			'## Scores par axe',
			'',
			...axes.map((a) => {
				const m = getAxisMaturity(scores[a.id]);
				return `- ${a.name} : ${scores[a.id]}/10 — _${m.label}_`;
			}),
			'',
			`**Point fort :** ${strongest}`,
			`**Axe de progression :** ${weakest}`,
			'',
			'## Pistes de réflexion',
			'',
			...weakestTwo.flatMap((a) => [
				`### ${a.name} (${scores[a.id]}/10 — ${getAxisMaturity(scores[a.id]).label})`,
				'',
				a.guidance,
				''
			]),
			'---',
			`_Généré avec le Diagnostic Maturité CTO — ${TOOL_URL}_`
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
				{@const maturity = getAxisMaturity(scores[axis.id])}
				<div class="slider-group">
					<div class="slider-label">
						<span class="slider-name">{axis.name}</span>
						<span class="slider-meta">
							<span class="maturity-badge" style="color: {maturity.color}; border-color: {maturity.color}">{maturity.label}</span>
							<span class="slider-value">{scores[axis.id]}/10</span>
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
						aria-label="{axis.name} : {scores[axis.id]} sur 10 — {maturity.label}"
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
			<div class="result-title">Profil</div>

			<div class="overall-maturity" style="border-color: {overallMaturity.color}">
				<span class="overall-maturity-label">Niveau global</span>
				<span class="overall-maturity-value" style="color: {overallMaturity.color}">{overallMaturity.label}</span>
				<span class="overall-maturity-score">{average}/10</span>
			</div>

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
					<span class="summary-label">Point fort</span>
					<span class="summary-value summary-value--accent">{strongest}</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Axe de progression</span>
					<span class="summary-value">{weakest}</span>
				</div>
			</div>

			<div class="guidance-section">
				<div class="guidance-title">Pistes de réflexion</div>
				{#each weakestTwo as axis}
					{@const maturity = getAxisMaturity(scores[axis.id])}
					<div class="guidance-card">
						<div class="guidance-card-header">
							<span class="guidance-axis-name">{axis.name}</span>
							<span class="guidance-axis-level" style="color: {maturity.color}">{scores[axis.id]}/10 — {maturity.label}</span>
						</div>
						<p class="guidance-text">{axis.guidance}</p>
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

	.slider-meta {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.maturity-badge {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		padding: 1px 8px;
		border: 1px solid;
		border-radius: 12px;
		white-space: nowrap;
		transition: color 0.3s ease, border-color 0.3s ease;
	}

	.slider-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		color: var(--accent);
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

	/* Overall maturity */
	.overall-maturity {
		text-align: center;
		padding: 16px;
		border: 1px solid;
		border-radius: var(--radius);
		margin-bottom: var(--content-gap);
		background: rgba(0, 0, 0, 0.2);
		transition: border-color 0.3s ease;
	}

	.overall-maturity-label {
		display: block;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.overall-maturity-value {
		display: block;
		font-family: var(--font-heading);
		font-size: 22px;
		font-weight: 700;
		transition: color 0.3s ease;
	}

	.overall-maturity-score {
		display: block;
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--secondary);
		margin-top: 2px;
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

	/* Guidance */
	.guidance-section {
		margin-top: var(--content-gap);
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.guidance-title {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 12px;
	}

	.guidance-card {
		padding: 12px;
		border-radius: var(--radius);
		background: rgba(0, 0, 0, 0.15);
		margin-bottom: 10px;
	}

	.guidance-card:last-child {
		margin-bottom: 0;
	}

	.guidance-card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
	}

	.guidance-axis-name {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.guidance-axis-level {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.guidance-text {
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

		.guidance-card-header {
			flex-direction: column;
			gap: 2px;
		}
	}
</style>
