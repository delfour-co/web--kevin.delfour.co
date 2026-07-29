<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { CONTACT, COMMUNITY_STATUS, SPEAKING_TOPICS, TALKS } from '$lib/data/profile';

	const monthFormat = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

	/** Accepte `2024`, `2024-08` et `2024-08-29` — on n’affiche jamais plus précis que la donnée. */
	const dateLabel = (date: string) => {
		if (/^\d{4}$/.test(date)) return date;
		// Midi pour éviter qu’un décalage de fuseau ne fasse basculer le mois.
		const label = monthFormat.format(new Date(`${date.slice(0, 7)}-01T12:00:00`));
		return label.charAt(0).toUpperCase() + label.slice(1);
	};
</script>

<SEO
	title="Conférences"
	description="Les sujets sur lesquels j'interviens : leadership d'ingénierie, IA pour les ingénieurs, construction d'équipes, stratégie technique, craftsmanship, agilité."
	url="https://kevin.delfour.co/conferences/"
	breadcrumbs={[{ label: 'Conférences' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">Conférences</span>
		<h1>Je parle de ce que je pratique</h1>
		<p class="lead">
			Pas de keynote sur des sujets que je n’ai pas vécus. Je viens avec des cas réels, y compris
			ceux qui se sont mal passés. Meetup, conférence, table ronde ou intervention en interne — les
			formats courts et les questions franches me conviennent mieux que les plénières.
		</p>
	</div>

	<section class="section">
		<div class="section-head">
			<h2>Sujets que je propose</h2>
		</div>
		<div class="card-grid card-grid--2">
			{#each SPEAKING_TOPICS as topic}
				<div class="card">
					<h3 class="card-title">{topic.title}</h3>
					<p class="card-text">{topic.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Interventions passées</h2>
		</div>
		<div class="timeline">
			{#each TALKS as talk}
				<article class="timeline-item">
					<time class="timeline-date" datetime={talk.date}>
						{dateLabel(talk.date)} · {talk.type} · {talk.location}
					</time>
					<h3 class="timeline-title">{talk.title}</h3>
					<p class="timeline-org">{talk.event}</p>
					{#if talk.withWhom}
						<p class="talk-with">{talk.withWhom}</p>
					{/if}
					{#if talk.summary}
						<p class="timeline-body">{talk.summary}</p>
					{/if}
					{#if talk.url}
						<a class="talk-link" href={talk.url} rel="noopener noreferrer" target="_blank">
							{talk.urlLabel ?? 'En savoir plus'}
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Rendez-vous que j’ai animés</h2>
			<p>
				Au-delà des interventions ponctuelles, j’ai organisé et animé des rendez-vous réguliers de
				la communauté tech lyonnaise. {COMMUNITY_STATUS}
			</p>
		</div>
		<ul class="recurring">
			<li>
				<strong>CTO de Lyon</strong> — échanges entre pairs qui portent des responsabilités
				d’organisation. Co-créateur, 2023 – 2025.
			</li>
			<li>
				<strong>Tech’Work &amp; Tech &amp; Wine</strong> — événements tech lyonnais avec Cloud
				Alpes. Organisateur, 2023 – 2025.
			</li>
			<li>
				<strong>Club tech4tech — Digital League</strong> — animation mensuelle, 2022 – 2025.
			</li>
		</ul>
		<a class="section-link" href="/communaute/">Le détail des engagements</a>
	</section>

	<section class="section">
		<div class="case-card">
			<h2>M’inviter</h2>
			<p>
				Dites-moi le contexte, le public et le format : je réponds à tous les messages sérieux, y
				compris pour dire non quand je ne suis pas la bonne personne.
			</p>
			<div class="btn-row">
				<a class="btn btn--primary" href="mailto:{CONTACT.email}">{CONTACT.email}</a>
				<a class="btn btn--secondary" href={CONTACT.linkedin} rel="noopener noreferrer" target="_blank">
					LinkedIn
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.talk-with {
		font-size: var(--text-sm);
		color: var(--tertiary);
		margin: 0 0 12px;
		max-width: 68ch;
	}
	.talk-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}

	.recurring {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: 68ch;
	}
	.recurring li {
		padding: 14px 0;
		border-bottom: 1px solid var(--border);
		font-size: var(--text-sm);
		color: var(--secondary);
	}
	.recurring li:first-child {
		padding-top: 0;
	}
	.recurring strong {
		color: var(--primary);
		font-weight: 600;
	}

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
</style>
