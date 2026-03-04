<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-tech-radar-personnel';
	const TOOL_URL = 'https://kevin.delfour.co/outils/tech-radar-personnel/';

	const RINGS = ['Adopt', 'Trial', 'Assess', 'Hold'] as const;
	const QUADRANTS = ['Langages & Frameworks', 'Outils', 'Plateformes', 'Techniques'] as const;

	type Ring = (typeof RINGS)[number];
	type Quadrant = (typeof QUADRANTS)[number];

	interface Blip {
		id: string;
		name: string;
		ring: Ring;
		quadrant: Quadrant;
	}

	const ringDescriptions: Record<Ring, string> = {
		Adopt: 'Prêt pour la production. Confiance forte.',
		Trial: 'À tester sur un vrai projet. Prometeur.',
		Assess: 'À explorer. Mérite investigation.',
		Hold: 'À éviter pour les nouveaux projets.'
	};

	const ringColors: Record<Ring, string> = {
		Adopt: '#27ae60',
		Trial: '#2980b9',
		Assess: '#f39c12',
		Hold: '#c0392b'
	};

	let blips = $state<Blip[]>([]);
	let newName = $state('');
	let newRing = $state<Ring>('Assess');
	let newQuadrant = $state<Quadrant>('Langages & Frameworks');
	let copyFeedback = $state(false);
	let activeQuadrant = $state<Quadrant | null>(null);

	const blipsByQuadrant = $derived(() => {
		const grouped: Record<Quadrant, Record<Ring, Blip[]>> = {} as any;
		for (const q of QUADRANTS) {
			grouped[q] = {} as any;
			for (const r of RINGS) {
				grouped[q][r] = [];
			}
		}
		for (const b of blips) {
			grouped[b.quadrant][b.ring].push(b);
		}
		return grouped;
	});

	function addBlip() {
		const name = newName.trim();
		if (!name) return;
		const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
		blips.push({ id, name, ring: newRing, quadrant: newQuadrant });
		newName = '';
		save();
	}

	function removeBlip(id: string) {
		const idx = blips.findIndex((b) => b.id === id);
		if (idx >= 0) {
			blips.splice(idx, 1);
			save();
		}
	}

	function moveBlip(id: string, ring: Ring) {
		const b = blips.find((b) => b.id === id);
		if (b) {
			b.ring = ring;
			save();
		}
	}

	function handleReset() {
		blips = [];
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	function save() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ blips }));
		} catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (Array.isArray(d.blips)) blips = d.blips;
			}
		} catch {}
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const grouped = blipsByQuadrant();
		const lines = [
			'# Tech Radar Personnel',
			'',
			`**Date :** ${today}`,
			`**Technologies :** ${blips.length}`,
			''
		];

		for (const q of QUADRANTS) {
			const qBlips = RINGS.flatMap((r) => grouped[q][r]);
			if (qBlips.length === 0) continue;
			lines.push(`## ${q}`, '');
			for (const r of RINGS) {
				if (grouped[q][r].length > 0) {
					lines.push(`### ${r}`);
					for (const b of grouped[q][r]) {
						lines.push(`- ${b.name}`);
					}
					lines.push('');
				}
			}
		}

		lines.push('---', `_Généré avec le Tech Radar Personnel — ${TOOL_URL}_`);
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

	onMount(() => {
		load();
	});
</script>

<div class="tool-container">
	<!-- Add form -->
	<div class="add-form">
		<div class="add-fields">
			<input
				type="text"
				bind:value={newName}
				placeholder="Nom de la technologie"
				class="add-input"
				onkeydown={(e) => e.key === 'Enter' && addBlip()}
			/>
			<select bind:value={newRing} class="add-select">
				{#each RINGS as r}
					<option value={r}>{r}</option>
				{/each}
			</select>
			<select bind:value={newQuadrant} class="add-select add-select--wide">
				{#each QUADRANTS as q}
					<option value={q}>{q}</option>
				{/each}
			</select>
			<button class="tool-btn tool-btn--primary add-btn" onclick={addBlip}>Ajouter</button>
		</div>
	</div>

	<!-- Ring legend -->
	<div class="ring-legend">
		{#each RINGS as r}
			<div class="ring-legend-item">
				<span class="ring-dot" style="background: {ringColors[r]}"></span>
				<span class="ring-name">{r}</span>
				<span class="ring-desc">{ringDescriptions[r]}</span>
			</div>
		{/each}
	</div>

	<!-- Radar grid -->
	{#if blips.length === 0}
		<div class="empty-state">
			<p>Ajoute des technologies pour construire ton radar.</p>
		</div>
	{:else}
		<div class="radar-grid">
			{#each QUADRANTS as q}
				{@const grouped = blipsByQuadrant()}
				{@const hasBlips = RINGS.some((r) => grouped[q][r].length > 0)}
				{#if hasBlips}
					<div class="quadrant-card" class:quadrant-card--active={activeQuadrant === q}>
						<button
							class="quadrant-title"
							onclick={() => (activeQuadrant = activeQuadrant === q ? null : q)}
						>
							{q}
							<span class="quadrant-count">
								{RINGS.reduce((sum, r) => sum + grouped[q][r].length, 0)}
							</span>
						</button>

						<div class="quadrant-content">
							{#each RINGS as r}
								{#if grouped[q][r].length > 0}
									<div class="ring-section">
										<span class="ring-label" style="color: {ringColors[r]}">{r}</span>
										<div class="blip-list">
											{#each grouped[q][r] as b}
												<div class="blip">
													<span class="blip-name">{b.name}</span>
													<div class="blip-actions">
														<select
															value={b.ring}
															class="blip-ring-select"
															onchange={(e) => moveBlip(b.id, e.currentTarget.value as Ring)}
														>
															{#each RINGS as ring}
																<option value={ring}>{ring}</option>
															{/each}
														</select>
														<button
															class="blip-remove"
															onclick={() => removeBlip(b.id)}
															aria-label="Supprimer {b.name}"
														>
															&times;
														</button>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="tool-actions">
			<button class="tool-btn tool-btn--primary" onclick={handleExport}>
				{copyFeedback ? 'Copié dans le presse-papier' : 'Exporter en Markdown'}
			</button>
			<button class="tool-btn tool-btn--secondary" onclick={handleReset}>Tout supprimer</button>
		</div>
	{/if}
</div>

<style>
	.tool-container {
		max-width: 100%;
	}

	/* Add form */
	.add-form {
		margin-bottom: calc(var(--gap) * 1.5);
	}

	.add-fields {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.add-input {
		flex: 1;
		min-width: 200px;
		font-family: var(--font-body);
		font-size: 15px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
		transition: var(--transition);
	}

	.add-input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	.add-select {
		font-family: var(--font-ui);
		font-size: 14px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
	}

	.add-select--wide {
		min-width: 160px;
	}

	.add-btn {
		white-space: nowrap;
	}

	/* Ring legend */
	.ring-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-bottom: calc(var(--gap) * 1.5);
		padding: 12px 16px;
		background: var(--code-bg, var(--entry));
		border-radius: var(--radius);
	}

	.ring-legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ring-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ring-name {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		color: var(--primary);
	}

	.ring-desc {
		font-size: 12px;
		color: var(--secondary);
		display: none;
	}

	/* Radar grid */
	.radar-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
		margin-bottom: var(--gap);
	}

	.quadrant-card {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.quadrant-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 12px 16px;
		background: var(--code-bg, var(--entry));
		border: none;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 600;
		color: var(--primary);
		cursor: pointer;
		transition: var(--transition);
	}

	.quadrant-title:hover {
		background: var(--accent-light);
	}

	.quadrant-count {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--secondary);
		background: var(--border);
		padding: 2px 8px;
		border-radius: 10px;
	}

	.quadrant-content {
		padding: 12px 16px;
	}

	.ring-section {
		margin-bottom: 10px;
	}

	.ring-section:last-child {
		margin-bottom: 0;
	}

	.ring-label {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 4px;
		display: block;
	}

	.blip-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.blip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 4px 0;
	}

	.blip-name {
		font-size: 14px;
		color: var(--primary);
	}

	.blip-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}

	.blip-ring-select {
		font-family: var(--font-ui);
		font-size: 11px;
		padding: 2px 6px;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--theme);
		color: var(--secondary);
	}

	.blip-remove {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: 1px solid transparent;
		border-radius: 4px;
		color: var(--secondary);
		cursor: pointer;
		font-size: 16px;
		transition: var(--transition);
	}

	.blip-remove:hover {
		color: #c0392b;
		border-color: #c0392b;
	}

	/* Empty state */
	.empty-state {
		text-align: center;
		padding: calc(var(--gap) * 2);
		color: var(--secondary);
		border: 1px dashed var(--border);
		border-radius: var(--radius);
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
		.radar-grid {
			grid-template-columns: 1fr;
		}

		.ring-legend {
			flex-direction: column;
			gap: 8px;
		}

		.ring-desc {
			display: inline;
		}
	}

	@media (max-width: 600px) {
		.add-fields {
			flex-direction: column;
		}

		.add-input,
		.add-select {
			width: 100%;
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
