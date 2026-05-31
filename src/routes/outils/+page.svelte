<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';

	const slug = (label: string) =>
		label.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
</script>

<SEO
	title="Outils"
	description="Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion."
	url="https://kevin.delfour.co/outils/"
/>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd"><span class="p">$</span> ls outils/ <span class="hash"># des cadres pour décider, pas des réponses</span></div>
		<h1 class="visually-hidden">Outils</h1>
		<p class="term-lead">
			Des outils interactifs pour structurer tes décisions techniques. Pas des réponses toutes faites — des cadres de réflexion.
		</p>
		<p class="term-note">Tout tourne dans ton navigateur — rien n'est envoyé à un serveur, tes données restent chez toi.</p>
	</header>

	{#each toolCategories as category}
		<section class="term-sec">
			<div class="term-cmd"><span class="p">$</span> ls {slug(category.label)}/</div>
			<h2 class="visually-hidden">{category.label}</h2>
			<div class="term-grid">
				{#each category.tools as tool}
					<a href={tool.url} class="term-card tool-card">
						<span class="tool-ico" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="22" height="22">
								{@html tool.icon}
							</svg>
						</span>
						<span class="tool-body">
							<span class="term-card-title">{tool.nom}</span>
							<span class="term-card-text">{tool.description}</span>
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.tool-card {
		display: flex;
		gap: 13px;
		align-items: flex-start;
	}

	.tool-ico {
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: var(--theme);
		border: 1px solid var(--border);
		color: var(--secondary);
		transition: var(--transition);
	}
	.tool-card:hover .tool-ico {
		color: var(--accent);
		border-color: var(--accent-border);
	}

	.tool-body {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
</style>
