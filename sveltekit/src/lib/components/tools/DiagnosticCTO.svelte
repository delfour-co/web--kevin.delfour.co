<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-diagnostic-maturite-cto';
	const TOOL_URL = 'https://kevin.delfour.co/outils/diagnostic-maturite-cto/';

	const axes = [
		{
			id: 'leadership',
			name: 'Leadership',
			description: 'Capacité à porter une vision, embarquer les équipes, incarner une posture.'
		},
		{
			id: 'decision',
			name: 'Décision',
			description: 'Qualité des arbitrages techniques, gouvernance, gestion des trade-offs.'
		},
		{
			id: 'craft',
			name: 'Craft',
			description: 'Maîtrise technique, architecture, qualité du code et des systèmes.'
		},
		{
			id: 'organisation',
			name: 'Organisation',
			description: 'Structuration des équipes, culture, sécurité psychologique.'
		},
		{
			id: 'pratiques',
			name: 'Pratiques',
			description: 'Processus de développement, CI/CD, code review, testing.'
		},
		{
			id: 'parcours',
			name: 'Parcours',
			description: 'Conscience de sa trajectoire, mentorat, apprentissage continu.'
		}
	];

	let scores = $state<Record<string, number>>(
		Object.fromEntries(axes.map((a) => [a.id, 5]))
	);

	let copyFeedback = $state(false);

	const average = $derived(
		Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / axes.length) * 10) / 10
	);

	const strongest = $derived(() => {
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

	const weakest = $derived(() => {
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

	// Radar chart SVG computation
	const radarPoints = $derived(() => {
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
		radarPoints().map((p) => `${p.x},${p.y}`).join(' ')
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
		const lines = [
			'# Diagnostic Maturité CTO',
			'',
			`**Date :** ${today}`,
			`**Moyenne :** ${average}/10`,
			'',
			'## Scores par axe',
			'',
			...axes.map((a) => `- ${a.name} : ${scores[a.id]}/10`),
			'',
			`**Point fort :** ${strongest()}`,
			`**Axe de progression :** ${weakest()}`,
			'',
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
				<div class="slider-group">
					<div class="slider-label">
						<span class="slider-name">{axis.name}</span>
						<span class="slider-value">{scores[axis.id]}/10</span>
					</div>
					<p class="slider-hint">{axis.description}</p>
					<input
						type="range"
						min="0"
						max="10"
						step="1"
						value={scores[axis.id]}
						class="slider"
						aria-label="{axis.name} : {scores[axis.id]} sur 10"
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

			<div class="radar-container">
				<svg viewBox="0 0 300 300" class="radar-svg" aria-hidden="true">
					<!-- Grid -->
					{#each [2, 4, 6, 8, 10] as level}
						<polygon points={gridPoints(level)} class="radar-grid" />
					{/each}

					<!-- Axes lines -->
					{#each radarPoints() as point}
						<line x1="150" y1="150" x2={point.x} y2={point.y} class="radar-axis" />
					{/each}

					<!-- Data polygon -->
					<polygon points={radarPolygon} class="radar-data" />

					<!-- Data points -->
					{#each radarPoints() as point}
						<circle cx={point.x} cy={point.y} r="4" class="radar-dot" />
					{/each}

					<!-- Labels -->
					{#each radarPoints() as point}
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
					<span class="summary-label">Moyenne</span>
					<span class="summary-value">{average}/10</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Point fort</span>
					<span class="summary-value summary-value--accent">{strongest()}</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Axe de progression</span>
					<span class="summary-value">{weakest()}</span>
				</div>
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
