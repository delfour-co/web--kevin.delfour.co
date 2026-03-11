<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-maturite-dev-lead';
	const TOOL_URL = 'https://kevin.delfour.co/outils/maturite-dev-lead/';

	const ancienneteOptions = [
		{ value: 'moins-1', label: 'Moins d\u20191 an' },
		{ value: '1-2', label: '1-2 ans' },
		{ value: '2-4', label: '2-4 ans' },
		{ value: '4-plus', label: '4+ ans' }
	];

	const contexteOptions = [
		{ value: 'initiative', label: 'Initiative personnelle' },
		{ value: 'besoin', label: 'Besoin de l\u2019organisation' },
		{ value: 'succession', label: 'Succession planifi\u00e9e' },
		{ value: 'croissance', label: 'Croissance naturelle' }
	];

	const axes = [
		{
			id: 'technique',
			name: 'Excellence technique',
			description: 'Ma\u00eetrise du craft, qualit\u00e9 du code, architecture.',
			hint: 'Un lead qui ne code plus cr\u00e9diblement perd le respect technique.'
		},
		{
			id: 'mentorat',
			name: 'Mentorat',
			description: 'Capacit\u00e9 \u00e0 accompagner, transmettre, donner du feedback constructif.',
			hint: 'Le mentorat ne s\u2019improvise pas. Observer comment la personne fait des code reviews est un bon indicateur.'
		},
		{
			id: 'communication',
			name: 'Communication',
			description: 'Clart\u00e9, \u00e9coute, capacit\u00e9 \u00e0 vulgariser et \u00e0 porter un message.',
			hint: 'Un lead passe plus de temps \u00e0 communiquer qu\u2019\u00e0 coder. C\u2019est un changement de posture majeur.'
		},
		{
			id: 'vision',
			name: 'Vision produit',
			description: 'Compr\u00e9hension du m\u00e9tier, des utilisateurs, du pourquoi derri\u00e8re le code.',
			hint: 'Sans vision produit, un lead optimise des choses qui n\u2019ont pas d\u2019importance.'
		},
		{
			id: 'complexite',
			name: 'Gestion de la complexit\u00e9',
			description: 'Arbitrage, priorisation, capacit\u00e9 \u00e0 simplifier.',
			hint: 'Ce que j\u2019observe souvent : les meilleurs leads sont ceux qui savent dire non et simplifier.'
		},
		{
			id: 'resilience',
			name: 'R\u00e9silience',
			description: 'Gestion du stress, des conflits, de l\u2019ambigu\u00eft\u00e9.',
			hint: 'Le r\u00f4le de lead expose \u00e0 des tensions que le r\u00f4le de dev prot\u00e8ge. C\u2019est \u00e0 \u00e9valuer s\u00e9rieusement.'
		},
		{
			id: 'influence',
			name: 'Influence sans autorit\u00e9',
			description: 'Capacit\u00e9 \u00e0 convaincre, f\u00e9d\u00e9rer, entra\u00eener sans lien hi\u00e9rarchique.',
			hint: 'Un lead n\u2019a souvent pas d\u2019autorit\u00e9 formelle. Son influence repose sur la confiance et la comp\u00e9tence.'
		},
		{
			id: 'ownership',
			name: 'Ownership',
			description: 'Prise de responsabilit\u00e9, initiative, accountability.',
			hint: 'Observer qui prend naturellement la responsabilit\u00e9 quand \u00e7a va mal. C\u2019est souvent un futur lead.'
		}
	];

	interface MaturityLevel {
		label: string;
		color: string;
	}

	function getMaturityLevel(avg: number): MaturityLevel {
		if (avg < 2.0) return { label: 'Trop t\u00f4t', color: '#ef4444' };
		if (avg < 3.0) return { label: 'En construction', color: '#f59e0b' };
		if (avg < 3.8) return { label: 'Potentiel identifi\u00e9', color: '#8b5cf6' };
		return { label: 'Pr\u00eat pour la transition', color: '#06b6d4' };
	}

	function getRecommendation(level: MaturityLevel, contexte: string): string {
		const contexteLabel = contexteOptions.find((c) => c.value === contexte)?.label ?? contexte;

		if (level.label === 'Trop t\u00f4t') {
			return `Dans le contexte actuel (${contexteLabel.toLowerCase()}), la transition vers un r\u00f4le de lead semble pr\u00e9matur\u00e9e. Ce n\u2019est pas un jugement sur la personne \u2014 c\u2019est une question de timing. Plusieurs axes fondamentaux n\u00e9cessitent un renforcement significatif avant d\u2019envisager ce changement de posture.`;
		}
		if (level.label === 'En construction') {
			if (contexte === 'besoin') {
				return `Le besoin organisationnel est l\u00e0, mais le profil est encore en construction. Forcer la transition risque de fragiliser \u00e0 la fois la personne et l\u2019\u00e9quipe. Un accompagnement cibl\u00e9 sur les axes les plus faibles, avec un horizon de 6 \u00e0 12 mois, para\u00eet plus raisonnable.`;
			}
			return `Le profil montre des bases solides mais des axes encore fragiles. Un plan de d\u00e9veloppement cibl\u00e9, avec du mentorat et des mises en situation progressives, permettrait de consolider la posture avant une transition formelle.`;
		}
		if (level.label === 'Potentiel identifi\u00e9') {
			if (contexte === 'croissance') {
				return `La croissance naturelle est visible. Le potentiel est l\u00e0, avec quelques axes \u00e0 renforcer. Une transition progressive \u2014 en confiant d\u2019abord des responsabilit\u00e9s de lead sur un p\u00e9rim\u00e8tre limit\u00e9 \u2014 permettrait de valider la posture en conditions r\u00e9elles.`;
			}
			return `Le potentiel est clairement identifi\u00e9. Les fondamentaux sont en place. Il reste \u00e0 consolider certains axes avant une transition compl\u00e8te, mais des responsabilit\u00e9s progressives de lead peuvent d\u00e9j\u00e0 \u00eatre confi\u00e9es.`;
		}
		if (contexte === 'succession') {
			return `Le profil est pr\u00eat pour la transition. Dans un contexte de succession planifi\u00e9e, c\u2019est le bon moment pour formaliser le passage. Les forces identifi\u00e9es constituent une base solide. Rester attentif aux axes de d\u00e9veloppement restants, sans en faire un bloquant.`;
		}
		return `Le profil est mature pour une transition vers un r\u00f4le de lead. Les comp\u00e9tences cl\u00e9s sont en place. Il est raisonnable d\u2019envisager cette \u00e9volution \u00e0 court terme, en accompagnant les premiers mois pour ancrer la posture.`;
	}

	// State
	let nom = $state('');
	let anciennete = $state('2-4');
	let contexte = $state('croissance');
	let scores = $state<Record<string, number>>(
		Object.fromEntries(axes.map((a) => [a.id, 3]))
	);
	let copyFeedback = $state(false);

	// Derived
	const average = $derived.by(() => {
		const sum = Object.values(scores).reduce((a, b) => a + b, 0);
		return Math.round((sum / axes.length) * 10) / 10;
	});

	const maturityLevel = $derived.by(() => getMaturityLevel(average));

	const sortedAxes = $derived.by(() => {
		return [...axes].sort((a, b) => scores[b.id] - scores[a.id]);
	});

	const topTwo = $derived.by(() => sortedAxes.slice(0, 2));
	const bottomTwo = $derived.by(() => sortedAxes.slice(-2).reverse());

	const recommendation = $derived.by(() => getRecommendation(maturityLevel, contexte));

	// Radar chart SVG computation (8 axes = octagon)
	const radarPoints = $derived.by(() => {
		const cx = 150;
		const cy = 150;
		const maxR = 110;
		const n = axes.length;
		return axes.map((a, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			const r = (scores[a.id] / 5) * maxR;
			return {
				x: cx + r * Math.cos(angle),
				y: cy + r * Math.sin(angle),
				labelX: cx + (maxR + 24) * Math.cos(angle),
				labelY: cy + (maxR + 24) * Math.sin(angle),
				name: a.name
			};
		});
	});

	const radarPolygon = $derived(radarPoints.map((p) => `${p.x},${p.y}`).join(' '));

	const axisEndpoints = $derived.by(() => {
		const cx = 150;
		const cy = 150;
		const maxR = 110;
		const n = axes.length;
		return axes.map((_, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			return {
				x: cx + maxR * Math.cos(angle),
				y: cy + maxR * Math.sin(angle)
			};
		});
	});

	function gridPoints(level: number): string {
		const cx = 150;
		const cy = 150;
		const maxR = 110;
		const n = axes.length;
		const r = (level / 5) * maxR;
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
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ nom, anciennete, contexte, scores })
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.nom !== undefined) nom = d.nom;
				if (d.anciennete) anciennete = d.anciennete;
				if (d.contexte) contexte = d.contexte;
				if (d.scores) {
					for (const a of axes) {
						const val = parseInt(d.scores[a.id], 10);
						if (!isNaN(val) && val >= 1 && val <= 5) {
							scores[a.id] = val;
						}
					}
				}
			}
		} catch {}
	}

	function handleReset() {
		nom = '';
		anciennete = '2-4';
		contexte = 'croissance';
		for (const a of axes) {
			scores[a.id] = 3;
		}
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const level = getMaturityLevel(average);
		const ancienneteLabel =
			ancienneteOptions.find((o) => o.value === anciennete)?.label ?? anciennete;
		const contexteLabel =
			contexteOptions.find((o) => o.value === contexte)?.label ?? contexte;
		const reco = getRecommendation(level, contexte);

		const lines = [
			'# Maturit\u00e9 dev \u2192 lead',
			'',
			`**Date :** ${today}`,
			nom ? `**D\u00e9veloppeur :** ${nom}` : '',
			`**Anciennet\u00e9 :** ${ancienneteLabel}`,
			`**Contexte :** ${contexteLabel}`,
			`**Score global :** ${average}/5`,
			`**Niveau :** ${level.label}`,
			'',
			'## Scores par axe',
			'',
			...axes.map((a) => `- ${a.name} : ${scores[a.id]}/5`),
			'',
			'## Points forts',
			'',
			...topTwo.map((a) => `- **${a.name}** (${scores[a.id]}/5)`),
			'',
			'## Axes de d\u00e9veloppement',
			'',
			...bottomTwo.map((a) => `- **${a.name}** (${scores[a.id]}/5) \u2014 _${a.hint}_`),
			'',
			'## Recommandation',
			'',
			reco,
			'',
			'---',
			`_G\u00e9n\u00e9r\u00e9 avec Maturit\u00e9 dev \u2192 lead \u2014 ${TOOL_URL}_`
		].filter((l) => l !== undefined);

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
		<div class="tool-form">
			<!-- Profil section -->
			<div class="section-title">Profil</div>

			<div class="profil-fields">
				<div class="field-group">
					<label class="field-label" for="mdl-nom">Nom du d\u00e9veloppeur</label>
					<input
						id="mdl-nom"
						type="text"
						class="field-input"
						placeholder="Optionnel"
						bind:value={nom}
					/>
				</div>
				<div class="field-group">
					<label class="field-label" for="mdl-anciennete">Anciennet\u00e9 dans l'\u00e9quipe</label>
					<select id="mdl-anciennete" class="field-select" bind:value={anciennete}>
						{#each ancienneteOptions as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="field-group">
					<label class="field-label" for="mdl-contexte">Contexte</label>
					<select id="mdl-contexte" class="field-select" bind:value={contexte}>
						{#each contexteOptions as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Axes section -->
			<div class="section-title section-title--axes">\u00c9valuation</div>

			{#each axes as axis}
				<div class="slider-group">
					<div class="slider-label">
						<span class="slider-name">{axis.name}</span>
						<span class="slider-value">{scores[axis.id]}/5</span>
					</div>
					<p class="slider-description">{axis.description}</p>
					<input
						type="range"
						min="1"
						max="5"
						step="1"
						value={scores[axis.id]}
						class="slider"
						aria-label="{axis.name} : {scores[axis.id]} sur 5"
						oninput={(e) => {
							scores[axis.id] = parseInt(e.currentTarget.value, 10);
						}}
					/>
					<p class="slider-hint">{axis.hint}</p>
				</div>
			{/each}

			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copi\u00e9 dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>R\u00e9initialiser</button>
			</div>
		</div>

		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">R\u00e9sultats</div>

			<div class="overall-maturity" style="border-color: {maturityLevel.color}">
				<span class="overall-maturity-label">Niveau de maturit\u00e9</span>
				<span class="overall-maturity-value" style="color: {maturityLevel.color}"
					>{maturityLevel.label}</span
				>
				<span class="overall-maturity-score">{average}/5</span>
			</div>

			<div class="radar-container">
				<svg viewBox="0 0 300 300" class="radar-svg" aria-hidden="true">
					<!-- Grid -->
					{#each [1, 2, 3, 4, 5] as level}
						<polygon points={gridPoints(level)} class="radar-grid" />
					{/each}

					<!-- Axis lines -->
					{#each axisEndpoints as ep}
						<line x1="150" y1="150" x2={ep.x} y2={ep.y} class="radar-axis" />
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
							dominant-baseline="central">{point.name}</text
						>
					{/each}
				</svg>
			</div>

			<div class="result-summary">
				<div class="summary-section">
					<div class="summary-section-title">Points forts</div>
					{#each topTwo as axis}
						<div class="summary-row">
							<span class="summary-label">{axis.name}</span>
							<span class="summary-value summary-value--strong">{scores[axis.id]}/5</span>
						</div>
					{/each}
				</div>

				<div class="summary-section">
					<div class="summary-section-title">Axes de d\u00e9veloppement</div>
					{#each bottomTwo as axis}
						<div class="summary-row">
							<span class="summary-label">{axis.name}</span>
							<span class="summary-value summary-value--weak">{scores[axis.id]}/5</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="recommendation">
				<div class="recommendation-title">Recommandation</div>
				<p class="recommendation-text">{recommendation}</p>
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
		gap: var(--content-gap);
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		color: var(--primary);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.section-title--axes {
		margin-top: calc(var(--content-gap) * 0.5);
	}

	/* Profil fields */
	.profil-fields {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.field-label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--secondary);
	}

	.field-input,
	.field-select {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
		background: var(--accent-light);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 8px 12px;
		transition: var(--transition);
		min-height: 40px;
	}

	.field-input:focus,
	.field-select:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-color: var(--accent);
	}

	.field-input::placeholder {
		color: var(--tertiary);
	}

	.field-select {
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		padding-right: 32px;
	}

	/* Sliders */
	.slider-group {
		padding-bottom: 4px;
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

	.slider-description {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 6px 0;
	}

	.slider-hint {
		font-size: 11px;
		color: var(--tertiary);
		margin: 6px 0 0 0;
		font-style: italic;
		line-height: 1.5;
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
		font-size: 9px;
		fill: var(--secondary);
	}

	/* Summary */
	.result-summary {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
		margin-bottom: var(--content-gap);
	}

	.summary-section {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.summary-section-title {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 2px 0;
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
	}

	.summary-value--strong {
		color: var(--accent);
	}

	.summary-value--weak {
		color: var(--secondary);
	}

	/* Recommendation */
	.recommendation {
		border-top: 1px solid var(--border);
		padding-top: var(--content-gap);
	}

	.recommendation-title {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 8px;
	}

	.recommendation-text {
		font-size: 13px;
		line-height: 1.7;
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
