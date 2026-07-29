<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { PILLARS, pillarTools } from '$lib/data/leadership';
</script>

<SEO
	title="Leadership"
	description="Mes convictions de leader d'ingénierie et les pratiques qui vont avec : recruter, faire grandir, décider et gouverner, stratégie technique, adoption de l'IA."
	url="https://kevin.delfour.co/leadership/"
	breadcrumbs={[{ label: 'Leadership' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">Leadership</span>
		<h1>Mener une organisation d’ingénierie est un métier</h1>
		<p class="lead">
			Voici ce que dix-sept ans de terrain m’ont appris, et les pratiques que j’en ai tirées. Pas
			de théorie que je n’aie pas éprouvée — et, pour chaque sujet, les outils que j’utilise et les
			chapitres où je creuse.
		</p>
	</div>

	<nav class="pillar-nav" aria-label="Les cinq piliers">
		{#each PILLARS as pillar, i}
			<a href="#{pillar.id}">
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				{pillar.title}
			</a>
		{/each}
	</nav>

	{#each PILLARS as pillar, i}
		{@const linked = pillarTools(pillar)}
		<section class="pillar" id={pillar.id}>
			<div class="pillar-head">
				<span class="kicker">Pilier {String(i + 1).padStart(2, '0')}</span>
				<h2>{pillar.title}</h2>
				<div class="tag-row">
					{#each pillar.themes as theme}
						<span class="tag">{theme}</span>
					{/each}
				</div>
			</div>

			<div class="pillar-body">
				<p class="conviction">{pillar.conviction}</p>

				<h3>En pratique</h3>
				<ul class="practices">
					{#each pillar.practices as practice}
						<li>{practice}</li>
					{/each}
				</ul>

				{#if linked.length || pillar.chapters.length}
					<div class="resources">
						{#if linked.length}
							<div class="resource-group">
								<h4>Outils que j’utilise</h4>
								<ul>
									{#each linked as tool}
										<li><a href={tool.url}>{tool.nom}</a></li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if pillar.chapters.length}
							<div class="resource-group">
								<h4>À lire — « Être ou ne pas être CTO »</h4>
								<ul>
									{#each pillar.chapters as chapter}
										<li><a href={chapter.href}>{chapter.label}</a></li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</section>
	{/each}

	<section class="section closing">
		<div class="case-card">
			<h2>Ces pratiques, en contexte réel</h2>
			<p>
				Les convictions ci-dessus viennent de postes précis, d’équipes précises et de contraintes
				précises. Le parcours les remet en situation.
			</p>
			<div class="btn-row">
				<a class="btn btn--primary" href="/cv/">Voir mon parcours</a>
				<a class="btn btn--secondary" href="/contact/">Échanger</a>
			</div>
		</div>
	</section>
</div>

<style>
	.pillar-nav {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-bottom: var(--space-section);
	}
	.pillar-nav a {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 18px 20px;
		background: var(--surface);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--secondary);
	}
	.pillar-nav a:hover {
		background: var(--surface-hover);
		color: var(--primary);
		text-decoration: none;
	}
	.pillar-nav .num {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent);
	}

	.pillar {
		display: grid;
		grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
		gap: 40px;
		padding-block: clamp(36px, 5vw, 56px);
		border-top: 1px solid var(--border);
		scroll-margin-top: calc(var(--header-height) + 24px);
	}
	.pillar:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.pillar-head h2 {
		font-size: var(--text-xl);
		margin-bottom: 14px;
	}
	.pillar-head .kicker {
		color: var(--accent);
	}

	.conviction {
		font-size: var(--text-lg);
		line-height: calc(1.6 * var(--a11y-line-height-mult));
		color: var(--content);
		max-width: 68ch;
		margin-bottom: 32px;
	}

	.pillar-body h3 {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin-bottom: 14px;
	}

	.practices {
		margin: 0 0 32px;
		padding: 0;
		list-style: none;
		max-width: 68ch;
	}
	.practices li {
		position: relative;
		padding-left: 22px;
		margin-bottom: 10px;
		font-size: var(--text-sm);
		color: var(--content);
		line-height: calc(1.6 * var(--a11y-line-height-mult));
	}
	.practices li::before {
		content: '';
		position: absolute;
		left: 4px;
		top: 0.62em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}

	.resources {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 24px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
	}
	.resource-group h4 {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
		color: var(--tertiary);
		margin: 0 0 10px;
	}
	.resource-group ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.resource-group li {
		margin-bottom: 6px;
		font-size: var(--text-sm);
	}

	.closing {
		border-top: 1px solid var(--border);
		padding-top: clamp(36px, 5vw, 56px);
	}
	.closing h2 {
		font-size: var(--text-xl);
		margin-bottom: 12px;
	}
	.closing p {
		color: var(--secondary);
		max-width: 62ch;
	}
	.closing .btn-row {
		margin-top: 24px;
	}

	@media (max-width: 900px) {
		.pillar {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
</style>
