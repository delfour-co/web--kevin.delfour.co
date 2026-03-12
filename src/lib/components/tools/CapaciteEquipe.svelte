<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-capacite-equipe';
	const TOOL_URL = 'https://kevin.delfour.co/outils/calculateur-capacite-equipe/';

	// --- Inputs ---
	let teamSize = $state(5);
	let sprintDays = $state(10);
	let hoursPerDay = $state(8);
	let velocityPerPersonDay = $state(5);

	// --- Deductions (percentages) ---
	interface Deduction {
		id: string;
		label: string;
		description: string;
		value: number;
	}

	let deductions = $state<Deduction[]>([
		{
			id: 'ceremonies',
			label: 'Cérémonies agiles',
			description: 'Daily, rétro, planning, review',
			value: 10
		},
		{
			id: 'support',
			label: 'Support et incidents',
			description: 'Tickets, astreintes, bugs urgents',
			value: 10
		},
		{
			id: 'absences',
			label: 'Congés et absences',
			description: 'RTT, maladie, enfants malades',
			value: 5
		},
		{
			id: 'meetings',
			label: 'Réunions hors sprint',
			description: 'Synchros transverses, comités',
			value: 10
		},
		{
			id: 'onboarding',
			label: 'Intégration et montée en compétence',
			description: 'Formation, programmation en binôme, mentorat',
			value: 5
		},
		{
			id: 'slack',
			label: 'Temps libre / exploration',
			description: 'Veille, prototypage, dette exploratoire',
			value: 5
		}
	]);

	let copyFeedback = $state(false);

	// --- Computed results ---
	let totalDeductionPct = $derived(
		deductions.reduce((sum, d) => sum + d.value, 0)
	);

	let theoreticalHours = $derived(teamSize * sprintDays * hoursPerDay);

	let realHours = $derived(
		Math.max(0, Math.round(theoreticalHours * (1 - totalDeductionPct / 100)))
	);

	let realPct = $derived(
		theoreticalHours > 0 ? Math.round((realHours / theoreticalHours) * 100) : 0
	);

	let estimatedStoryPoints = $derived(
		Math.round(teamSize * sprintDays * velocityPerPersonDay * (1 - totalDeductionPct / 100))
	);

	let effectiveManDays = $derived(
		+(realHours / hoursPerDay).toFixed(1)
	);

	let isWarning = $derived(realPct < 50);

	// --- Deduction breakdown for stacked bar ---
	let deductionSegments = $derived(
		deductions.map((d) => ({
			...d,
			pctOfTotal: theoreticalHours > 0
				? (theoreticalHours * d.value / 100) / theoreticalHours * 100
				: 0
		}))
	);

	// --- Persistence ---
	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					teamSize,
					sprintDays,
					hoursPerDay,
					velocityPerPersonDay,
					deductions: deductions.map((d) => ({ id: d.id, value: d.value }))
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
			const data = JSON.parse(saved);
			if (typeof data.teamSize === 'number') teamSize = Math.min(50, Math.max(1, data.teamSize));
			if (typeof data.sprintDays === 'number') sprintDays = Math.max(1, data.sprintDays);
			if (typeof data.hoursPerDay === 'number') hoursPerDay = Math.max(1, data.hoursPerDay);
			if (typeof data.velocityPerPersonDay === 'number') velocityPerPersonDay = Math.max(0, data.velocityPerPersonDay);
			if (Array.isArray(data.deductions)) {
				for (const saved of data.deductions) {
					const found = deductions.find((d) => d.id === saved.id);
					if (found && typeof saved.value === 'number') {
						found.value = Math.min(100, Math.max(0, saved.value));
					}
				}
			}
		} catch {
			// ignore
		}
	}

	function handleReset() {
		teamSize = 5;
		sprintDays = 10;
		hoursPerDay = 8;
		velocityPerPersonDay = 5;
		deductions[0].value = 10;
		deductions[1].value = 10;
		deductions[2].value = 5;
		deductions[3].value = 10;
		deductions[4].value = 5;
		deductions[5].value = 5;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];

		const lines = [
			'# Capacité équipe — Itération',
			'',
			`**Date :** ${today}`,
			'',
			'## Paramètres',
			'',
			`- Taille de l\'équipe : ${teamSize}`,
			`- Durée du sprint : ${sprintDays} jours`,
			`- Heures par jour : ${hoursPerDay}h`,
			`- Vélocité moyenne : ${velocityPerPersonDay} SP / personne / jour`,
			'',
			'## Déductions',
			'',
			...deductions.map((d) => `- ${d.label} : ${d.value}%`),
			`- **Total des déductions : ${totalDeductionPct}%**`,
			'',
			'## Résultats',
			'',
			`- Capacité théorique : ${theoreticalHours}h`,
			`- Capacité réelle : ${realHours}h (${realPct}% de la capacité théorique)`,
			`- Story points estimés : ${estimatedStoryPoints} SP`,
			`- Jours-homme effectifs : ${effectiveManDays}j`,
			''
		];

		if (isWarning) {
			lines.push(
				'> La charge non-productive dépasse la moitié du temps disponible. C\'est un signal à investiguer.',
				''
			);
		}

		lines.push(
			'---',
			`_Généré avec le Calculateur capacité équipe — ${TOOL_URL}_`
		);

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
		// Track all reactive state for auto-save
		teamSize; sprintDays; hoursPerDay; velocityPerPersonDay;
		deductions.forEach((d) => d.value);
		save();
	});

	onMount(() => {
		load();
	});

	const segmentColors = [
		'#06b6d4', // cyan
		'#8b5cf6', // violet
		'#ec4899', // pink
		'#f59e0b', // amber
		'#10b981', // emerald
		'#6366f1'  // indigo
	];
</script>

<div class="tool-container">
	<div class="tool-layout">
		<!-- Left: inputs -->
		<div class="tool-inputs">
			<!-- Team parameters -->
			<fieldset class="glass-card">
				<legend>Paramètres de l'équipe</legend>

				<div class="input-group">
					<label for="team-size">Taille de l'équipe</label>
					<div class="input-row">
						<input
							id="team-size"
							type="number"
							min="1"
							max="50"
							bind:value={teamSize}
						/>
						<span class="input-unit">personnes</span>
					</div>
				</div>

				<div class="input-group">
					<label for="sprint-days" title="Un sprint (ou itération) est une période de travail à durée fixe, souvent 1 à 3 semaines">Durée de l’itération (sprint)</label>
					<div class="input-row">
						<input
							id="sprint-days"
							type="number"
							min="1"
							max="30"
							bind:value={sprintDays}
						/>
						<span class="input-unit">jours</span>
					</div>
				</div>

				<div class="input-group">
					<label for="hours-day">Heures par jour</label>
					<div class="input-row">
						<input
							id="hours-day"
							type="number"
							min="1"
							max="12"
							bind:value={hoursPerDay}
						/>
						<span class="input-unit">heures</span>
					</div>
				</div>

				<div class="input-group">
					<label for="velocity" title="La vélocité mesure le rythme de livraison moyen de l’équipe">Vélocité (rythme de livraison)</label>
					<div class="input-row">
						<input
							id="velocity"
							type="number"
							min="0"
							max="20"
							step="0.5"
							bind:value={velocityPerPersonDay}
						/>
						<span class="input-unit" title="Points d’effort : une unité relative pour estimer la complexité des tâches">points / personne / jour</span>
					</div>
				</div>
			</fieldset>

			<!-- Deductions -->
			<fieldset class="glass-card">
				<legend>Déductions (% du temps)</legend>
				<p class="form-hint">Ajuste chaque curseur selon la réalité observée dans ton équipe.</p>

				{#each deductions as deduction, i}
					<div class="slider-group">
						<div class="slider-label">
							<div class="slider-info">
								<span class="slider-name">{deduction.label}</span>
								<span class="slider-desc">{deduction.description}</span>
							</div>
							<span class="slider-value" style="color: {segmentColors[i]}">{deduction.value}%</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							step="1"
							bind:value={deduction.value}
							class="slider"
							style="--slider-color: {segmentColors[i]}"
							aria-label="{deduction.label} ({deduction.value}%)"
						/>
					</div>
				{/each}

				<div class="deduction-total" class:deduction-total--warning={totalDeductionPct > 80}>
					Total des déductions : <strong>{totalDeductionPct}%</strong>
				</div>
			</fieldset>

			<!-- Actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Copier le bilan (format texte)'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Réinitialiser
				</button>
			</div>
		</div>

		<!-- Right: results (sticky) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Résultats</div>

			<!-- Key metrics -->
			<div class="metrics-grid">
				<div class="metric-card">
					<span class="metric-label">Capacité théorique</span>
					<span class="metric-value">{theoreticalHours}<span class="metric-unit">h</span></span>
				</div>
				<div class="metric-card metric-card--accent">
					<span class="metric-label">Capacité réelle</span>
					<span class="metric-value">{realHours}<span class="metric-unit">h</span></span>
					<span class="metric-pct">{realPct}% du théorique</span>
				</div>
				<div class="metric-card">
					<span class="metric-label" title="Les points d’effort estiment la complexité relative des tâches, pas le temps exact">Points d’effort estimés</span>
					<span class="metric-value">{estimatedStoryPoints}<span class="metric-unit">pts</span></span>
				</div>
				<div class="metric-card">
					<span class="metric-label">Jours-homme effectifs</span>
					<span class="metric-value">{effectiveManDays}<span class="metric-unit">j</span></span>
				</div>
			</div>

			<!-- Stacked bar -->
			<div class="stacked-bar-section">
				<div class="stacked-bar-labels">
					<span>Théorique : {theoreticalHours}h</span>
					<span>Réel : {realHours}h</span>
				</div>
				<div class="stacked-bar-track">
					{#each deductionSegments as seg, i}
						{#if seg.value > 0}
							<div
								class="stacked-bar-segment"
								style="width: {seg.pctOfTotal}%; background: {segmentColors[i]}"
								title="{seg.label} : {seg.value}%"
							></div>
						{/if}
					{/each}
					<div
						class="stacked-bar-real"
						style="width: {realPct}%"
						title="Temps productif : {realPct}%"
					></div>
				</div>
				<div class="stacked-bar-legend">
					{#each deductionSegments as seg, i}
						{#if seg.value > 0}
							<div class="legend-item">
								<span class="legend-dot" style="background: {segmentColors[i]}"></span>
								<span class="legend-text">{seg.label} ({seg.value}%)</span>
							</div>
						{/if}
					{/each}
					<div class="legend-item">
						<span class="legend-dot legend-dot--real"></span>
						<span class="legend-text">Temps productif ({realPct}%)</span>
					</div>
				</div>
			</div>

			<!-- Warning -->
			{#if isWarning}
				<div class="result-warning">
					La charge non-productive dépasse la moitié du temps disponible. C'est un signal à investiguer.
				</div>
			{/if}

			<div class="result-note">
				Un repère possible pour dimensionner un sprint. Les chiffres réels dépendent du contexte de chaque équipe.
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

	.tool-inputs {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	/* Glass card */
	.glass-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius);
		padding: var(--gap);
		margin: 0;
	}

	.glass-card legend {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		padding: 0 8px;
	}

	/* Input groups */
	.input-group {
		margin-bottom: 16px;
	}

	.input-group:last-of-type {
		margin-bottom: 0;
	}

	.input-group label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 500;
		color: var(--secondary);
		display: block;
		margin-bottom: 4px;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.input-row input[type='number'] {
		font-family: var(--font-body);
		font-size: 15px;
		padding: 8px 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius);
		background: rgba(255, 255, 255, 0.05);
		color: var(--primary);
		width: 100px;
		transition: var(--transition);
	}

	.input-row input[type='number']:focus {
		outline: 2px solid #06b6d4;
		outline-offset: 1px;
		border-color: #06b6d4;
	}

	.input-unit {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	/* Slider groups */
	.form-hint {
		font-size: 13px;
		color: var(--secondary);
		margin: 0 0 12px 0;
		font-style: italic;
	}

	.slider-group {
		margin-bottom: 16px;
	}

	.slider-group:last-of-type {
		margin-bottom: 12px;
	}

	.slider-label {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 6px;
	}

	.slider-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.slider-name {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	.slider-desc {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
	}

	.slider-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		flex-shrink: 0;
		margin-left: 12px;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.08);
		cursor: pointer;
		transition: var(--transition);
	}

	.slider:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.slider:focus-visible {
		outline: 2px solid #06b6d4;
		outline-offset: 4px;
	}

	.slider:focus:not(:focus-visible) {
		outline: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--slider-color, #06b6d4);
		border: 2px solid rgba(0, 0, 0, 0.3);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: var(--transition);
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
	}

	.slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--slider-color, #06b6d4);
		border: 2px solid rgba(0, 0, 0, 0.3);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}

	.slider::-moz-range-track {
		height: 6px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.08);
	}

	/* Deduction total */
	.deduction-total {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		padding-top: 8px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.deduction-total strong {
		color: var(--primary);
	}

	.deduction-total--warning strong {
		color: #ec4899;
	}

	/* Result panel */
	.tool-result {
		padding: var(--gap);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
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

	/* Metrics grid */
	.metrics-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: var(--content-gap);
	}

	.metric-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: var(--radius);
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.metric-card--accent {
		border-color: rgba(6, 182, 212, 0.3);
		background: rgba(6, 182, 212, 0.05);
	}

	.metric-label {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 500;
		color: var(--secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.metric-value {
		font-family: var(--font-mono);
		font-size: 24px;
		font-weight: 700;
		color: var(--primary);
		line-height: 1;
	}

	.metric-unit {
		font-size: 14px;
		font-weight: 400;
		color: var(--secondary);
		margin-left: 2px;
	}

	.metric-pct {
		font-family: var(--font-ui);
		font-size: 12px;
		color: #06b6d4;
		font-weight: 500;
	}

	/* Stacked bar */
	.stacked-bar-section {
		margin-bottom: var(--content-gap);
	}

	.stacked-bar-labels {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		margin-bottom: 6px;
	}

	.stacked-bar-track {
		height: 32px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: row-reverse;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.stacked-bar-segment {
		height: 100%;
		opacity: 0.7;
		transition: width 0.3s ease;
		min-width: 1px;
	}

	.stacked-bar-real {
		height: 100%;
		background: rgba(255, 255, 255, 0.15);
		transition: width 0.3s ease;
		flex-shrink: 0;
	}

	.stacked-bar-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 16px;
		margin-top: 8px;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.legend-dot--real {
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.legend-text {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
	}

	/* Warning */
	.result-warning {
		background: rgba(236, 72, 153, 0.08);
		border: 1px solid rgba(236, 72, 153, 0.2);
		border-radius: var(--radius);
		padding: 12px;
		font-size: 14px;
		line-height: 1.6;
		color: #ec4899;
		margin-bottom: var(--content-gap);
	}

	.result-note {
		font-size: 13px;
		line-height: 1.5;
		color: var(--secondary);
		font-style: italic;
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
		background: #06b6d4;
		color: #fff;
	}

	.tool-btn--primary:hover {
		background: #0891b2;
	}

	.tool-btn--secondary {
		background: transparent;
		color: var(--secondary);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.tool-btn--secondary:hover {
		border-color: rgba(255, 255, 255, 0.2);
		color: var(--primary);
	}

	@media (max-width: 768px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
		}

		.metrics-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.metrics-grid {
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
