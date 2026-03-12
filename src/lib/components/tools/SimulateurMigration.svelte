<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-simulateur-migration';
	const TOOL_URL = 'https://kevin.delfour.co/outils/simulateur-migration/';

	const STRATEGIES = ['Big bang', 'Progressive', 'Strangler fig', 'Blue-green'] as const;
	const PROBABILITIES = ['Faible', 'Moyenne', 'Forte'] as const;
	const IMPACTS = ['Faible', 'Moyen', 'Fort'] as const;

	type Strategy = (typeof STRATEGIES)[number];
	type Probability = (typeof PROBABILITIES)[number];
	type Impact = (typeof IMPACTS)[number];

	interface Phase {
		id: string;
		nom: string;
		duree: number;
		strategie: Strategy;
		featureFlags: boolean;
		rollback: boolean;
	}

	interface Risk {
		id: string;
		description: string;
		probabilite: Probability;
		impact: Impact;
		mitigation: string;
	}

	interface ChecklistItem {
		id: string;
		label: string;
		checked: boolean;
	}

	// --- State ---
	let titre = $state('');
	let systemeSource = $state('');
	let systemeCible = $state('');
	let dateDebut = $state(new Date().toISOString().split('T')[0]);

	let phases = $state<Phase[]>([
		{ id: genId(), nom: '', duree: 5, strategie: 'Progressive', featureFlags: false, rollback: true }
	]);

	let risks = $state<Risk[]>([
		{ id: genId(), description: '', probabilite: 'Moyenne', impact: 'Moyen', mitigation: '' }
	]);

	let checklist = $state<ChecklistItem[]>([
		{ id: 'chk-1', label: 'Tests de verification prets', checked: false },
		{ id: 'chk-2', label: 'Procedure de retour arriere documentee', checked: false },
		{ id: 'chk-3', label: 'Equipe informee du plan', checked: false },
		{ id: 'chk-4', label: 'Surveillance et alertes en place', checked: false },
		{ id: 'chk-5', label: 'Sauvegarde des donnees faite', checked: false },
		{ id: 'chk-6', label: 'Activations progressives configurees', checked: false },
		{ id: 'chk-7', label: 'Environnement de pre-production valide', checked: false }
	]);

	let copyFeedback = $state(false);

	function genId(): string {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
	}

	// --- Phases ---
	function addPhase() {
		phases.push({
			id: genId(),
			nom: '',
			duree: 5,
			strategie: 'Progressive',
			featureFlags: false,
			rollback: true
		});
	}

	function removePhase(index: number) {
		if (phases.length > 1) {
			phases.splice(index, 1);
		}
	}

	// --- Risks ---
	function addRisk() {
		risks.push({
			id: genId(),
			description: '',
			probabilite: 'Moyenne',
			impact: 'Moyen',
			mitigation: ''
		});
	}

	function removeRisk(index: number) {
		risks.splice(index, 1);
	}

	// --- Derived values ---
	const totalDays = $derived(phases.reduce((sum, p) => sum + (p.duree || 0), 0));

	const readinessScore = $derived(
		checklist.length > 0
			? Math.round((checklist.filter((c) => c.checked).length / checklist.length) * 100)
			: 0
	);

	const goNoGo = $derived<{ label: string; color: string; level: string }>(
		readinessScore >= 80
			? { label: 'Go', color: '#22c55e', level: 'green' }
			: readinessScore >= 50
				? { label: 'Attention', color: '#f59e0b', level: 'orange' }
				: { label: 'No-go', color: '#ec4899', level: 'red' }
	);

	// Risk matrix: 3x3 grid [probability][impact] -> count
	const riskMatrix = $derived.by(() => {
		const matrix: number[][] = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];
		const probIdx: Record<Probability, number> = { Faible: 0, Moyenne: 1, Forte: 2 };
		const impactIdx: Record<Impact, number> = { Faible: 0, Moyen: 1, Fort: 2 };
		for (const r of risks) {
			if (r.description.trim()) {
				matrix[probIdx[r.probabilite]][impactIdx[r.impact]]++;
			}
		}
		return matrix;
	});

	// Timeline: cumulative start days for each phase
	const timeline = $derived.by(() => {
		let offset = 0;
		return phases.map((p) => {
			const start = offset;
			offset += p.duree || 0;
			return { ...p, start, end: offset };
		});
	});

	// --- Persistence ---
	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ titre, systemeSource, systemeCible, dateDebut, phases, risks, checklist })
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.titre) titre = d.titre;
				if (d.systemeSource) systemeSource = d.systemeSource;
				if (d.systemeCible) systemeCible = d.systemeCible;
				if (d.dateDebut) dateDebut = d.dateDebut;
				if (Array.isArray(d.phases) && d.phases.length >= 1) phases = d.phases;
				if (Array.isArray(d.risks)) risks = d.risks;
				if (Array.isArray(d.checklist) && d.checklist.length === 7) checklist = d.checklist;
			}
		} catch {}
	}

	function handleReset() {
		titre = '';
		systemeSource = '';
		systemeCible = '';
		dateDebut = new Date().toISOString().split('T')[0];
		phases = [
			{ id: genId(), nom: '', duree: 5, strategie: 'Progressive', featureFlags: false, rollback: true }
		];
		risks = [
			{ id: genId(), description: '', probabilite: 'Moyenne', impact: 'Moyen', mitigation: '' }
		];
		checklist = [
			{ id: 'chk-1', label: 'Tests de verification prets', checked: false },
			{ id: 'chk-2', label: 'Procedure de retour arriere documentee', checked: false },
			{ id: 'chk-3', label: 'Equipe informee du plan', checked: false },
			{ id: 'chk-4', label: 'Surveillance et alertes en place', checked: false },
			{ id: 'chk-5', label: 'Sauvegarde des donnees faite', checked: false },
			{ id: 'chk-6', label: 'Activations progressives configurees', checked: false },
			{ id: 'chk-7', label: 'Environnement de pre-production valide', checked: false }
		];
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	// --- Markdown export ---
	function generateMarkdown(): string {
		const lines: string[] = [
			`# Plan de migration : ${titre || 'Sans titre'}`,
			'',
			`**Système source :** ${systemeSource || '_Non renseigné_'}`,
			`**Système cible :** ${systemeCible || '_Non renseigné_'}`,
			`**Date de début prévue :** ${dateDebut}`,
			`**Durée totale estimée :** ${totalDays} jours`,
			''
		];

		// Phases
		lines.push('## Phases', '');
		for (let i = 0; i < phases.length; i++) {
			const p = phases[i];
			lines.push(`### Phase ${i + 1} : ${p.nom || 'Sans nom'}`);
			lines.push(`- **Durée estimée :** ${p.duree} jours`);
			lines.push(`- **Stratégie :** ${p.strategie}`);
			lines.push(`- **Feature flags requis :** ${p.featureFlags ? 'Oui' : 'Non'}`);
			lines.push(`- **Rollback possible :** ${p.rollback ? 'Oui' : 'Non'}`);
			lines.push('');
		}

		// Risks
		const filledRisks = risks.filter((r) => r.description.trim());
		if (filledRisks.length > 0) {
			lines.push('## Risques identifiés', '');
			lines.push('| Risque | Probabilité | Impact | Mitigation |');
			lines.push('| --- | --- | --- | --- |');
			for (const r of filledRisks) {
				lines.push(`| ${r.description} | ${r.probabilite} | ${r.impact} | ${r.mitigation || '—'} |`);
			}
			lines.push('');
		}

		// Checklist
		lines.push('## Checklist pre-migration', '');
		for (const c of checklist) {
			lines.push(`- [${c.checked ? 'x' : ' '}] ${c.label}`);
		}
		lines.push('');
		lines.push(`**Readiness :** ${readinessScore}% — ${goNoGo.label}`);

		lines.push('', '---', `_Généré avec le Simulateur de migration — ${TOOL_URL}_`);

		return lines.join('\n');
	}

	async function handleExport() {
		const md = generateMarkdown();
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

	// --- Risk color helpers ---
	function probColor(p: Probability): string {
		if (p === 'Forte') return '#ec4899';
		if (p === 'Moyenne') return '#f59e0b';
		return '#06b6d4';
	}

	function impactColor(i: Impact): string {
		if (i === 'Fort') return '#ec4899';
		if (i === 'Moyen') return '#f59e0b';
		return '#22c55e';
	}

	function matrixCellColor(prob: number, impact: number): string {
		const severity = prob + impact; // 0-4
		if (severity >= 3) return 'rgba(236, 72, 153, 0.25)';
		if (severity >= 2) return 'rgba(245, 158, 11, 0.2)';
		return 'rgba(6, 182, 212, 0.12)';
	}

	// Phase bar colors
	const phaseColors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#6366f1', '#14b8a6', '#f43f5e'];

	$effect(() => {
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<!-- Left: form -->
		<div class="tool-form">
			<!-- Metadata -->
			<fieldset class="glass-card">
				<legend>Migration</legend>
				<div class="form-group">
					<label for="mig-titre">Titre de la migration</label>
					<input id="mig-titre" type="text" bind:value={titre} placeholder="Ex: Migration monolithe vers microservices" />
				</div>
				<div class="form-row form-row--three">
					<div class="form-group">
						<label for="mig-source">Système source</label>
						<input id="mig-source" type="text" bind:value={systemeSource} placeholder="Ex: Monolithe Rails" />
					</div>
					<div class="form-group">
						<label for="mig-cible">Système cible</label>
						<input id="mig-cible" type="text" bind:value={systemeCible} placeholder="Ex: Microservices Go" />
					</div>
					<div class="form-group">
						<label for="mig-date">Date de début prévue</label>
						<input id="mig-date" type="date" bind:value={dateDebut} />
					</div>
				</div>
			</fieldset>

			<!-- Phases -->
			<fieldset class="glass-card">
				<legend>Phases</legend>
				<p class="form-hint">Decoupe la migration en etapes successives. Chaque phase a sa propre strategie et sa duree estimee.</p>

				{#each phases as phase, i}
					<div class="phase-card">
						<div class="phase-header">
							<span class="phase-number" style="color: {phaseColors[i % phaseColors.length]}">Phase {i + 1}</span>
							{#if phases.length > 1}
								<button class="remove-btn" onclick={() => removePhase(i)} aria-label="Supprimer la phase {i + 1}">&times;</button>
							{/if}
						</div>
						<div class="form-group">
							<label for="phase-nom-{i}">Nom de la phase</label>
							<input id="phase-nom-{i}" type="text" bind:value={phase.nom} placeholder="Ex: Migration des données" />
						</div>
						<div class="form-row form-row--two">
							<div class="form-group">
								<label for="phase-duree-{i}">Durée estimée (jours)</label>
								<input id="phase-duree-{i}" type="number" min="1" bind:value={phase.duree} />
							</div>
							<div class="form-group">
								<label for="phase-strategie-{i}">Strategie</label>
								<select id="phase-strategie-{i}" bind:value={phase.strategie} title="Big bang : tout migrer d'un coup. Progressive : par petits morceaux. Strangler fig : remplacer piece par piece en parallele. Blue-green : deux systemes en parallele, bascule instantanee.">
									<option value="Big bang">Big bang (tout d'un coup)</option>
									<option value="Progressive">Progressive (par morceaux)</option>
									<option value="Strangler fig">Strangler fig (remplacement progressif)</option>
									<option value="Blue-green">Blue-green (bascule instantanee)</option>
								</select>
							</div>
						</div>
						<div class="checkbox-row">
							<label class="checkbox-label" title="Les feature flags permettent d'activer ou desactiver une fonctionnalite sans redeployer le code.">
								<input type="checkbox" bind:checked={phase.featureFlags} />
								<span>Activation progressive necessaire</span>
							</label>
							<label class="checkbox-label" title="Possibilite de revenir a l'etat precedent en cas de probleme.">
								<input type="checkbox" bind:checked={phase.rollback} />
								<span>Retour arriere possible</span>
							</label>
						</div>
					</div>
				{/each}

				<button class="add-btn" onclick={addPhase}>+ Ajouter une phase</button>
			</fieldset>

			<!-- Risks -->
			<fieldset class="glass-card">
				<legend>Risques</legend>
				<p class="form-hint">Identifie ce qui pourrait mal tourner et comment s'en premunir.</p>

				{#each risks as risk, i}
					<div class="risk-card">
						<div class="risk-header">
							<span class="risk-number">Risque {i + 1}</span>
							{#if risks.length > 0}
								<button class="remove-btn" onclick={() => removeRisk(i)} aria-label="Supprimer le risque {i + 1}">&times;</button>
							{/if}
						</div>
						<div class="form-group">
							<label for="risk-desc-{i}">Description du risque</label>
							<input id="risk-desc-{i}" type="text" bind:value={risk.description} placeholder="Ex: Perte de données pendant la migration" />
						</div>
						<div class="form-row form-row--two">
							<div class="form-group">
								<label for="risk-prob-{i}">Probabilité</label>
								<select id="risk-prob-{i}" bind:value={risk.probabilite}>
									{#each PROBABILITIES as p}
										<option value={p}>{p}</option>
									{/each}
								</select>
							</div>
							<div class="form-group">
								<label for="risk-impact-{i}">Impact</label>
								<select id="risk-impact-{i}" bind:value={risk.impact}>
									{#each IMPACTS as imp}
										<option value={imp}>{imp}</option>
									{/each}
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="risk-mit-{i}">Comment s'en premunir</label>
							<textarea id="risk-mit-{i}" bind:value={risk.mitigation} rows="2" placeholder="Ex: Faire un test complet sur un environnement de pre-production avant la migration reelle"></textarea>
						</div>
					</div>
				{/each}

				<button class="add-btn" onclick={addRisk}>+ Ajouter un risque</button>
			</fieldset>

			<!-- Checklist -->
			<fieldset class="glass-card">
				<legend>Checklist avant migration</legend>
				<p class="form-hint">Les points essentiels a verifier avant de lancer la migration. Plus tu en coches, plus tu es pret.</p>

				<div class="checklist-grid">
					{#each checklist as item}
						<label class="checklist-item">
							<input type="checkbox" bind:checked={item.checked} />
							<span class="checklist-label">{item.label}</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<!-- Actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Réinitialiser</button>
			</div>
		</div>

		<!-- Right: results panel (sticky) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Résultats</div>

			<!-- Go/No-go -->
			<div class="go-nogo" style="border-color: {goNoGo.color}">
				<span class="go-nogo-label">Pret a lancer ?</span>
				<span class="go-nogo-value" style="color: {goNoGo.color}">{goNoGo.label}</span>
				<span class="go-nogo-score">{readinessScore}% pret</span>
			</div>

			<!-- Timeline -->
			<div class="result-section">
				<div class="result-section-title">Timeline</div>
				{#if totalDays > 0}
					<div class="timeline-bar">
						{#each timeline as seg, i}
							{@const widthPct = totalDays > 0 ? ((seg.end - seg.start) / totalDays) * 100 : 0}
							{#if widthPct > 0}
								<div
									class="timeline-segment"
									style="width: {widthPct}%; background: {phaseColors[i % phaseColors.length]}"
									title="{seg.nom || `Phase ${i + 1}`} — {seg.duree}j"
								>
									{#if widthPct > 12}
										<span class="timeline-segment-label">{seg.duree}j</span>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
					<div class="timeline-legend">
						{#each timeline as seg, i}
							<div class="timeline-legend-item">
								<span class="timeline-legend-dot" style="background: {phaseColors[i % phaseColors.length]}"></span>
								<span class="timeline-legend-name">{seg.nom || `Phase ${i + 1}`}</span>
								<span class="timeline-legend-days">{seg.duree}j</span>
							</div>
						{/each}
						<div class="timeline-total">
							Total : <strong>{totalDays} jours</strong>
						</div>
					</div>
				{:else}
					<p class="empty-hint">Ajoute des durées aux phases pour voir la timeline.</p>
				{/if}
			</div>

			<!-- Risk matrix -->
			<div class="result-section">
				<div class="result-section-title">Matrice de risques</div>
				<div class="risk-matrix-wrapper">
					<div class="risk-matrix-y-label">Probabilité</div>
					<div class="risk-matrix">
						<!-- Y-axis labels -->
						<div class="matrix-y-labels">
							<span>Forte</span>
							<span>Moyenne</span>
							<span>Faible</span>
						</div>
						<!-- Grid -->
						<div class="matrix-grid">
							{#each [2, 1, 0] as probIdx}
								{#each [0, 1, 2] as impIdx}
									{@const count = riskMatrix[probIdx][impIdx]}
									<div
										class="matrix-cell"
										style="background: {matrixCellColor(probIdx, impIdx)}"
									>
										{#if count > 0}
											<span class="matrix-cell-count">{count}</span>
										{/if}
									</div>
								{/each}
							{/each}
						</div>
						<!-- X-axis labels -->
						<div class="matrix-x-labels">
							<span>Faible</span>
							<span>Moyen</span>
							<span>Fort</span>
						</div>
						<div class="risk-matrix-x-label">Impact</div>
					</div>
				</div>
			</div>

			<!-- Readiness -->
			<div class="result-section">
				<div class="result-section-title">Niveau de preparation</div>
				<div class="readiness-bar-track">
					<div
						class="readiness-bar-fill"
						style="width: {readinessScore}%; background: {goNoGo.color}"
					></div>
				</div>
				<div class="readiness-detail">
					<span>{checklist.filter((c) => c.checked).length} / {checklist.length} vérifiés</span>
					<span class="readiness-pct" style="color: {goNoGo.color}">{readinessScore}%</span>
				</div>
			</div>

			<!-- Summary pills -->
			<div class="result-section">
				<div class="result-section-title">Résumé</div>
				<div class="summary-pills">
					<span class="pill">{phases.length} phase{phases.length > 1 ? 's' : ''}</span>
					<span class="pill">{risks.filter((r) => r.description.trim()).length} risque{risks.filter((r) => r.description.trim()).length > 1 ? 's' : ''}</span>
					<span class="pill">{totalDays} jours</span>
					{#if phases.some((p) => p.featureFlags)}
						<span class="badge badge--accent">Activation progressive</span>
					{/if}
					{#if phases.every((p) => p.rollback)}
						<span class="badge badge--green">Retour arriere OK</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.tool-container {
		--accent: #06b6d4;
		--accent2: #8b5cf6;
		--accent3: #ec4899;
		--surface: rgba(255, 255, 255, 0.05);
		--border: rgba(255, 255, 255, 0.08);
		--primary: #e4e4e7;
		--secondary: #a1a1aa;
		--font-ui: 'Space Grotesk', var(--font-ui, system-ui);
		max-width: 100%;
	}

	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.tool-form {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	/* Glass card */
	.glass-card {
		background: var(--surface);
		border: 1px solid var(--border);
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

	/* Form elements */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 12px;
	}

	.form-group:last-child {
		margin-bottom: 0;
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
		margin: 0 0 12px 0;
		font-style: italic;
	}

	.form-row--two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}

	.form-row--three {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--gap);
	}

	input[type='text'],
	input[type='date'],
	input[type='number'],
	select,
	textarea {
		font-family: var(--font-body);
		font-size: 15px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: rgba(0, 0, 0, 0.3);
		color: var(--primary);
		transition: var(--transition);
		width: 100%;
		box-sizing: border-box;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	textarea {
		resize: vertical;
		min-height: 60px;
	}

	/* Phase card */
	.phase-card {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin-bottom: 12px;
	}

	.phase-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.phase-number {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Risk card */
	.risk-card {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin-bottom: 12px;
	}

	.risk-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.risk-number {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		color: var(--accent3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
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
		border: 1px dashed rgba(6, 182, 212, 0.3);
		border-radius: var(--radius);
		padding: 10px;
		width: 100%;
		cursor: pointer;
		transition: var(--transition);
	}

	.add-btn:hover {
		background: rgba(6, 182, 212, 0.08);
	}

	/* Checkbox rows */
	.checkbox-row {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
		cursor: pointer;
	}

	.checkbox-label input[type='checkbox'] {
		width: 16px;
		height: 16px;
		accent-color: var(--accent);
	}

	/* Checklist */
	.checklist-grid {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: var(--radius);
		background: rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: var(--transition);
	}

	.checklist-item:hover {
		background: rgba(0, 0, 0, 0.3);
	}

	.checklist-item input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: var(--accent);
		flex-shrink: 0;
	}

	.checklist-label {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
	}

	/* Result panel */
	.tool-result {
		padding: var(--gap);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		position: sticky;
		top: calc(var(--header-height, 60px) + var(--gap));
	}

	.result-title {
		font-family: var(--font-heading, var(--font-ui));
		font-size: 20px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: var(--content-gap);
	}

	/* Go/No-go */
	.go-nogo {
		text-align: center;
		padding: 16px;
		border: 1px solid;
		border-radius: var(--radius);
		margin-bottom: var(--content-gap);
		background: rgba(0, 0, 0, 0.2);
		transition: border-color 0.3s ease;
	}

	.go-nogo-label {
		display: block;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.go-nogo-value {
		display: block;
		font-family: var(--font-heading, var(--font-ui));
		font-size: 24px;
		font-weight: 700;
		transition: color 0.3s ease;
	}

	.go-nogo-score {
		display: block;
		font-family: var(--font-mono, monospace);
		font-size: 14px;
		color: var(--secondary);
		margin-top: 2px;
	}

	/* Result sections */
	.result-section {
		margin-bottom: var(--content-gap);
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.result-section-title {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 10px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* Timeline */
	.timeline-bar {
		display: flex;
		height: 28px;
		border-radius: 6px;
		overflow: hidden;
		gap: 2px;
		margin-bottom: 10px;
	}

	.timeline-segment {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 4px;
		border-radius: 4px;
		transition: width 0.3s ease;
	}

	.timeline-segment-label {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		color: #000;
		white-space: nowrap;
	}

	.timeline-legend {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.timeline-legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
	}

	.timeline-legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.timeline-legend-name {
		color: var(--secondary);
		flex: 1;
	}

	.timeline-legend-days {
		font-family: var(--font-mono, monospace);
		font-size: 11px;
		color: var(--primary);
	}

	.timeline-total {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		margin-top: 4px;
		padding-top: 4px;
		border-top: 1px solid var(--border);
	}

	.timeline-total strong {
		color: var(--primary);
	}

	/* Risk matrix */
	.risk-matrix-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.risk-matrix-y-label {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--secondary);
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.risk-matrix {
		flex: 1;
	}

	.matrix-y-labels {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		position: absolute;
		left: -42px;
		top: 0;
		bottom: 0;
	}

	.risk-matrix {
		position: relative;
		padding-left: 50px;
	}

	.matrix-y-labels {
		position: absolute;
		left: 0;
		top: 0;
		height: calc(3 * 40px);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.matrix-y-labels span {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--secondary);
		text-align: right;
		padding-right: 6px;
	}

	.matrix-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 2px;
		height: 120px;
	}

	.matrix-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background 0.3s ease;
	}

	.matrix-cell-count {
		font-family: var(--font-mono, monospace);
		font-size: 16px;
		font-weight: 700;
		color: var(--primary);
	}

	.matrix-x-labels {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-top: 4px;
	}

	.matrix-x-labels span {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--secondary);
		text-align: center;
	}

	.risk-matrix-x-label {
		font-family: var(--font-ui);
		font-size: 10px;
		color: var(--secondary);
		text-align: center;
		margin-top: 4px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Readiness bar */
	.readiness-bar-track {
		height: 8px;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 6px;
	}

	.readiness-bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s ease, background 0.3s ease;
		min-width: 2px;
	}

	.readiness-detail {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	.readiness-pct {
		font-weight: 700;
		font-family: var(--font-mono, monospace);
		transition: color 0.3s ease;
	}

	/* Pills & badges */
	.summary-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.pill {
		font-family: var(--font-ui);
		font-size: 12px;
		padding: 3px 10px;
		border-radius: 12px;
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--secondary);
	}

	.badge {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 12px;
	}

	.badge--accent {
		background: rgba(6, 182, 212, 0.15);
		color: #06b6d4;
		border: 1px solid rgba(6, 182, 212, 0.3);
	}

	.badge--green {
		background: rgba(34, 197, 94, 0.15);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.empty-hint {
		font-size: 13px;
		color: var(--secondary);
		font-style: italic;
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
		color: #000;
	}

	.tool-btn--primary:hover {
		filter: brightness(1.15);
	}

	.tool-btn--secondary {
		background: transparent;
		color: var(--secondary);
		border: 1px solid var(--border);
	}

	.tool-btn--secondary:hover {
		border-color: rgba(255, 255, 255, 0.2);
		color: var(--primary);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.form-row--two,
		.form-row--three {
			grid-template-columns: 1fr;
		}

		.checkbox-row {
			flex-direction: column;
			gap: 8px;
		}

		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}

		.risk-matrix-wrapper {
			flex-direction: column;
		}

		.risk-matrix-y-label {
			writing-mode: horizontal-tb;
			transform: none;
		}
	}
</style>
