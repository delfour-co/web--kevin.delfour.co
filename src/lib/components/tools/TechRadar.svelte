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

	interface PlacedBlip extends Blip {
		x: number;
		y: number;
	}

	const ringDescriptions: Record<Ring, string> = {
		Adopt: 'Pret pour la production. Confiance forte.',
		Trial: 'A tester sur un vrai projet. Prometeur.',
		Assess: 'A explorer. Merite investigation.',
		Hold: 'A eviter pour les nouveaux projets.'
	};

	const ringColors: Record<Ring, string> = {
		Adopt: '#27ae60',
		Trial: '#2980b9',
		Assess: '#f39c12',
		Hold: '#c0392b'
	};

	const ringColorsAlpha: Record<Ring, string> = {
		Adopt: 'rgba(39, 174, 96, 0.15)',
		Trial: 'rgba(41, 128, 185, 0.12)',
		Assess: 'rgba(243, 156, 18, 0.10)',
		Hold: 'rgba(192, 57, 43, 0.08)'
	};

	// SVG radar constants
	const SVG_SIZE = 600;
	const CENTER = SVG_SIZE / 2;
	const MAX_RADIUS = CENTER - 40; // leave margin for labels
	const RING_RADII = [
		MAX_RADIUS * 0.25, // Adopt outer edge
		MAX_RADIUS * 0.50, // Trial outer edge
		MAX_RADIUS * 0.75, // Assess outer edge
		MAX_RADIUS          // Hold outer edge
	];
	const BLIP_RADIUS = 7;

	let blips = $state<Blip[]>([]);
	let newName = $state('');
	let newRing = $state<Ring>('Assess');
	let newQuadrant = $state<Quadrant>('Langages & Frameworks');
	let copyFeedback = $state(false);
	let activeQuadrant = $state<Quadrant | null>(null);
	let hoveredBlip = $state<string | null>(null);

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

	// Deterministic pseudo-random from blip id
	function hashCode(s: string): number {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
		}
		return h;
	}

	function seededRandom(seed: number): () => number {
		let s = seed;
		return () => {
			s = (s * 16807 + 0) % 2147483647;
			return (s - 1) / 2147483646;
		};
	}

	// Place blips on the radar SVG
	const placedBlips = $derived(() => {
		const result: PlacedBlip[] = [];
		const quadrantAngles: Record<Quadrant, [number, number]> = {
			'Langages & Frameworks': [Math.PI, Math.PI * 1.5],      // top-left
			'Outils': [Math.PI * 1.5, Math.PI * 2],                  // top-right
			'Plateformes': [0, Math.PI * 0.5],                       // bottom-right
			'Techniques': [Math.PI * 0.5, Math.PI]                    // bottom-left
		};

		for (const b of blips) {
			const ringIdx = RINGS.indexOf(b.ring);
			const innerR = ringIdx === 0 ? 0 : RING_RADII[ringIdx - 1];
			const outerR = RING_RADII[ringIdx];
			const [startAngle, endAngle] = quadrantAngles[b.quadrant];

			const rng = seededRandom(hashCode(b.id));
			const margin = BLIP_RADIUS + 2;
			const r = innerR + margin + rng() * (outerR - innerR - margin * 2);
			const anglePadding = 0.08;
			const angle = startAngle + anglePadding + rng() * (endAngle - startAngle - anglePadding * 2);

			const x = CENTER + r * Math.cos(angle);
			const y = CENTER + r * Math.sin(angle);

			result.push({ ...b, x, y });
		}

		return result;
	});

	// Quadrant label positions
	const quadrantLabels = [
		{ label: 'Langages & Frameworks', x: CENTER - MAX_RADIUS / 2, y: CENTER - MAX_RADIUS - 12 },
		{ label: 'Outils', x: CENTER + MAX_RADIUS / 2, y: CENTER - MAX_RADIUS - 12 },
		{ label: 'Plateformes', x: CENTER + MAX_RADIUS / 2, y: CENTER + MAX_RADIUS + 22 },
		{ label: 'Techniques', x: CENTER - MAX_RADIUS / 2, y: CENTER + MAX_RADIUS + 22 }
	];

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

		lines.push('---', `_Genere avec le Tech Radar Personnel — ${TOOL_URL}_`);
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

	<!-- SVG Radar Visualization -->
	{#if blips.length > 0}
		<div class="radar-svg-wrapper">
			<svg
				viewBox="0 0 {SVG_SIZE} {SVG_SIZE}"
				class="radar-svg"
				role="img"
				aria-label="Tech Radar : visualisation circulaire des technologies"
			>
				<!-- Ring backgrounds (outermost first) -->
				{#each [3, 2, 1, 0] as ringIdx}
					<circle
						cx={CENTER}
						cy={CENTER}
						r={RING_RADII[ringIdx]}
						fill={ringColorsAlpha[RINGS[ringIdx]]}
						stroke={ringColors[RINGS[ringIdx]]}
						stroke-width="1"
						stroke-opacity="0.3"
					/>
				{/each}

				<!-- Quadrant dividers -->
				<line
					x1={CENTER - MAX_RADIUS}
					y1={CENTER}
					x2={CENTER + MAX_RADIUS}
					y2={CENTER}
					stroke="var(--border)"
					stroke-width="1"
				/>
				<line
					x1={CENTER}
					y1={CENTER - MAX_RADIUS}
					x2={CENTER}
					y2={CENTER + MAX_RADIUS}
					stroke="var(--border)"
					stroke-width="1"
				/>

				<!-- Ring labels on axes -->
				{#each RINGS as r, i}
					<text
						x={CENTER + RING_RADII[i] - (RING_RADII[i] - (i === 0 ? 0 : RING_RADII[i - 1])) / 2}
						y={CENTER - 6}
						text-anchor="middle"
						class="radar-ring-label"
						fill={ringColors[r]}
					>
						{r}
					</text>
				{/each}

				<!-- Quadrant labels -->
				{#each quadrantLabels as ql}
					<text
						x={ql.x}
						y={ql.y}
						text-anchor="middle"
						class="radar-quadrant-label"
					>
						{ql.label}
					</text>
				{/each}

				<!-- Blips -->
				{#each placedBlips() as b}
					<g
						class="radar-blip"
						class:radar-blip--hovered={hoveredBlip === b.id}
						onmouseenter={() => (hoveredBlip = b.id)}
						onmouseleave={() => (hoveredBlip = null)}
						onfocus={() => (hoveredBlip = b.id)}
						onblur={() => (hoveredBlip = null)}
						tabindex="0"
						role="button"
						aria-label="{b.name} — {b.ring}, {b.quadrant}"
					>
						<circle
							cx={b.x}
							cy={b.y}
							r={hoveredBlip === b.id ? BLIP_RADIUS + 2 : BLIP_RADIUS}
							fill={ringColors[b.ring]}
							stroke="#000"
							stroke-width="1.5"
							class="radar-blip-dot"
						/>
						{#if hoveredBlip === b.id}
							<!-- Tooltip background -->
							<rect
								x={b.x + 12}
								y={b.y - 14}
								width={b.name.length * 7.5 + 16}
								height="24"
								rx="4"
								fill="rgba(0, 0, 0, 0.85)"
								stroke={ringColors[b.ring]}
								stroke-width="1"
							/>
							<text
								x={b.x + 20}
								y={b.y + 2}
								class="radar-blip-label"
								fill="#e4e4e7"
							>
								{b.name}
							</text>
						{/if}
					</g>
				{/each}
			</svg>
		</div>
	{/if}

	<!-- List view -->
	{#if blips.length === 0}
		<div class="empty-state">
			<p>Ajoute des technologies pour construire ton radar.</p>
		</div>
	{:else}
		<h2 class="list-heading">Detail par quadrant</h2>
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
				{copyFeedback ? 'Copie dans le presse-papier' : 'Exporter en Markdown'}
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

	/* SVG Radar */
	.radar-svg-wrapper {
		margin-bottom: calc(var(--gap) * 2);
		display: flex;
		justify-content: center;
	}

	.radar-svg {
		width: 100%;
		max-width: 640px;
		height: auto;
		aspect-ratio: 1 / 1;
	}

	.radar-ring-label {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		opacity: 0.7;
		pointer-events: none;
	}

	.radar-quadrant-label {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 12px;
		font-weight: 600;
		fill: var(--secondary, #a1a1aa);
		pointer-events: none;
	}

	.radar-blip {
		cursor: pointer;
		outline: none;
	}

	.radar-blip:focus-visible .radar-blip-dot {
		stroke: var(--accent, #06b6d4);
		stroke-width: 3;
	}

	.radar-blip-dot {
		transition: r 0.15s ease, fill-opacity 0.15s ease;
	}

	.radar-blip--hovered .radar-blip-dot {
		fill-opacity: 1;
	}

	.radar-blip-label {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 12px;
		font-weight: 500;
		pointer-events: none;
	}

	/* List heading */
	.list-heading {
		font-family: var(--font-ui);
		font-size: 16px;
		font-weight: 600;
		color: var(--secondary);
		margin-bottom: var(--gap);
		padding-bottom: 8px;
		border-bottom: 1px solid var(--border);
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

		.radar-svg {
			max-width: 100%;
		}

		.radar-quadrant-label {
			font-size: 10px;
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
