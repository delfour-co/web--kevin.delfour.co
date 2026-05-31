<script lang="ts">
	const items = [
		{ glyph: '⌕', label: 'search', href: '/search/' },
		{ glyph: '◇', label: 'graph', href: '/projets/' },
		{ glyph: '▦', label: 'cube', href: '/labs/cube' },
		{ glyph: '@', label: 'contact', href: '/contact/' },
		{ glyph: '⚙', label: 'lab', href: '/labs' }
	];
</script>

<section class="hud">
	<span class="hud-h">// QUICK ACCESS</span>
	<div class="qa-grid">
		{#each items as it}
			<a class="qa" href={it.href}>
				<span>{it.glyph}</span>{it.label}
			</a>
		{/each}
	</div>
</section>

<style>
	.hud {
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		background: rgba(8, 11, 18, 0.55);
		border-radius: 10px;
		padding: 13px 15px;
	}
	.hud-h {
		display: block;
		font-size: 0.6rem;
		letter-spacing: 0.16em;
		color: var(--lab-accent, #00e5ff);
		opacity: 0.9;
	}
	.qa-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 6px;
		margin-top: 10px;
	}
	.qa {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 8px 2px;
		border: 1px solid var(--lab-line, rgba(0, 229, 255, 0.18));
		border-radius: 7px;
		font-size: 0.54rem;
		color: var(--lab-dim, #7c8ea3);
		text-decoration: none;
		transition: all 0.15s ease;
	}
	.qa span {
		font-size: 0.95rem;
	}
	.qa:hover {
		text-decoration: none;
		color: var(--lab-accent, #00e5ff);
		border-color: color-mix(in srgb, var(--lab-accent, #00e5ff) 50%, transparent);
	}
</style>
