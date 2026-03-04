<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-checklist-code-review';
	const TOOL_URL = 'https://kevin.delfour.co/outils/checklist-code-review/';

	interface CheckItem {
		id: string;
		label: string;
		checked: boolean;
		note: string;
	}

	interface Category {
		id: string;
		name: string;
		items: CheckItem[];
	}

	function createChecklist(): Category[] {
		return [
			{
				id: 'lisibilite',
				name: 'Lisibilité',
				items: [
					{ id: 'l1', label: 'Le code est lisible sans commentaire explicatif', checked: false, note: '' },
					{ id: 'l2', label: 'Les noms de variables et fonctions sont explicites', checked: false, note: '' },
					{ id: 'l3', label: 'Les fonctions sont courtes et font une seule chose', checked: false, note: '' },
					{ id: 'l4', label: 'Le formatting est cohérent avec le reste du codebase', checked: false, note: '' },
					{ id: 'l5', label: 'Il n\'y a pas de code mort ou commenté', checked: false, note: '' }
				]
			},
			{
				id: 'architecture',
				name: 'Architecture',
				items: [
					{ id: 'a1', label: 'La responsabilité du code est clairement délimitée', checked: false, note: '' },
					{ id: 'a2', label: 'Les dépendances sont justifiées et minimales', checked: false, note: '' },
					{ id: 'a3', label: 'Le code respecte les patterns existants du projet', checked: false, note: '' },
					{ id: 'a4', label: 'Le couplage est faible, la cohésion est forte', checked: false, note: '' },
					{ id: 'a5', label: 'Il n\'y a pas de duplication logique évitable', checked: false, note: '' }
				]
			},
			{
				id: 'tests',
				name: 'Tests',
				items: [
					{ id: 't1', label: 'Les cas nominaux sont testés', checked: false, note: '' },
					{ id: 't2', label: 'Les cas limites sont couverts', checked: false, note: '' },
					{ id: 't3', label: 'Les tests sont lisibles et maintenables', checked: false, note: '' },
					{ id: 't4', label: 'Les tests passent en local', checked: false, note: '' },
					{ id: 't5', label: 'Il n\'y a pas de tests flaky ou fragiles', checked: false, note: '' }
				]
			},
			{
				id: 'securite',
				name: 'Sécurité',
				items: [
					{ id: 's1', label: 'Les entrées utilisateur sont validées et sanitizées', checked: false, note: '' },
					{ id: 's2', label: 'Il n\'y a pas de secret en dur dans le code', checked: false, note: '' },
					{ id: 's3', label: 'Les permissions et accès sont vérifiés', checked: false, note: '' },
					{ id: 's4', label: 'Les requêtes SQL sont paramétrées', checked: false, note: '' },
					{ id: 's5', label: 'Les logs ne contiennent pas de données sensibles', checked: false, note: '' }
				]
			},
			{
				id: 'performance',
				name: 'Performance',
				items: [
					{ id: 'p1', label: 'Il n\'y a pas de requête N+1 évidente', checked: false, note: '' },
					{ id: 'p2', label: 'Les opérations coûteuses sont optimisées ou cachées', checked: false, note: '' },
					{ id: 'p3', label: 'La pagination est en place pour les listes', checked: false, note: '' },
					{ id: 'p4', label: 'Les index de base de données sont adaptés', checked: false, note: '' }
				]
			},
			{
				id: 'documentation',
				name: 'Documentation',
				items: [
					{ id: 'd1', label: 'Le message de commit est clair et descriptif', checked: false, note: '' },
					{ id: 'd2', label: 'La description de PR explique le contexte', checked: false, note: '' },
					{ id: 'd3', label: 'Les changements de contrat API sont documentés', checked: false, note: '' },
					{ id: 'd4', label: 'Le README est mis à jour si nécessaire', checked: false, note: '' }
				]
			}
		];
	}

	let categories = $state<Category[]>(createChecklist());
	let prTitle = $state('');
	let copyFeedback = $state(false);
	let expandedNotes = $state<Record<string, boolean>>({});

	const stats = $derived(() => {
		let total = 0;
		let checked = 0;
		for (const cat of categories) {
			for (const item of cat.items) {
				total++;
				if (item.checked) checked++;
			}
		}
		return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
	});

	const categoryStats = $derived(() => {
		return categories.map((cat) => {
			const total = cat.items.length;
			const checked = cat.items.filter((i) => i.checked).length;
			return { id: cat.id, total, checked, complete: checked === total };
		});
	});

	function toggleNote(itemId: string) {
		expandedNotes[itemId] = !expandedNotes[itemId];
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ categories, prTitle }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.prTitle) prTitle = d.prTitle;
				if (Array.isArray(d.categories)) categories = d.categories;
			}
		} catch {}
	}

	function handleReset() {
		categories = createChecklist();
		prTitle = '';
		expandedNotes = {};
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const s = stats();
		const lines = [
			`# Code Review : ${prTitle || 'Sans titre'}`,
			'',
			`**Date :** ${today}`,
			`**Progression :** ${s.checked}/${s.total} (${s.pct}%)`,
			''
		];

		for (const cat of categories) {
			lines.push(`## ${cat.name}`, '');
			for (const item of cat.items) {
				const check = item.checked ? 'x' : ' ';
				lines.push(`- [${check}] ${item.label}`);
				if (item.note.trim()) {
					lines.push(`  > ${item.note.trim()}`);
				}
			}
			lines.push('');
		}

		lines.push('---', `_Généré avec la Checklist Code Review — ${TOOL_URL}_`);
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
	<div class="form-group" style="margin-bottom: var(--gap);">
		<label for="pr-title">Titre de la PR / du review</label>
		<input id="pr-title" type="text" bind:value={prTitle} placeholder="Ex: feat: ajout endpoint /users" />
	</div>

	<!-- Global progress -->
	<div class="global-progress">
		<div class="progress-bar">
			<div class="progress-fill" style="width: {stats().pct}%"></div>
		</div>
		<span class="progress-text">{stats().checked}/{stats().total} ({stats().pct}%)</span>
	</div>

	<!-- Categories -->
	{#each categories as cat, ci}
		{@const cs = categoryStats()[ci]}
		<div class="category-section" class:category-section--complete={cs.complete}>
			<div class="category-header">
				<h2 class="category-name">{cat.name}</h2>
				<span class="category-count" class:category-count--complete={cs.complete}>
					{cs.checked}/{cs.total}
				</span>
			</div>

			<div class="check-list">
				{#each cat.items as item}
					<div class="check-item">
						<label class="check-label">
							<input type="checkbox" bind:checked={item.checked} class="check-input" />
							<span class="check-text" class:check-text--done={item.checked}>{item.label}</span>
						</label>
						<button
							class="note-toggle"
							class:note-toggle--active={item.note.trim().length > 0}
							onclick={() => toggleNote(item.id)}
							aria-label="Ajouter une note"
						>
							{item.note.trim() ? 'Note' : '+'}
						</button>
						{#if expandedNotes[item.id]}
							<textarea
								class="note-input"
								bind:value={item.note}
								placeholder="Note ou commentaire..."
								rows="2"
							></textarea>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div class="tool-actions">
		<button class="tool-btn tool-btn--primary" onclick={handleExport}>
			{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
		</button>
		<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Réinitialiser</button>
	</div>
</div>

<style>
	.tool-container {
		max-width: 720px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.form-group label {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	input[type='text'] {
		font-family: var(--font-body);
		font-size: 15px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
		width: 100%;
		box-sizing: border-box;
	}

	input[type='text']:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	/* Global progress */
	.global-progress {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.progress-bar {
		flex: 1;
		height: 8px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 4px;
		transition: width 0.3s ease;
	}

	.progress-text {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--secondary);
		white-space: nowrap;
	}

	/* Category */
	.category-section {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin-bottom: var(--gap);
		overflow: hidden;
	}

	.category-section--complete {
		border-color: var(--accent-border);
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 16px;
		background: var(--code-bg, var(--entry));
	}

	.category-name {
		font-size: 0.95rem;
		margin: 0;
	}

	.category-count {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		padding: 2px 8px;
		background: var(--border);
		border-radius: 10px;
	}

	.category-count--complete {
		background: var(--accent);
		color: #fff;
	}

	.check-list {
		padding: 8px 16px;
	}

	.check-item {
		padding: 6px 0;
		border-bottom: 1px solid var(--border);
	}

	.check-item:last-child {
		border-bottom: none;
	}

	.check-label {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		cursor: pointer;
	}

	.check-input {
		margin-top: 3px;
		accent-color: var(--accent);
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		cursor: pointer;
	}

	.check-text {
		font-size: 14px;
		line-height: 1.5;
		color: var(--primary);
		flex: 1;
	}

	.check-text--done {
		text-decoration: line-through;
		color: var(--secondary);
	}

	.note-toggle {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
		background: none;
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 2px 8px;
		cursor: pointer;
		float: right;
		margin-top: -24px;
		transition: var(--transition);
	}

	.note-toggle--active {
		color: var(--accent);
		border-color: var(--accent-border);
	}

	.note-toggle:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.note-input {
		width: 100%;
		margin-top: 6px;
		font-family: var(--font-body);
		font-size: 13px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		resize: vertical;
		min-height: 40px;
		box-sizing: border-box;
	}

	.note-input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
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
