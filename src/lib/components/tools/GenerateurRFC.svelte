<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-generateur-rfc';
	const TOOL_URL = 'https://kevin.delfour.co/outils/generateur-rfc/';

	const STATUS_OPTIONS = ['Brouillon', 'En discussion', 'Accepté', 'Rejeté', 'Abandonné'] as const;

	let title = $state('');
	let author = $state('');
	let date = $state(new Date().toISOString().split('T')[0]);
	let status = $state<string>('Brouillon');
	let reviewers = $state('');

	let problem = $state('');
	let context = $state('');
	let proposal = $state('');
	let alternatives = $state<{ name: string; description: string }[]>([
		{ name: '', description: '' }
	]);
	let impact = $state('');
	let migration = $state('');
	let risks = $state('');
	let timeline = $state('');

	let copyFeedback = $state(false);

	function addAlternative() {
		alternatives.push({ name: '', description: '' });
	}

	function removeAlternative(index: number) {
		if (alternatives.length > 1) {
			alternatives.splice(index, 1);
		}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					title, author, date, status, reviewers,
					problem, context, proposal, alternatives,
					impact, migration, risks, timeline
				})
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.title) title = d.title;
				if (d.author) author = d.author;
				if (d.date) date = d.date;
				if (d.status) status = d.status;
				if (d.reviewers) reviewers = d.reviewers;
				if (d.problem) problem = d.problem;
				if (d.context) context = d.context;
				if (d.proposal) proposal = d.proposal;
				if (Array.isArray(d.alternatives)) alternatives = d.alternatives;
				if (d.impact) impact = d.impact;
				if (d.migration) migration = d.migration;
				if (d.risks) risks = d.risks;
				if (d.timeline) timeline = d.timeline;
			}
		} catch {}
	}

	function handleReset() {
		title = '';
		author = '';
		date = new Date().toISOString().split('T')[0];
		status = 'Brouillon';
		reviewers = '';
		problem = '';
		context = '';
		proposal = '';
		alternatives = [{ name: '', description: '' }];
		impact = '';
		migration = '';
		risks = '';
		timeline = '';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function generateMarkdown(): string {
		const lines: string[] = [
			`# RFC : ${title || 'Sans titre'}`,
			'',
			`**Auteur :** ${author || '—'}`,
			`**Date :** ${date}`,
			`**Statut :** ${status}`,
		];

		if (reviewers.trim()) {
			lines.push(`**Reviewers :** ${reviewers}`);
		}

		lines.push(
			'',
			'## Problème',
			'',
			problem || '_Non renseigné_',
			'',
			'## Contexte',
			'',
			context || '_Non renseigné_',
			'',
			'## Solution proposée',
			'',
			proposal || '_Non renseigné_',
			'',
			'## Alternatives considérées',
			''
		);

		for (let i = 0; i < alternatives.length; i++) {
			const alt = alternatives[i];
			if (alt.name.trim()) {
				lines.push(`### ${alt.name}`);
				lines.push('', alt.description || '_Pas de description_', '');
			}
		}

		if (impact.trim()) {
			lines.push('## Impact', '', impact, '');
		}

		if (migration.trim()) {
			lines.push('## Plan de migration', '', migration, '');
		}

		if (risks.trim()) {
			lines.push('## Risques identifiés', '', risks, '');
		}

		if (timeline.trim()) {
			lines.push('## Timeline', '', timeline, '');
		}

		lines.push('---', `_Généré avec le Générateur de RFC — ${TOOL_URL}_`);
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

	$effect(() => {
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="rfc-form">
		<!-- Metadata -->
		<div class="form-row form-row--three">
			<div class="form-group">
				<label for="rfc-title">Titre de la RFC</label>
				<input id="rfc-title" type="text" bind:value={title} placeholder="Ex: Migration vers Event Sourcing" />
			</div>
			<div class="form-group">
				<label for="rfc-author">Auteur</label>
				<input id="rfc-author" type="text" bind:value={author} placeholder="Ton nom" />
			</div>
			<div class="form-group">
				<label for="rfc-date">Date</label>
				<input id="rfc-date" type="date" bind:value={date} />
			</div>
		</div>

		<div class="form-row form-row--two">
			<div class="form-group">
				<label for="rfc-status">Statut</label>
				<select id="rfc-status" bind:value={status}>
					{#each STATUS_OPTIONS as s}
						<option value={s}>{s}</option>
					{/each}
				</select>
			</div>
			<div class="form-group">
				<label for="rfc-reviewers">Reviewers</label>
				<input id="rfc-reviewers" type="text" bind:value={reviewers} placeholder="Ex: Lead Backend, Staff Engineer" />
			</div>
		</div>

		<!-- Content sections -->
		<div class="form-group">
			<label for="rfc-problem">Problème</label>
			<p class="form-hint">Quel problème cette RFC adresse-t-elle ? Pourquoi maintenant ?</p>
			<textarea id="rfc-problem" bind:value={problem} rows="3" placeholder="Les événements métier sont perdus après traitement..."></textarea>
		</div>

		<div class="form-group">
			<label for="rfc-context">Contexte</label>
			<p class="form-hint">Contraintes actuelles, décisions passées, état du système.</p>
			<textarea id="rfc-context" bind:value={context} rows="3" placeholder="Le système actuel utilise un pattern CRUD classique..."></textarea>
		</div>

		<div class="form-group">
			<label for="rfc-proposal">Solution proposée</label>
			<p class="form-hint">Décris la solution en détail. Architecture, composants, interfaces.</p>
			<textarea id="rfc-proposal" bind:value={proposal} rows="5" placeholder="Introduire un Event Store basé sur PostgreSQL avec..."></textarea>
		</div>

		<!-- Alternatives -->
		<fieldset class="options-section">
			<legend>Alternatives considérées</legend>
			<p class="form-hint">Quelles autres approches ont été envisagées ?</p>

			{#each alternatives as alt, i}
				<div class="option-card">
					<div class="option-header">
						<span class="option-number">Alternative {i + 1}</span>
						{#if alternatives.length > 1}
							<button class="option-remove" onclick={() => removeAlternative(i)} aria-label="Supprimer l'alternative {i + 1}">Supprimer</button>
						{/if}
					</div>
					<div class="form-group">
						<label for="alt-name-{i}">Nom</label>
						<input id="alt-name-{i}" type="text" bind:value={alt.name} placeholder="Ex: Kafka Streams" />
					</div>
					<div class="form-group">
						<label for="alt-desc-{i}">Description et raison du rejet</label>
						<textarea id="alt-desc-{i}" bind:value={alt.description} rows="2" placeholder="Trop complexe pour notre taille d'équipe..."></textarea>
					</div>
				</div>
			{/each}

			<button class="add-option-btn" onclick={addAlternative}>+ Ajouter une alternative</button>
		</fieldset>

		<div class="form-group">
			<label for="rfc-impact">Impact</label>
			<p class="form-hint">Quels systèmes, équipes ou processus sont impactés ?</p>
			<textarea id="rfc-impact" bind:value={impact} rows="3" placeholder="Impact sur le service de facturation, migration des données existantes..."></textarea>
		</div>

		<div class="form-group">
			<label for="rfc-migration">Plan de migration</label>
			<p class="form-hint">Comment passer de l'état actuel à la cible ? Étapes, feature flags, rollback.</p>
			<textarea id="rfc-migration" bind:value={migration} rows="3" placeholder="Phase 1 : dual-write pendant 2 sprints..."></textarea>
		</div>

		<div class="form-row form-row--two">
			<div class="form-group">
				<label for="rfc-risks">Risques identifiés</label>
				<textarea id="rfc-risks" bind:value={risks} rows="3" placeholder="Risque de perte de données pendant la migration..."></textarea>
			</div>
			<div class="form-group">
				<label for="rfc-timeline">Timeline</label>
				<textarea id="rfc-timeline" bind:value={timeline} rows="3" placeholder="Sprint 1 : POC, Sprint 2-3 : implémentation..."></textarea>
			</div>
		</div>

		<div class="tool-actions">
			<button class="tool-btn tool-btn--primary" onclick={handleExport}>
				{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
			</button>
			<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Réinitialiser</button>
		</div>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
	}

	.rfc-form {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
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

	.form-hint {
		font-size: 13px;
		color: var(--secondary);
		margin: 0 0 4px 0;
		font-style: italic;
	}

	.form-row--two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}

	.form-row--three {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: var(--gap);
	}

	input[type='text'],
	input[type='date'],
	select,
	textarea {
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

	.options-section {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin: 0;
	}

	.options-section legend {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		padding: 0 8px;
	}

	.option-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin-bottom: 12px;
		background: var(--code-bg, var(--entry));
	}

	.option-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.option-number {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.option-remove {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		background: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 4px 10px;
		cursor: pointer;
		transition: var(--transition);
	}

	.option-remove:hover {
		color: #c0392b;
		border-color: #c0392b;
	}

	.add-option-btn {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		color: var(--accent);
		background: none;
		border: 1px dashed var(--accent-border);
		border-radius: var(--radius);
		padding: 10px;
		width: 100%;
		cursor: pointer;
		transition: var(--transition);
	}

	.add-option-btn:hover {
		background: var(--accent-light);
	}

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

	@media (max-width: 600px) {
		.form-row--two,
		.form-row--three {
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
