<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'tool-tech-radar-personnel';
	const TOOL_URL = 'https://kevin.delfour.co/outils/tech-radar-personnel/';

	const RINGS = ['Adopter', 'Expérimenter', 'Évaluer', 'Mettre en pause'] as const;
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
		'Adopter': 'Prêt pour la production. Confiance forte.',
		'Expérimenter': 'À tester sur un vrai projet. Prometteur.',
		'Évaluer': 'À explorer. Mérite investigation.',
		'Mettre en pause': 'À éviter pour les nouveaux projets.'
	};

	const ringColors: Record<Ring, string> = {
		'Adopter': '#06b6d4',
		'Expérimenter': '#8b5cf6',
		'Évaluer': '#f59e0b',
		'Mettre en pause': '#ef4444'
	};

	const DEFAULT_BLIPS: Blip[] = [
		// Langages & Frameworks
		{ id: 'def-ts', name: 'TypeScript', ring: 'Adopter', quadrant: 'Langages & Frameworks' },
		{ id: 'def-svelte', name: 'SvelteKit', ring: 'Adopter', quadrant: 'Langages & Frameworks' },
		{ id: 'def-rust', name: 'Rust', ring: 'Expérimenter', quadrant: 'Langages & Frameworks' },
		{ id: 'def-react', name: 'React', ring: 'Adopter', quadrant: 'Langages & Frameworks' },
		{ id: 'def-go', name: 'Go', ring: 'Évaluer', quadrant: 'Langages & Frameworks' },
		{ id: 'def-flutter', name: 'Flutter', ring: 'Expérimenter', quadrant: 'Langages & Frameworks' },
		{ id: 'def-angular', name: 'Angular', ring: 'Mettre en pause', quadrant: 'Langages & Frameworks' },
		{ id: 'def-python', name: 'Python', ring: 'Adopter', quadrant: 'Langages & Frameworks' },
		// Outils
		{ id: 'def-gh-actions', name: 'GitHub Actions', ring: 'Adopter', quadrant: 'Outils' },
		{ id: 'def-docker', name: 'Docker', ring: 'Adopter', quadrant: 'Outils' },
		{ id: 'def-biome', name: 'Biome', ring: 'Expérimenter', quadrant: 'Outils' },
		{ id: 'def-vitest', name: 'Vitest', ring: 'Adopter', quadrant: 'Outils' },
		{ id: 'def-playwright', name: 'Playwright', ring: 'Expérimenter', quadrant: 'Outils' },
		{ id: 'def-terraform', name: 'Terraform', ring: 'Évaluer', quadrant: 'Outils' },
		{ id: 'def-webpack', name: 'Webpack', ring: 'Mettre en pause', quadrant: 'Outils' },
		// Plateformes
		{ id: 'def-vercel', name: 'Vercel', ring: 'Adopter', quadrant: 'Plateformes' },
		{ id: 'def-aws', name: 'AWS', ring: 'Adopter', quadrant: 'Plateformes' },
		{ id: 'def-fly', name: 'Fly.io', ring: 'Expérimenter', quadrant: 'Plateformes' },
		{ id: 'def-supabase', name: 'Supabase', ring: 'Évaluer', quadrant: 'Plateformes' },
		{ id: 'def-heroku', name: 'Heroku', ring: 'Mettre en pause', quadrant: 'Plateformes' },
		{ id: 'def-ghpages', name: 'GitHub Pages', ring: 'Adopter', quadrant: 'Plateformes' },
		// Techniques
		{ id: 'def-tdd', name: 'TDD (dev. piloté par les tests)', ring: 'Adopter', quadrant: 'Techniques' },
		{ id: 'def-pair', name: 'Programmation en binôme', ring: 'Expérimenter', quadrant: 'Techniques' },
		{ id: 'def-adr', name: 'ADR (journal de décisions)', ring: 'Adopter', quadrant: 'Techniques' },
		{ id: 'def-trunk', name: 'Trunk-based dev', ring: 'Expérimenter', quadrant: 'Techniques' },
		{ id: 'def-micro', name: 'Microservices', ring: 'Évaluer', quadrant: 'Techniques' },
		{ id: 'def-mono', name: 'Monorepo', ring: 'Évaluer', quadrant: 'Techniques' },
		{ id: 'def-scrum', name: 'Scrum', ring: 'Mettre en pause', quadrant: 'Techniques' }
	];

	// SVG radar
	const SVG_SIZE = 560;
	const CENTER = SVG_SIZE / 2;
	const MAX_RADIUS = CENTER - 36;
	const RING_RADII = [
		MAX_RADIUS * 0.25,
		MAX_RADIUS * 0.50,
		MAX_RADIUS * 0.75,
		MAX_RADIUS
	];
	const BLIP_RADIUS = 6;

	let blips = $state<Blip[]>([]);
	let newName = $state('');
	let newRing = $state<Ring>('Évaluer');
	let newQuadrant = $state<Quadrant>('Langages & Frameworks');
	let copyFeedback = $state(false);
	let hoveredBlip = $state<string | null>(null);
	let filterQuadrant = $state<Quadrant | 'all'>('all');

	const filteredBlips = $derived(
		filterQuadrant === 'all' ? blips : blips.filter(b => b.quadrant === filterQuadrant)
	);

	const blipsByQuadrant = $derived.by(() => {
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

	// Deterministic placement
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

	interface PlacedBlip extends Blip {
		x: number;
		y: number;
	}

	const placedBlips = $derived.by(() => {
		const result: PlacedBlip[] = [];
		const quadrantAngles: Record<Quadrant, [number, number]> = {
			'Langages & Frameworks': [Math.PI, Math.PI * 1.5],
			'Outils': [Math.PI * 1.5, Math.PI * 2],
			'Plateformes': [0, Math.PI * 0.5],
			'Techniques': [Math.PI * 0.5, Math.PI]
		};

		for (const b of blips) {
			const ringIdx = RINGS.indexOf(b.ring);
			const innerR = ringIdx === 0 ? 0 : RING_RADII[ringIdx - 1];
			const outerR = RING_RADII[ringIdx];
			const [startAngle, endAngle] = quadrantAngles[b.quadrant];

			const rng = seededRandom(hashCode(b.id));
			const margin = BLIP_RADIUS + 3;
			const r = innerR + margin + rng() * (outerR - innerR - margin * 2);
			const anglePadding = 0.12;
			const angle = startAngle + anglePadding + rng() * (endAngle - startAngle - anglePadding * 2);

			result.push({ ...b, x: CENTER + r * Math.cos(angle), y: CENTER - r * Math.sin(angle) });
		}
		return result;
	});

	function addBlip() {
		const name = newName.trim();
		if (!name) return;
		if (blips.some(b => b.name.toLowerCase() === name.toLowerCase())) return;
		const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
		blips.push({ id, name, ring: newRing, quadrant: newQuadrant });
		newName = '';
		save();
	}

	function removeBlip(id: string) {
		const idx = blips.findIndex(b => b.id === id);
		if (idx >= 0) { blips.splice(idx, 1); save(); }
	}

	function moveBlip(id: string, ring: Ring) {
		const b = blips.find(b => b.id === id);
		if (b) { b.ring = ring; save(); }
	}

	function handleReset() {
		blips = [];
		save();
	}

	function save() {
		if (!browser) return;
		try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ blips })); } catch {}
	}

	function load() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const d = JSON.parse(saved);
				if (Array.isArray(d.blips) && d.blips.length > 0) { blips = d.blips; return; }
			}
		} catch {}
		// First visit: start empty
		blips = [];
	}

	async function handleExport() {
		const today = new Date().toISOString().split('T')[0];
		const grouped = blipsByQuadrant;
		const lines = [
			'# Cartographie des technologies', '',
			`**Date :** ${today}`,
			`**Technologies :** ${blips.length}`, ''
		];
		for (const q of QUADRANTS) {
			const qBlips = RINGS.flatMap(r => grouped[q][r]);
			if (qBlips.length === 0) continue;
			lines.push(`## ${q}`, '');
			for (const r of RINGS) {
				if (grouped[q][r].length > 0) {
					lines.push(`### ${r}`);
					for (const b of grouped[q][r]) lines.push(`- ${b.name}`);
					lines.push('');
				}
			}
		}
		lines.push('---', `_Généré avec la Cartographie des technologies — ${TOOL_URL}_`);
		const md = lines.join('\n');
		try {
			await navigator.clipboard.writeText(md);
		} catch {
			const ta = document.createElement('textarea');
			ta.value = md; ta.style.position = 'fixed'; ta.style.opacity = '0';
			document.body.appendChild(ta); ta.select(); document.execCommand('copy');
			document.body.removeChild(ta);
		}
		copyFeedback = true;
		setTimeout(() => (copyFeedback = false), 2000);
	}

	onMount(() => { load(); });
</script>

<div class="tool-layout">
	<!-- LEFT: List & Controls -->
	<div class="tool-left">
		<!-- Add form -->
		<div class="add-form glass-card">
			<h3 class="form-title">Ajouter une technologie</h3>
			<div class="add-row">
				<input
					type="text"
					bind:value={newName}
					placeholder="Nom de la technologie"
					class="add-input"
					onkeydown={(e) => e.key === 'Enter' && addBlip()}
				/>
				<button class="tool-btn tool-btn--primary" onclick={addBlip}>+</button>
			</div>
			<div class="add-selects">
				<select bind:value={newRing} class="add-select">
					{#each RINGS as r}
						<option value={r}>{r}</option>
					{/each}
				</select>
				<select bind:value={newQuadrant} class="add-select">
					{#each QUADRANTS as q}
						<option value={q}>{q}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Filter -->
		<div class="filter-row">
			<button
				class="filter-pill"
				class:filter-pill--active={filterQuadrant === 'all'}
				onclick={() => filterQuadrant = 'all'}
			>Tous ({blips.length})</button>
			{#each QUADRANTS as q}
				{@const count = blips.filter(b => b.quadrant === q).length}
				<button
					class="filter-pill"
					class:filter-pill--active={filterQuadrant === q}
					onclick={() => filterQuadrant = q}
				>{q} ({count})</button>
			{/each}
		</div>

		<!-- Blip list -->
		<div class="blip-list">
			{#each RINGS as ring}
				{@const ringBlips = filteredBlips.filter(b => b.ring === ring)}
				{#if ringBlips.length > 0}
					<div class="ring-group">
						<div class="ring-header">
							<span class="ring-dot" style="background:{ringColors[ring]}"></span>
							<span class="ring-name" style="color:{ringColors[ring]}">{ring}</span>
							<span class="ring-desc">{ringDescriptions[ring]}</span>
						</div>
						{#each ringBlips as b}
							<div
								class="blip-item"
								class:blip-item--hovered={hoveredBlip === b.id}
								onmouseenter={() => hoveredBlip = b.id}
								onmouseleave={() => hoveredBlip = null}
							>
								<span class="blip-dot" style="background:{ringColors[b.ring]}"></span>
								<span class="blip-name">{b.name}</span>
								<div class="blip-actions">
									<select
										value={b.ring}
										class="blip-select"
										onchange={(e) => moveBlip(b.id, e.currentTarget.value as Ring)}
									>
										{#each RINGS as r}
											<option value={r}>{r}</option>
										{/each}
									</select>
									<button
										class="blip-remove"
										onclick={() => removeBlip(b.id)}
										aria-label="Supprimer {b.name}"
									>&times;</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</div>

		<!-- Actions -->
		<div class="tool-actions">
			<button class="tool-btn tool-btn--primary" onclick={handleExport}>
				{copyFeedback ? 'Copié !' : 'Copier le bilan (format texte)'}
			</button>
			<button class="tool-btn tool-btn--secondary" onclick={handleReset}>
				Réinitialiser
			</button>
		</div>
	</div>

	<!-- RIGHT: Radar -->
	<div class="tool-right">
		<div class="radar-panel glass-card">
			<div class="radar-container">
				<svg
					viewBox="0 0 {SVG_SIZE} {SVG_SIZE}"
					class="radar-svg"
					role="img"
					aria-label="Cartographie des technologies"
				>
					<defs>
						<radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stop-color="rgba(6,182,212,0.08)" />
							<stop offset="100%" stop-color="transparent" />
						</radialGradient>
						<clipPath id="radarClip">
							<circle cx={CENTER} cy={CENTER} r={MAX_RADIUS} />
						</clipPath>
					</defs>

					<!-- Background glow -->
					<circle cx={CENTER} cy={CENTER} r={MAX_RADIUS} fill="url(#radarGlow)" />

					<!-- Grid circles -->
					{#each RING_RADII as radius, i}
						<circle
							cx={CENTER} cy={CENTER} r={radius}
							fill="none"
							stroke={ringColors[RINGS[i]]}
							stroke-width="1"
							stroke-opacity="0.25"
						/>
					{/each}

					<!-- Subtle inner grid circles -->
					{#each [0.125, 0.375, 0.625, 0.875] as frac}
						<circle
							cx={CENTER} cy={CENTER} r={MAX_RADIUS * frac}
							fill="none"
							stroke="rgba(255,255,255,0.03)"
							stroke-width="0.5"
						/>
					{/each}

					<!-- Crosshairs -->
					<line x1={CENTER - MAX_RADIUS} y1={CENTER} x2={CENTER + MAX_RADIUS} y2={CENTER}
						stroke="rgba(255,255,255,0.08)" stroke-width="1" />
					<line x1={CENTER} y1={CENTER - MAX_RADIUS} x2={CENTER} y2={CENTER + MAX_RADIUS}
						stroke="rgba(255,255,255,0.08)" stroke-width="1" />

					<!-- Diagonal guidelines -->
					{#each [Math.PI/4, Math.PI*3/4, Math.PI*5/4, Math.PI*7/4] as angle}
						<line
							x1={CENTER} y1={CENTER}
							x2={CENTER + MAX_RADIUS * Math.cos(angle)}
							y2={CENTER - MAX_RADIUS * Math.sin(angle)}
							stroke="rgba(255,255,255,0.03)" stroke-width="0.5"
						/>
					{/each}

					<!-- Sweep line (animated) -->
					<line
						x1={CENTER} y1={CENTER}
						x2={CENTER + MAX_RADIUS} y2={CENTER}
						stroke="rgba(6,182,212,0.4)" stroke-width="1.5"
						class="sweep-line"
						clip-path="url(#radarClip)"
					/>

					<!-- Sweep trail -->
					<path
						d="M {CENTER},{CENTER} L {CENTER + MAX_RADIUS},{CENTER} A {MAX_RADIUS},{MAX_RADIUS} 0 0,0 {CENTER + MAX_RADIUS * Math.cos(Math.PI/6)},{CENTER - MAX_RADIUS * Math.sin(Math.PI/6)} Z"
						fill="rgba(6,182,212,0.04)"
						class="sweep-trail"
						clip-path="url(#radarClip)"
					/>

					<!-- Ring labels -->
					{#each RINGS as r, i}
						{@const labelR = i === 0 ? RING_RADII[0] / 2 : (RING_RADII[i - 1] + RING_RADII[i]) / 2}
						<text
							x={CENTER + labelR}
							y={CENTER - 4}
							text-anchor="middle"
							class="ring-label-svg"
							fill={ringColors[r]}
							fill-opacity="0.5"
						>{r}</text>
					{/each}

					<!-- Quadrant labels -->
					<text x={CENTER - MAX_RADIUS/2} y={CENTER - MAX_RADIUS + 16} text-anchor="middle" class="quadrant-label-svg">Langages</text>
					<text x={CENTER + MAX_RADIUS/2} y={CENTER - MAX_RADIUS + 16} text-anchor="middle" class="quadrant-label-svg">Outils</text>
					<text x={CENTER + MAX_RADIUS/2} y={CENTER + MAX_RADIUS - 8} text-anchor="middle" class="quadrant-label-svg">Plateformes</text>
					<text x={CENTER - MAX_RADIUS/2} y={CENTER + MAX_RADIUS - 8} text-anchor="middle" class="quadrant-label-svg">Techniques</text>

					<!-- Center dot -->
					<circle cx={CENTER} cy={CENTER} r="3" fill="var(--accent)" fill-opacity="0.6" />

					<!-- Blips -->
					{#each placedBlips as b}
						{@const isHovered = hoveredBlip === b.id}
						<g
							class="radar-blip"
							onmouseenter={() => hoveredBlip = b.id}
							onmouseleave={() => hoveredBlip = null}
							onfocus={() => hoveredBlip = b.id}
							onblur={() => hoveredBlip = null}
							tabindex="0"
							role="button"
							aria-label="{b.name} — {b.ring}, {b.quadrant}"
						>
							<!-- Glow -->
							{#if isHovered}
								<circle cx={b.x} cy={b.y} r={BLIP_RADIUS * 3} fill={ringColors[b.ring]} fill-opacity="0.15" />
							{/if}
							<!-- Dot -->
							<circle
								cx={b.x} cy={b.y}
								r={isHovered ? BLIP_RADIUS + 2 : BLIP_RADIUS}
								fill={ringColors[b.ring]}
								stroke="rgba(0,0,0,0.6)"
								stroke-width="1.5"
								class="blip-dot-svg"
							/>
							<!-- Label on hover -->
							{#if isHovered}
								{@const textWidth = b.name.length * 7 + 16}
								{@const labelX = b.x + textWidth + 20 > SVG_SIZE ? b.x - textWidth - 8 : b.x + 14}
								<rect
									x={labelX - 6}
									y={b.y - 12}
									width={textWidth}
									height="22"
									rx="4"
									fill="rgba(0,0,0,0.9)"
									stroke={ringColors[b.ring]}
									stroke-width="1"
									stroke-opacity="0.6"
								/>
								<text x={labelX + 2} y={b.y + 3} class="blip-label-svg" fill="#e4e4e7">{b.name}</text>
							{/if}
						</g>
					{/each}
				</svg>
			</div>

			<!-- Legend -->
			<div class="radar-legend">
				{#each RINGS as r}
					<div class="legend-item">
						<span class="legend-dot" style="background:{ringColors[r]}"></span>
						<span class="legend-name">{r}</span>
						<span class="legend-count">{blips.filter(b => b.ring === r).length}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.tool-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--gap) * 1.5);
		align-items: start;
	}

	/* LEFT COLUMN */
	.tool-left {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	.add-form {
		padding: calc(var(--gap) * 1.2);
	}

	.form-title {
		font-family: var(--font-ui);
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 12px;
	}

	.add-row {
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
	}

	.add-input {
		flex: 1;
		font-family: var(--font-body);
		font-size: 14px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
	}

	.add-input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		border-color: var(--accent);
	}

	.add-selects {
		display: flex;
		gap: 8px;
	}

	.add-select {
		flex: 1;
		font-family: var(--font-ui);
		font-size: 13px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--theme);
		color: var(--primary);
	}

	/* Filter pills */
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.filter-pill {
		font-family: var(--font-ui);
		font-size: 11px;
		font-weight: 500;
		padding: 4px 12px;
		border: 1px solid var(--border);
		border-radius: 9999px;
		background: transparent;
		color: var(--secondary);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filter-pill:hover {
		border-color: var(--accent);
		color: var(--primary);
	}

	.filter-pill--active {
		background: var(--accent);
		border-color: var(--accent);
		color: #000;
		font-weight: 600;
	}

	/* Blip list */
	.blip-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.ring-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ring-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-bottom: 6px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 2px;
	}

	.ring-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ring-name {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ring-desc {
		font-size: 11px;
		color: var(--tertiary);
	}

	.blip-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 8px;
		border-radius: 6px;
		transition: background 0.15s ease;
	}

	.blip-item:hover,
	.blip-item--hovered {
		background: rgba(255, 255, 255, 0.04);
	}

	.blip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.blip-name {
		flex: 1;
		font-size: 13px;
		color: var(--primary);
	}

	.blip-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}

	.blip-select {
		font-family: var(--font-ui);
		font-size: 11px;
		padding: 2px 6px;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--theme);
		color: var(--secondary);
	}

	.blip-remove {
		width: 22px;
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: 1px solid transparent;
		border-radius: 4px;
		color: var(--tertiary);
		cursor: pointer;
		font-size: 14px;
	}

	.blip-remove:hover {
		color: #ef4444;
		border-color: #ef4444;
	}

	.tool-actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.tool-btn {
		font-family: var(--font-ui);
		font-size: 13px;
		font-weight: 600;
		padding: 10px 20px;
		border-radius: var(--radius);
		cursor: pointer;
		border: none;
		min-height: 42px;
		transition: all 0.15s ease;
	}

	.tool-btn--primary {
		background: var(--accent);
		color: #000;
	}

	.tool-btn--primary:hover {
		box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
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

	/* RIGHT COLUMN */
	.tool-right {
		position: sticky;
		top: calc(var(--gap) * 2 + 60px);
	}

	.radar-panel {
		padding: var(--gap);
		overflow: hidden;
	}

	.radar-container {
		position: relative;
	}

	.radar-svg {
		width: 100%;
		height: auto;
		display: block;
	}

	/* Sweep animation */
	.sweep-line,
	.sweep-trail {
		transform-origin: 50% 50%;
		animation: radar-sweep 6s linear infinite;
	}

	@keyframes radar-sweep {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* SVG text styles */
	.ring-label-svg {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		pointer-events: none;
	}

	.quadrant-label-svg {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 11px;
		font-weight: 600;
		fill: rgba(255, 255, 255, 0.3);
		pointer-events: none;
	}

	.radar-blip {
		cursor: pointer;
		outline: none;
	}

	.radar-blip:focus-visible .blip-dot-svg {
		stroke: var(--accent);
		stroke-width: 3;
	}

	.blip-dot-svg {
		transition: r 0.15s ease;
	}

	.blip-label-svg {
		font-family: var(--font-ui, 'Space Grotesk', system-ui);
		font-size: 11px;
		font-weight: 500;
		pointer-events: none;
	}

	/* Legend */
	.radar-legend {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--border);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.legend-name {
		font-family: var(--font-ui);
		font-size: 12px;
		font-weight: 600;
		color: var(--secondary);
	}

	.legend-count {
		font-family: var(--font-ui);
		font-size: 11px;
		color: var(--tertiary);
		background: rgba(255, 255, 255, 0.05);
		padding: 1px 6px;
		border-radius: 9999px;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.tool-layout {
			grid-template-columns: 1fr;
		}

		.tool-right {
			position: static;
			order: -1;
		}
	}

	@media (max-width: 600px) {
		.add-selects {
			flex-direction: column;
		}

		.filter-row {
			gap: 4px;
		}

		.filter-pill {
			font-size: 10px;
			padding: 3px 8px;
		}

		.radar-legend {
			flex-wrap: wrap;
			gap: 10px;
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
