<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';
</script>

<SEO
	title="Boîte à outils"
	description="Vingt et un outils que j'ai construits pour mes propres besoins de manager : cadrer un 1:1, planifier un staffing, mesurer la maturité d'une équipe, documenter une décision."
	url="https://kevin.delfour.co/outils/"
	breadcrumbs={[{ label: 'Boîte à outils' }]}
/>

<div class="term-page">
	<header class="term-head">
		<div class="term-cmd">Boîte à outils</div>
		<h1>La boîte à outils du leader d’ingénierie</h1>
		<p class="term-lead">
			Vingt et un outils que j’ai construits pour mes propres besoins : cadrer un 1:1, planifier un
			staffing, mesurer la maturité d’une équipe, arbitrer une dette, documenter une décision. Faits
			main, utilisés en vrai, en accès libre.
		</p>
		<p class="term-note">
			Tout tourne dans votre navigateur — rien n’est envoyé à un serveur, vos données restent chez
			vous.
		</p>
	</header>

	{#each toolCategories as category}
		<section class="term-sec">
			<div class="term-cmd">{category.label}</div>
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

	<section class="term-sec">
		<div class="case-card">
			<h2>Ces outils viennent d’une pratique</h2>
			<p>
				Chacun est né d’un problème que j’avais à résoudre en menant une équipe. Les convictions
				qu’ils traduisent sont détaillées sur la page Leadership.
			</p>
			<div class="btn-row">
				<a class="btn btn--primary" href="/leadership/">Mes convictions</a>
				<a class="btn btn--secondary" href="/cv/">Mon parcours</a>
			</div>
		</div>
	</section>
</div>

<style>
	.case-card h2 {
		font-size: var(--text-xl);
		margin-bottom: 12px;
	}
	.case-card p {
		color: var(--secondary);
		max-width: 62ch;
	}
	.case-card .btn-row {
		margin-top: 24px;
	}

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
