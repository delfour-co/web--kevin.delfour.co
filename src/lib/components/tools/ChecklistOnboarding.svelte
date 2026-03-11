<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-checklist-onboarding';
	const TOOL_URL = 'https://kevin.delfour.co/outils/checklist-onboarding/';

	interface CheckItem {
		id: string;
		label: string;
		custom?: boolean;
	}

	interface Phase {
		id: string;
		name: string;
		description: string;
		dayStart: number;
		dayEnd: number;
		items: CheckItem[];
	}

	function createPhases(): Phase[] {
		return [
			{
				id: 'semaine1',
				name: 'Semaine 1 — Accueil',
				description: 'Les fondations : que tout soit pret pour que la personne se sente attendue.',
				dayStart: 0,
				dayEnd: 7,
				items: [
					{ id: 's1-email', label: 'Acces email et outils configures' },
					{ id: 's1-poste', label: 'Poste de travail pret (ou remote setup)' },
					{ id: 's1-repo', label: 'Acces au repo et environnement de dev' },
					{ id: 's1-equipe', label: "Presentation a l'equipe" },
					{ id: 's1-docs', label: "Documentation d'onboarding partagee" },
					{ id: 's1-cafe', label: 'Premier cafe/call informel avec le manager' }
				]
			},
			{
				id: 'j1-30',
				name: 'J1-J30 — Decouverte',
				description: "Comprendre le contexte, poser ses premieres questions, livrer un premier quick win.",
				dayStart: 1,
				dayEnd: 30,
				items: [
					{ id: 'j30-archi', label: "Tour d'horizon de l'architecture" },
					{ id: 'j30-ticket', label: 'Premier ticket merge (quick win)' },
					{ id: 'j30-review', label: 'Participer a une code review' },
					{ id: 'j30-deploy', label: 'Comprendre le processus de deploiement' },
					{ id: 'j30-buddy', label: 'Identifier son buddy technique' },
					{ id: 'j30-adr', label: 'Lire les ADR / decisions cles' },
					{ id: 'j30-1on1', label: 'Premier 1:1 avec le manager' },
					{ id: 'j30-roadmap', label: 'Comprendre la roadmap produit' }
				]
			},
			{
				id: 'j30-60',
				name: 'J30-J60 — Autonomie',
				description: "Monter en autonomie progressive : livrer, contribuer, s'integrer aux rituels.",
				dayStart: 30,
				dayEnd: 60,
				items: [
					{ id: 'j60-ticket', label: 'Capable de livrer un ticket seul' },
					{ id: 'j60-review', label: 'Faire une code review a un pair' },
					{ id: 'j60-rituels', label: 'Participer activement aux rituels' },
					{ id: 'j60-amelioration', label: "Identifier un sujet d'amelioration" },
					{ id: 'j60-feedback', label: 'Feedback 360 informel recueilli' },
					{ id: 'j60-1on1', label: 'Deuxieme 1:1 structure' }
				]
			},
			{
				id: 'j60-90',
				name: 'J60-J90 — Contribution',
				description: "Devenir un membre actif de l'equipe : livrer, proposer, transmettre.",
				dayStart: 60,
				dayEnd: 90,
				items: [
					{ id: 'j90-feature', label: 'Livrer une feature complete' },
					{ id: 'j90-proposition', label: 'Proposer une amelioration technique' },
					{ id: 'j90-aide', label: "Aider un autre membre de l'equipe" },
					{ id: 'j90-bilan', label: "Bilan de periode d'essai prepare" },
					{ id: 'j90-objectifs', label: 'Objectifs a 6 mois definis' },
					{ id: 'j90-feedback', label: 'Feedback formel du manager' }
				]
			}
		];
	}

	// Profil
	let nom = $state('');
	let poste = $state('');
	let dateArrivee = $state('');
	let buddy = $state('');

	// Phases & checks
	let phases = $state<Phase[]>(createPhases());
	let checked = $state<Record<string, boolean>>({});

	// Notes per phase
	let notes = $state<Record<string, string>>({
		semaine1: '',
		'j1-30': '',
		'j30-60': '',
		'j60-90': ''
	});

	// Custom item input
	let newItemText = $state<Record<string, string>>({
		semaine1: '',
		'j1-30': '',
		'j30-60': '',
		'j60-90': ''
	});

	let copyFeedback = $state(false);

	// Initialize checked state
	function initChecked() {
		for (const phase of phases) {
			for (const item of phase.items) {
				if (!(item.id in checked)) {
					checked[item.id] = false;
				}
			}
		}
	}

	initChecked();

	// Derived: stats per phase
	const phaseStats = $derived.by(() => {
		return phases.map((phase) => {
			const total = phase.items.length;
			const done = phase.items.filter((item) => checked[item.id]).length;
			const pct = total === 0 ? 0 : Math.round((done / total) * 100);
			return { id: phase.id, name: phase.name, done, total, pct };
		});
	});

	// Derived: global progress
	const globalStats = $derived.by(() => {
		let total = 0;
		let done = 0;
		for (const phase of phases) {
			total += phase.items.length;
			done += phase.items.filter((item) => checked[item.id]).length;
		}
		const pct = total === 0 ? 0 : Math.round((done / total) * 100);
		return { done, total, pct };
	});

	// Derived: days remaining per phase
	const daysRemaining = $derived.by(() => {
		if (!dateArrivee) return {};
		const start = new Date(dateArrivee);
		const now = new Date();
		const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

		const result: Record<string, number | null> = {};
		for (const phase of phases) {
			const remaining = phase.dayEnd - daysSinceStart;
			result[phase.id] = remaining;
		}
		return result;
	});

	// Derived: unchecked items
	const uncheckedItems = $derived.by(() => {
		const items: { phase: string; label: string }[] = [];
		for (const phase of phases) {
			for (const item of phase.items) {
				if (!checked[item.id]) {
					items.push({ phase: phase.name, label: item.label });
				}
			}
		}
		return items;
	});

	function addCustomItem(phaseId: string) {
		const text = newItemText[phaseId]?.trim();
		if (!text) return;
		const phase = phases.find((p) => p.id === phaseId);
		if (!phase) return;
		const id = `custom-${phaseId}-${Date.now()}`;
		phase.items.push({ id, label: text, custom: true });
		checked[id] = false;
		newItemText[phaseId] = '';
		save();
	}

	function removeCustomItem(phaseId: string, itemId: string) {
		const phase = phases.find((p) => p.id === phaseId);
		if (!phase) return;
		phase.items = phase.items.filter((i) => i.id !== itemId);
		delete checked[itemId];
		save();
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					nom,
					poste,
					dateArrivee,
					buddy,
					checked,
					notes,
					customItems: phases.map((p) => ({
						id: p.id,
						items: p.items.filter((i) => i.custom).map((i) => ({ id: i.id, label: i.label }))
					}))
				})
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (!saved) return;
			const data = JSON.parse(saved);
			if (data.nom) nom = data.nom;
			if (data.poste) poste = data.poste;
			if (data.dateArrivee) dateArrivee = data.dateArrivee;
			if (data.buddy) buddy = data.buddy;
			if (data.notes) {
				for (const key of Object.keys(notes)) {
					if (data.notes[key]) notes[key] = data.notes[key];
				}
			}
			// Restore custom items
			if (Array.isArray(data.customItems)) {
				for (const saved of data.customItems) {
					const phase = phases.find((p) => p.id === saved.id);
					if (!phase || !Array.isArray(saved.items)) continue;
					for (const item of saved.items) {
						if (!phase.items.find((i) => i.id === item.id)) {
							phase.items.push({ id: item.id, label: item.label, custom: true });
						}
					}
				}
			}
			// Restore checked state
			if (data.checked) {
				for (const phase of phases) {
					for (const item of phase.items) {
						if (typeof data.checked[item.id] === 'boolean') {
							checked[item.id] = data.checked[item.id];
						}
					}
				}
			}
		} catch {}
	}

	function handleReset() {
		nom = '';
		poste = '';
		dateArrivee = '';
		buddy = '';
		phases = createPhases();
		checked = {};
		notes = { semaine1: '', 'j1-30': '', 'j30-60': '', 'j60-90': '' };
		newItemText = { semaine1: '', 'j1-30': '', 'j30-60': '', 'j60-90': '' };
		initChecked();
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const lines: string[] = [
			'# Checklist onboarding dev',
			'',
			`**Date :** ${today}`,
			`**Nouveau :** ${nom || '(non renseigne)'}`,
			`**Poste :** ${poste || '(non renseigne)'}`,
			`**Date d\'arrivee :** ${dateArrivee || '(non renseignee)'}`,
			`**Buddy/Referent :** ${buddy || '(non renseigne)'}`,
			`**Progression globale :** ${globalStats.pct}% (${globalStats.done}/${globalStats.total})`,
			''
		];

		for (const phase of phases) {
			const stats = phaseStats.find((s) => s.id === phase.id)!;
			lines.push(`## ${phase.name} (${stats.pct}%)`);
			lines.push('');
			for (const item of phase.items) {
				const mark = checked[item.id] ? 'x' : ' ';
				lines.push(`- [${mark}] ${item.label}`);
			}
			if (notes[phase.id]?.trim()) {
				lines.push('', `**Notes :** ${notes[phase.id].trim()}`);
			}
			lines.push('');
		}

		if (uncheckedItems.length > 0 && uncheckedItems.length <= 10) {
			lines.push('## Items restants');
			lines.push('');
			for (const item of uncheckedItems) {
				lines.push(`- ${item.label}`);
			}
			lines.push('');
		}

		lines.push('---');
		lines.push(`_Genere avec la Checklist onboarding dev — ${TOOL_URL}_`);

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
		nom;
		poste;
		dateArrivee;
		buddy;
		JSON.stringify(checked);
		JSON.stringify(notes);
		JSON.stringify(phases);
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="onb-container">
	<div class="onb-layout">
		<div class="onb-form">
			<!-- Profil -->
			<section class="glass-card">
				<h2 class="section-title">Profil</h2>
				<div class="field-row">
					<div class="field-group">
						<label class="field-label" for="onb-nom">Nom du nouveau</label>
						<input
							id="onb-nom"
							type="text"
							class="field-input"
							placeholder="Prenom ou initiales"
							bind:value={nom}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="onb-poste">Poste</label>
						<input
							id="onb-poste"
							type="text"
							class="field-input"
							placeholder="Dev backend, fullstack..."
							bind:value={poste}
						/>
					</div>
				</div>
				<div class="field-row">
					<div class="field-group">
						<label class="field-label" for="onb-date">Date d'arrivee</label>
						<input
							id="onb-date"
							type="date"
							class="field-input"
							bind:value={dateArrivee}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="onb-buddy">Buddy / Referent</label>
						<input
							id="onb-buddy"
							type="text"
							class="field-input"
							placeholder="Nom du buddy"
							bind:value={buddy}
						/>
					</div>
				</div>
			</section>

			<!-- Phases -->
			{#each phases as phase}
				{@const stats = phaseStats.find((s) => s.id === phase.id)!}
				{@const remaining = daysRemaining[phase.id]}
				<section class="glass-card phase-card">
					<div class="phase-header">
						<div class="phase-title-row">
							<h2 class="phase-name">{phase.name}</h2>
							<span
								class="phase-score"
								style="color: {stats.pct >= 80 ? 'var(--onb-success)' : stats.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
							>
								{stats.pct}%
							</span>
						</div>
						<p class="phase-description">{phase.description}</p>
						<div class="phase-progress-bar">
							<div
								class="phase-progress-fill"
								style="width: {stats.pct}%; background: {stats.pct >= 80 ? 'var(--onb-success)' : stats.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
							></div>
						</div>
						{#if remaining !== undefined && remaining !== null && dateArrivee}
							<span class="phase-remaining">
								{#if remaining > 0}
									{remaining} jour{remaining > 1 ? 's' : ''} restant{remaining > 1 ? 's' : ''}
								{:else if remaining === 0}
									Echeance aujourd'hui
								{:else}
									Depasse de {Math.abs(remaining)} jour{Math.abs(remaining) > 1 ? 's' : ''}
								{/if}
							</span>
						{/if}
					</div>
					<div class="checkpoints">
						{#each phase.items as item}
							<label class="checkpoint" class:checkpoint--checked={checked[item.id]}>
								<input
									type="checkbox"
									bind:checked={checked[item.id]}
									class="checkpoint-input"
									aria-label={item.label}
								/>
								<span class="checkpoint-checkmark"></span>
								<span class="checkpoint-label">{item.label}</span>
								{#if item.custom}
									<button
										class="checkpoint-remove"
										onclick={() => removeCustomItem(phase.id, item.id)}
										aria-label="Supprimer : {item.label}"
									>
										&#x2715;
									</button>
								{/if}
							</label>
						{/each}
					</div>

					<!-- Add custom item -->
					<div class="add-item-row">
						<input
							type="text"
							class="field-input add-item-input"
							placeholder="Ajouter un item..."
							bind:value={newItemText[phase.id]}
							onkeydown={(e) => { if (e.key === 'Enter') addCustomItem(phase.id); }}
						/>
						<button
							class="onb-btn onb-btn--add"
							onclick={() => addCustomItem(phase.id)}
							disabled={!newItemText[phase.id]?.trim()}
						>
							Ajouter
						</button>
					</div>

					<!-- Notes -->
					<div class="phase-notes">
						<label class="field-label" for="notes-{phase.id}">Notes</label>
						<textarea
							id="notes-{phase.id}"
							class="field-textarea"
							rows="2"
							placeholder="Notes pour cette phase..."
							bind:value={notes[phase.id]}
						></textarea>
					</div>
				</section>
			{/each}

			<!-- Actions -->
			<div class="onb-actions">
				<button class="onb-btn onb-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="onb-btn onb-btn--secondary" onclick={handleReset}>
					Reinitialiser
				</button>
			</div>
		</div>

		<!-- Result panel -->
		<div class="onb-result" aria-live="polite" aria-atomic="true">
			<div class="result-section">
				<div class="score-global">
					<div class="score-ring">
						<svg viewBox="0 0 120 120" class="score-svg">
							<circle cx="60" cy="60" r="52" class="score-ring-bg" />
							<circle
								cx="60"
								cy="60"
								r="52"
								class="score-ring-fill"
								style="stroke-dasharray: {326.7}; stroke-dashoffset: {326.7 - (326.7 * globalStats.pct) / 100}; stroke: {globalStats.pct >= 80 ? 'var(--onb-success)' : globalStats.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
							/>
						</svg>
						<div class="score-text">
							<span
								class="score-number"
								style="color: {globalStats.pct >= 80 ? 'var(--onb-success)' : globalStats.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
							>
								{globalStats.pct}%
							</span>
							<span class="score-count">{globalStats.done}/{globalStats.total}</span>
						</div>
					</div>
					<div
						class="score-level"
						style="color: {globalStats.pct >= 80 ? 'var(--onb-success)' : globalStats.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
					>
						{#if globalStats.pct === 100}
							Onboarding termine
						{:else if globalStats.pct >= 80}
							Bientot termine
						{:else if globalStats.pct >= 50}
							En bonne voie
						{:else if globalStats.pct > 0}
							En cours
						{:else}
							A demarrer
						{/if}
					</div>
				</div>
			</div>

			<div class="result-section">
				<h3 class="result-title">Progression par phase</h3>
				<div class="phase-scores">
					{#each phaseStats as ps}
						<div class="mini-score">
							<div class="mini-score-header">
								<span class="mini-score-name">{ps.name.split(' — ')[1] || ps.name}</span>
								<span class="mini-score-value">{ps.done}/{ps.total}</span>
							</div>
							<div class="mini-progress">
								<div
									class="mini-progress-fill"
									style="width: {ps.pct}%; background: {ps.pct >= 80 ? 'var(--onb-success)' : ps.pct >= 50 ? 'var(--onb-accent)' : 'var(--onb-muted)'}"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if dateArrivee}
				<div class="result-section">
					<h3 class="result-title">Echeances</h3>
					<div class="deadlines-list">
						{#each phases as phase}
							{@const remaining = daysRemaining[phase.id]}
							{#if remaining !== undefined && remaining !== null}
								<div class="deadline-row">
									<span class="deadline-label">{phase.name.split(' — ')[1] || phase.name}</span>
									<span
										class="deadline-value"
										class:deadline--overdue={remaining < 0}
										class:deadline--soon={remaining >= 0 && remaining <= 7}
									>
										{#if remaining > 0}
											J-{remaining}
										{:else if remaining === 0}
											Aujourd'hui
										{:else}
											+{Math.abs(remaining)}j
										{/if}
									</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			{#if uncheckedItems.length > 0}
				<div class="result-section">
					<h3 class="result-title result-title--alert">
						Restant ({uncheckedItems.length})
					</h3>
					<ul class="remaining-list">
						{#each uncheckedItems.slice(0, 8) as item}
							<li class="remaining-item">{item.label}</li>
						{/each}
						{#if uncheckedItems.length > 8}
							<li class="remaining-more">+ {uncheckedItems.length - 8} autres</li>
						{/if}
					</ul>
				</div>
			{/if}

			{#if nom || poste || buddy}
				<div class="result-section result-context">
					{#if nom}
						<div class="context-row">
							<span class="context-label">Nouveau</span>
							<span class="context-value">{nom}</span>
						</div>
					{/if}
					{#if poste}
						<div class="context-row">
							<span class="context-label">Poste</span>
							<span class="context-value">{poste}</span>
						</div>
					{/if}
					{#if buddy}
						<div class="context-row">
							<span class="context-label">Buddy</span>
							<span class="context-value">{buddy}</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.onb-container {
		--onb-accent: #06b6d4;
		--onb-success: #8b5cf6;
		--onb-muted: #a1a1aa;
		--onb-warning: #f59e0b;
		--onb-danger: #ec4899;
		--onb-surface: rgba(255, 255, 255, 0.05);
		--onb-border: rgba(255, 255, 255, 0.08);
		--onb-primary: #e4e4e7;
		--onb-secondary: #a1a1aa;
		--onb-tertiary: #71717a;
		--onb-font-ui: 'Space Grotesk', var(--font-ui), system-ui, sans-serif;

		max-width: 100%;
		color: var(--onb-primary);
	}

	.onb-layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.onb-form {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	/* Glass card */
	.glass-card {
		background: var(--onb-surface);
		border: 1px solid var(--onb-border);
		border-radius: 12px;
		padding: 24px;
		backdrop-filter: blur(8px);
	}

	.section-title {
		font-family: var(--onb-font-ui);
		font-size: 16px;
		font-weight: 600;
		color: var(--onb-primary);
		margin: 0 0 16px 0;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--onb-border);
	}

	/* Fields */
	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: 12px;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.field-label {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--onb-secondary);
	}

	.field-input,
	.field-textarea {
		font-family: var(--onb-font-ui);
		font-size: 14px;
		color: var(--onb-primary);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--onb-border);
		border-radius: 8px;
		padding: 8px 12px;
		transition: border-color 0.2s ease;
	}

	.field-input:focus,
	.field-textarea:focus {
		outline: none;
		border-color: var(--onb-accent);
		box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.15);
	}

	.field-input::placeholder,
	.field-textarea::placeholder {
		color: var(--onb-tertiary);
	}

	.field-textarea {
		resize: vertical;
		min-height: 50px;
	}

	/* Phase card */
	.phase-header {
		margin-bottom: 16px;
	}

	.phase-title-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.phase-name {
		font-family: var(--onb-font-ui);
		font-size: 16px;
		font-weight: 600;
		color: var(--onb-primary);
		margin: 0;
	}

	.phase-score {
		font-family: var(--font-mono, monospace);
		font-size: 14px;
		font-weight: 700;
	}

	.phase-description {
		font-size: 13px;
		color: var(--onb-secondary);
		margin: 0 0 10px 0;
		line-height: 1.4;
	}

	.phase-progress-bar {
		height: 3px;
		background: var(--onb-border);
		border-radius: 2px;
		overflow: hidden;
	}

	.phase-progress-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.4s ease, background 0.4s ease;
	}

	.phase-remaining {
		font-family: var(--onb-font-ui);
		font-size: 12px;
		color: var(--onb-tertiary);
		margin-top: 6px;
		display: inline-block;
	}

	/* Checkpoints */
	.checkpoints {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 12px;
	}

	.checkpoint {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.2s ease;
		user-select: none;
	}

	.checkpoint:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.checkpoint--checked {
		opacity: 0.6;
	}

	.checkpoint-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.checkpoint-checkmark {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border: 2px solid var(--onb-tertiary);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.checkpoint-input:checked + .checkpoint-checkmark {
		background: var(--onb-accent);
		border-color: var(--onb-accent);
	}

	.checkpoint-input:checked + .checkpoint-checkmark::after {
		content: '';
		display: block;
		width: 5px;
		height: 9px;
		border: solid #000;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
		margin-top: -2px;
	}

	.checkpoint-input:focus-visible + .checkpoint-checkmark {
		outline: 2px solid var(--onb-accent);
		outline-offset: 2px;
	}

	.checkpoint-label {
		flex: 1;
		font-family: var(--onb-font-ui);
		font-size: 14px;
		color: var(--onb-primary);
		line-height: 1.3;
	}

	.checkpoint--checked .checkpoint-label {
		text-decoration: line-through;
		text-decoration-color: var(--onb-tertiary);
	}

	.checkpoint-remove {
		background: none;
		border: none;
		color: var(--onb-tertiary);
		cursor: pointer;
		font-size: 13px;
		padding: 2px 4px;
		line-height: 1;
		transition: color 0.2s ease;
		flex-shrink: 0;
	}

	.checkpoint-remove:hover {
		color: var(--onb-danger);
	}

	/* Add item */
	.add-item-row {
		display: flex;
		gap: 8px;
		margin-bottom: 12px;
	}

	.add-item-input {
		flex: 1;
	}

	/* Phase notes */
	.phase-notes {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	/* Buttons */
	.onb-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.onb-btn {
		font-family: var(--onb-font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		min-height: 44px;
	}

	.onb-btn--primary {
		background: var(--onb-accent);
		color: #000;
	}

	.onb-btn--primary:hover {
		background: #22d3ee;
	}

	.onb-btn--secondary {
		background: transparent;
		color: var(--onb-secondary);
		border: 1px solid var(--onb-border);
	}

	.onb-btn--secondary:hover {
		border-color: var(--onb-tertiary);
		color: var(--onb-primary);
	}

	.onb-btn--add {
		font-size: 13px;
		padding: 8px 16px;
		background: transparent;
		color: var(--onb-accent);
		border: 1px solid var(--onb-accent);
		min-height: auto;
		white-space: nowrap;
	}

	.onb-btn--add:hover:not(:disabled) {
		background: var(--onb-accent);
		color: #000;
	}

	.onb-btn--add:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* Result panel */
	.onb-result {
		position: sticky;
		top: calc(var(--header-height, 60px) + var(--gap, 16px));
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.result-section {
		background: var(--onb-surface);
		border: 1px solid var(--onb-border);
		border-radius: 12px;
		padding: 20px;
		backdrop-filter: blur(8px);
	}

	/* Score ring */
	.score-global {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.score-ring {
		position: relative;
		width: 120px;
		height: 120px;
	}

	.score-svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.score-ring-bg {
		fill: none;
		stroke: var(--onb-border);
		stroke-width: 8;
	}

	.score-ring-fill {
		fill: none;
		stroke-width: 8;
		stroke-linecap: round;
		transition: stroke-dashoffset 0.6s ease, stroke 0.4s ease;
	}

	.score-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.score-number {
		font-family: var(--onb-font-ui);
		font-size: 28px;
		font-weight: 700;
		line-height: 1;
	}

	.score-count {
		font-family: var(--font-mono, monospace);
		font-size: 12px;
		color: var(--onb-tertiary);
	}

	.score-level {
		font-family: var(--onb-font-ui);
		font-size: 14px;
		font-weight: 600;
		text-align: center;
	}

	/* Phase scores */
	.result-title {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--onb-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 14px 0;
	}

	.result-title--alert {
		color: var(--onb-warning);
	}

	.phase-scores {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.mini-score-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.mini-score-name {
		font-family: var(--onb-font-ui);
		font-size: 12px;
		color: var(--onb-secondary);
	}

	.mini-score-value {
		font-family: var(--font-mono, monospace);
		font-size: 12px;
		font-weight: 600;
		color: var(--onb-primary);
	}

	.mini-progress {
		height: 4px;
		background: var(--onb-border);
		border-radius: 2px;
		overflow: hidden;
	}

	.mini-progress-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.4s ease, background 0.4s ease;
	}

	/* Deadlines */
	.deadlines-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.deadline-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.deadline-label {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		color: var(--onb-secondary);
	}

	.deadline-value {
		font-family: var(--font-mono, monospace);
		font-size: 13px;
		font-weight: 600;
		color: var(--onb-primary);
	}

	.deadline--overdue {
		color: var(--onb-danger);
	}

	.deadline--soon {
		color: var(--onb-warning);
	}

	/* Remaining items */
	.remaining-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.remaining-item {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		color: var(--onb-secondary);
		padding-left: 14px;
		position: relative;
		line-height: 1.4;
	}

	.remaining-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 7px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--onb-warning);
	}

	.remaining-more {
		font-family: var(--onb-font-ui);
		font-size: 12px;
		color: var(--onb-tertiary);
		font-style: italic;
		padding-left: 14px;
	}

	/* Context */
	.result-context {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.context-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 3px 0;
	}

	.context-label {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		color: var(--onb-tertiary);
	}

	.context-value {
		font-family: var(--onb-font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--onb-primary);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.onb-layout {
			grid-template-columns: 1fr;
		}

		.onb-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.glass-card {
			padding: 16px;
		}

		.field-row {
			grid-template-columns: 1fr;
		}

		.checkpoint {
			padding: 6px 4px;
			gap: 8px;
		}

		.add-item-row {
			flex-wrap: wrap;
		}

		.add-item-input {
			min-width: 100%;
		}

		.onb-actions {
			flex-direction: column;
		}

		.onb-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
