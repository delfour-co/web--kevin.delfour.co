<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-bilan-sprint';
	const TOOL_URL = 'https://kevin.delfour.co/outils/bilan-sprint/';

	interface RetroItem {
		id: string;
		text: string;
	}

	interface Action {
		id: string;
		description: string;
		owner: string;
		priorite: 'haute' | 'moyenne' | 'basse';
		deadline: string;
	}

	const quadrants = [
		{ id: 'bien', label: 'Ce qui a bien fonctionne', color: 'var(--retro-green)', colorName: 'green' },
		{ id: 'moins-bien', label: 'Ce qui a moins bien fonctionne', color: 'var(--retro-red)', colorName: 'red' },
		{ id: 'essayer', label: "Ce qu'on veut essayer", color: 'var(--retro-violet)', colorName: 'violet' },
		{ id: 'arreter', label: "Ce qu'on arrete", color: 'var(--retro-amber)', colorName: 'amber' }
	] as const;

	const metriquesConfig = [
		{ id: 'collaboration', label: 'Collaboration equipe' },
		{ id: 'specs', label: 'Clarte des specs' },
		{ id: 'technique', label: 'Qualite technique' },
		{ id: 'communication', label: 'Communication avec le produit' },
		{ id: 'velocite', label: 'Velocite ressentie' }
	];

	// Context
	let sprintNom = $state('');
	let sprintDates = $state('');
	let equipe = $state('');
	let objectif = $state('');

	// Delivery
	let storiesPrevues = $state(0);
	let storiesLivrees = $state(0);
	let storiesReportees = $state(0);
	let bugsCritiques = $state(0);

	// Retro quadrants
	let retroItems = $state<Record<string, RetroItem[]>>({
		'bien': [],
		'moins-bien': [],
		'essayer': [],
		'arreter': []
	});

	let newRetroText = $state<Record<string, string>>({
		'bien': '',
		'moins-bien': '',
		'essayer': '',
		'arreter': ''
	});

	// Actions
	let actions = $state<Action[]>([]);
	let nextActionDesc = $state('');
	let nextActionOwner = $state('');
	let nextActionPriorite = $state<'haute' | 'moyenne' | 'basse'>('moyenne');
	let nextActionDeadline = $state('');

	// Metriques qualite
	let metriques = $state<Record<string, number>>(
		Object.fromEntries(metriquesConfig.map((m) => [m.id, 3]))
	);

	let copyFeedback = $state(false);

	// Derived: taux de completion
	const tauxCompletion = $derived.by(() => {
		if (storiesPrevues <= 0) return 0;
		return Math.round((storiesLivrees / storiesPrevues) * 100);
	});

	// Derived: moyenne metriques
	const moyenneMetriques = $derived.by(() => {
		const vals = Object.values(metriques);
		if (vals.length === 0) return 0;
		return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
	});

	// Derived: retro counts
	const retroCounts = $derived.by(() => {
		const result: Record<string, number> = {};
		for (const q of quadrants) {
			result[q.id] = retroItems[q.id]?.length || 0;
		}
		return result;
	});

	// Derived: total retro items
	const totalRetroItems = $derived.by(() => {
		return Object.values(retroCounts).reduce((a, b) => a + b, 0);
	});

	// Derived: trend indicator
	const trend = $derived.by(() => {
		const delivery = storiesPrevues > 0 ? storiesLivrees / storiesPrevues : 0;
		const qualite = moyenneMetriques / 5;
		const score = (delivery * 0.5 + qualite * 0.5) * 100;

		if (score >= 70) return { label: 'Sprint sain', color: 'var(--retro-green)', level: 'sain' };
		if (score >= 45) return { label: 'Sprint sous tension', color: 'var(--retro-amber)', level: 'tension' };
		return { label: 'Sprint en difficulte', color: 'var(--retro-red)', level: 'difficulte' };
	});

	// Radar chart (pentagon for 5 metriques)
	const radarPoints = $derived.by(() => {
		const cx = 100;
		const cy = 100;
		const maxR = 80;
		const n = metriquesConfig.length;
		return metriquesConfig.map((m, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			const r = (metriques[m.id] / 5) * maxR;
			return {
				x: cx + r * Math.cos(angle),
				y: cy + r * Math.sin(angle),
				labelX: cx + (maxR + 18) * Math.cos(angle),
				labelY: cy + (maxR + 18) * Math.sin(angle),
				label: m.label
			};
		});
	});

	const radarPolygon = $derived.by(() => {
		return radarPoints.map((p) => `${p.x},${p.y}`).join(' ');
	});

	function gridPoints(level: number): string {
		const cx = 100;
		const cy = 100;
		const maxR = 80;
		const n = metriquesConfig.length;
		const r = (level / 5) * maxR;
		return metriquesConfig
			.map((_, i) => {
				const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
				return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
			})
			.join(' ');
	}

	function addRetroItem(quadrantId: string) {
		const text = newRetroText[quadrantId]?.trim();
		if (!text) return;
		retroItems[quadrantId] = [...retroItems[quadrantId], { id: crypto.randomUUID(), text }];
		newRetroText[quadrantId] = '';
		save();
	}

	function removeRetroItem(quadrantId: string, itemId: string) {
		retroItems[quadrantId] = retroItems[quadrantId].filter((i) => i.id !== itemId);
		save();
	}

	function addAction() {
		if (!nextActionDesc.trim()) return;
		actions = [...actions, {
			id: crypto.randomUUID(),
			description: nextActionDesc.trim(),
			owner: nextActionOwner.trim(),
			priorite: nextActionPriorite,
			deadline: nextActionDeadline.trim()
		}];
		nextActionDesc = '';
		nextActionOwner = '';
		nextActionPriorite = 'moyenne';
		nextActionDeadline = '';
		save();
	}

	function removeAction(id: string) {
		actions = actions.filter((a) => a.id !== id);
		save();
	}

	function prioriteLabel(p: string): string {
		if (p === 'haute') return 'Haute';
		if (p === 'moyenne') return 'Moyenne';
		return 'Basse';
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					sprintNom,
					sprintDates,
					equipe,
					objectif,
					storiesPrevues,
					storiesLivrees,
					storiesReportees,
					bugsCritiques,
					retroItems,
					actions,
					metriques,
					date: new Date().toISOString().split('T')[0]
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
			const d = JSON.parse(saved);
			if (d.sprintNom) sprintNom = d.sprintNom;
			if (d.sprintDates) sprintDates = d.sprintDates;
			if (d.equipe) equipe = d.equipe;
			if (d.objectif) objectif = d.objectif;
			if (typeof d.storiesPrevues === 'number') storiesPrevues = d.storiesPrevues;
			if (typeof d.storiesLivrees === 'number') storiesLivrees = d.storiesLivrees;
			if (typeof d.storiesReportees === 'number') storiesReportees = d.storiesReportees;
			if (typeof d.bugsCritiques === 'number') bugsCritiques = d.bugsCritiques;
			if (d.retroItems) {
				for (const q of quadrants) {
					if (Array.isArray(d.retroItems[q.id])) {
						retroItems[q.id] = d.retroItems[q.id];
					}
				}
			}
			if (Array.isArray(d.actions)) actions = d.actions;
			if (d.metriques) {
				for (const m of metriquesConfig) {
					const val = d.metriques[m.id];
					if (typeof val === 'number' && val >= 1 && val <= 5) {
						metriques[m.id] = val;
					}
				}
			}
		} catch {
			// ignore
		}
	}

	function handleReset() {
		sprintNom = '';
		sprintDates = '';
		equipe = '';
		objectif = '';
		storiesPrevues = 0;
		storiesLivrees = 0;
		storiesReportees = 0;
		bugsCritiques = 0;
		retroItems = {
			'bien': [],
			'moins-bien': [],
			'essayer': [],
			'arreter': []
		};
		newRetroText = {
			'bien': '',
			'moins-bien': '',
			'essayer': '',
			'arreter': ''
		};
		actions = [];
		nextActionDesc = '';
		nextActionOwner = '';
		nextActionPriorite = 'moyenne';
		nextActionDeadline = '';
		metriques = Object.fromEntries(metriquesConfig.map((m) => [m.id, 3]));
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const lines: string[] = [
			'# Bilan de sprint',
			'',
			`**Date du bilan :** ${today}`,
			`**Sprint :** ${sprintNom || '(non renseigne)'}`,
			`**Dates :** ${sprintDates || '(non renseigne)'}`,
			`**Equipe :** ${equipe || '(non renseigne)'}`,
			''
		];

		if (objectif.trim()) {
			lines.push(`**Objectif :** ${objectif.trim()}`, '');
		}

		lines.push('## Delivery', '');
		lines.push(`- Stories prevues : ${storiesPrevues}`);
		lines.push(`- Stories livrees : ${storiesLivrees}`);
		lines.push(`- Stories reportees : ${storiesReportees}`);
		lines.push(`- Bugs critiques en prod : ${bugsCritiques}`);
		lines.push(`- **Taux de completion : ${tauxCompletion} %**`);
		lines.push('');

		lines.push('## Retrospective', '');
		for (const q of quadrants) {
			const items = retroItems[q.id];
			if (items.length === 0) continue;
			lines.push(`### ${q.label}`, '');
			for (const item of items) {
				lines.push(`- ${item.text}`);
			}
			lines.push('');
		}

		lines.push('## Metriques qualite', '');
		for (const m of metriquesConfig) {
			lines.push(`- ${m.label} : ${metriques[m.id]}/5`);
		}
		lines.push(`- **Moyenne : ${moyenneMetriques}/5**`);
		lines.push('');

		if (actions.length > 0) {
			lines.push('## Actions', '');
			for (const action of actions) {
				const prio = prioriteLabel(action.priorite);
				const ownerStr = action.owner ? ` — _${action.owner}_` : '';
				const deadlineStr = action.deadline ? ` (echeance : ${action.deadline})` : '';
				lines.push(`- [ ] [${prio}] ${action.description}${ownerStr}${deadlineStr}`);
			}
			lines.push('');
		}

		lines.push(`**Tendance :** ${trend.label}`, '');
		lines.push('---', `_Genere avec l'outil Bilan de sprint — ${TOOL_URL}_`);

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
		sprintNom;
		sprintDates;
		equipe;
		objectif;
		storiesPrevues;
		storiesLivrees;
		storiesReportees;
		bugsCritiques;
		JSON.stringify(retroItems);
		JSON.stringify(actions);
		JSON.stringify(metriques);
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<div class="tool-form">
			<!-- Contexte -->
			<section class="form-section">
				<h2 class="section-title">Contexte</h2>

				<div class="field-row">
					<div class="field-group">
						<label class="field-label" for="bs-nom">Numero / nom du sprint</label>
						<input
							id="bs-nom"
							type="text"
							class="field-input"
							placeholder="Sprint 42"
							bind:value={sprintNom}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="bs-dates">Dates</label>
						<input
							id="bs-dates"
							type="text"
							class="field-input"
							placeholder="10-24 mars 2026"
							bind:value={sprintDates}
						/>
					</div>
				</div>

				<div class="field-group">
					<label class="field-label" for="bs-equipe">Equipe</label>
					<input
						id="bs-equipe"
						type="text"
						class="field-input"
						placeholder="Nom de l'equipe"
						bind:value={equipe}
					/>
				</div>

				<div class="field-group">
					<label class="field-label" for="bs-objectif">Objectif du sprint</label>
					<textarea
						id="bs-objectif"
						class="field-textarea"
						rows="2"
						placeholder="L'objectif principal de ce sprint..."
						bind:value={objectif}
					></textarea>
				</div>
			</section>

			<!-- Bilan delivery -->
			<section class="form-section">
				<h2 class="section-title">Bilan delivery</h2>

				<div class="field-row field-row--4">
					<div class="field-group">
						<label class="field-label" for="bs-prevues">Stories prevues</label>
						<input
							id="bs-prevues"
							type="number"
							class="field-input"
							min="0"
							bind:value={storiesPrevues}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="bs-livrees">Stories livrees</label>
						<input
							id="bs-livrees"
							type="number"
							class="field-input"
							min="0"
							bind:value={storiesLivrees}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="bs-reportees">Stories reportees</label>
						<input
							id="bs-reportees"
							type="number"
							class="field-input"
							min="0"
							bind:value={storiesReportees}
						/>
					</div>
					<div class="field-group">
						<label class="field-label" for="bs-bugs">Bugs critiques</label>
						<input
							id="bs-bugs"
							type="number"
							class="field-input"
							min="0"
							bind:value={bugsCritiques}
						/>
					</div>
				</div>

				<div class="delivery-completion">
					<span class="delivery-completion-label">Taux de completion</span>
					<div class="delivery-bar-track">
						<div
							class="delivery-bar-fill"
							class:delivery-bar--good={tauxCompletion >= 70}
							class:delivery-bar--mid={tauxCompletion >= 45 && tauxCompletion < 70}
							class:delivery-bar--low={tauxCompletion < 45}
							style="width: {Math.min(tauxCompletion, 100)}%"
						></div>
					</div>
					<span class="delivery-completion-pct">{tauxCompletion} %</span>
				</div>
			</section>

			<!-- Retrospective -->
			<section class="form-section">
				<h2 class="section-title">Retrospective</h2>

				<div class="retro-grid">
					{#each quadrants as quadrant}
						<div class="retro-quadrant retro-quadrant--{quadrant.colorName}">
							<div class="retro-quadrant-header">
								<span class="retro-quadrant-dot" style="background: {quadrant.color}"></span>
								<h3 class="retro-quadrant-title">{quadrant.label}</h3>
								<span class="retro-quadrant-count">{retroCounts[quadrant.id]}</span>
							</div>

							<div class="retro-add-row">
								<input
									type="text"
									class="field-input retro-input"
									placeholder="Ajouter un element..."
									bind:value={newRetroText[quadrant.id]}
									onkeydown={(e) => { if (e.key === 'Enter') addRetroItem(quadrant.id); }}
								/>
								<button
									class="tool-btn tool-btn--add"
									onclick={() => addRetroItem(quadrant.id)}
									disabled={!newRetroText[quadrant.id]?.trim()}
								>
									+
								</button>
							</div>

							{#if retroItems[quadrant.id]?.length > 0}
								<ul class="retro-items">
									{#each retroItems[quadrant.id] as item}
										<li class="retro-item">
											<span class="retro-item-text">{item.text}</span>
											<button
												class="retro-item-remove"
												onclick={() => removeRetroItem(quadrant.id, item.id)}
												aria-label="Supprimer : {item.text}"
											>
												&#x2715;
											</button>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				</div>
			</section>

			<!-- Actions -->
			<section class="form-section">
				<h2 class="section-title">Actions</h2>

				<div class="actions-add">
					<div class="actions-add-row">
						<input
							type="text"
							class="field-input actions-add-desc"
							placeholder="Description de l'action..."
							bind:value={nextActionDesc}
							onkeydown={(e) => { if (e.key === 'Enter') addAction(); }}
						/>
						<input
							type="text"
							class="field-input actions-add-owner"
							placeholder="Responsable"
							bind:value={nextActionOwner}
						/>
					</div>
					<div class="actions-add-row">
						<select class="field-select actions-add-prio" bind:value={nextActionPriorite}>
							<option value="haute">Haute</option>
							<option value="moyenne">Moyenne</option>
							<option value="basse">Basse</option>
						</select>
						<input
							type="text"
							class="field-input actions-add-deadline"
							placeholder="Echeance (ex: fin sprint 43)"
							bind:value={nextActionDeadline}
						/>
						<button
							class="tool-btn tool-btn--add"
							onclick={addAction}
							disabled={!nextActionDesc.trim()}
						>
							Ajouter
						</button>
					</div>
				</div>

				{#if actions.length > 0}
					<div class="actions-list">
						{#each actions as action}
							<div class="action-item">
								<div class="action-content">
									<div class="action-top">
										<span class="action-prio action-prio--{action.priorite}">
											{prioriteLabel(action.priorite)}
										</span>
										<span class="action-text">{action.description}</span>
									</div>
									<div class="action-meta">
										{#if action.owner}
											<span class="action-owner">{action.owner}</span>
										{/if}
										{#if action.deadline}
											<span class="action-deadline">{action.deadline}</span>
										{/if}
									</div>
								</div>
								<button
									class="action-remove"
									onclick={() => removeAction(action.id)}
									aria-label="Supprimer l'action : {action.description}"
								>
									&#x2715;
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</section>

			<!-- Metriques qualite -->
			<section class="form-section">
				<h2 class="section-title">Metriques qualite</h2>
				<p class="section-hint">Evaluation subjective de l'equipe sur ce sprint. Un repere, pas un verdict.</p>

				{#each metriquesConfig as metrique}
					<div class="metrique-row">
						<label class="metrique-label" for="bs-m-{metrique.id}">{metrique.label}</label>
						<input
							id="bs-m-{metrique.id}"
							type="range"
							class="metrique-slider"
							min="1"
							max="5"
							step="1"
							bind:value={metriques[metrique.id]}
						/>
						<span class="metrique-value">{metriques[metrique.id]}/5</span>
					</div>
				{/each}
			</section>

			<!-- Buttons -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Reinitialiser
				</button>
			</div>
		</div>

		<!-- Result panel (sticky) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Resultats</div>

			<!-- Trend -->
			<div class="result-trend" style="border-color: {trend.color}">
				<span class="result-trend-dot" style="background: {trend.color}"></span>
				<span class="result-trend-label" style="color: {trend.color}">{trend.label}</span>
			</div>

			<!-- Delivery score -->
			<div class="result-section">
				<div class="result-section-title">Delivery</div>
				<div class="result-big-number">
					<span class="result-big-value">{tauxCompletion}</span>
					<span class="result-big-unit">%</span>
				</div>
				<div class="result-delivery-details">
					<span>{storiesLivrees}/{storiesPrevues} stories</span>
					{#if storiesReportees > 0}
						<span>{storiesReportees} reportee{storiesReportees > 1 ? 's' : ''}</span>
					{/if}
					{#if bugsCritiques > 0}
						<span class="result-bugs">{bugsCritiques} bug{bugsCritiques > 1 ? 's' : ''} critique{bugsCritiques > 1 ? 's' : ''}</span>
					{/if}
				</div>
			</div>

			<!-- Quality radar -->
			<div class="result-section">
				<div class="result-section-title">Qualite ({moyenneMetriques}/5)</div>
				<div class="radar-container">
					<svg viewBox="0 0 200 200" class="radar-svg">
						<!-- Grid -->
						{#each [1, 2, 3, 4, 5] as level}
							<polygon
								points={gridPoints(level)}
								fill="none"
								stroke="var(--border)"
								stroke-width="0.5"
								opacity="0.5"
							/>
						{/each}
						<!-- Axes -->
						{#each radarPoints as point}
							<line
								x1="100"
								y1="100"
								x2={100 + 80 * Math.cos(Math.atan2(point.y - 100, point.x - 100))}
								y2={100 + 80 * Math.sin(Math.atan2(point.y - 100, point.x - 100))}
								stroke="var(--border)"
								stroke-width="0.5"
								opacity="0.3"
							/>
						{/each}
						<!-- Data polygon -->
						<polygon
							points={radarPolygon}
							fill="var(--accent)"
							fill-opacity="0.15"
							stroke="var(--accent)"
							stroke-width="1.5"
						/>
						<!-- Points -->
						{#each radarPoints as point}
							<circle cx={point.x} cy={point.y} r="3" fill="var(--accent)" />
						{/each}
						<!-- Labels -->
						{#each radarPoints as point}
							<text
								x={point.labelX}
								y={point.labelY}
								text-anchor="middle"
								dominant-baseline="middle"
								fill="var(--secondary)"
								font-size="7"
								font-family="var(--font-ui)"
							>
								{point.label}
							</text>
						{/each}
					</svg>
				</div>
			</div>

			<!-- Retro summary -->
			{#if totalRetroItems > 0}
				<div class="result-section">
					<div class="result-section-title">Retro ({totalRetroItems})</div>
					<div class="result-retro-summary">
						{#each quadrants as q}
							{#if retroCounts[q.id] > 0}
								<div class="result-retro-row">
									<span class="result-retro-dot" style="background: {q.color}"></span>
									<span class="result-retro-label">{q.label}</span>
									<span class="result-retro-count">{retroCounts[q.id]}</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- Actions -->
			{#if actions.length > 0}
				<div class="result-section">
					<div class="result-section-title">Actions ({actions.length})</div>
					{#each actions as action}
						<div class="result-action-item">
							<span class="result-action-prio action-prio--{action.priorite}">
								{prioriteLabel(action.priorite).charAt(0)}
							</span>
							<span class="result-action-text">{action.description}</span>
							{#if action.owner}
								<span class="result-action-owner">{action.owner}</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Context -->
			{#if sprintNom || equipe}
				<div class="result-context">
					{#if sprintNom}
						<div class="result-context-row">
							<span class="result-context-label">Sprint</span>
							<span class="result-context-value">{sprintNom}</span>
						</div>
					{/if}
					{#if sprintDates}
						<div class="result-context-row">
							<span class="result-context-label">Dates</span>
							<span class="result-context-value">{sprintDates}</span>
						</div>
					{/if}
					{#if equipe}
						<div class="result-context-row">
							<span class="result-context-label">Equipe</span>
							<span class="result-context-value">{equipe}</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
		--retro-green: #06b6d4;
		--retro-red: #ef4444;
		--retro-violet: #8b5cf6;
		--retro-amber: #f59e0b;
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
		gap: calc(var(--gap) * 1.5);
	}

	/* Sections */
	.form-section {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		color: var(--primary);
		margin: 0;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
	}

	.section-hint {
		font-size: 13px;
		color: var(--tertiary);
		margin: 0;
		font-style: italic;
		line-height: 1.5;
	}

	/* Fields */
	.field-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--content-gap);
	}

	.field-row--4 {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.field-label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--secondary);
	}

	.field-input,
	.field-select,
	.field-textarea {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
		background: var(--accent-light);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 8px 12px;
		transition: var(--transition);
	}

	.field-input:focus,
	.field-select:focus,
	.field-textarea:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 2px rgba(var(--accent-rgb, 179, 122, 8), 0.15);
	}

	.field-input::placeholder,
	.field-textarea::placeholder {
		color: var(--tertiary);
	}

	.field-textarea {
		resize: vertical;
		min-height: 60px;
	}

	.field-select {
		cursor: pointer;
	}

	/* Delivery bar */
	.delivery-completion {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		background: var(--accent-light);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.delivery-completion-label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--secondary);
		white-space: nowrap;
	}

	.delivery-bar-track {
		flex: 1;
		height: 8px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.delivery-bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 0;
	}

	.delivery-bar--good {
		background: var(--retro-green);
	}

	.delivery-bar--mid {
		background: var(--retro-amber);
	}

	.delivery-bar--low {
		background: var(--retro-red);
	}

	.delivery-completion-pct {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		min-width: 44px;
		text-align: right;
	}

	/* Retro grid */
	.retro-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--content-gap);
	}

	.retro-quadrant {
		padding: 12px;
		border-radius: var(--radius);
		background: var(--accent-light);
		border: 1px solid var(--border);
	}

	.retro-quadrant--green {
		border-left: 3px solid var(--retro-green);
	}

	.retro-quadrant--red {
		border-left: 3px solid var(--retro-red);
	}

	.retro-quadrant--violet {
		border-left: 3px solid var(--retro-violet);
	}

	.retro-quadrant--amber {
		border-left: 3px solid var(--retro-amber);
	}

	.retro-quadrant-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.retro-quadrant-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.retro-quadrant-title {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
		margin: 0;
		flex: 1;
	}

	.retro-quadrant-count {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
		color: var(--tertiary);
	}

	.retro-add-row {
		display: flex;
		gap: 6px;
		margin-bottom: 6px;
	}

	.retro-input {
		flex: 1;
		font-size: 13px !important;
		padding: 6px 10px !important;
	}

	.retro-items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.retro-item {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 0;
	}

	.retro-item-text {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--primary);
		flex: 1;
	}

	.retro-item-remove {
		background: none;
		border: none;
		color: var(--tertiary);
		cursor: pointer;
		font-size: 12px;
		padding: 2px;
		line-height: 1;
		transition: var(--transition);
		flex-shrink: 0;
	}

	.retro-item-remove:hover {
		color: var(--primary);
	}

	/* Actions */
	.actions-add {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.actions-add-row {
		display: flex;
		gap: 8px;
		align-items: stretch;
	}

	.actions-add-desc {
		flex: 1;
	}

	.actions-add-owner {
		width: 140px;
		flex-shrink: 0;
	}

	.actions-add-prio {
		width: 120px;
		flex-shrink: 0;
	}

	.actions-add-deadline {
		flex: 1;
	}

	.tool-btn--add {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		padding: 8px 16px;
		border-radius: var(--radius);
		cursor: pointer;
		transition: var(--transition);
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--accent);
		white-space: nowrap;
	}

	.tool-btn--add:hover:not(:disabled) {
		background: var(--accent);
		color: #fff;
	}

	.tool-btn--add:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.actions-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.action-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: var(--accent-light);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.action-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.action-top {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.action-prio {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 3px;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		flex-shrink: 0;
	}

	.action-prio--haute {
		background: rgba(239, 68, 68, 0.15);
		color: var(--retro-red);
	}

	.action-prio--moyenne {
		background: rgba(245, 158, 11, 0.15);
		color: var(--retro-amber);
	}

	.action-prio--basse {
		background: rgba(6, 182, 212, 0.15);
		color: var(--retro-green);
	}

	.action-text {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
	}

	.action-meta {
		display: flex;
		gap: 12px;
		align-items: baseline;
	}

	.action-owner {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--accent);
	}

	.action-deadline {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--tertiary);
	}

	.action-remove {
		background: none;
		border: none;
		color: var(--tertiary);
		cursor: pointer;
		font-size: 14px;
		padding: 4px;
		line-height: 1;
		transition: var(--transition);
	}

	.action-remove:hover {
		color: var(--primary);
	}

	/* Metriques sliders */
	.metrique-row {
		display: grid;
		grid-template-columns: 180px 1fr 40px;
		align-items: center;
		gap: 12px;
	}

	.metrique-label {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	.metrique-slider {
		width: 100%;
		accent-color: var(--accent);
		cursor: pointer;
	}

	.metrique-value {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		text-align: right;
	}

	/* Tool actions */
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

	/* Result panel */
	.tool-result {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		position: sticky;
		top: calc(var(--header-height) + var(--gap));
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 600;
		color: var(--primary);
	}

	/* Trend */
	.result-trend {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border: 1px solid;
		border-radius: var(--radius);
		background: var(--accent-light);
	}

	.result-trend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.result-trend-label {
		font-family: var(--font-ui);
		font-size: 15px;
		font-weight: 700;
	}

	/* Delivery result */
	.result-section {
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.result-section-title {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 8px;
	}

	.result-big-number {
		display: flex;
		align-items: baseline;
		gap: 2px;
		margin-bottom: 4px;
	}

	.result-big-value {
		font-family: var(--font-mono);
		font-size: 36px;
		font-weight: 700;
		color: var(--accent);
		line-height: 1;
	}

	.result-big-unit {
		font-family: var(--font-mono);
		font-size: 16px;
		color: var(--secondary);
	}

	.result-delivery-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--tertiary);
	}

	.result-bugs {
		color: var(--retro-red);
		font-weight: 600;
	}

	/* Radar */
	.radar-container {
		max-width: 220px;
		margin: 0 auto;
	}

	.radar-svg {
		width: 100%;
		height: auto;
	}

	/* Retro summary */
	.result-retro-summary {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.result-retro-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.result-retro-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.result-retro-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		flex: 1;
	}

	.result-retro-count {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
	}

	/* Result actions */
	.result-action-item {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 3px 0;
	}

	.result-action-prio {
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		font-size: 10px;
		flex-shrink: 0;
	}

	.result-action-text {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.result-action-owner {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 600;
		color: var(--accent);
		flex-shrink: 0;
	}

	/* Context */
	.result-context {
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.result-context-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 3px 0;
	}

	.result-context-label {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--tertiary);
	}

	.result-context-value {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.field-row {
			grid-template-columns: 1fr;
		}

		.field-row--4 {
			grid-template-columns: 1fr 1fr;
		}

		.retro-grid {
			grid-template-columns: 1fr;
		}

		.metrique-row {
			grid-template-columns: 1fr 1fr 40px;
		}

		.metrique-label {
			grid-column: 1 / -1;
		}

		.actions-add-row {
			flex-wrap: wrap;
		}

		.actions-add-desc {
			min-width: 100%;
		}

		.actions-add-owner,
		.actions-add-prio,
		.actions-add-deadline {
			width: auto;
			flex: 1;
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
