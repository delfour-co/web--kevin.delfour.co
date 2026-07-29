<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { CONTACT, SPEAKING_TOPICS } from '$lib/data/profile';
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
			<h2>Rendez-vous que j’anime</h2>
			<p>
				Au-delà des interventions ponctuelles, j’organise et j’anime des rendez-vous réguliers de la
				communauté tech lyonnaise.
			</p>
		</div>
		<ul class="recurring">
			<li>
				<strong>CTO de Lyon</strong> — échanges entre pairs qui portent des responsabilités
				d’organisation. Co-créateur depuis 2023.
			</li>
			<li>
				<strong>Tech’Work &amp; Tech &amp; Wine</strong> — événements tech lyonnais avec Cloud
				Alpes. Organisateur depuis 2023.
			</li>
			<li>
				<strong>Club tech4tech — Digital League</strong> — animation mensuelle depuis 2022.
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
