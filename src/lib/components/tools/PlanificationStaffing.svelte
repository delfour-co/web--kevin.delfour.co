<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-planification-staffing';
	const TOOL_URL = 'https://kevin.delfour.co/outils/planification-staffing/';

	type Role = 'dev' | 'senior' | 'lead' | 'staff' | 'manager';
	type AttritionRisk = 'faible' | 'moyen' | 'élevé';

	interface TeamMember {
		id: string;
		name: string;
		role: Role;
		startDate: string;
		attritionRisk: AttritionRisk;
	}

	interface Project {
		id: string;
		name: string;
		startMonth: number;
		endMonth: number;
		fte: number;
	}

	const ROLES: { value: Role; label: string }[] = [
		{ value: 'dev', label: 'Dev' },
		{ value: 'senior', label: 'Senior' },
		{ value: 'lead', label: 'Lead' },
		{ value: 'staff', label: 'Staff' },
		{ value: 'manager', label: 'Manager' }
	];

	const RISK_LABELS: Record<AttritionRisk, string> = {
		faible: 'Faible',
		moyen: 'Moyen',
		'élevé': 'Élevé'
	};

	const RISK_ATTRITION_RATE: Record<AttritionRisk, number> = {
		faible: 0.05,
		moyen: 0.15,
		'élevé': 0.35
	};

	const HORIZON_OPTIONS = [
		{ value: 3, label: '3 mois' },
		{ value: 6, label: '6 mois' },
		{ value: 12, label: '12 mois' }
	];

	const RECRUITMENT_OPTIONS = [
		{ value: 1, label: '1 mois' },
		{ value: 2, label: '2 mois' },
		{ value: 3, label: '3 mois' },
		{ value: 4, label: '4+ mois' }
	];

	let team = $state<TeamMember[]>([
		{ id: 'm1', name: 'Membre 1', role: 'dev', startDate: '2024-01', attritionRisk: 'faible' },
		{ id: 'm2', name: 'Membre 2', role: 'senior', startDate: '2023-06', attritionRisk: 'faible' }
	]);

	let projects = $state<Project[]>([
		{ id: 'p1', name: 'Projet A', startMonth: 1, endMonth: 4, fte: 2 },
		{ id: 'p2', name: 'Projet B', startMonth: 3, endMonth: 6, fte: 1.5 }
	]);

	let horizon = $state(6);
	let recruitmentDelay = $state(2);
	let attritionRate = $state(10);
	let capacityPerPerson = $state(80);
	let copyFeedback = $state(false);
	let nextId = $state(10);

	function genId(prefix: string) {
		return prefix + nextId++;
	}

	// Month labels relative to now
	function getMonthLabels(count: number): string[] {
		const now = new Date();
		const labels: string[] = [];
		for (let i = 0; i < count; i++) {
			const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
			const month = d.toLocaleDateString('fr-FR', { month: 'short' });
			const year = d.getFullYear().toString().slice(2);
			labels.push(`${month} ${year}`);
		}
		return labels;
	}

	const monthLabels = $derived.by(() => getMonthLabels(horizon));

	const teamSize = $derived(team.length);

	// Monthly capacity = team size * capacity% minus projected attrition
	const monthlyCapacity = $derived.by(() => {
		const cap: number[] = [];
		const effectiveTeam = team.length;
		const monthlyAttritionRate = attritionRate / 100 / 12;

		for (let m = 0; m < horizon; m++) {
			// Projected team accounting for attrition over time
			const projected = effectiveTeam * Math.pow(1 - monthlyAttritionRate, m + 1);
			cap.push(Math.round(projected * (capacityPerPerson / 100) * 10) / 10);
		}
		return cap;
	});

	// Monthly demand from projects
	const monthlyDemand = $derived.by(() => {
		const demand: number[] = new Array(horizon).fill(0);
		for (const p of projects) {
			for (let m = 0; m < horizon; m++) {
				const monthIndex = m + 1; // 1-indexed
				if (monthIndex >= p.startMonth && monthIndex <= p.endMonth) {
					demand[m] = Math.round((demand[m] + p.fte) * 10) / 10;
				}
			}
		}
		return demand;
	});

	// Gap analysis
	const gaps = $derived.by(() => {
		return monthlyCapacity.map((cap, i) => ({
			month: i,
			capacity: cap,
			demand: monthlyDemand[i],
			gap: Math.round((cap - monthlyDemand[i]) * 10) / 10,
			deficit: monthlyDemand[i] > cap
		}));
	});

	// Months with deficit
	const deficitMonths = $derived.by(() => {
		return gaps.filter((g) => g.deficit);
	});

	// Attrition projection based on individual risk
	const attritionProjection = $derived.by(() => {
		let expectedDepartures = 0;
		for (const m of team) {
			expectedDepartures += RISK_ATTRITION_RATE[m.attritionRisk] * (horizon / 12);
		}
		return Math.round(expectedDepartures * 10) / 10;
	});

	// Hiring recommendations
	const hiringRecommendations = $derived.by(() => {
		const recs: { recruitBy: number; neededFor: number; fte: number }[] = [];
		for (const g of gaps) {
			if (g.deficit) {
				const recruitByMonth = Math.max(0, g.month - recruitmentDelay);
				const existing = recs.find((r) => r.recruitBy === recruitByMonth);
				if (existing) {
					existing.fte = Math.max(existing.fte, Math.abs(g.gap));
				} else {
					recs.push({
						recruitBy: recruitByMonth,
						neededFor: g.month,
						fte: Math.abs(g.gap)
					});
				}
			}
		}
		return recs;
	});

	// Total positions to open
	const totalPositionsToOpen = $derived.by(() => {
		if (hiringRecommendations.length === 0) return 0;
		return Math.ceil(Math.max(...hiringRecommendations.map((r) => r.fte)));
	});

	// SVG Chart dimensions
	const CHART_W = 520;
	const CHART_H = 220;
	const CHART_PAD_LEFT = 40;
	const CHART_PAD_RIGHT = 10;
	const CHART_PAD_TOP = 10;
	const CHART_PAD_BOTTOM = 40;

	const chartData = $derived.by(() => {
		const n = horizon;
		if (n === 0) return { bars: [], maxVal: 1 };
		const maxVal = Math.max(
			...monthlyCapacity,
			...monthlyDemand,
			1
		);
		const usableW = CHART_W - CHART_PAD_LEFT - CHART_PAD_RIGHT;
		const usableH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOTTOM;
		const barGroupWidth = usableW / n;
		const barWidth = barGroupWidth * 0.35;
		const gap = barGroupWidth * 0.06;

		const bars = [];
		for (let i = 0; i < n; i++) {
			const x = CHART_PAD_LEFT + i * barGroupWidth;
			const capH = (monthlyCapacity[i] / maxVal) * usableH;
			const demH = (monthlyDemand[i] / maxVal) * usableH;
			const deficit = monthlyDemand[i] > monthlyCapacity[i];

			bars.push({
				capX: x + gap,
				capY: CHART_PAD_TOP + usableH - capH,
				capH,
				demX: x + barWidth + gap * 2,
				demY: CHART_PAD_TOP + usableH - demH,
				demH,
				barWidth,
				labelX: x + barGroupWidth / 2,
				labelY: CHART_H - 6,
				deficit,
				capVal: monthlyCapacity[i],
				demVal: monthlyDemand[i]
			});
		}

		return { bars, maxVal };
	});

	// Y-axis ticks
	const yTicks = $derived.by(() => {
		const maxVal = chartData.maxVal;
		const usableH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOTTOM;
		const steps = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];
		return steps.map((v) => ({
			value: Math.round(v * 10) / 10,
			y: CHART_PAD_TOP + usableH - (v / maxVal) * usableH
		}));
	});

	// Team member management
	function addMember() {
		const id = genId('m');
		team.push({ id, name: '', role: 'dev', startDate: '2024-01', attritionRisk: 'faible' });
		save();
	}

	function removeMember(index: number) {
		if (team.length <= 1) return;
		team.splice(index, 1);
		save();
	}

	// Project management
	function addProject() {
		const id = genId('p');
		projects.push({ id, name: '', startMonth: 1, endMonth: 3, fte: 1 });
		save();
	}

	function removeProject(index: number) {
		if (projects.length <= 1) return;
		projects.splice(index, 1);
		save();
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					team,
					projects,
					horizon,
					recruitmentDelay,
					attritionRate,
					capacityPerPerson,
					nextId
				})
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (Array.isArray(d.team)) team = d.team;
				if (Array.isArray(d.projects)) projects = d.projects;
				if (typeof d.horizon === 'number') horizon = d.horizon;
				if (typeof d.recruitmentDelay === 'number') recruitmentDelay = d.recruitmentDelay;
				if (typeof d.attritionRate === 'number') attritionRate = d.attritionRate;
				if (typeof d.capacityPerPerson === 'number') capacityPerPerson = d.capacityPerPerson;
				if (typeof d.nextId === 'number') nextId = d.nextId;
			}
		} catch {}
	}

	function handleReset() {
		team = [
			{ id: 'm1', name: 'Membre 1', role: 'dev', startDate: '2024-01', attritionRisk: 'faible' },
			{ id: 'm2', name: 'Membre 2', role: 'senior', startDate: '2023-06', attritionRisk: 'faible' }
		];
		projects = [
			{ id: 'p1', name: 'Projet A', startMonth: 1, endMonth: 4, fte: 2 },
			{ id: 'p2', name: 'Projet B', startMonth: 3, endMonth: 6, fte: 1.5 }
		];
		horizon = 6;
		recruitmentDelay = 2;
		attritionRate = 10;
		capacityPerPerson = 80;
		nextId = 10;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const lines = [
			'# Planification Staffing',
			'',
			`**Date :** ${today}`,
			`**Horizon :** ${horizon} mois`,
			`**Taille equipe :** ${teamSize}`,
			`**Capacite par personne :** ${capacityPerPerson}%`,
			`**Taux d'attrition estime :** ${attritionRate}%`,
			`**Delai de recrutement :** ${recruitmentDelay} mois`,
			'',
			'## Equipe actuelle',
			'',
			...team.map(
				(m) =>
					`- ${m.name} (${ROLES.find((r) => r.value === m.role)?.label || m.role}) — Risque attrition : ${RISK_LABELS[m.attritionRisk]}`
			),
			'',
			'## Roadmap',
			'',
			...projects.map(
				(p) =>
					`- ${p.name} : mois ${p.startMonth} a ${p.endMonth}, ${p.fte} FTE`
			),
			'',
			'## Analyse',
			'',
			`- Departs projetes : ~${attritionProjection}`,
			`- Mois en deficit : ${deficitMonths.length}`,
			`- Postes a ouvrir : ${totalPositionsToOpen}`,
			''
		];

		if (hiringRecommendations.length > 0) {
			lines.push('## Plan de recrutement recommande', '');
			for (const rec of hiringRecommendations) {
				lines.push(
					`- Lancer le recrutement en **${monthLabels[rec.recruitBy] || 'maintenant'}** (~${Math.ceil(rec.fte)} FTE) pour couvrir le besoin de **${monthLabels[rec.neededFor] || '?'}**`
				);
			}
			lines.push('');
		}

		lines.push('---', `_Genere avec l'outil Planification Staffing — ${TOOL_URL}_`);

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
		// Auto-save on any change
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<!-- LEFT: Form -->
		<div class="tool-form">
			<!-- Equipe actuelle -->
			<section class="glass-card">
				<div class="section-header">
					<h2 class="section-title">Equipe actuelle</h2>
					<span class="section-badge">{teamSize} membre{teamSize > 1 ? 's' : ''}</span>
				</div>
				<p class="section-hint">Ce que j'observe souvent : les projections de staffing qui ignorent l'attrition sous-estiment systematiquement les besoins reels.</p>

				<div class="items-list">
					{#each team as member, i}
						<div class="item-row">
							<input
								type="text"
								class="input input--name"
								placeholder="Nom"
								bind:value={member.name}
								aria-label="Nom du membre"
							/>
							<select
								class="input input--select"
								bind:value={member.role}
								aria-label="Role"
							>
								{#each ROLES as r}
									<option value={r.value}>{r.label}</option>
								{/each}
							</select>
							<input
								type="month"
								class="input input--date"
								bind:value={member.startDate}
								aria-label="Date d'arrivee"
							/>
							<select
								class="input input--select input--risk"
								bind:value={member.attritionRisk}
								aria-label="Risque d'attrition"
							>
								<option value="faible">Faible</option>
								<option value="moyen">Moyen</option>
								<option value="élevé">Eleve</option>
							</select>
							<button
								class="btn-icon btn-icon--remove"
								onclick={() => removeMember(i)}
								disabled={team.length <= 1}
								aria-label="Retirer ce membre"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
							</button>
						</div>
					{/each}
				</div>
				<button class="btn-add" onclick={addMember}>+ Ajouter un membre</button>
			</section>

			<!-- Roadmap & Charge -->
			<section class="glass-card">
				<div class="section-header">
					<h2 class="section-title">Roadmap et charge</h2>
				</div>
				<p class="section-hint">Ce que j'observe souvent : la charge reelle depasse presque toujours la charge planifiee. Prevois une marge.</p>

				<div class="field-row">
					<label class="field-label" for="horizon">Horizon de planification</label>
					<select id="horizon" class="input input--select" bind:value={horizon}>
						{#each HORIZON_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>

				<div class="items-list">
					{#each projects as project, i}
						<div class="item-row item-row--project">
							<input
								type="text"
								class="input input--name"
								placeholder="Nom du projet"
								bind:value={project.name}
								aria-label="Nom du projet"
							/>
							<div class="inline-fields">
								<label class="mini-label">
									Debut (mois)
									<input
										type="number"
										class="input input--small"
										min="1"
										max={horizon}
										bind:value={project.startMonth}
										aria-label="Mois de debut"
									/>
								</label>
								<label class="mini-label">
									Fin (mois)
									<input
										type="number"
										class="input input--small"
										min="1"
										max={horizon}
										bind:value={project.endMonth}
										aria-label="Mois de fin"
									/>
								</label>
								<label class="mini-label">
									FTE
									<input
										type="number"
										class="input input--small"
										min="0.5"
										max="20"
										step="0.5"
										bind:value={project.fte}
										aria-label="FTE necessaires"
									/>
								</label>
							</div>
							<button
								class="btn-icon btn-icon--remove"
								onclick={() => removeProject(i)}
								disabled={projects.length <= 1}
								aria-label="Retirer ce projet"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
							</button>
						</div>
					{/each}
				</div>
				<button class="btn-add" onclick={addProject}>+ Ajouter un projet</button>
			</section>

			<!-- Parametres -->
			<section class="glass-card">
				<h2 class="section-title">Parametres</h2>

				<div class="param-group">
					<div class="param-header">
						<label class="field-label" for="recruitment-delay">Temps moyen de recrutement</label>
					</div>
					<select id="recruitment-delay" class="input input--select" bind:value={recruitmentDelay}>
						{#each RECRUITMENT_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>

				<div class="param-group">
					<div class="param-header">
						<label class="field-label" for="attrition-rate">Taux d'attrition estime</label>
						<span class="param-value">{attritionRate}%</span>
					</div>
					<input
						id="attrition-rate"
						type="range"
						class="slider"
						min="0"
						max="30"
						step="1"
						bind:value={attritionRate}
					/>
					<div class="slider-bounds">
						<span>0%</span>
						<span>30%</span>
					</div>
				</div>

				<div class="param-group">
					<div class="param-header">
						<label class="field-label" for="capacity-person">Capacite par personne</label>
						<span class="param-value">{capacityPerPerson}%</span>
					</div>
					<input
						id="capacity-person"
						type="range"
						class="slider"
						min="60"
						max="100"
						step="5"
						bind:value={capacityPerPerson}
					/>
					<div class="slider-bounds">
						<span>60%</span>
						<span>100%</span>
					</div>
					<p class="param-hint">Reunions, support, veille, ceremonies... la capacite effective est rarement a 100%.</p>
				</div>
			</section>

			<!-- Actions -->
			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
					Reinitialiser
				</button>
			</div>
		</div>

		<!-- RIGHT: Results (sticky) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			<div class="result-title">Resultats</div>

			<!-- SVG Timeline Chart -->
			<div class="chart-container">
				<div class="chart-legend">
					<span class="legend-item"><span class="legend-swatch legend-swatch--capacity"></span>Capacite</span>
					<span class="legend-item"><span class="legend-swatch legend-swatch--demand"></span>Charge</span>
				</div>
				<svg viewBox="0 0 {CHART_W} {CHART_H}" class="chart-svg" aria-label="Timeline capacite vs charge">
					<!-- Y axis ticks -->
					{#each yTicks as tick}
						<line x1={CHART_PAD_LEFT} y1={tick.y} x2={CHART_W - CHART_PAD_RIGHT} y2={tick.y} class="chart-grid-line" />
						<text x={CHART_PAD_LEFT - 6} y={tick.y + 4} class="chart-tick-label" text-anchor="end">{tick.value}</text>
					{/each}

					<!-- Bars -->
					{#each chartData.bars as bar, i}
						<!-- Deficit background -->
						{#if bar.deficit}
							<rect
								x={bar.capX - 2}
								y={CHART_PAD_TOP}
								width={bar.barWidth * 2 + 10}
								height={CHART_H - CHART_PAD_TOP - CHART_PAD_BOTTOM}
								class="chart-deficit-bg"
								rx="3"
							/>
						{/if}

						<!-- Capacity bar -->
						<rect
							x={bar.capX}
							y={bar.capY}
							width={bar.barWidth}
							height={Math.max(bar.capH, 1)}
							class="chart-bar chart-bar--capacity"
							rx="2"
						/>
						<!-- Demand bar -->
						<rect
							x={bar.demX}
							y={bar.demY}
							width={bar.barWidth}
							height={Math.max(bar.demH, 1)}
							class="chart-bar chart-bar--demand"
							class:chart-bar--deficit={bar.deficit}
							rx="2"
						/>

						<!-- Month label -->
						<text x={bar.labelX} y={bar.labelY} class="chart-month-label" text-anchor="middle">
							{monthLabels[i] || ''}
						</text>
					{/each}
				</svg>
			</div>

			<!-- Gap analysis -->
			<div class="result-section">
				<div class="result-section-title">Analyse des ecarts</div>
				{#if deficitMonths.length === 0}
					<p class="result-ok">La capacite couvre la charge sur l'ensemble de la periode.</p>
				{:else}
					<div class="deficit-list">
						{#each deficitMonths as d}
							<div class="deficit-row">
								<span class="deficit-month">{monthLabels[d.month]}</span>
								<span class="deficit-value">{Math.abs(d.gap)} FTE manquant{Math.abs(d.gap) > 1 ? 's' : ''}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Hiring timeline -->
			{#if hiringRecommendations.length > 0}
				<div class="result-section">
					<div class="result-section-title">Plan de recrutement</div>
					<p class="result-hint">En tenant compte d'un delai de recrutement de {recruitmentDelay} mois :</p>
					<div class="hiring-list">
						{#each hiringRecommendations as rec}
							<div class="hiring-row">
								<span class="hiring-action">Lancer en <strong>{monthLabels[rec.recruitBy] || 'maintenant'}</strong></span>
								<span class="hiring-detail">~{Math.ceil(rec.fte)} FTE pour {monthLabels[rec.neededFor] || '?'}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Attrition projection -->
			<div class="result-section">
				<div class="result-section-title">Projection attrition</div>
				<div class="attrition-summary">
					<span class="attrition-value">{attritionProjection}</span>
					<span class="attrition-label">depart{attritionProjection > 1 ? 's' : ''} projete{attritionProjection > 1 ? 's' : ''} sur {horizon} mois</span>
				</div>
				<p class="result-hint">Base sur les niveaux de risque individuels et l'horizon choisi.</p>
			</div>

			<!-- Summary -->
			<div class="result-summary-box">
				{#if totalPositionsToOpen > 0}
					<strong>{totalPositionsToOpen} poste{totalPositionsToOpen > 1 ? 's' : ''}</strong> a ouvrir dans les <strong>{horizon} prochains mois</strong>
				{:else}
					Pas de besoin de recrutement identifie sur les <strong>{horizon} prochains mois</strong> avec les parametres actuels.
				{/if}
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

	.tool-form {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	/* Glass card */
	.glass-card {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 8px 0;
	}

	.section-badge {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		padding: 2px 10px;
		border: 1px solid var(--accent-border);
		border-radius: 12px;
		white-space: nowrap;
	}

	.section-hint {
		font-size: 12px;
		line-height: 1.5;
		color: var(--secondary);
		margin: 0 0 12px 0;
		font-style: italic;
	}

	/* Items list */
	.items-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 10px;
	}

	.item-row {
		display: flex;
		gap: 6px;
		align-items: center;
		flex-wrap: wrap;
	}

	.item-row--project {
		flex-direction: column;
		align-items: stretch;
		padding: 10px;
		background: rgba(0, 0, 0, 0.08);
		border-radius: var(--radius);
		position: relative;
	}

	:global([data-theme='dark']) .item-row--project {
		background: rgba(255, 255, 255, 0.04);
	}

	.item-row--project .btn-icon--remove {
		position: absolute;
		top: 8px;
		right: 8px;
	}

	.inline-fields {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.mini-label {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	/* Inputs */
	.input {
		font-family: var(--font-ui);
		font-size: 13px;
		padding: 6px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
		min-height: 36px;
	}

	.input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	.input--name {
		flex: 1;
		min-width: 100px;
	}

	.input--select {
		min-width: 80px;
	}

	.input--risk {
		min-width: 80px;
	}

	.input--date {
		min-width: 120px;
	}

	.input--small {
		width: 70px;
	}

	/* Field row */
	.field-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	.field-label {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
	}

	/* Param group */
	.param-group {
		margin-bottom: 16px;
	}

	.param-group:last-child {
		margin-bottom: 0;
	}

	.param-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 6px;
	}

	.param-value {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		color: var(--accent);
	}

	.param-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 6px 0 0 0;
		font-style: italic;
	}

	/* Slider */
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

	.slider-bounds {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
		margin-top: 4px;
	}

	/* Buttons */
	.btn-add {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		background: transparent;
		border: 1px dashed var(--accent-border);
		border-radius: var(--radius);
		padding: 8px 16px;
		cursor: pointer;
		transition: var(--transition);
		width: 100%;
	}

	.btn-add:hover {
		background: var(--accent-light);
		border-color: var(--accent);
	}

	.btn-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--secondary);
		padding: 4px;
		border-radius: 4px;
		transition: var(--transition);
		flex-shrink: 0;
	}

	.btn-icon:hover:not(:disabled) {
		color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
	}

	.btn-icon:disabled {
		opacity: 0.3;
		cursor: not-allowed;
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

	/* Chart */
	.chart-container {
		margin-bottom: var(--content-gap);
	}

	.chart-legend {
		display: flex;
		gap: 16px;
		margin-bottom: 8px;
		justify-content: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--secondary);
	}

	.legend-swatch {
		width: 12px;
		height: 12px;
		border-radius: 2px;
		display: inline-block;
	}

	.legend-swatch--capacity {
		background: var(--accent);
	}

	.legend-swatch--demand {
		background: var(--secondary);
	}

	.chart-svg {
		width: 100%;
		display: block;
	}

	:global(.chart-grid-line) {
		stroke: var(--border);
		stroke-width: 0.5;
		stroke-dasharray: 4 4;
	}

	:global(.chart-tick-label) {
		font-family: var(--font-mono);
		font-size: 10px;
		fill: var(--secondary);
	}

	:global(.chart-month-label) {
		font-family: var(--font-ui);
		font-size: 9px;
		fill: var(--secondary);
	}

	.chart-deficit-bg {
		fill: rgba(239, 68, 68, 0.08);
	}

	.chart-bar {
		transition: all 0.3s ease;
	}

	.chart-bar--capacity {
		fill: var(--accent);
		opacity: 0.8;
	}

	.chart-bar--demand {
		fill: var(--secondary);
		opacity: 0.6;
	}

	.chart-bar--deficit {
		fill: #ef4444;
		opacity: 0.8;
	}

	/* Result sections */
	.result-section {
		padding-top: var(--content-gap);
		border-top: 1px solid var(--border);
		margin-bottom: var(--content-gap);
	}

	.result-section-title {
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 8px;
	}

	.result-ok {
		font-size: 14px;
		color: var(--accent);
		margin: 0;
	}

	.result-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 8px 0;
	}

	/* Deficit list */
	.deficit-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.deficit-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 4px 8px;
		background: rgba(239, 68, 68, 0.06);
		border-radius: 4px;
	}

	.deficit-month {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--primary);
	}

	.deficit-value {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		color: #ef4444;
	}

	/* Hiring list */
	.hiring-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hiring-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 6px 8px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 4px;
		flex-wrap: wrap;
		gap: 4px;
	}

	:global([data-theme='dark']) .hiring-row {
		background: rgba(255, 255, 255, 0.04);
	}

	.hiring-action {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--primary);
	}

	.hiring-action strong {
		color: var(--accent);
	}

	.hiring-detail {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
	}

	/* Attrition */
	.attrition-summary {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 6px;
	}

	.attrition-value {
		font-family: var(--font-mono);
		font-size: 24px;
		font-weight: 700;
		color: var(--accent);
	}

	.attrition-label {
		font-family: var(--font-ui);
		font-size: 14px;
		color: var(--secondary);
	}

	/* Summary box */
	.result-summary-box {
		padding: 14px;
		background: rgba(0, 0, 0, 0.08);
		border-radius: var(--radius);
		font-family: var(--font-ui);
		font-size: 15px;
		line-height: 1.6;
		color: var(--primary);
		text-align: center;
		border: 1px solid var(--accent-border);
	}

	:global([data-theme='dark']) .result-summary-box {
		background: rgba(255, 255, 255, 0.04);
	}

	.result-summary-box strong {
		color: var(--accent);
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
		.item-row {
			flex-direction: column;
			align-items: stretch;
		}

		.item-row .btn-icon--remove {
			align-self: flex-end;
		}

		.inline-fields {
			flex-direction: column;
		}

		.input--small {
			width: 100%;
		}

		.field-row {
			flex-direction: column;
			align-items: stretch;
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
