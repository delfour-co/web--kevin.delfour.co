<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-generateur-adr';
	const TOOL_URL = 'https://kevin.delfour.co/outils/generateur-adr/';

	const STATUS_OPTIONS = ['Proposé', 'Accepté', 'Rejeté', 'Déprécié', 'Remplacé'] as const;

	let title = $state('');
	let date = $state(new Date().toISOString().split('T')[0]);
	let status = $state<string>('Proposé');
	let context = $state('');
	let decision = $state('');
	let consequences = $state('');
	let options = $state<{ name: string; pros: string; cons: string }[]>([
		{ name: '', pros: '', cons: '' },
		{ name: '', pros: '', cons: '' }
	]);
	let participants = $state('');

	let copyFeedback = $state(false);

	function addOption() {
		options.push({ name: '', pros: '', cons: '' });
	}

	function removeOption(index: number) {
		if (options.length > 2) {
			options.splice(index, 1);
		}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ title, date, status, context, decision, consequences, options, participants })
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.title) title = d.title;
				if (d.date) date = d.date;
				if (d.status) status = d.status;
				if (d.context) context = d.context;
				if (d.decision) decision = d.decision;
				if (d.consequences) consequences = d.consequences;
				if (d.participants) participants = d.participants;
				if (Array.isArray(d.options) && d.options.length >= 2) {
					options = d.options;
				}
			}
		} catch {}
	}

	function handleReset() {
		title = '';
		date = new Date().toISOString().split('T')[0];
		status = 'Proposé';
		context = '';
		decision = '';
		consequences = '';
		options = [
			{ name: '', pros: '', cons: '' },
			{ name: '', pros: '', cons: '' }
		];
		participants = '';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function generateMarkdown(): string {
		const lines: string[] = [
			`# ADR : ${title || 'Sans titre'}`,
			'',
			`**Date :** ${date}`,
			`**Statut :** ${status}`,
		];

		if (participants.trim()) {
			lines.push(`**Participants :** ${participants.trim()}`);
		}

		lines.push('', '## Contexte', '', context || '_Non renseigné_');

		lines.push('', '## Options considérées', '');
		for (let i = 0; i < options.length; i++) {
			const opt = options[i];
			if (opt.name.trim()) {
				lines.push(`### Option ${i + 1} : ${opt.name}`);
				if (opt.pros.trim()) lines.push('', `**Avantages :** ${opt.pros}`);
				if (opt.cons.trim()) lines.push('', `**Inconvénients :** ${opt.cons}`);
				lines.push('');
			}
		}

		lines.push('## Décision', '', decision || '_Non renseigné_');
		lines.push('', '## Conséquences', '', consequences || '_Non renseigné_');
		lines.push('', '---', `_Généré avec l'outil Générateur d'ADR — ${TOOL_URL}_`);

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
		// Auto-save on any change
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="adr-form">
		<div class="form-row form-row--two">
			<div class="form-group">
				<label for="adr-title">Titre de la décision</label>
				<input id="adr-title" type="text" bind:value={title} placeholder="Ex: Adopter PostgreSQL comme base principale" />
			</div>
			<div class="form-group form-group--small">
				<label for="adr-date">Date</label>
				<input id="adr-date" type="date" bind:value={date} />
			</div>
		</div>

		<div class="form-row form-row--two">
			<div class="form-group">
				<label for="adr-status">Statut</label>
				<select id="adr-status" bind:value={status}>
					{#each STATUS_OPTIONS as s}
						<option value={s}>{s}</option>
					{/each}
				</select>
			</div>
			<div class="form-group">
				<label for="adr-participants">Participants</label>
				<input id="adr-participants" type="text" bind:value={participants} placeholder="Ex: CTO, Lead Dev, Architecte" />
			</div>
		</div>

		<div class="form-group">
			<label for="adr-context">Contexte</label>
			<p class="form-hint">Décris la situation qui amène cette décision. Quel problème résoudre ? Quelles contraintes ?</p>
			<textarea id="adr-context" bind:value={context} rows="4" placeholder="Nous devons choisir une base de données pour le nouveau service de paiement..."></textarea>
		</div>

		<fieldset class="options-section">
			<legend>Options considérées</legend>
			<p class="form-hint">Au moins 2 options. Pour chacune, identifie les avantages et inconvénients.</p>

			{#each options as opt, i}
				<div class="option-card">
					<div class="option-header">
						<span class="option-number">Option {i + 1}</span>
						{#if options.length > 2}
							<button class="option-remove" onclick={() => removeOption(i)} aria-label="Supprimer l'option {i + 1}">Supprimer</button>
						{/if}
					</div>
					<div class="form-group">
						<label for="opt-name-{i}">Nom</label>
						<input id="opt-name-{i}" type="text" bind:value={opt.name} placeholder="Ex: PostgreSQL" />
					</div>
					<div class="form-row form-row--two">
						<div class="form-group">
							<label for="opt-pros-{i}">Avantages</label>
							<textarea id="opt-pros-{i}" bind:value={opt.pros} rows="2" placeholder="Maturité, communauté, extensions..."></textarea>
						</div>
						<div class="form-group">
							<label for="opt-cons-{i}">Inconvénients</label>
							<textarea id="opt-cons-{i}" bind:value={opt.cons} rows="2" placeholder="Courbe d'apprentissage, coût ops..."></textarea>
						</div>
					</div>
				</div>
			{/each}

			<button class="add-option-btn" onclick={addOption}>+ Ajouter une option</button>
		</fieldset>

		<div class="form-group">
			<label for="adr-decision">Décision</label>
			<p class="form-hint">Quelle option a été retenue et pourquoi ?</p>
			<textarea id="adr-decision" bind:value={decision} rows="4" placeholder="Nous avons décidé d'adopter PostgreSQL parce que..."></textarea>
		</div>

		<div class="form-group">
			<label for="adr-consequences">Conséquences</label>
			<p class="form-hint">Quels impacts positifs et négatifs cette décision entraîne-t-elle ?</p>
			<textarea id="adr-consequences" bind:value={consequences} rows="4" placeholder="L'équipe devra monter en compétence sur PostgreSQL..."></textarea>
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

	.adr-form {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.form-group--small {
		max-width: 180px;
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

	/* Options section */
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

	@media (max-width: 600px) {
		.form-row--two {
			grid-template-columns: 1fr;
		}

		.form-group--small {
			max-width: none;
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
