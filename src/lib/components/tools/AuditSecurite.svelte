<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-audit-securite';
	const TOOL_URL = 'https://kevin.delfour.co/outils/audit-securite-express/';

	type Criticality = 'critique' | 'important' | 'recommandé';

	interface Checkpoint {
		id: string;
		label: string;
		criticality: Criticality;
	}

	interface Layer {
		id: string;
		name: string;
		description: string;
		checkpoints: Checkpoint[];
	}

	const layers: Layer[] = [
		{
			id: 'auth',
			name: 'Authentification & Acc\u00e8s',
			description: 'Qui entre, avec quels droits, et comment on le v\u00e9rifie.',
			checkpoints: [
				{ id: 'auth-mfa', label: 'MFA activ\u00e9 sur les acc\u00e8s critiques', criticality: 'critique' },
				{ id: 'auth-password', label: 'Politique de mots de passe appliqu\u00e9e', criticality: 'important' },
				{ id: 'auth-sessions', label: 'Sessions expirantes et r\u00e9vocation possible', criticality: 'important' },
				{ id: 'auth-rbac', label: 'RBAC ou gestion fine des permissions', criticality: 'critique' },
				{ id: 'auth-logs', label: 'Audit logs des acc\u00e8s et actions sensibles', criticality: 'recommand\u00e9' }
			]
		},
		{
			id: 'data',
			name: 'Protection des donn\u00e9es',
			description: 'Ce qu\u2019on stocke, comment on le prot\u00e8ge, et ce qu\u2019on peut restaurer.',
			checkpoints: [
				{ id: 'data-rest', label: 'Chiffrement au repos (BDD, fichiers, backups)', criticality: 'critique' },
				{ id: 'data-transit', label: 'Chiffrement en transit (TLS partout)', criticality: 'critique' },
				{ id: 'data-rgpd', label: 'RGPD / anonymisation des donn\u00e9es personnelles', criticality: 'important' },
				{ id: 'data-backups', label: 'Backups test\u00e9s et restauration valid\u00e9e', criticality: 'critique' },
				{ id: 'data-secrets', label: 'Secrets g\u00e9r\u00e9s via vault ou gestionnaire d\u00e9di\u00e9', criticality: 'important' }
			]
		},
		{
			id: 'infra',
			name: 'Infrastructure',
			description: 'Les fondations r\u00e9seau, le monitoring, et la surface d\u2019attaque.',
			checkpoints: [
				{ id: 'infra-waf', label: 'Firewall / WAF en place', criticality: 'critique' },
				{ id: 'infra-monitoring', label: 'Monitoring et alerting op\u00e9rationnels', criticality: 'important' },
				{ id: 'infra-patching', label: 'Patching r\u00e9gulier (OS, runtime, d\u00e9pendances)', criticality: 'critique' },
				{ id: 'infra-network', label: 'R\u00e9seau segment\u00e9 (pas de flat network)', criticality: 'important' }
			]
		},
		{
			id: 'cicd',
			name: 'CI/CD & Supply Chain',
			description: 'La cha\u00eene de livraison, du code \u00e0 la prod.',
			checkpoints: [
				{ id: 'cicd-sast', label: 'SAST / DAST int\u00e9gr\u00e9 au pipeline', criticality: 'important' },
				{ id: 'cicd-deps', label: 'D\u00e9pendances audit\u00e9es (Snyk, Dependabot, etc.)', criticality: 'critique' },
				{ id: 'cicd-images', label: 'Images sign\u00e9es et scann\u00e9es', criticality: 'recommand\u00e9' },
				{ id: 'cicd-access', label: 'Acc\u00e8s repo et pipeline restreints', criticality: 'important' }
			]
		},
		{
			id: 'app',
			name: 'Application',
			description: 'Le code lui-m\u00eame, ses protections et ses comportements.',
			checkpoints: [
				{ id: 'app-inputs', label: 'Validation et sanitisation de tous les inputs', criticality: 'critique' },
				{ id: 'app-csrf', label: 'Protection CSRF / XSS effective', criticality: 'critique' },
				{ id: 'app-rate', label: 'Rate limiting sur les endpoints expos\u00e9s', criticality: 'important' },
				{ id: 'app-headers', label: 'Headers s\u00e9curit\u00e9 (CSP, HSTS, X-Frame-Options)', criticality: 'important' },
				{ id: 'app-errors', label: 'Error handling sans fuite d\u2019information', criticality: 'recommand\u00e9' }
			]
		},
		{
			id: 'org',
			name: 'Organisation',
			description: 'Les pratiques humaines et les processus qui tiennent dans la dur\u00e9e.',
			checkpoints: [
				{ id: 'org-training', label: '\u00c9quipe form\u00e9e aux bases s\u00e9curit\u00e9', criticality: 'important' },
				{ id: 'org-incident', label: 'Plan de r\u00e9ponse incident document\u00e9', criticality: 'critique' },
				{ id: 'org-pentest', label: 'Pentests ou audits r\u00e9guliers', criticality: 'recommand\u00e9' },
				{ id: 'org-docs', label: 'Documentation s\u00e9curit\u00e9 \u00e0 jour', criticality: 'recommand\u00e9' }
			]
		}
	];

	const allCheckpoints = layers.flatMap((l) => l.checkpoints);
	const totalCheckpoints = allCheckpoints.length;

	const criticalityWeights: Record<Criticality, number> = {
		critique: 3,
		important: 2,
		recommandé: 1
	};

	const criticalityLabels: Record<Criticality, string> = {
		critique: 'Critique',
		important: 'Important',
		recommandé: 'Recommand\u00e9'
	};

	let checked = $state<Record<string, boolean>>(
		Object.fromEntries(allCheckpoints.map((c) => [c.id, false]))
	);

	let copyFeedback = $state(false);

	const totalWeight = allCheckpoints.reduce((sum, c) => sum + criticalityWeights[c.criticality], 0);

	const globalScore = $derived(() => {
		const earned = allCheckpoints.reduce(
			(sum, c) => sum + (checked[c.id] ? criticalityWeights[c.criticality] : 0),
			0
		);
		return Math.round((earned / totalWeight) * 100);
	});

	const layerScores = $derived(() => {
		return layers.map((layer) => {
			const layerWeight = layer.checkpoints.reduce(
				(sum, c) => sum + criticalityWeights[c.criticality],
				0
			);
			const earned = layer.checkpoints.reduce(
				(sum, c) => sum + (checked[c.id] ? criticalityWeights[c.criticality] : 0),
				0
			);
			return {
				id: layer.id,
				name: layer.name,
				score: Math.round((earned / layerWeight) * 100),
				checked: layer.checkpoints.filter((c) => checked[c.id]).length,
				total: layer.checkpoints.length
			};
		});
	});

	const securityLevel = $derived(() => {
		const score = globalScore();
		if (score <= 40) return { label: 'Exposition critique', color: 'var(--audit-critique)' };
		if (score <= 60) return { label: 'Fondations fragiles', color: 'var(--audit-important)' };
		if (score <= 80) return { label: 'Base solide', color: 'var(--audit-accent)' };
		return { label: 'Posture mature', color: 'var(--audit-accent2)' };
	});

	const uncheckedCritical = $derived(() => {
		return allCheckpoints.filter((c) => c.criticality === 'critique' && !checked[c.id]);
	});

	const checkedCount = $derived(() => {
		return allCheckpoints.filter((c) => checked[c.id]).length;
	});

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (d.checked) {
					for (const c of allCheckpoints) {
						if (typeof d.checked[c.id] === 'boolean') {
							checked[c.id] = d.checked[c.id];
						}
					}
				}
			}
		} catch {}
	}

	function handleReset() {
		for (const c of allCheckpoints) {
			checked[c.id] = false;
		}
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const lines = [
			'# Audit s\u00e9curit\u00e9 express',
			'',
			`**Date :** ${today}`,
			`**Score global :** ${globalScore()}%`,
			`**Niveau :** ${securityLevel().label}`,
			''
		];

		for (const layer of layers) {
			const ls = layerScores().find((s) => s.id === layer.id)!;
			lines.push(`## ${layer.name} (${ls.score}%)`);
			lines.push('');
			for (const cp of layer.checkpoints) {
				const mark = checked[cp.id] ? 'x' : ' ';
				lines.push(`- [${mark}] ${cp.label} _(${criticalityLabels[cp.criticality]})_`);
			}
			lines.push('');
		}

		const critical = uncheckedCritical();
		if (critical.length > 0) {
			lines.push('## Priorit\u00e9s imm\u00e9diates');
			lines.push('');
			for (const c of critical) {
				lines.push(`- ${c.label}`);
			}
			lines.push('');
		}

		lines.push('---');
		lines.push(`_G\u00e9n\u00e9r\u00e9 avec l\u2019Audit s\u00e9curit\u00e9 express \u2014 ${TOOL_URL}_`);

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
		// Track all checked values to trigger save
		const _ = Object.values(checked).join(',');
		save();
	});

	onMount(() => {
		load();
	});
</script>

<div class="audit-container">
	<div class="audit-layout">
		<div class="audit-layers">
			{#each layers as layer}
				{@const ls = layerScores().find((s) => s.id === layer.id)!}
				<section class="glass-card layer-card">
					<div class="layer-header">
						<div class="layer-title-row">
							<h2 class="layer-name">{layer.name}</h2>
							<span class="layer-score" style="color: {ls.score >= 80 ? 'var(--audit-accent2)' : ls.score >= 50 ? 'var(--audit-accent)' : 'var(--audit-critique)'}">{ls.score}%</span>
						</div>
						<p class="layer-description">{layer.description}</p>
						<div class="layer-progress-bar">
							<div
								class="layer-progress-fill"
								style="width: {ls.score}%; background: {ls.score >= 80 ? 'var(--audit-accent2)' : ls.score >= 50 ? 'var(--audit-accent)' : 'var(--audit-critique)'}"
							></div>
						</div>
					</div>
					<div class="checkpoints">
						{#each layer.checkpoints as cp}
							<label class="checkpoint" class:checkpoint--checked={checked[cp.id]}>
								<input
									type="checkbox"
									bind:checked={checked[cp.id]}
									class="checkpoint-input"
									aria-label="{cp.label} ({criticalityLabels[cp.criticality]})"
								/>
								<span class="checkpoint-checkmark"></span>
								<span class="checkpoint-label">{cp.label}</span>
								<span class="criticality-badge criticality--{cp.criticality}">{criticalityLabels[cp.criticality]}</span>
							</label>
						{/each}
					</div>
				</section>
			{/each}

			<div class="audit-actions">
				<button class="audit-btn audit-btn--primary" onclick={handleExport}>
					{copyFeedback ? 'Copi\u00e9 dans le presse-papier' : 'Exporter en Markdown'}
				</button>
				<button class="audit-btn audit-btn--secondary" onclick={handleReset}>R\u00e9initialiser</button>
			</div>
		</div>

		<div class="audit-result" aria-live="polite" aria-atomic="true">
			<div class="result-section">
				<div class="score-global">
					<div class="score-ring" style="--score-pct: {globalScore()}; --score-color: {securityLevel().color}">
						<svg viewBox="0 0 120 120" class="score-svg">
							<circle cx="60" cy="60" r="52" class="score-ring-bg" />
							<circle
								cx="60"
								cy="60"
								r="52"
								class="score-ring-fill"
								style="stroke-dasharray: {326.7}; stroke-dashoffset: {326.7 - (326.7 * globalScore()) / 100}; stroke: {securityLevel().color}"
							/>
						</svg>
						<div class="score-text">
							<span class="score-number" style="color: {securityLevel().color}">{globalScore()}%</span>
							<span class="score-count">{checkedCount()}/{totalCheckpoints}</span>
						</div>
					</div>
					<div class="score-level" style="color: {securityLevel().color}">{securityLevel().label}</div>
				</div>
			</div>

			<div class="result-section">
				<h3 class="result-title">Score par couche</h3>
				<div class="layer-scores">
					{#each layerScores() as ls}
						<div class="mini-score">
							<div class="mini-score-header">
								<span class="mini-score-name">{ls.name}</span>
								<span class="mini-score-value">{ls.score}%</span>
							</div>
							<div class="mini-progress">
								<div
									class="mini-progress-fill"
									style="width: {ls.score}%; background: {ls.score >= 80 ? 'var(--audit-accent2)' : ls.score >= 50 ? 'var(--audit-accent)' : 'var(--audit-critique)'}"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if uncheckedCritical().length > 0}
				<div class="result-section">
					<h3 class="result-title result-title--alert">Priorit\u00e9s imm\u00e9diates</h3>
					<p class="priorities-hint">Points critiques non coch\u00e9s \u2014 ce que j'observe souvent comme premi\u00e8res failles.</p>
					<ul class="priorities-list">
						{#each uncheckedCritical() as cp}
							<li class="priority-item">{cp.label}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.audit-container {
		--audit-accent: #06b6d4;
		--audit-accent2: #8b5cf6;
		--audit-accent3: #ec4899;
		--audit-critique: #ec4899;
		--audit-important: #f59e0b;
		--audit-recommande: #a1a1aa;
		--audit-surface: rgba(255, 255, 255, 0.05);
		--audit-border: rgba(255, 255, 255, 0.08);
		--audit-primary: #e4e4e7;
		--audit-secondary: #a1a1aa;
		--audit-tertiary: #71717a;
		--audit-font-ui: 'Space Grotesk', var(--font-ui), system-ui, sans-serif;

		max-width: 100%;
		color: var(--audit-primary);
	}

	.audit-layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: calc(var(--gap) * 2);
		align-items: start;
	}

	.audit-layers {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	/* Glass card */
	.glass-card {
		background: var(--audit-surface);
		border: 1px solid var(--audit-border);
		border-radius: 12px;
		padding: 24px;
		backdrop-filter: blur(8px);
	}

	.layer-header {
		margin-bottom: 16px;
	}

	.layer-title-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 4px;
	}

	.layer-name {
		font-family: var(--audit-font-ui);
		font-size: 16px;
		font-weight: 600;
		color: var(--audit-primary);
		margin: 0;
	}

	.layer-score {
		font-family: var(--font-mono, monospace);
		font-size: 14px;
		font-weight: 700;
	}

	.layer-description {
		font-size: 13px;
		color: var(--audit-secondary);
		margin: 0 0 10px 0;
		line-height: 1.4;
	}

	.layer-progress-bar {
		height: 3px;
		background: var(--audit-border);
		border-radius: 2px;
		overflow: hidden;
	}

	.layer-progress-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.4s ease, background 0.4s ease;
	}

	/* Checkpoints */
	.checkpoints {
		display: flex;
		flex-direction: column;
		gap: 6px;
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
		border: 2px solid var(--audit-tertiary);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.checkpoint-input:checked + .checkpoint-checkmark {
		background: var(--audit-accent);
		border-color: var(--audit-accent);
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
		outline: 2px solid var(--audit-accent);
		outline-offset: 2px;
	}

	.checkpoint-label {
		flex: 1;
		font-family: var(--audit-font-ui);
		font-size: 14px;
		color: var(--audit-primary);
		line-height: 1.3;
	}

	.checkpoint--checked .checkpoint-label {
		text-decoration: line-through;
		text-decoration-color: var(--audit-tertiary);
	}

	.criticality-badge {
		flex-shrink: 0;
		font-family: var(--audit-font-ui);
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 10px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.criticality--critique {
		color: var(--audit-critique);
		background: rgba(236, 72, 153, 0.12);
		border: 1px solid rgba(236, 72, 153, 0.2);
	}

	.criticality--important {
		color: var(--audit-important);
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.2);
	}

	.criticality--recommandé {
		color: var(--audit-recommande);
		background: rgba(161, 161, 170, 0.1);
		border: 1px solid rgba(161, 161, 170, 0.15);
	}

	/* Result panel */
	.audit-result {
		position: sticky;
		top: calc(var(--header-height, 60px) + var(--gap, 16px));
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.result-section {
		background: var(--audit-surface);
		border: 1px solid var(--audit-border);
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
		stroke: var(--audit-border);
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
		font-family: var(--audit-font-ui);
		font-size: 28px;
		font-weight: 700;
		line-height: 1;
	}

	.score-count {
		font-family: var(--font-mono, monospace);
		font-size: 12px;
		color: var(--audit-tertiary);
	}

	.score-level {
		font-family: var(--audit-font-ui);
		font-size: 14px;
		font-weight: 600;
		text-align: center;
	}

	/* Layer scores */
	.result-title {
		font-family: var(--audit-font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--audit-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 14px 0;
	}

	.result-title--alert {
		color: var(--audit-critique);
	}

	.layer-scores {
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
		font-family: var(--audit-font-ui);
		font-size: 12px;
		color: var(--audit-secondary);
	}

	.mini-score-value {
		font-family: var(--font-mono, monospace);
		font-size: 12px;
		font-weight: 600;
		color: var(--audit-primary);
	}

	.mini-progress {
		height: 4px;
		background: var(--audit-border);
		border-radius: 2px;
		overflow: hidden;
	}

	.mini-progress-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.4s ease, background 0.4s ease;
	}

	/* Priorities */
	.priorities-hint {
		font-size: 12px;
		color: var(--audit-tertiary);
		margin: 0 0 10px 0;
		line-height: 1.4;
	}

	.priorities-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.priority-item {
		font-family: var(--audit-font-ui);
		font-size: 13px;
		color: var(--audit-critique);
		padding-left: 14px;
		position: relative;
		line-height: 1.4;
	}

	.priority-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 7px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--audit-critique);
	}

	/* Actions */
	.audit-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.audit-btn {
		font-family: var(--audit-font-ui);
		font-size: 14px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		min-height: 44px;
	}

	.audit-btn--primary {
		background: var(--audit-accent);
		color: #000;
	}

	.audit-btn--primary:hover {
		background: #22d3ee;
	}

	.audit-btn--secondary {
		background: transparent;
		color: var(--audit-secondary);
		border: 1px solid var(--audit-border);
	}

	.audit-btn--secondary:hover {
		border-color: var(--audit-tertiary);
		color: var(--audit-primary);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.audit-layout {
			grid-template-columns: 1fr;
		}

		.audit-result {
			position: static;
		}
	}

	@media (max-width: 600px) {
		.glass-card {
			padding: 16px;
		}

		.checkpoint {
			padding: 6px 4px;
			gap: 8px;
		}

		.criticality-badge {
			font-size: 10px;
			padding: 2px 6px;
		}

		.audit-actions {
			flex-direction: column;
		}

		.audit-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
