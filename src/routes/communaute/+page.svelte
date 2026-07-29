<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { COMMUNITY } from '$lib/data/profile';
</script>

<SEO
	title="Communauté"
	description="Co-fondateur de la communauté CTO de Lyon, organisateur d'événements tech, animateur du club tech4tech, mentor de Tech Leads et de CTO."
	url="https://kevin.delfour.co/communaute/"
	breadcrumbs={[{ label: 'Communauté' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">Communauté</span>
		<h1>Faire grandir les gens ne s’arrête pas à mes équipes</h1>
		<p class="lead">
			Une organisation d’ingénierie ne s’arrête pas aux murs de l’entreprise. Je consacre du temps
			aux communautés tech lyonnaises et au mentorat, parce que les questions qu’on se pose quand on
			dirige une équipe ne se règlent pas seul.
		</p>
	</div>

	<section class="section">
		<div class="section-head">
			<h2>Mentorat</h2>
		</div>
		<div class="case-card">
			<p>
				J’accompagne des Tech Leads et des CTO. Les sujets reviennent : la transition de
				contributeur à multiplicateur, le positionnement face au comité de direction, les premières
				décisions d’organisation qu’on ne peut plus défaire facilement.
			</p>
			<p class="last">
				Je ne facture pas ce temps et je n’en fais pas une offre. C’est le prolongement naturel du
				livre « Être ou ne pas être CTO », écrit avec des pairs pour des pairs.
			</p>
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Communautés que j’anime ou que j’ai co-créées</h2>
		</div>
		<div class="engagements">
			{#each COMMUNITY as item}
				<article class="engagement">
					<div class="engagement-meta">
						<span class="engagement-role">{item.role}</span>
						<span class="engagement-since">depuis {item.since}</span>
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
			La technologie compte, mais les gens sont le multiplicateur. Animer une communauté, c’est
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
