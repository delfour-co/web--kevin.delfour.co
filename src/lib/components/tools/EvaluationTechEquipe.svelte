<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-evaluation-tech-equipe';
	const TOOL_URL = 'https://kevin.delfour.co/outils/evaluation-tech-equipe/';

	interface SkillDomain {
		id: string;
		name: string;
		skills: string[];
	}

	interface TeamMember {
		id: string;
		name: string;
		role: 'dev' | 'senior-dev' | 'lead' | 'staff';
	}

	const roleLabels: Record<string, string> = {
		dev: 'Dev',
		'senior-dev': 'Senior Dev',
		lead: 'Lead',
		staff: 'Staff'
	};

	const levelLabels: Record<number, string> = {
		0: 'Non evalue',
		1: 'Debutant',
		2: 'Autonome',
		3: 'Confirme',
		4: 'Expert'
	};

	const levelDescriptions: Record<number, string> = {
		0: 'Non evalue',
		1: "Besoin d'accompagnement",
		2: 'Capable seul sur des taches courantes',
		3: 'Referent sur le sujet',
		4: 'Peut former et faire evoluer les pratiques'
	};

	const defaultDomains: SkillDomain[] = [
		{ id: 'backend', name: 'Backend', skills: ['API Design', 'Base de donnees', 'Performance', 'Securite'] },
		{ id: 'frontend', name: 'Frontend', skills: ['UI/UX', 'Accessibilite', 'State management', 'Testing'] },
		{ id: 'devops', name: 'DevOps', skills: ['CI/CD', 'Monitoring', 'Infrastructure', 'Containers'] },
		{ id: 'craft', name: 'Craft', skills: ['Code review', 'Testing', 'Documentation', 'Architecture'] }
	];

	let domains = $state<SkillDomain[]>(structuredClone(defaultDomains));
	let members = $state<TeamMember[]>([]);
	// scores[memberId][skill] = 0-4
	let scores = $state<Record<string, Record<string, number>>>({});

	let newMemberName = $state('');
	let newMemberRole = $state<TeamMember['role']>('dev');
	let newSkillDomain = $state(defaultDomains[0].id);
	let newSkillName = $state('');
	let selectedMemberId = $state<string | null>(null);
	let activeTab = $state<'config' | 'eval'>('config');
	let copyFeedback = $state(false);

	const allSkills = $derived.by(() => {
		const result: { domain: string; skill: string }[] = [];
		for (const d of domains) {
			for (const s of d.skills) {
				result.push({ domain: d.name, skill: s });
			}
		}
		return result;
	});

	const allSkillNames = $derived.by(() => allSkills.map((s) => s.skill));

	const teamCoverage = $derived.by(() => {
		return allSkills.map(({ domain, skill }) => {
			const memberScores = members.map((m) => scores[m.id]?.[skill] ?? 0);
			const total = memberScores.reduce((a, b) => a + b, 0);
			const avg = members.length > 0 ? Math.round((total / members.length) * 10) / 10 : 0;
			const referents = memberScores.filter((s) => s >= 3).length;
			return { domain, skill, avg, referents, scores: memberScores };
		});
	});

	const gaps = $derived.by(() => {
		return teamCoverage.filter((c) => c.referents === 0 && members.length > 0);
	});

	const selectedMemberScores = $derived.by(() => {
		if (!selectedMemberId || !scores[selectedMemberId]) return null;
		return scores[selectedMemberId];
	});

	// Radar chart for selected member
	const radarData = $derived.by(() => {
		if (!selectedMemberScores) return null;
		const skills = allSkillNames;
		const n = skills.length;
		if (n < 3) return null;
		const cx = 150;
		const cy = 150;
		const maxR = 115;
		const points = skills.map((s, i) => {
			const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
			const val = selectedMemberScores[s] ?? 0;
			const r = (val / 4) * maxR;
			return {
				x: cx + r * Math.cos(angle),
				y: cy + r * Math.sin(angle),
				labelX: cx + (maxR + 22) * Math.cos(angle),
				labelY: cy + (maxR + 22) * Math.sin(angle),
				name: s
			};
		});
		const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');
		const gridLevels = [1, 2, 3, 4].map((level) => {
			const r = (level / 4) * maxR;
			return skills
				.map((_, i) => {
					const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
					return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
				})
				.join(' ');
		});
		return { points, polygon, gridLevels, cx, cy };
	});

	function generateId(): string {
		return Math.random().toString(36).substring(2, 9);
	}

	function addMember() {
		const name = newMemberName.trim();
		if (!name) return;
		const id = generateId();
		members.push({ id, name, role: newMemberRole });
		scores[id] = {};
		for (const skill of allSkillNames) {
			scores[id][skill] = 0;
		}
		newMemberName = '';
	}

	function removeMember(id: string) {
		members = members.filter((m) => m.id !== id);
		delete scores[id];
		if (selectedMemberId === id) selectedMemberId = null;
	}

	function addSkill() {
		const name = newSkillName.trim();
		if (!name) return;
		const domain = domains.find((d) => d.id === newSkillDomain);
		if (!domain) return;
		if (domain.skills.includes(name)) return;
		domain.skills.push(name);
		// Initialize score for all members
		for (const m of members) {
			if (!scores[m.id]) scores[m.id] = {};
			scores[m.id][name] = 0;
		}
		newSkillName = '';
	}

	function removeSkill(domainId: string, skill: string) {
		const domain = domains.find((d) => d.id === domainId);
		if (!domain) return;
		domain.skills = domain.skills.filter((s) => s !== skill);
		for (const m of members) {
			if (scores[m.id]) delete scores[m.id][skill];
		}
	}

	function setScore(memberId: string, skill: string, value: number) {
		if (!scores[memberId]) scores[memberId] = {};
		scores[memberId][skill] = value;
	}

	function getScoreColor(value: number): string {
		switch (value) {
			case 0: return 'var(--eval-0)';
			case 1: return 'var(--eval-1)';
			case 2: return 'var(--eval-2)';
			case 3: return 'var(--eval-3)';
			case 4: return 'var(--eval-4)';
			default: return 'var(--eval-0)';
		}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ domains, members, scores })
			);
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.domains && Array.isArray(d.domains)) domains = d.domains;
				if (d.members && Array.isArray(d.members)) members = d.members;
				if (d.scores && typeof d.scores === 'object') scores = d.scores;
			}
		} catch {}
	}

	function handleReset() {
		domains = structuredClone(defaultDomains);
		members = [];
		scores = {};
		selectedMemberId = null;
		activeTab = 'config';
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const lines: string[] = [
			'# Evaluation tech equipe',
			'',
			`**Date :** ${today}`,
			`**Membres :** ${members.length}`,
			`**Competences evaluees :** ${allSkillNames.length}`,
			''
		];

		// Skills matrix
		lines.push('## Matrice des competences');
		lines.push('');
		const header = `| Competence | ${members.map((m) => m.name).join(' | ')} | Moy. | Referents |`;
		const sep = `|---|${members.map(() => '---').join('|')}|---|---|`;
		lines.push(header);
		lines.push(sep);
		for (const c of teamCoverage) {
			const memberVals = members.map((m) => {
				const v = scores[m.id]?.[c.skill] ?? 0;
				return `${v}/4`;
			});
			lines.push(`| ${c.skill} | ${memberVals.join(' | ')} | ${c.avg} | ${c.referents} |`);
		}
		lines.push('');

		// Gaps
		if (gaps.length > 0) {
			lines.push('## Gaps identifies');
			lines.push('');
			lines.push("Competences ou aucun membre n'est referent (score >= 3) :");
			lines.push('');
			for (const g of gaps) {
				lines.push(`- **${g.skill}** (${g.domain}) — Moyenne : ${g.avg}/4`);
			}
			lines.push('');
		}

		// Individual summaries
		lines.push('## Profils individuels');
		lines.push('');
		for (const m of members) {
			const memberScore = scores[m.id] ?? {};
			const vals = allSkillNames.map((s) => memberScore[s] ?? 0);
			const avg = vals.length > 0 ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
			const strengths = allSkillNames.filter((s) => (memberScore[s] ?? 0) >= 3);
			const weaknesses = allSkillNames.filter((s) => (memberScore[s] ?? 0) <= 1 && (memberScore[s] ?? 0) > 0);
			lines.push(`### ${m.name} (${roleLabels[m.role]})`);
			lines.push(`- Moyenne : ${avg}/4`);
			if (strengths.length > 0) lines.push(`- Points forts : ${strengths.join(', ')}`);
			if (weaknesses.length > 0) lines.push(`- Axes de progression : ${weaknesses.join(', ')}`);
			lines.push('');
		}

		lines.push('---');
		lines.push(`_Genere avec l'Evaluation tech equipe — ${TOOL_URL}_`);

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
		// Track all reactive state for save
		JSON.stringify(domains);
		JSON.stringify(members);
		JSON.stringify(scores);
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<div class="tool-layout">
		<!-- Left panel: Config + Evaluation -->
		<div class="tool-left">
			<div class="tab-bar">
				<button
					class="tab-btn"
					class:tab-btn--active={activeTab === 'config'}
					onclick={() => (activeTab = 'config')}
				>
					Configuration
				</button>
				<button
					class="tab-btn"
					class:tab-btn--active={activeTab === 'eval'}
					onclick={() => (activeTab = 'eval')}
				>
					Evaluation
				</button>
			</div>

			{#if activeTab === 'config'}
				<!-- Members section -->
				<section class="config-section">
					<h3 class="section-title">Membres de l'equipe</h3>
					<p class="section-hint">Ce que j'observe souvent : commencer par les roles reels, pas les titres officiels.</p>

					<div class="add-row">
						<input
							type="text"
							class="input-field input-field--grow"
							placeholder="Nom"
							bind:value={newMemberName}
							onkeydown={(e) => { if (e.key === 'Enter') addMember(); }}
						/>
						<select class="input-field" bind:value={newMemberRole}>
							{#each Object.entries(roleLabels) as [value, label]}
								<option {value}>{label}</option>
							{/each}
						</select>
						<button class="tool-btn tool-btn--small" onclick={addMember}>Ajouter</button>
					</div>

					{#if members.length > 0}
						<ul class="member-list">
							{#each members as member}
								<li class="member-item">
									<span class="member-name">{member.name}</span>
									<span class="member-role">{roleLabels[member.role]}</span>
									<button
										class="remove-btn"
										onclick={() => removeMember(member.id)}
										aria-label="Retirer {member.name}"
									>x</button>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="empty-state">Aucun membre ajoute.</p>
					{/if}
				</section>

				<!-- Skills section -->
				<section class="config-section">
					<h3 class="section-title">Competences</h3>
					<p class="section-hint">Ce que j'observe souvent : une grille trop large dilue l'analyse. 12 a 20 competences suffisent generalement.</p>

					{#each domains as domain}
						<div class="domain-block">
							<h4 class="domain-title">{domain.name}</h4>
							<div class="skill-tags">
								{#each domain.skills as skill}
									<span class="skill-tag">
										{skill}
										<button
											class="skill-tag-remove"
											onclick={() => removeSkill(domain.id, skill)}
											aria-label="Retirer {skill}"
										>x</button>
									</span>
								{/each}
							</div>
						</div>
					{/each}

					<div class="add-row">
						<select class="input-field" bind:value={newSkillDomain}>
							{#each domains as d}
								<option value={d.id}>{d.name}</option>
							{/each}
						</select>
						<input
							type="text"
							class="input-field input-field--grow"
							placeholder="Nouvelle competence"
							bind:value={newSkillName}
							onkeydown={(e) => { if (e.key === 'Enter') addSkill(); }}
						/>
						<button class="tool-btn tool-btn--small" onclick={addSkill}>Ajouter</button>
					</div>
				</section>

				{#if members.length > 0 && allSkillNames.length > 0}
					<div class="config-cta">
						<button class="tool-btn tool-btn--primary" onclick={() => (activeTab = 'eval')}>
							Passer a l'evaluation
						</button>
					</div>
				{/if}

			{:else}
				<!-- Evaluation tab -->
				{#if members.length === 0}
					<p class="empty-state">Ajoute d'abord des membres dans l'onglet Configuration.</p>
				{:else}
					{#each members as member}
						<section class="eval-member">
							<h3 class="eval-member-name">
								{member.name}
								<span class="eval-member-role">{roleLabels[member.role]}</span>
							</h3>

							{#each domains as domain}
								<div class="eval-domain">
									<h4 class="eval-domain-title">{domain.name}</h4>
									{#each domain.skills as skill}
										{@const currentScore = scores[member.id]?.[skill] ?? 0}
										<div class="eval-row">
											<span class="eval-skill-name">{skill}</span>
											<div class="eval-score-buttons">
												{#each [0, 1, 2, 3, 4] as val}
													<button
														class="score-btn"
														class:score-btn--active={currentScore === val}
														style="--btn-color: {getScoreColor(val)}"
														onclick={() => setScore(member.id, skill, val)}
														aria-label="{skill} : {val} — {levelDescriptions[val]}"
														title="{val} — {levelDescriptions[val]}"
													>
														{val}
													</button>
												{/each}
											</div>
											<span class="eval-level-label">{levelLabels[currentScore]}</span>
										</div>
									{/each}
								</div>
							{/each}
						</section>
					{/each}
				{/if}
			{/if}

			<div class="tool-actions">
				<button class="tool-btn tool-btn--primary" onclick={handleExport} disabled={members.length === 0}>
					{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Reinitialiser</button>
			</div>
		</div>

		<!-- Right panel: Results (sticky) -->
		<div class="tool-result" aria-live="polite" aria-atomic="true">
			{#if members.length === 0 || allSkillNames.length === 0}
				<div class="result-title">Resultats</div>
				<p class="empty-state">Configure ton equipe et tes competences pour voir les resultats.</p>
			{:else}
				<!-- Heatmap matrix -->
				<div class="result-title">Matrice des competences</div>
				<div class="heatmap-wrapper">
					<table class="heatmap">
						<thead>
							<tr>
								<th class="heatmap-corner"></th>
								{#each allSkills as { skill }}
									<th class="heatmap-col-header">
										<span class="heatmap-col-text">{skill}</span>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each members as member}
								<tr>
									<td class="heatmap-row-header">{member.name}</td>
									{#each allSkills as { skill }}
										{@const val = scores[member.id]?.[skill] ?? 0}
										<td
											class="heatmap-cell"
											style="background: {getScoreColor(val)}"
											title="{member.name} — {skill} : {val}/4 ({levelLabels[val]})"
										>
											{val}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Team coverage -->
				<div class="result-section">
					<div class="result-subtitle">Couverture equipe</div>
					<div class="coverage-list">
						{#each teamCoverage as c}
							<div class="coverage-row">
								<span class="coverage-skill">{c.skill}</span>
								<span class="coverage-avg">{c.avg}/4</span>
								<span class="coverage-referents" class:coverage-referents--danger={c.referents === 0}>
									{c.referents} ref.
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Gaps -->
				{#if gaps.length > 0}
					<div class="result-section">
						<div class="result-subtitle">Gaps identifies</div>
						<p class="gaps-hint">Ce que j'observe souvent : un gap n'est pas un echec. C'est un angle mort a rendre visible.</p>
						<ul class="gaps-list">
							{#each gaps as gap}
								<li class="gap-item">
									<span class="gap-skill">{gap.skill}</span>
									<span class="gap-domain">{gap.domain}</span>
									<span class="gap-avg">Moy. {gap.avg}/4</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Individual radar -->
				<div class="result-section">
					<div class="result-subtitle">Radar individuel</div>
					<select
						class="input-field input-field--full"
						bind:value={selectedMemberId}
					>
						<option value={null}>Selectionner un membre</option>
						{#each members as m}
							<option value={m.id}>{m.name}</option>
						{/each}
					</select>

					{#if radarData}
						<div class="radar-container">
							<svg viewBox="0 0 300 300" class="radar-svg" aria-hidden="true">
								{#each radarData.gridLevels as grid}
									<polygon points={grid} class="radar-grid" />
								{/each}
								{#each radarData.points as point}
									<line x1={radarData.cx} y1={radarData.cy} x2={point.x} y2={point.y} class="radar-axis" />
								{/each}
								<polygon points={radarData.polygon} class="radar-data" />
								{#each radarData.points as point}
									<circle cx={point.x} cy={point.y} r="3.5" class="radar-dot" />
								{/each}
								{#each radarData.points as point}
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
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.tool-container {
		max-width: 100%;
		--eval-0: rgba(100, 100, 120, 0.25);
		--eval-1: rgba(249, 115, 22, 0.5);
		--eval-2: rgba(139, 92, 246, 0.5);
		--eval-3: rgba(6, 182, 212, 0.5);
		--eval-4: rgba(236, 72, 153, 0.55);
	}

	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.tool-left {
		display: flex;
		flex-direction: column;
		gap: var(--content-gap);
	}

	/* Tabs */
	.tab-bar {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--border);
		margin-bottom: var(--content-gap);
	}

	.tab-btn {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--secondary);
		cursor: pointer;
		transition: var(--transition);
	}

	.tab-btn:hover {
		color: var(--primary);
	}

	.tab-btn--active {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	/* Config sections */
	.config-section {
		margin-bottom: var(--content-gap);
	}

	.section-title {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 4px 0;
	}

	.section-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 12px 0;
		font-style: italic;
	}

	.add-row {
		display: flex;
		gap: 8px;
		align-items: center;
		flex-wrap: wrap;
	}

	.input-field {
		font-family: var(--font-ui);
		font-size: 14px;
		padding: 8px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		min-height: 40px;
	}

	.input-field:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}

	.input-field--grow {
		flex: 1;
		min-width: 120px;
	}

	.input-field--full {
		width: 100%;
	}

	/* Members */
	.member-list {
		list-style: none;
		padding: 0;
		margin: 12px 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.member-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-family: var(--font-ui);
		font-size: 14px;
	}

	.member-name {
		flex: 1;
		font-weight: 600;
		color: var(--primary);
	}

	.member-role {
		font-size: 12px;
		color: var(--secondary);
		background: var(--accent-light);
		padding: 2px 8px;
		border-radius: 4px;
	}

	.remove-btn {
		background: none;
		border: none;
		color: var(--secondary);
		cursor: pointer;
		font-size: 14px;
		padding: 2px 6px;
		border-radius: 4px;
		font-family: var(--font-mono);
		transition: var(--transition);
	}

	.remove-btn:hover {
		color: #f97316;
		background: rgba(249, 115, 22, 0.1);
	}

	/* Skills / domains */
	.domain-block {
		margin-bottom: 12px;
	}

	.domain-title {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		margin: 0 0 6px 0;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.skill-tag {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-ui);
		font-size: 12px;
		padding: 4px 10px;
		border: 1px solid var(--border);
		border-radius: 20px;
		color: var(--primary);
		background: var(--theme);
	}

	.skill-tag-remove {
		background: none;
		border: none;
		color: var(--secondary);
		cursor: pointer;
		font-size: 11px;
		font-family: var(--font-mono);
		padding: 0 2px;
		transition: var(--transition);
	}

	.skill-tag-remove:hover {
		color: #f97316;
	}

	.config-cta {
		margin-top: 8px;
	}

	/* Evaluation */
	.eval-member {
		margin-bottom: calc(var(--content-gap) * 1.5);
		padding-bottom: var(--content-gap);
		border-bottom: 1px solid var(--border);
	}

	.eval-member:last-of-type {
		border-bottom: none;
	}

	.eval-member-name {
		font-family: var(--font-heading);
		font-size: 16px;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 12px 0;
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.eval-member-role {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 400;
		color: var(--secondary);
	}

	.eval-domain {
		margin-bottom: 12px;
	}

	.eval-domain-title {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--accent);
		margin: 0 0 6px 0;
	}

	.eval-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 4px 0;
	}

	.eval-skill-name {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--primary);
		min-width: 120px;
		flex-shrink: 0;
	}

	.eval-score-buttons {
		display: flex;
		gap: 4px;
	}

	.score-btn {
		width: 32px;
		height: 32px;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--theme);
		color: var(--secondary);
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.score-btn:hover {
		border-color: var(--btn-color);
		color: var(--primary);
	}

	.score-btn--active {
		background: var(--btn-color);
		border-color: var(--btn-color);
		color: #fff;
	}

	.eval-level-label {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
		min-width: 70px;
	}

	/* Result panel */
	.tool-result {
		padding: var(--gap);
		background: var(--accent-light);
		border: 1px solid var(--accent-border);
		border-radius: var(--radius);
		position: sticky;
		top: calc(var(--header-height) + var(--gap));
		max-height: calc(100vh - var(--header-height) - calc(var(--gap) * 2));
		overflow-y: auto;
	}

	.result-title {
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: var(--content-gap);
	}

	.result-section {
		border-top: 1px solid var(--border);
		padding-top: var(--content-gap);
		margin-top: var(--content-gap);
	}

	.result-subtitle {
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 10px;
	}

	/* Heatmap */
	.heatmap-wrapper {
		overflow-x: auto;
		margin-bottom: var(--content-gap);
		-webkit-overflow-scrolling: touch;
	}

	.heatmap {
		border-collapse: collapse;
		font-family: var(--font-ui);
		font-size: 11px;
		width: 100%;
		min-width: max-content;
	}

	.heatmap th,
	.heatmap td {
		padding: 4px 6px;
		text-align: center;
	}

	.heatmap-corner {
		background: transparent;
	}

	.heatmap-col-header {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		color: var(--secondary);
		font-weight: 600;
		padding-bottom: 8px;
		max-width: 28px;
	}

	.heatmap-col-text {
		font-size: 10px;
	}

	.heatmap-row-header {
		text-align: left;
		font-weight: 600;
		color: var(--primary);
		padding-right: 8px;
		white-space: nowrap;
	}

	.heatmap-cell {
		width: 28px;
		height: 28px;
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		transition: background 0.2s ease;
	}

	/* Coverage */
	.coverage-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.coverage-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 3px 0;
		font-size: 12px;
	}

	.coverage-skill {
		flex: 1;
		font-family: var(--font-ui);
		color: var(--primary);
	}

	.coverage-avg {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
		color: var(--accent);
		min-width: 32px;
		text-align: right;
	}

	.coverage-referents {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--secondary);
		min-width: 40px;
		text-align: right;
	}

	.coverage-referents--danger {
		color: #f97316;
		font-weight: 600;
	}

	/* Gaps */
	.gaps-hint {
		font-size: 12px;
		color: var(--secondary);
		margin: 0 0 10px 0;
		font-style: italic;
	}

	.gaps-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.gap-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		padding: 4px 8px;
		border-left: 3px solid #f97316;
		background: rgba(249, 115, 22, 0.05);
		border-radius: 0 4px 4px 0;
	}

	.gap-skill {
		font-family: var(--font-ui);
		font-weight: 600;
		color: var(--primary);
		flex: 1;
	}

	.gap-domain {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--secondary);
	}

	.gap-avg {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--secondary);
	}

	/* Radar */
	.radar-container {
		margin-top: 10px;
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
		font-size: 8px;
		fill: var(--secondary);
	}

	.empty-state {
		font-family: var(--font-ui);
		font-size: 13px;
		color: var(--secondary);
		font-style: italic;
		margin: 12px 0;
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

	.tool-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.tool-btn--primary {
		background: var(--accent);
		color: #fff;
	}

	.tool-btn--primary:hover:not(:disabled) {
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

	.tool-btn--small {
		font-size: 13px;
		padding: 8px 14px;
		min-height: 40px;
		background: var(--accent);
		color: #fff;
	}

	.tool-btn--small:hover {
		background: var(--accent-hover);
	}

	@media (max-width: 900px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-result {
			position: static;
			max-height: none;
		}
	}

	@media (max-width: 600px) {
		.tool-actions {
			flex-direction: column;
		}

		.tool-btn {
			width: 100%;
			text-align: center;
		}

		.add-row {
			flex-direction: column;
		}

		.input-field--grow {
			width: 100%;
		}

		.eval-row {
			flex-wrap: wrap;
		}

		.eval-skill-name {
			min-width: 100%;
		}
	}
</style>
