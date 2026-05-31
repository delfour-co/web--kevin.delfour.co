<script lang="ts">
	import type { ProjectSection } from '$lib/data/projects';
	import SectionShell from './ProjectSection.svelte';
	import ScreenshotGallery from './ScreenshotGallery.svelte';

	let { section }: { section: ProjectSection } = $props();
</script>

<SectionShell cmd={section.cmd} title={section.title}>
	{#if section.kind === 'text'}
		{#each section.paragraphs as para}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p class="proj-text">{@html para}</p>
		{/each}
		{#if section.callout}
			<div class="callout">{@html section.callout}</div>
		{/if}
	{:else if section.kind === 'features'}
		<div class="term-grid">
			{#each section.items as it}
				<div class="term-card term-card--static">
					<div class="term-card-title">{it.title}</div>
					<p class="term-card-text">{it.desc}</p>
				</div>
			{/each}
		</div>
	{:else if section.kind === 'steps'}
		<ol class="steps">
			{#each section.items as it, i}
				<li class="step term-card term-card--static">
					<span class="step-number">{i + 1}</span>
					<div>
						<h3>{it.title}</h3>
						<p>{it.desc}</p>
					</div>
				</li>
			{/each}
		</ol>
	{:else if section.kind === 'commands'}
		<div class="term-grid">
			{#each section.items as it}
				<div class="term-card term-card--static">
					<code class="proj-code">{it.cmd}</code>
					<p class="term-card-text">{it.desc}</p>
				</div>
			{/each}
		</div>
	{:else if section.kind === 'rows'}
		<div class="rows">
			{#each section.items as row}
				<div class="row">
					<span class="row-label">{row.label}</span>
					<div class="term-chips">
						{#each row.values as v}<span class="term-chip">{v}</span>{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else if section.kind === 'stats'}
		<div class="stats">
			{#each section.items as s}
				<div class="stat term-card term-card--static">
					<span class="stat-value">{s.value}</span>
					<span class="stat-label">{s.label}</span>
				</div>
			{/each}
		</div>
	{:else if section.kind === 'versions'}
		<div class="versions">
			{#each section.items as v}
				<div class="version term-card term-card--static" class:version-pro={v.featured}>
					<h3>{v.name} <span class="version-price">{v.price}</span></h3>
					<p>{v.desc}</p>
				</div>
			{/each}
		</div>
	{:else if section.kind === 'chips'}
		<div class="term-chips">
			{#each section.items as c}<span class="term-chip">{c}</span>{/each}
		</div>
	{:else if section.kind === 'links'}
		<div class="proj-links">
			{#each section.items as l}
				<a href={l.href} target="_blank" rel="noopener" class="proj-link">{l.label}</a>
			{/each}
		</div>
	{:else if section.kind === 'gallery'}
		<ScreenshotGallery shots={section.shots} />
	{/if}
</SectionShell>

<style>
	.proj-text {
		color: var(--content);
		font-size: 0.875rem;
		line-height: calc(1.65 * var(--a11y-line-height-mult));
		max-width: 640px;
		margin: 0 0 12px;
	}
	.proj-text:last-of-type {
		margin-bottom: 0;
	}

	.callout {
		border-left: 2px solid var(--accent-border);
		background: var(--accent-light);
		border-radius: 0 6px 6px 0;
		padding: 14px 16px;
		margin-top: 16px;
	}
	.callout :global(p) {
		margin: 0;
	}
	.callout {
		color: var(--content);
		font-size: 0.8rem;
		line-height: calc(1.55 * var(--a11y-line-height-mult));
	}

	/* Steps */
	.steps {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 0;
		padding: 0;
	}
	.step {
		display: flex;
		gap: 16px;
		align-items: flex-start;
	}
	.step-number {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--accent-border);
		border-radius: 50%;
		background: var(--accent-light);
	}
	.step h3 {
		font-size: 0.875rem;
		margin: 0 0 4px;
		color: var(--accent);
		font-family: var(--font-heading);
	}
	.step p {
		font-size: 0.78rem;
		margin: 0;
		color: var(--content);
		line-height: calc(1.55 * var(--a11y-line-height-mult));
	}

	/* Commands */
	.proj-code {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--accent);
		background: var(--code-block-bg);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 3px 8px;
		margin: 0 0 8px;
	}

	/* Rows (distribution / stack groupé) */
	.rows {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.row-label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 110px;
	}

	/* Stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	.stat {
		text-align: center;
	}
	.stat-value {
		display: block;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--accent);
	}
	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: var(--tertiary);
		margin-top: 4px;
	}

	/* Versions */
	.versions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.version h3 {
		font-size: 0.95rem;
		margin: 0 0 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--accent);
		font-family: var(--font-heading);
	}
	.version-price {
		color: var(--tertiary);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 2px 10px;
		font-size: 0.66rem;
		letter-spacing: 0.03em;
		font-weight: 400;
	}
	.version p {
		font-size: 0.78rem;
		margin: 0;
		color: var(--content);
		line-height: calc(1.55 * var(--a11y-line-height-mult));
	}
	.version-pro {
		border-color: var(--accent-border);
	}
	.version-pro .version-price {
		color: var(--accent);
		border-color: var(--accent-border);
	}

	/* Links */
	.proj-links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.proj-link {
		display: inline-block;
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 8px 14px;
		font-size: 0.78rem;
		color: var(--content);
		text-decoration: none;
		background: var(--surface);
		transition: var(--transition);
	}
	.proj-link:hover {
		border-color: var(--accent);
		color: var(--accent);
		box-shadow: var(--accent-glow);
		transform: translateY(-2px);
	}

	@media (max-width: 640px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}
		.stats {
			grid-template-columns: 1fr;
		}
		.versions {
			grid-template-columns: 1fr;
		}
	}
</style>
