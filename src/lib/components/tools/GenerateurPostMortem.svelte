<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-postmortem';
	const TOOL_URL = 'https://kevin.delfour.co/outils/generateur-post-mortem/';

	const SEVERITY_OPTIONS = ['P1', 'P2', 'P3', 'P4'] as const;
	const PRIORITY_OPTIONS = ['Immédiat', 'Court terme', 'Moyen terme'] as const;
	const STATUS_OPTIONS = ['À faire', 'En cours', 'Fait'] as const;

	// Metadata
	let title = $state('');
	let incidentDate = $state(new Date().toISOString().split('T')[0]);
	let duration = $state('');
	let severity = $state<string>('P2');
	let author = $state('');
	let participants = $state('');

	// Timeline
	let timeline = $state<{ time: string; event: string }[]>([{ time: '', event: '' }]);

	// Impact
	let usersImpacted = $state('');
	let servicesImpacted = $state('');
	let businessImpact = $state('');
	let slaViolated = $state('');

	// Root cause
	let immediateCause = $state('');
	let rootCause = $state('');
	let contributingFactors = $state('');

	// Actions
	let actions = $state<{ action: string; owner: string; priority: string; status: string }[]>([
		{ action: '', owner: '', priority: 'Immédiat', status: 'À faire' }
	]);

	// Lessons learned
	let lessons = $state('');

	let copyFeedback = $state(false);

	// Timeline management
	function addTimelineEvent() {
		timeline.push({ time: '', event: '' });
	}

	function removeTimelineEvent(index: number) {
		if (timeline.length > 1) {
			timeline.splice(index, 1);
		}
	}

	// Actions management
	function addAction() {
		actions.push({ action: '', owner: '', priority: 'Immédiat', status: 'À faire' });
	}

	function removeAction(index: number) {
		if (actions.length > 1) {
			actions.splice(index, 1);
		}
	}

	// Severity badge color
	function severityColor(sev: string): string {
		switch (sev) {
			case 'P1':
				return '#ef4444';
			case 'P2':
				return '#f59e0b';
			case 'P3':
				return '#eab308';
			case 'P4':
				return 'var(--secondary)';
			default:
				return 'var(--secondary)';
		}
	}

	// Completeness
	let completeness = $derived.by(() => {
		const sections = [
			// Metadata
			title.trim() || incidentDate || duration.trim() || author.trim(),
			// Timeline
			timeline.some((t) => t.time.trim() || t.event.trim()),
			// Impact
			usersImpacted.trim() || servicesImpacted.trim() || businessImpact.trim(),
			// Root cause
			immediateCause.trim() || rootCause.trim(),
			// Actions
			actions.some((a) => a.action.trim()),
			// Lessons
			lessons.trim()
		];
		const filled = sections.filter(Boolean).length;
		return Math.round((filled / sections.length) * 100);
	});

	// Actions summary
	let actionsSummary = $derived.by(() => {
		const validActions = actions.filter((a) => a.action.trim());
		const byPriority: Record<string, number> = {};
		const byStatus: Record<string, number> = {};
		for (const a of validActions) {
			byPriority[a.priority] = (byPriority[a.priority] || 0) + 1;
			byStatus[a.status] = (byStatus[a.status] || 0) + 1;
		}
		return { total: validActions.length, byPriority, byStatus };
	});

	// Sorted timeline for display
	let sortedTimeline = $derived(
		timeline
			.filter((t) => t.time.trim() || t.event.trim())
			.sort((a, b) => a.time.localeCompare(b.time))
	);

	// Persistence
	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					title,
					incidentDate,
					duration,
					severity,
					author,
					participants,
					timeline,
					usersImpacted,
					servicesImpacted,
					businessImpact,
					slaViolated,
					immediateCause,
					rootCause,
					contributingFactors,
					actions,
					lessons
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
				if (d.incidentDate) incidentDate = d.incidentDate;
				if (d.duration) duration = d.duration;
				if (d.severity) severity = d.severity;
				if (d.author) author = d.author;
				if (d.participants) participants = d.participants;
				if (Array.isArray(d.timeline) && d.timeline.length >= 1) timeline = d.timeline;
				if (d.usersImpacted) usersImpacted = d.usersImpacted;
				if (d.servicesImpacted) servicesImpacted = d.servicesImpacted;
				if (d.businessImpact) businessImpact = d.businessImpact;
				if (d.slaViolated) slaViolated = d.slaViolated;
				if (d.immediateCause) immediateCause = d.immediateCause;
				if (d.rootCause) rootCause = d.rootCause;
				if (d.contributingFactors) contributingFactors = d.contributingFactors;
				if (Array.isArray(d.actions) && d.actions.length >= 1) actions = d.actions;
				if (d.lessons) lessons = d.lessons;
			}
		} catch {}
	}

	function handleReset() {
		title = '';
		incidentDate = new Date().toISOString().split('T')[0];
		duration = '';
		severity = 'P2';
		author = '';
		participants = '';
		timeline = [{ time: '', event: '' }];
		usersImpacted = '';
		servicesImpacted = '';
		businessImpact = '';
		slaViolated = '';
		immediateCause = '';
		rootCause = '';
		contributingFactors = '';
		actions = [{ action: '', owner: '', priority: 'Immédiat', status: 'À faire' }];
		lessons = '';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function generateMarkdown(): string {
		const lines: string[] = [
			`# Retour d’expérience (post-mortem) : ${title || 'Sans titre'}`,
			'',
			`**Date de l'incident :** ${incidentDate}`,
			`**Durée :** ${duration || '_Non renseigné_'}`,
			`**Gravité :** ${severity}`,
			`**Auteur :** ${author || '_Non renseigné_'}`
		];

		if (participants.trim()) {
			lines.push(`**Participants :** ${participants.trim()}`);
		}

		// Timeline
		lines.push('', '## Chronologie');
		const filledTimeline = timeline.filter((t) => t.time.trim() || t.event.trim());
		if (filledTimeline.length) {
			lines.push('');
			const sorted = [...filledTimeline].sort((a, b) => a.time.localeCompare(b.time));
			for (const t of sorted) {
				lines.push(`- **${t.time || '??:??'}** — ${t.event || '_Non renseigné_'}`);
			}
		} else {
			lines.push('', '_Aucun événement renseigné_');
		}

		// Impact
		lines.push('', '## Impact', '');
		lines.push(`**Utilisateurs impactés :** ${usersImpacted || '_Non renseigné_'}`);
		lines.push(`**Services impactés :** ${servicesImpacted || '_Non renseigné_'}`);
		lines.push('', `**Impact métier :**`, '', businessImpact || '_Non renseigné_');
		if (slaViolated.trim()) {
			lines.push('', `**SLA violés :** ${slaViolated}`);
		}

		// Root cause
		lines.push('', '## Analyse des causes', '');
		lines.push('### Cause immédiate', '', immediateCause || '_Non renseigné_');
		lines.push('', '### Cause profonde', '', rootCause || '_Non renseigné_');
		if (contributingFactors.trim()) {
			lines.push('', '### Facteurs contributifs', '', contributingFactors);
		}

		// Actions
		lines.push('', '## Actions correctives', '');
		const filledActions = actions.filter((a) => a.action.trim());
		if (filledActions.length) {
			lines.push('| Action | Responsable | Priorité | Statut |');
			lines.push('|--------|-------------|----------|--------|');
			for (const a of filledActions) {
				lines.push(
					`| ${a.action} | ${a.owner || '—'} | ${a.priority} | ${a.status} |`
				);
			}
		} else {
			lines.push('_Aucune action renseignée_');
		}

		// Lessons learned
		lines.push('', '## Enseignements', '', lessons || '_Non renseigné_');

		lines.push(
			'',
			'---',
			`_Généré avec le Générateur de post-mortem — ${TOOL_URL}_`
		);

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
		// Track all state for auto-save
		title;
		incidentDate;
		duration;
		severity;
		author;
		participants;
		JSON.stringify(timeline);
		usersImpacted;
		servicesImpacted;
		businessImpact;
		slaViolated;
		immediateCause;
		rootCause;
		contributingFactors;
		JSON.stringify(actions);
		lessons;
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<!-- Form -->
		<div class="postmortem-form">
			<!-- Metadata -->
			<fieldset class="section-card glass-card">
				<legend>Informations générales</legend>
				<p class="form-hint">Un post-mortem (retour d’expérience après incident) aide à comprendre ce qui s’est passé sans chercher de coupable.</p>

				<div class="form-group">
					<label for="pm-title">Titre de l'incident</label>
					<input
						id="pm-title"
						type="text"
						bind:value={title}
						placeholder="Ex: Indisponibilité du service de paiement"
					/>
				</div>

				<div class="form-row form-row--three">
					<div class="form-group">
						<label for="pm-date">Date de l'incident</label>
						<input id="pm-date" type="date" bind:value={incidentDate} />
					</div>
					<div class="form-group">
						<label for="pm-duration">Durée</label>
						<input
							id="pm-duration"
							type="text"
							bind:value={duration}
							placeholder="Ex: 2h30"
						/>
					</div>
					<div class="form-group">
						<label for="pm-severity" title="Le niveau de gravité de l’incident selon son impact">Gravité</label>
						<select id="pm-severity" bind:value={severity}>
							{#each SEVERITY_OPTIONS as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="form-row form-row--two">
					<div class="form-group">
						<label for="pm-author">Auteur du retour d’expérience</label>
						<input
							id="pm-author"
							type="text"
							bind:value={author}
							placeholder="Ex: Marie Dupont, SRE Lead"
						/>
					</div>
					<div class="form-group">
						<label for="pm-participants" title="Les parties prenantes impliquées dans l’analyse de l’incident">Participants</label>
						<input
							id="pm-participants"
							type="text"
							bind:value={participants}
							placeholder="Ex: CTO, SRE, Backend Lead"
						/>
					</div>
				</div>
			</fieldset>

			<!-- Timeline -->
			<fieldset class="section-card glass-card">
				<legend>Chronologie</legend>
				<p class="form-hint">
					Reconstitue la séquence des événements. L'ordre exact compte plus que la
					précision des heures.
				</p>

				{#each timeline as entry, i}
					<div class="timeline-entry">
						<div class="timeline-entry-header">
							<span class="entry-number">#{i + 1}</span>
							{#if timeline.length > 1}
								<button
									class="entry-remove"
									onclick={() => removeTimelineEvent(i)}
									aria-label="Supprimer l'événement {i + 1}"
								>
									Supprimer
								</button>
							{/if}
						</div>
						<div class="form-row form-row--timeline">
							<div class="form-group form-group--time">
								<label for="tl-time-{i}">Heure</label>
								<input id="tl-time-{i}" type="time" bind:value={entry.time} />
							</div>
							<div class="form-group form-group--event">
								<label for="tl-event-{i}">Événement</label>
								<textarea
									id="tl-event-{i}"
									bind:value={entry.event}
									rows="2"
									placeholder="Ex: Alerte monitoring — latence API > 5s"
								></textarea>
							</div>
						</div>
					</div>
				{/each}

				<button class="add-btn" onclick={addTimelineEvent}>+ Ajouter un événement</button>
			</fieldset>

			<!-- Impact -->
			<fieldset class="section-card glass-card">
				<legend>Impact</legend>
				<p class="form-hint">
					Quantifier l'impact aide à calibrer l'effort de remédiation. Même une
					estimation approximative est utile.
				</p>

				<div class="form-row form-row--two">
					<div class="form-group">
						<label for="pm-users">Utilisateurs impactés</label>
						<input
							id="pm-users"
							type="text"
							bind:value={usersImpacted}
							placeholder="Ex: ~5000 utilisateurs"
						/>
					</div>
					<div class="form-group">
						<label for="pm-services">Services impactés</label>
						<input
							id="pm-services"
							type="text"
							bind:value={servicesImpacted}
							placeholder="Ex: API paiement, dashboard client"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="pm-business">Impact métier</label>
					<textarea
						id="pm-business"
						bind:value={businessImpact}
						rows="3"
						placeholder="Ex: Perte estimée de 12k EUR en transactions non traitées pendant 2h"
					></textarea>
				</div>

				<div class="form-group">
					<label for="pm-sla" title="SLA : accord de niveau de service, un engagement de disponibilité envers les utilisateurs">SLA (engagements de service) non respectés <span class="optional">(optionnel)</span></label>
					<input
						id="pm-sla"
						type="text"
						bind:value={slaViolated}
						placeholder="Ex: SLA uptime 99.9% — dépassement de 45min"
					/>
				</div>
			</fieldset>

			<!-- Root cause -->
			<fieldset class="section-card glass-card">
				<legend>Analyse des causes</legend>
				<p class="form-hint">
					Distinguer la cause immédiate (ce qui a déclenché l’incident) et la cause profonde (ce qui a permis que ça arrive), c'est ce qui permet de corriger
					durablement. Le but n'est pas de trouver un coupable.
				</p>

				<div class="form-group">
					<label for="pm-immediate">Cause immédiate</label>
					<textarea
						id="pm-immediate"
						bind:value={immediateCause}
						rows="3"
						placeholder="Ex: Un déploiement a introduit une requête SQL non indexée"
					></textarea>
				</div>

				<div class="form-group">
					<label for="pm-root" title="La cause racine : le problème structurel qui a rendu l’incident possible">Cause profonde (cause racine)</label>
					<textarea
						id="pm-root"
						bind:value={rootCause}
						rows="3"
						placeholder="Ex: Absence de revue de performance SQL dans le pipeline CI"
					></textarea>
				</div>

				<div class="form-group">
					<label for="pm-contributing"
						>Facteurs contributifs <span class="optional">(optionnel)</span></label
					>
					<textarea
						id="pm-contributing"
						bind:value={contributingFactors}
						rows="3"
						placeholder="Ex: Pression sur la livraison, équipe réduite, pas de staging environment"
					></textarea>
				</div>
			</fieldset>

			<!-- Actions -->
			<fieldset class="section-card glass-card">
				<legend>Actions correctives</legend>
				<p class="form-hint">
					Des actions à mener concrètes, avec un responsable et un horizon. Ce qui n'est pas
					assigné ne sera pas fait.
				</p>

				{#each actions as act, i}
					<div class="action-entry">
						<div class="action-entry-header">
							<span class="entry-number">Action {i + 1}</span>
							{#if actions.length > 1}
								<button
									class="entry-remove"
									onclick={() => removeAction(i)}
									aria-label="Supprimer l'action {i + 1}"
								>
									Supprimer
								</button>
							{/if}
						</div>
						<div class="form-group">
							<label for="act-action-{i}">Action</label>
							<input
								id="act-action-{i}"
								type="text"
								bind:value={act.action}
								placeholder="Ex: Ajouter un check SQL explain dans la CI"
							/>
						</div>
						<div class="form-row form-row--three">
							<div class="form-group">
								<label for="act-owner-{i}">Responsable</label>
								<input
									id="act-owner-{i}"
									type="text"
									bind:value={act.owner}
									placeholder="Ex: Jean, SRE"
								/>
							</div>
							<div class="form-group">
								<label for="act-priority-{i}">Priorité</label>
								<select id="act-priority-{i}" bind:value={act.priority}>
									{#each PRIORITY_OPTIONS as p}
										<option value={p}>{p}</option>
									{/each}
								</select>
							</div>
							<div class="form-group">
								<label for="act-status-{i}">Statut</label>
								<select id="act-status-{i}" bind:value={act.status}>
									{#each STATUS_OPTIONS as s}
										<option value={s}>{s}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				{/each}

				<button class="add-btn" onclick={addAction}>+ Ajouter une action</button>
			</fieldset>

			<!-- Lessons learned -->
			<fieldset class="section-card glass-card">
				<legend>Enseignements</legend>
				<p class="form-hint">
					Ce qui a bien fonctionné, ce qui a manqué, ce qu'on ferait différemment. La
					valeur d'un post-mortem est ici.
				</p>

				<div class="form-group">
					<label for="pm-lessons">Enseignements tirés</label>
					<textarea
						id="pm-lessons"
						bind:value={lessons}
						rows="5"
						placeholder="Ex: La détection a été rapide grâce aux alertes. En revanche, le runbook était incomplet pour ce type de panne..."
					></textarea>
				</div>
			</fieldset>

			<!-- Export actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copié dans le presse-papier' : 'Copier le document (format texte)'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Réinitialiser
				</button>
			</div>
		</div>

		<!-- Results panel (sticky) -->
		<aside class="results-panel glass-card">
			<h2 class="panel-title">Aperçu</h2>

			<!-- Severity badge -->
			<div class="severity-section">
				<span
					class="severity-badge"
					style="background: {severityColor(severity)}20; color: {severityColor(severity)}; border-color: {severityColor(severity)}40"
				>
					{severity}
				</span>
				<span class="severity-label">
					{#if severity === 'P1'}Critique{:else if severity === 'P2'}Majeur{:else if severity === 'P3'}Modéré{:else}Mineur{/if}
				</span>
			</div>

			{#if title.trim()}
				<p class="panel-incident-title">{title}</p>
			{/if}

			{#if duration.trim()}
				<p class="panel-meta">Durée : {duration}</p>
			{/if}

			<!-- Completeness -->
			<div class="completeness-section">
				<div class="completeness-header">
					<span class="completeness-label">Complétude</span>
					<span class="completeness-value">{completeness}%</span>
				</div>
				<div class="completeness-bar">
					<div
						class="completeness-fill"
						style="width: {completeness}%"
					></div>
				</div>
			</div>

			<!-- Timeline visualization -->
			{#if sortedTimeline.length > 0}
				<div class="timeline-preview">
					<h3 class="panel-subtitle">Chronologie</h3>
					<div class="timeline-visual">
						{#each sortedTimeline as entry}
							<div class="timeline-dot-row">
								<div class="timeline-dot-col">
									<div class="timeline-dot"></div>
									<div class="timeline-line"></div>
								</div>
								<div class="timeline-dot-content">
									<span class="timeline-dot-time">{entry.time || '??:??'}</span>
									<span class="timeline-dot-text"
										>{entry.event || 'Événement non décrit'}</span
									>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Actions summary -->
			{#if actionsSummary.total > 0}
				<div class="actions-summary">
					<h3 class="panel-subtitle">
						Actions ({actionsSummary.total})
					</h3>
					<div class="summary-grid">
						{#each Object.entries(actionsSummary.byPriority) as [priority, count]}
							<div class="summary-item">
								<span class="summary-count">{count}</span>
								<span class="summary-label">{priority}</span>
							</div>
						{/each}
					</div>
					<div class="summary-grid summary-grid--status">
						{#each Object.entries(actionsSummary.byStatus) as [status, count]}
							<div class="summary-item">
								<span
									class="summary-status-dot"
									class:done={status === 'Fait'}
									class:in-progress={status === 'En cours'}
									class:todo={status === 'À faire'}
								></span>
								<span class="summary-count">{count}</span>
								<span class="summary-label">{status}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</aside>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
	}

	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: var(--gap);
		align-items: start;
	}

	.postmortem-form {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	/* Glass card */
	.glass-card {
		background: var(--surface, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
	}

	/* Section card (fieldset) */
	.section-card {
		margin: 0;
	}

	.section-card legend {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--accent);
		padding: 0 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Form */
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

	.optional {
		font-weight: 400;
		color: var(--tertiary);
		font-size: 12px;
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

	.form-row--timeline {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: var(--gap);
	}

	.form-group--time {
		max-width: 120px;
	}

	input[type='text'],
	input[type='date'],
	input[type='time'],
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

	/* Timeline & Action entries */
	.timeline-entry,
	.action-entry {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--gap);
		margin-bottom: 12px;
		background: var(--code-bg, var(--entry));
	}

	.timeline-entry-header,
	.action-entry-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.entry-number {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.entry-remove {
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

	.entry-remove:hover {
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

	/* Export actions */
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

	/* Results panel */
	.results-panel {
		position: sticky;
		top: calc(var(--header-height) + var(--gap));
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.panel-title {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 700;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.panel-subtitle {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 8px 0;
	}

	.panel-incident-title {
		font-family: var(--font-ui);
		font-size: 15px;
		font-weight: 600;
		color: var(--primary);
		margin: 0;
		line-height: 1.4;
	}

	.panel-meta {
		font-size: 13px;
		color: var(--secondary);
		margin: 0;
	}

	/* Severity badge */
	.severity-section {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.severity-badge {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: 999px;
		border: 1px solid;
		letter-spacing: 0.05em;
	}

	.severity-label {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
	}

	/* Completeness */
	.completeness-section {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.completeness-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.completeness-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.completeness-value {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 700;
		color: var(--accent);
	}

	.completeness-bar {
		height: 4px;
		background: var(--border);
		border-radius: 2px;
		overflow: hidden;
	}

	.completeness-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	/* Timeline preview */
	.timeline-preview {
		display: flex;
		flex-direction: column;
	}

	.timeline-visual {
		display: flex;
		flex-direction: column;
	}

	.timeline-dot-row {
		display: flex;
		gap: 10px;
	}

	.timeline-dot-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 12px;
		flex-shrink: 0;
	}

	.timeline-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		flex-shrink: 0;
		margin-top: 4px;
	}

	.timeline-line {
		width: 1px;
		flex: 1;
		background: var(--border);
		min-height: 12px;
	}

	.timeline-dot-row:last-child .timeline-line {
		display: none;
	}

	.timeline-dot-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-bottom: 10px;
		min-width: 0;
	}

	.timeline-dot-time {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--accent);
		font-weight: 600;
	}

	.timeline-dot-text {
		font-size: 12px;
		color: var(--secondary);
		line-height: 1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* Actions summary */
	.actions-summary {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.summary-grid {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.summary-grid--status {
		margin-top: 4px;
	}

	.summary-item {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.summary-count {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 700;
		color: var(--primary);
	}

	.summary-label {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	.summary-status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--secondary);
	}

	.summary-status-dot.done {
		background: var(--success, #10b981);
	}

	.summary-status-dot.in-progress {
		background: var(--warning, #f59e0b);
	}

	.summary-status-dot.todo {
		background: var(--secondary);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.results-panel {
			position: static;
			order: -1;
		}
	}

	@media (max-width: 600px) {
		.form-row--two,
		.form-row--three {
			grid-template-columns: 1fr;
		}

		.form-row--timeline {
			grid-template-columns: 1fr;
		}

		.form-group--time {
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
