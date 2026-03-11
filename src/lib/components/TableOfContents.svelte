<script lang="ts">
	import { browser } from '$app/environment';

	let { open = false } = $props<{ open?: boolean }>();

	interface TocItem {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<TocItem[]>([]);
	let expanded = $state(open);

	$effect(() => {
		if (!browser) return;

		const elements = document.querySelectorAll('.post-content h2, .post-content h3');
		headings = Array.from(elements).map((el) => ({
			id: el.id,
			text: el.textContent || '',
			level: parseInt(el.tagName[1])
		}));
	});
</script>

{#if headings.length > 0}
	<nav class="toc glass-card" aria-label="Table des matières">
		<button class="toc-toggle" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>
			<span class="toc-title">Table des matières</span>
			<svg
				class="toc-chevron"
				class:rotated={expanded}
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</button>

		{#if expanded}
			<ul class="toc-list">
				{#each headings as heading}
					<li class="toc-item" class:indent={heading.level === 3}>
						<a href="#{heading.id}" class="toc-link">{heading.text}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</nav>
{/if}

<style>
	.toc {
		padding: 16px;
		margin-bottom: calc(var(--gap) * 2);
	}

	.toc-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
		color: var(--primary);
	}

	.toc-title {
		font-family: var(--font-ui);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
	}

	.toc-chevron {
		transition: transform 0.2s;
		color: var(--secondary);
	}

	.toc-chevron.rotated {
		transform: rotate(180deg);
	}

	.toc-list {
		list-style: none;
		padding: 0;
		margin: 12px 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.toc-item.indent {
		padding-left: 16px;
	}

	.toc-link {
		display: block;
		font-size: 0.9rem;
		color: var(--secondary);
		text-decoration: none;
		padding: 4px 8px;
		border-radius: var(--radius-sm);
		transition: var(--transition);
		line-height: 1.4;
	}

	.toc-link:hover {
		color: var(--accent);
		background: var(--accent-light);
		text-decoration: none;
	}
</style>
