<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-entretien-annuel';
	const TOOL_URL = 'https://kevin.delfour.co/outils/entretien-annuel-tech/';

	const ANCIENNETE_OPTIONS = ['< 1 an', '1-2 ans', '2-4 ans', '4+ ans'] as const;
	const STATUS_OBJECTIF = ['Atteint', 'Partiel', 'Non atteint'] as const;
	const PRIORITY_OPTIONS = ['Haute', 'Moyenne', 'Basse'] as const;

	const axes = [
		{
			id: 'qualite',
			name: 'Qualite du code',
			label: 'Qualite',
			hint: "Ce que j'observe souvent : la qualite ne se mesure pas qu'aux bugs. Lisibilite, tests, nommage, dette maitrisee."
		},
		{
			id: 'autonomie',
			name: 'Autonomie technique',
			label: 'Autonomie',
			hint: "Ce que j'observe souvent : l'autonomie n'est pas l'absence de questions. C'est la capacite a cadrer un probleme avant de demander de l'aide."
		},
		{
			id: 'contribution',
			name: "Contribution a l'equipe",
			label: 'Contribution',
			hint: "Ce que j'observe souvent : les revues de code constructives, le partage de connaissances, l'aide aux collegues en difficulte."
		},
		{
			id: 'engagements',
			name: 'Respect des engagements',
			label: 'Engagements',
			hint: "Ce que j'observe souvent : ce n'est pas de finir tout a temps. C'est de signaler tot quand ca derive, et de proposer des ajustements."
		},
		{
			id: 'progression',
			name: 'Progression sur la periode',
			label: 'Progression',
			hint: "Ce que j'observe souvent : la progression visible n'est pas toujours technique. Maturite dans les echanges, meilleure gestion des priorites."
		},
		{
			id: 'initiative',
			name: 'Initiative et proactivite',
			label: 'Initiative',
			hint: "Ce que j'observe souvent : proposer une amelioration sans attendre qu'on la demande. Identifier un risque et le remonter."
		}
	];

	// Profil
	let nom = $state('');
	let poste = $state('');
	let anciennete = $state<string>('1-2 ans');
	let periode = $state(new Date().getFullYear().toString());

	// Bilan technique
	let scores = $state<Record<string, number>>(
		Object.fromEntries(axes.map((a) => [a.id, 3]))
	);

	// Points marquants
	let realisations = $state('');
	let difficultes = $state('');
	let feedbackPairs = $state('');

	// Objectifs precedents
	let objectifsPrecedents = $state<{ label: string; status: string }[]>([
		{ label: '', status: 'Atteint' }
	]);

	// Nouveaux objectifs
	let nouveauxObjectifs = $state<{ label: string; priority: string }[]>([
		{ label: '', priority: 'Moyenne' }
	]);

	// Plan de developpement
	let competences = $state<string[]>([]);
	let newCompetence = $state('');
	let actionsDev = $state<{ action: string; owner: string; deadline: string }[]>([
		{ action: '', owner: '', deadline: '' }
	]);
	let formations = $state('');

	let copyFeedback = $state(false);

	// Computed
	const average = $derived.by(() => {
		const vals = Object.values(scores);
		return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
	});

	const niveau = $derived.by(() => {
		if (average <= 2) return { label: 'Progression attendue', color: '#f59e0b' };
		if (average <= 3) return { label: 'En bonne voie', color: 'var(--accent2)' };
		if (average <= 4) return { label: 'Performant', color: 'var(--accent)' };
		return { label: 'Exceptionnel', color: 'var(--accent3)' };
	});

	const objectifsStats = $derived.by(() => {
		const valid = objectifsPrecedents.filter((o) => o.label.trim());
		const atteints = valid.filter((o) => o.status === 'Atteint').length;
		return { total: valid.length, atteints };
	});

	const actionsDevSummary = $derived.by(() => {
		return actionsDev.filter((a) => a.action.trim()).length;
	});

	// Hexagonal radar chart (6 axes)
	const radarPoints = $derived.by(() => {
		const cx = 150;
		const cy = 150;
		const maxR = 120;
		const n = axes.length;
		return axes.map((a, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			const r = (scores[a.id] / 5) * maxR;
			return {
				x: cx + r * Math.cos(angle),
				y: cy + r * Math.sin(angle),
				labelX: cx + (maxR + 22) * Math.cos(angle),
				labelY: cy + (maxR + 22) * Math.sin(angle),
				name: a.label
			};
		});
	});

	const radarPolygon = $derived(
		radarPoints.map((p) => `${p.x},${p.y}`).join(' ')
	);

	function gridPoints(level: number): string {
		const cx = 150;
		const cy = 150;
		const maxR = 120;
		const n = axes.length;
		const r = (level / 5) * maxR;
		return axes
			.map((_, i) => {
				const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
				return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
			})
			.join(' ');
	}

	// Objectifs precedents management
	function addObjectifPrecedent() {
		objectifsPrecedents.push({ label: '', status: 'Atteint' });
	}

	function removeObjectifPrecedent(index: number) {
		if (objectifsPrecedents.length > 1) {
			objectifsPrecedents.splice(index, 1);
		}
	}

	// Nouveaux objectifs management
	function addNouvelObjectif() {
		nouveauxObjectifs.push({ label: '', priority: 'Moyenne' });
	}

	function removeNouvelObjectif(index: number) {
		if (nouveauxObjectifs.length > 1) {
			nouveauxObjectifs.splice(index, 1);
		}
	}

	// Competences tags management
	function addCompetence() {
		const val = newCompetence.trim();
		if (val && !competences.includes(val)) {
			competences.push(val);
			newCompetence = '';
		}
	}

	function removeCompetence(index: number) {
		competences.splice(index, 1);
	}

	function handleCompetenceKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			addCompetence();
		}
	}

	// Actions de developpement management
	function addActionDev() {
		actionsDev.push({ action: '', owner: '', deadline: '' });
	}

	function removeActionDev(index: number) {
		if (actionsDev.length > 1) {
			actionsDev.splice(index, 1);
		}
	}

	// Persistence
	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					nom,
					poste,
					anciennete,
					periode,
					scores,
					realisations,
					difficultes,
					feedbackPairs,
					objectifsPrecedents,
					nouveauxObjectifs,
					competences,
					actionsDev,
					formations
				})
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.nom) nom = d.nom;
				if (d.poste) poste = d.poste;
				if (d.anciennete) anciennete = d.anciennete;
				if (d.periode) periode = d.periode;
				if (d.scores) {
					for (const a of axes) {
						const val = parseInt(d.scores[a.id], 10);
						if (!isNaN(val) && val >= 1 && val <= 5) {
							scores[a.id] = val;
						}
					}
				}
				if (d.realisations) realisations = d.realisations;
				if (d.difficultes) difficultes = d.difficultes;
				if (d.feedbackPairs) feedbackPairs = d.feedbackPairs;
				if (Array.isArray(d.objectifsPrecedents) && d.objectifsPrecedents.length >= 1) {
					objectifsPrecedents = d.objectifsPrecedents;
				}
				if (Array.isArray(d.nouveauxObjectifs) && d.nouveauxObjectifs.length >= 1) {
					nouveauxObjectifs = d.nouveauxObjectifs;
				}
				if (Array.isArray(d.competences)) competences = d.competences;
				if (Array.isArray(d.actionsDev) && d.actionsDev.length >= 1) {
					actionsDev = d.actionsDev;
				}
				if (d.formations) formations = d.formations;
			}
		} catch {}
	}

	function handleReset() {
		nom = '';
		poste = '';
		anciennete = '1-2 ans';
		periode = new Date().getFullYear().toString();
		for (const a of axes) {
			scores[a.id] = 3;
		}
		realisations = '';
		difficultes = '';
		feedbackPairs = '';
		objectifsPrecedents = [{ label: '', status: 'Atteint' }];
		nouveauxObjectifs = [{ label: '', priority: 'Moyenne' }];
		competences = [];
		newCompetence = '';
		actionsDev = [{ action: '', owner: '', deadline: '' }];
		formations = '';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function generateMarkdown(): string {
		const today = new Date().toISOString().split('T')[0];
		const lines: string[] = [
			'# Entretien annuel tech',
			'',
			`**Collaborateur :** ${nom || '_Non renseigne_'}`,
			`**Poste :** ${poste || '_Non renseigne_'}`,
			`**Anciennete :** ${anciennete}`,
			`**Periode evaluee :** ${periode || '_Non renseignee_'}`,
			`**Date de l'entretien :** ${today}`,
			'',
			'## Bilan technique',
			'',
			`**Score global :** ${average}/5 — ${niveau.label}`,
			'',
			...axes.map((a) => `- ${a.name} : ${scores[a.id]}/5`),
			''
		];

		if (realisations.trim()) {
			lines.push('## Realisations cles', '', realisations.trim(), '');
		}

		if (difficultes.trim()) {
			lines.push('## Difficultes rencontrees', '', difficultes.trim(), '');
		}

		if (feedbackPairs.trim()) {
			lines.push('## Retours des pairs', '', feedbackPairs.trim(), '');
		}

		const validObjPrec = objectifsPrecedents.filter((o) => o.label.trim());
		if (validObjPrec.length > 0) {
			lines.push('## Objectifs de la periode precedente', '');
			for (const o of validObjPrec) {
				const icon = o.status === 'Atteint' ? '[x]' : o.status === 'Partiel' ? '[-]' : '[ ]';
				lines.push(`- ${icon} ${o.label} — _${o.status}_`);
			}
			lines.push('');
		}

		const validNewObj = nouveauxObjectifs.filter((o) => o.label.trim());
		if (validNewObj.length > 0) {
			lines.push('## Nouveaux objectifs', '');
			for (const o of validNewObj) {
				lines.push(`- ${o.label} _(${o.priority})_`);
			}
			lines.push('');
		}

		if (competences.length > 0 || actionsDev.some((a) => a.action.trim()) || formations.trim()) {
			lines.push('## Plan de developpement', '');

			if (competences.length > 0) {
				lines.push('**Competences a developper :** ' + competences.join(', '), '');
			}

			const validActions = actionsDev.filter((a) => a.action.trim());
			if (validActions.length > 0) {
				lines.push('**Actions concretes :**', '');
				for (const a of validActions) {
					const parts = [`- ${a.action}`];
					if (a.owner.trim()) parts.push(`(${a.owner})`);
					if (a.deadline.trim()) parts.push(`— echeance : ${a.deadline}`);
					lines.push(parts.join(' '));
				}
				lines.push('');
			}

			if (formations.trim()) {
				lines.push('**Formations / accompagnements :**', '', formations.trim(), '');
			}
		}

		lines.push('---', `_Genere avec l'outil Entretien annuel tech — ${TOOL_URL}_`);
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
	<div class="tool-layout">
		<div class="tool-form">
			<!-- Profil -->
			<fieldset class="section-card">
				<legend>Profil</legend>

				<div class="form-row form-row--two">
					<div class="form-group">
						<label for="ea-nom">Nom du collaborateur</label>
						<input id="ea-nom" type="text" bind:value={nom} placeholder="Prenom Nom" />
					</div>
					<div class="form-group">
						<label for="ea-poste">Poste actuel</label>
						<input id="ea-poste" type="text" bind:value={poste} placeholder="Developpeur backend senior" />
					</div>
				</div>

				<div class="form-row form-row--two">
					<div class="form-group">
						<label for="ea-anciennete">Anciennete</label>
						<select id="ea-anciennete" bind:value={anciennete}>
							{#each ANCIENNETE_OPTIONS as opt}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label for="ea-periode">Periode evaluee</label>
						<input id="ea-periode" type="text" bind:value={periode} placeholder="2025" />
					</div>
				</div>
			</fieldset>

			<!-- Bilan technique -->
			<fieldset class="section-card">
				<legend>Bilan technique</legend>
				<p class="section-hint">Ce que j'observe souvent : un bilan technique utile ne cherche pas la precision absolue. Il pose un repere de depart pour la discussion.</p>

				{#each axes as axis}
					<div class="slider-group">
						<div class="slider-label">
							<span class="slider-name">{axis.name}</span>
							<span class="slider-value">{scores[axis.id]}/5</span>
						</div>
						<p class="slider-hint">{axis.hint}</p>
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
						<div class="slider-scale">
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>
							<span>5</span>
						</div>
					</div>
				{/each}
			</fieldset>

			<!-- Points marquants -->
			<fieldset class="section-card">
				<legend>Points marquants</legend>

				<div class="form-group">
					<label for="ea-realisations">Realisations cles</label>
					<p class="form-hint">Ce que j'observe souvent : les realisations les plus significatives ne sont pas toujours les plus visibles. Pense aux contributions silencieuses.</p>
					<textarea id="ea-realisations" bind:value={realisations} rows="3" placeholder="Migration du service de paiement, accompagnement d'un junior, reduction de 40% du temps d'integration continue..."></textarea>
				</div>

				<div class="form-group">
					<label for="ea-difficultes">Difficultes rencontrees</label>
					<p class="form-hint">Ce que j'observe souvent : nommer les difficultes sans les minimiser permet d'identifier les vrais leviers de progression.</p>
					<textarea id="ea-difficultes" bind:value={difficultes} rows="3" placeholder="Difficulte a prioriser entre feature et dette, contexte d'equipe tendu au T2..."></textarea>
				</div>

				<div class="form-group">
					<label for="ea-feedback-pairs">Retours des pairs <span class="optional">(optionnel)</span></label>
					<textarea id="ea-feedback-pairs" bind:value={feedbackPairs} rows="3" placeholder="Retours recueillis aupres des collegues, du responsable technique, du chef de produit..."></textarea>
				</div>
			</fieldset>

			<!-- Objectifs precedents -->
			<fieldset class="section-card">
				<legend>Objectifs de la periode precedente</legend>

				{#each objectifsPrecedents as obj, i}
					<div class="list-item">
						<div class="list-item-content">
							<input type="text" bind:value={obj.label} placeholder="Objectif..." class="list-item-input" />
							<select bind:value={obj.status} class="list-item-select">
								{#each STATUS_OBJECTIF as s}
									<option value={s}>{s}</option>
								{/each}
							</select>
						</div>
						{#if objectifsPrecedents.length > 1}
							<button class="item-remove" onclick={() => removeObjectifPrecedent(i)} aria-label="Supprimer l'objectif {i + 1}">Supprimer</button>
						{/if}
					</div>
				{/each}

				<button class="add-btn" onclick={addObjectifPrecedent}>+ Ajouter un objectif</button>
			</fieldset>

			<!-- Nouveaux objectifs -->
			<fieldset class="section-card">
				<legend>Nouveaux objectifs</legend>
				<p class="section-hint">Ce que j'observe souvent : 3 a 5 objectifs clairs valent mieux que 10 vagues. Chaque objectif devrait pouvoir etre evalue en fin de periode.</p>

				{#each nouveauxObjectifs as obj, i}
					<div class="list-item">
						<div class="list-item-content">
							<input type="text" bind:value={obj.label} placeholder="Nouvel objectif..." class="list-item-input" />
							<select bind:value={obj.priority} class="list-item-select list-item-select--priority">
								{#each PRIORITY_OPTIONS as p}
									<option value={p}>{p}</option>
								{/each}
							</select>
						</div>
						{#if nouveauxObjectifs.length > 1}
							<button class="item-remove" onclick={() => removeNouvelObjectif(i)} aria-label="Supprimer l'objectif {i + 1}">Supprimer</button>
						{/if}
					</div>
				{/each}

				<button class="add-btn" onclick={addNouvelObjectif}>+ Ajouter un objectif</button>
			</fieldset>

			<!-- Plan de developpement -->
			<fieldset class="section-card">
				<legend>Plan de developpement</legend>

				<div class="form-group">
					<label for="ea-new-competence">Competences a developper</label>
					<div class="tags-input">
						<div class="tags-list">
							{#each competences as comp, i}
								<span class="tag">
									{comp}
									<button class="tag-remove" onclick={() => removeCompetence(i)} aria-label="Retirer {comp}">x</button>
								</span>
							{/each}
						</div>
						<div class="tags-add">
							<input
								id="ea-new-competence"
								type="text"
								bind:value={newCompetence}
								placeholder="Ex: Kubernetes, architecture hexagonale..."
								onkeydown={handleCompetenceKeydown}
							/>
							<button class="tags-add-btn" onclick={addCompetence} disabled={!newCompetence.trim()}>Ajouter</button>
						</div>
					</div>
				</div>

				<div class="form-group">
					<span class="form-label" id="ea-actions-label">Actions concretes</span>
					<p class="form-hint">Ce que j'observe souvent : une action sans responsable ni echeance reste un voeu pieux.</p>

					{#each actionsDev as action, i}
						<div class="action-card">
							<div class="action-fields">
								<input type="text" bind:value={action.action} placeholder="Action..." class="action-input" />
								<input type="text" bind:value={action.owner} placeholder="Responsable" class="action-owner" />
								<input type="text" bind:value={action.deadline} placeholder="Echeance" class="action-deadline" />
							</div>
							{#if actionsDev.length > 1}
								<button class="item-remove" onclick={() => removeActionDev(i)} aria-label="Supprimer l'action {i + 1}">Supprimer</button>
							{/if}
						</div>
					{/each}

					<button class="add-btn" onclick={addActionDev}>+ Ajouter une action</button>
				</div>

				<div class="form-group">
					<label for="ea-formations">Formations ou accompagnements identifies</label>
					<textarea id="ea-formations" bind:value={formations} rows="3" placeholder="Formation Docker avancee, accompagnement technique, conference DDD Europe..."></textarea>
				</div>
			</fieldset>

			<!-- Actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copie dans le presse-papier' : 'Copier le bilan (format texte)'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Reinitialiser</button>
			</div>
		</div>

		<!-- Result panel -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Synthese</div>

			{#if nom.trim()}
				<div class="result-profile">
					<span class="result-name">{nom}</span>
					{#if poste.trim()}
						<span class="result-poste">{poste}</span>
					{/if}
				</div>
			{/if}

			<div class="overall-level" style="border-color: {niveau.color}">
				<span class="overall-level-label">Niveau global</span>
				<span class="overall-level-value" style="color: {niveau.color}">{niveau.label}</span>
				<span class="overall-level-score">{average}/5</span>
			</div>

			<div class="radar-container">
				<svg viewBox="0 0 300 300" class="radar-svg" aria-hidden="true">
					{#each [1, 2, 3, 4, 5] as level}
						<polygon points={gridPoints(level)} class="radar-grid" />
					{/each}

					{#each radarPoints as point}
						<line x1="150" y1="150" x2={point.x} y2={point.y} class="radar-axis" />
					{/each}

					<polygon points={radarPolygon} class="radar-data" />

					{#each radarPoints as point}
						<circle cx={point.x} cy={point.y} r="4" class="radar-dot" />
					{/each}

					{#each radarPoints as point}
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
					<span class="summary-label">Score moyen</span>
					<span class="summary-value summary-value--accent">{average}/5</span>
				</div>
				{#if objectifsStats.total > 0}
					<div class="summary-row">
						<span class="summary-label">Objectifs atteints</span>
						<span class="summary-value">{objectifsStats.atteints}/{objectifsStats.total}</span>
					</div>
				{/if}
				{#if nouveauxObjectifs.filter((o) => o.label.trim()).length > 0}
					<div class="summary-row">
						<span class="summary-label">Nouveaux objectifs</span>
						<span class="summary-value">{nouveauxObjectifs.filter((o) => o.label.trim()).length}</span>
					</div>
				{/if}
			</div>

			{#if competences.length > 0 || actionsDevSummary > 0}
				<div class="dev-plan-summary">
					<div class="dev-plan-title">Plan de developpement</div>
					{#if competences.length > 0}
						<div class="dev-plan-tags">
							{#each competences as comp}
								<span class="dev-plan-tag">{comp}</span>
							{/each}
						</div>
					{/if}
					{#if actionsDevSummary > 0}
						<div class="summary-row">
							<span class="summary-label">Actions definies</span>
							<span class="summary-value">{actionsDevSummary}</span>
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

	/* Section cards */
	.section-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	.section-card legend {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		padding: 0 8px;
	}

	.section-hint {
		font-size: 13px;
		color: var(--secondary);
		margin: 0;
		font-style: italic;
		line-height: 1.5;
	}

	/* Form elements */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.form-group label,
	.form-label {
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

	.optional {
		font-weight: 400;
		color: var(--secondary);
		font-size: 12px;
	}

	.form-row--two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}

	input[type='text'],
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

	/* Sliders */
	.slider-group {
		padding-bottom: 8px;
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
		font-style: italic;
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

	.slider-scale {
		display: flex;
		justify-content: space-between;
		padding: 2px 0 0;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--tertiary);
	}

	/* List items (objectifs) */
	.list-item {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.list-item-content {
		display: flex;
		gap: 8px;
		flex: 1;
	}

	.list-item-input {
		flex: 1;
	}

	.list-item-select {
		width: 140px;
		flex-shrink: 0;
	}

	.list-item-select--priority {
		width: 120px;
	}

	.item-remove {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		background: none;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 4px 10px;
		cursor: pointer;
		transition: var(--transition);
		white-space: nowrap;
	}

	.item-remove:hover {
		color: #c0392b;
		border-color: #c0392b;
	}

	.add-btn {
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

	.add-btn:hover {
		background: var(--accent-light);
	}

	/* Tags input */
	.tags-input {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 500;
		color: var(--accent);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: 16px;
		padding: 4px 10px;
	}

	.tag-remove {
		background: none;
		border: none;
		color: var(--secondary);
		cursor: pointer;
		font-size: 14px;
		padding: 0 2px;
		line-height: 1;
		transition: var(--transition);
	}

	.tag-remove:hover {
		color: #c0392b;
	}

	.tags-add {
		display: flex;
		gap: 8px;
	}

	.tags-add input {
		flex: 1;
	}

	.tags-add-btn {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		padding: 8px 16px;
		border-radius: var(--radius);
		border: 1px solid var(--accent-border);
		background: var(--accent-light);
		color: var(--accent);
		cursor: pointer;
		transition: var(--transition);
		white-space: nowrap;
	}

	.tags-add-btn:hover:not(:disabled) {
		background: var(--accent);
		color: #fff;
	}

	.tags-add-btn:disabled {
		opacity: 0.4;
		cursor: default;
	}

	/* Action cards */
	.action-card {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.action-fields {
		display: grid;
		grid-template-columns: 1fr 150px 120px;
		gap: 8px;
		flex: 1;
	}

	.action-input,
	.action-owner,
	.action-deadline {
		font-family: var(--font-body);
		font-size: 14px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
		width: 100%;
		box-sizing: border-box;
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

	.result-profile {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-bottom: var(--content-gap);
		padding-bottom: var(--content-gap);
		border-bottom: 1px solid var(--border);
	}

	.result-name {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		color: var(--primary);
	}

	.result-poste {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	/* Overall level */
	.overall-level {
		text-align: center;
		padding: 16px;
		border: 1px solid;
		border-radius: var(--radius);
		margin-bottom: var(--content-gap);
		background: rgba(0, 0, 0, 0.2);
		transition: border-color 0.3s ease;
	}

	.overall-level-label {
		display: block;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.overall-level-value {
		display: block;
		font-family: var(--font-heading);
		font-size: 22px;
		font-weight: 700;
		transition: color 0.3s ease;
	}

	.overall-level-score {
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

	/* Dev plan summary */
	.dev-plan-summary {
		margin-top: var(--content-gap);
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
	}

	.dev-plan-title {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 12px;
	}

	.dev-plan-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 12px;
	}

	.dev-plan-tag {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: 12px;
		padding: 2px 10px;
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
		.form-row--two {
			grid-template-columns: 1fr;
		}

		.list-item-content {
			flex-direction: column;
		}

		.list-item-select {
			width: 100%;
		}

		.list-item-select--priority {
			width: 100%;
		}

		.action-fields {
			grid-template-columns: 1fr;
		}

		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}

		.tags-add {
			flex-direction: column;
		}
	}
</style>
