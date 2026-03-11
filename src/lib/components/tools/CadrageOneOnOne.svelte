<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-cadrage-one-on-one';
	const TOOL_URL = 'https://kevin.delfour.co/outils/cadrage-one-on-one/';

	interface Action {
		id: string;
		text: string;
		owner: 'moi' | 'collaborateur';
		deadline: string;
	}

	interface ThemeItem {
		id: string;
		label: string;
		checked: boolean;
	}

	interface ThemeCategory {
		id: string;
		label: string;
		hint: string;
		items: ThemeItem[];
	}

	const contextes = [
		{ value: 'onboarding', label: 'Onboarding' },
		{ value: 'croisiere', label: 'Croisiere' },
		{ value: 'tension', label: 'Tension' },
		{ value: 'transition', label: 'Transition' },
		{ value: 'depart', label: 'Depart' }
	];

	const frequences = [
		{ value: 'hebdo', label: 'Hebdomadaire' },
		{ value: 'bi-mensuel', label: 'Bi-mensuel' },
		{ value: 'mensuel', label: 'Mensuel' },
		{ value: 'ad-hoc', label: 'Ad hoc' }
	];

	function createThemes(): ThemeCategory[] {
		return [
			{
				id: 'bien-etre',
				label: 'Bien-etre',
				hint: "Ce que j'observe souvent : les signaux faibles sur le bien-etre sont ceux qu'on capte le moins en reunion d'equipe. Le 1:1 est parfois le seul espace ou ils emergent.",
				items: [
					{ id: 'be-charge', label: 'Charge de travail', checked: false },
					{ id: 'be-motivation', label: 'Motivation', checked: false },
					{ id: 'be-equilibre', label: 'Equilibre pro/perso', checked: false },
					{ id: 'be-relation', label: "Relation avec l'equipe", checked: false }
				]
			},
			{
				id: 'progression',
				label: 'Progression',
				hint: "Ce que j'observe souvent : la progression se discute rarement spontanement. Sans cadre explicite, elle reste implicite -- et les frustrations s'accumulent en silence.",
				items: [
					{ id: 'pr-objectifs', label: 'Objectifs en cours', checked: false },
					{ id: 'pr-competences', label: 'Competences a developper', checked: false },
					{ id: 'pr-feedback', label: 'Feedback recu/donne', checked: false },
					{ id: 'pr-carriere', label: 'Prochaine etape de carriere', checked: false }
				]
			},
			{
				id: 'operationnel',
				label: 'Operationnel',
				hint: "Ce que j'observe souvent : les blocages operationnels sont souvent les plus faciles a debloquer -- a condition de les nommer. Le 1:1 sert aussi a ca.",
				items: [
					{ id: 'op-blocages', label: 'Blocages actuels', checked: false },
					{ id: 'op-support', label: 'Besoin de support', checked: false },
					{ id: 'op-projets', label: 'Projets en cours', checked: false },
					{ id: 'op-processus', label: 'Processus a ameliorer', checked: false }
				]
			},
			{
				id: 'alignement',
				label: 'Alignement',
				hint: "Ce que j'observe souvent : le desalignement sur la vision ou les priorites ne se voit pas tout de suite. Il se revele quand les decisions divergent sans explication.",
				items: [
					{ id: 'al-vision', label: 'Vision produit/tech', checked: false },
					{ id: 'al-priorites', label: "Priorites de l'equipe", checked: false },
					{ id: 'al-decisions', label: 'Decisions a prendre', checked: false },
					{ id: 'al-feedbacks', label: 'Feedbacks a remonter', checked: false }
				]
			}
		];
	}

	let nom = $state('');
	let contexte = $state('croisiere');
	let frequence = $state('hebdo');
	let derniereAction = $state('');
	let themes = $state<ThemeCategory[]>(createThemes());
	let notes = $state('');
	let actions = $state<Action[]>([]);
	let copyFeedback = $state(false);

	let nextActionText = $state('');
	let nextActionOwner = $state<'moi' | 'collaborateur'>('moi');
	let nextActionDeadline = $state('');

	const totalThemes = $derived.by(() => {
		let total = 0;
		for (const cat of themes) {
			for (const item of cat.items) {
				total++;
			}
		}
		return total;
	});

	const checkedThemes = $derived.by(() => {
		let count = 0;
		for (const cat of themes) {
			for (const item of cat.items) {
				if (item.checked) count++;
			}
		}
		return count;
	});

	const preparationPct = $derived.by(() => {
		if (totalThemes === 0) return 0;
		return Math.round((checkedThemes / totalThemes) * 100);
	});

	const checkedByCategory = $derived.by(() => {
		const result: Record<string, { checked: number; total: number }> = {};
		for (const cat of themes) {
			let checked = 0;
			for (const item of cat.items) {
				if (item.checked) checked++;
			}
			result[cat.id] = { checked, total: cat.items.length };
		}
		return result;
	});

	function addAction() {
		if (!nextActionText.trim()) return;
		actions.push({
			id: crypto.randomUUID(),
			text: nextActionText.trim(),
			owner: nextActionOwner,
			deadline: nextActionDeadline
		});
		nextActionText = '';
		nextActionOwner = 'moi';
		nextActionDeadline = '';
		save();
	}

	function removeAction(id: string) {
		actions = actions.filter((a) => a.id !== id);
		save();
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					nom,
					contexte,
					frequence,
					derniereAction,
					themes: themes.map((cat) => ({
						id: cat.id,
						items: cat.items.map((item) => ({ id: item.id, checked: item.checked }))
					})),
					notes,
					actions,
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
			const data = JSON.parse(saved);
			if (data.nom) nom = data.nom;
			if (data.contexte) contexte = data.contexte;
			if (data.frequence) frequence = data.frequence;
			if (data.derniereAction) derniereAction = data.derniereAction;
			if (data.notes) notes = data.notes;
			if (Array.isArray(data.actions)) actions = data.actions;
			if (Array.isArray(data.themes)) {
				for (const savedCat of data.themes) {
					const cat = themes.find((c) => c.id === savedCat.id);
					if (!cat) continue;
					for (const savedItem of savedCat.items) {
						const item = cat.items.find((i) => i.id === savedItem.id);
						if (item) item.checked = savedItem.checked;
					}
				}
			}
		} catch {
			// ignore
		}
	}

	function handleReset() {
		nom = '';
		contexte = 'croisiere';
		frequence = 'hebdo';
		derniereAction = '';
		themes = createThemes();
		notes = '';
		actions = [];
		nextActionText = '';
		nextActionOwner = 'moi';
		nextActionDeadline = '';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const contexteLabel = contextes.find((c) => c.value === contexte)?.label || contexte;
		const frequenceLabel = frequences.find((f) => f.value === frequence)?.label || frequence;

		const lines: string[] = [
			'# Cadrage 1:1',
			'',
			`**Date :** ${today}`,
			`**Collaborateur :** ${nom || '(non renseigne)'}`,
			`**Contexte :** ${contexteLabel}`,
			`**Frequence :** ${frequenceLabel}`,
			''
		];

		if (derniereAction.trim()) {
			lines.push(`**Derniere action notable :** ${derniereAction.trim()}`, '');
		}

		lines.push('## Themes abordes', '');
		for (const cat of themes) {
			const checkedItems = cat.items.filter((i) => i.checked);
			if (checkedItems.length === 0) continue;
			lines.push(`### ${cat.label}`, '');
			for (const item of checkedItems) {
				lines.push(`- [x] ${item.label}`);
			}
			lines.push('');
		}

		if (notes.trim()) {
			lines.push('## Notes', '', notes.trim(), '');
		}

		if (actions.length > 0) {
			lines.push('## Actions', '');
			for (const action of actions) {
				const ownerLabel = action.owner === 'moi' ? 'Moi' : 'Collaborateur';
				const deadlineStr = action.deadline ? ` (echeance : ${action.deadline})` : '';
				lines.push(`- [ ] ${action.text} — _${ownerLabel}_${deadlineStr}`);
			}
			lines.push('');
		}

		lines.push('---', `_Genere avec l'outil Cadrage 1:1 — ${TOOL_URL}_`);

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
		// Track all reactive state to trigger save
		nom;
		contexte;
		frequence;
		derniereAction;
		notes;
		JSON.stringify(themes);
		JSON.stringify(actions);
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<div class="tool-form">
			<!-- Preparation -->
			<section class="form-section">
				<h2 class="section-title">Preparation</h2>

				<div class="field-group">
					<label class="field-label" for="oo-nom">Nom du collaborateur</label>
					<input
						id="oo-nom"
						type="text"
						class="field-input"
						placeholder="Prenom ou initiales"
						bind:value={nom}
					/>
				</div>

				<div class="field-row">
					<div class="field-group">
						<label class="field-label" for="oo-contexte">Contexte actuel</label>
						<select id="oo-contexte" class="field-select" bind:value={contexte}>
							{#each contextes as ctx}
								<option value={ctx.value}>{ctx.label}</option>
							{/each}
						</select>
					</div>

					<div class="field-group">
						<label class="field-label" for="oo-frequence">Frequence actuelle</label>
						<select id="oo-frequence" class="field-select" bind:value={frequence}>
							{#each frequences as freq}
								<option value={freq.value}>{freq.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="field-group">
					<label class="field-label" for="oo-derniere-action">Derniere action notable</label>
					<textarea
						id="oo-derniere-action"
						class="field-textarea"
						rows="2"
						placeholder="Ce qui s'est passe depuis le dernier 1:1..."
						bind:value={derniereAction}
					></textarea>
				</div>
			</section>

			<!-- Themes -->
			<section class="form-section">
				<h2 class="section-title">Themes a aborder</h2>

				{#each themes as category}
					<div class="theme-category">
						<div class="theme-category-header">
							<h3 class="theme-category-title">{category.label}</h3>
							<span class="theme-category-count">
								{checkedByCategory[category.id]?.checked || 0}/{category.items.length}
							</span>
						</div>
						<p class="theme-hint">{category.hint}</p>
						<div class="theme-items">
							{#each category.items as item}
								<label class="theme-item">
									<input
										type="checkbox"
										class="theme-checkbox"
										bind:checked={item.checked}
									/>
									<span class="theme-item-label">{item.label}</span>
								</label>
							{/each}
						</div>
					</div>
				{/each}
			</section>

			<!-- Notes & Actions -->
			<section class="form-section">
				<h2 class="section-title">Notes et actions</h2>

				<div class="field-group">
					<label class="field-label" for="oo-notes">Notes libres</label>
					<textarea
						id="oo-notes"
						class="field-textarea"
						rows="4"
						placeholder="Points a retenir, impressions, elements de contexte..."
						bind:value={notes}
					></textarea>
				</div>

				<div class="actions-add">
					<div class="actions-add-row">
						<input
							type="text"
							class="field-input actions-add-text"
							placeholder="Nouvelle action..."
							bind:value={nextActionText}
							onkeydown={(e) => { if (e.key === 'Enter') addAction(); }}
						/>
						<select class="field-select actions-add-owner" bind:value={nextActionOwner}>
							<option value="moi">Moi</option>
							<option value="collaborateur">Collaborateur</option>
						</select>
						<input
							type="date"
							class="field-input actions-add-date"
							bind:value={nextActionDeadline}
						/>
						<button
							class="tool-btn tool-btn--add"
							onclick={addAction}
							disabled={!nextActionText.trim()}
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
									<span class="action-text">{action.text}</span>
									<span class="action-meta">
										<span class="action-owner" class:action-owner--moi={action.owner === 'moi'}>
											{action.owner === 'moi' ? 'Moi' : 'Collaborateur'}
										</span>
										{#if action.deadline}
											<span class="action-deadline">{action.deadline}</span>
										{/if}
									</span>
								</div>
								<button
									class="action-remove"
									onclick={() => removeAction(action.id)}
									aria-label="Supprimer l'action : {action.text}"
								>
									&#x2715;
								</button>
							</div>
						{/each}
					</div>
				{/if}
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

		<!-- Bilan rapide (sticky right panel) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Bilan rapide</div>

			<div class="prep-indicator">
				<span class="prep-label">Preparation</span>
				<div class="prep-bar-track">
					<div
						class="prep-bar-fill"
						style="width: {preparationPct}%"
					></div>
				</div>
				<span class="prep-pct">{preparationPct} %</span>
			</div>

			<div class="category-summary">
				{#each themes as category}
					{@const stats = checkedByCategory[category.id]}
					<div class="category-row">
						<span class="category-row-label">{category.label}</span>
						<span class="category-row-count">
							{stats?.checked || 0}/{stats?.total || 0}
						</span>
						<div class="category-bar-track">
							<div
								class="category-bar-fill"
								style="width: {stats ? (stats.checked / stats.total) * 100 : 0}%"
							></div>
						</div>
					</div>
				{/each}
			</div>

			{#if actions.length > 0}
				<div class="result-actions-section">
					<div class="result-actions-title">Actions ({actions.length})</div>
					{#each actions as action}
						<div class="result-action-item">
							<span class="result-action-text">{action.text}</span>
							<span class="result-action-owner" class:action-owner--moi={action.owner === 'moi'}>
								{action.owner === 'moi' ? 'Moi' : 'Collab.'}
							</span>
						</div>
					{/each}
				</div>
			{/if}

			{#if nom || contexte !== 'croisiere'}
				<div class="result-context">
					{#if nom}
						<div class="result-context-row">
							<span class="result-context-label">Avec</span>
							<span class="result-context-value">{nom}</span>
						</div>
					{/if}
					<div class="result-context-row">
						<span class="result-context-label">Contexte</span>
						<span class="result-context-value">{contextes.find(c => c.value === contexte)?.label}</span>
					</div>
				</div>
			{/if}
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

	/* Theme categories */
	.theme-category {
		padding: 12px;
		border-radius: var(--radius);
		background: var(--accent-light);
		border: 1px solid var(--border);
	}

	.theme-category-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.theme-category-title {
		font-family: var(--font-ui);
		font-size: 15px;
		font-weight: 600;
		color: var(--primary);
		margin: 0;
	}

	.theme-category-count {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
	}

	.theme-hint {
		font-size: 12px;
		line-height: 1.5;
		color: var(--tertiary);
		margin: 0 0 10px 0;
		font-style: italic;
	}

	.theme-items {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
	}

	.theme-item {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		padding: 4px 0;
	}

	.theme-checkbox {
		accent-color: var(--accent);
		width: 16px;
		height: 16px;
		cursor: pointer;
		flex-shrink: 0;
	}

	.theme-item-label {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--primary);
	}

	/* Actions add form */
	.actions-add {
		margin-top: 4px;
	}

	.actions-add-row {
		display: flex;
		gap: 8px;
		align-items: stretch;
	}

	.actions-add-text {
		flex: 1;
	}

	.actions-add-owner {
		width: 130px;
		flex-shrink: 0;
	}

	.actions-add-date {
		width: 150px;
		flex-shrink: 0;
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

	/* Actions list */
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
		color: var(--secondary);
	}

	.action-owner--moi {
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
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: var(--content-gap);
	}

	/* Preparation indicator */
	.prep-indicator {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: var(--content-gap);
	}

	.prep-label {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--secondary);
		white-space: nowrap;
	}

	.prep-bar-track {
		flex: 1;
		height: 8px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.prep-bar-fill {
		height: 100%;
		border-radius: 4px;
		background: var(--accent);
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 0;
	}

	.prep-pct {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		min-width: 40px;
		text-align: right;
	}

	/* Category summary */
	.category-summary {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: var(--content-gap);
	}

	.category-row {
		display: grid;
		grid-template-columns: 100px 36px 1fr;
		align-items: center;
		gap: 8px;
	}

	.category-row-label {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	.category-row-count {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--primary);
		text-align: right;
	}

	.category-bar-track {
		height: 6px;
		background: var(--border);
		border-radius: 3px;
		overflow: hidden;
	}

	.category-bar-fill {
		height: 100%;
		border-radius: 3px;
		background: var(--accent);
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Result actions */
	.result-actions-section {
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
		margin-bottom: var(--content-gap);
	}

	.result-actions-title {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 8px;
	}

	.result-action-item {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 4px 0;
		gap: 8px;
	}

	.result-action-text {
		font-family: var(--font-ui);
		font-size: 13px;
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
		color: var(--secondary);
		flex-shrink: 0;
	}

	/* Result context */
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

		.theme-items {
			grid-template-columns: 1fr;
		}

		.actions-add-row {
			flex-wrap: wrap;
		}

		.actions-add-text {
			min-width: 100%;
		}

		.actions-add-owner,
		.actions-add-date {
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

		.category-row {
			grid-template-columns: 90px 32px 1fr;
		}
	}
</style>
