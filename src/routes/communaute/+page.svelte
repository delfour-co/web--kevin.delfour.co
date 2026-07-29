<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { COMMUNITY, COMMUNITY_STATUS } from '$lib/data/profile';
</script>

<SEO
	title="Communauté"
	description="Co-créateur de la communauté CTO de Lyon, organisateur d'événements tech, animateur du club tech4tech, mentor de Tech Leads et de CTO — engagements en pause depuis 2026."
	url="https://kevin.delfour.co/communaute/"
	breadcrumbs={[{ label: 'Communauté' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">Communauté</span>
		<h1>Faire grandir les gens ne s’arrête pas à mes équipes</h1>
		<p class="lead">
			Une organisation d’ingénierie ne s’arrête pas aux murs de l’entreprise. Pendant plusieurs
			années j’ai consacré du temps aux communautés tech lyonnaises et au mentorat, parce que les
			questions qu’on se pose quand on mène une équipe ne se règlent pas seul.
		</p>
		<p class="status">{COMMUNITY_STATUS}</p>
	</div>

	<section class="section">
		<div class="section-head">
			<h2>Mentorat</h2>
		</div>
		<div class="case-card">
			<p>
				J’ai accompagné des Tech Leads et des CTO. Les sujets revenaient : la bascule entre faire
				et faire grandir, le positionnement face au comité de direction, les premières décisions
				d’organisation qu’on ne peut plus défaire facilement.
			</p>
			<p class="last">
				Je n’ai jamais facturé ce temps ni cherché à en faire une offre. C’était le prolongement
				naturel du livre « Être ou ne pas être CTO », écrit avec des pairs pour des pairs.
			</p>
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Communautés que j’ai animées ou co-créées</h2>
		</div>
		<div class="engagements">
			{#each COMMUNITY as item}
				<article class="engagement">
					<div class="engagement-meta">
						<span class="engagement-role">{item.role}</span>
						<span class="engagement-since">{item.period}</span>
					</div>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Pourquoi ça compte</h2>
		</div>
		<p class="prose-max">
			La technologie compte, mais elle ne fait rien toute seule. Animer une communauté, c’est
			s’exposer à des contextes qui ne sont pas les siens, entendre comment d’autres ont résolu ce
			qu’on croyait unique, et rester honnête sur ce qu’on ne sait pas. C’est aussi, très
			concrètement, la meilleure école de recrutement que je connaisse.
		</p>
		<div class="btn-row">
			<a class="btn btn--secondary" href="/conferences/">Mes interventions</a>
			<a class="btn btn--secondary" href="/leadership/">Ma façon de travailler</a>
		</div>
	</section>
</div>

<style>
	.engagements {
		display: grid;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	.engagement {
		background: var(--surface);
		padding: clamp(22px, 3vw, 30px);
	}
	.engagement-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: baseline;
		margin-bottom: 10px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}
	.engagement-role {
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: var(--tracking-label);
	}
	.engagement-since {
		color: var(--tertiary);
	}
	.engagement h3 {
		font-size: var(--text-lg);
		margin-bottom: 10px;
	}
	.engagement p {
		color: var(--secondary);
		font-size: var(--text-sm);
		max-width: 68ch;
		margin-bottom: 0;
	}

	.status {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--tertiary);
		margin: 0;
	}

	.case-card p {
		color: var(--content);
		max-width: 68ch;
	}
	.case-card p.last {
		margin-bottom: 0;
	}

	.section .btn-row {
		margin-top: 28px;
	}
</style>
