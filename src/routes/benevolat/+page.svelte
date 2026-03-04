<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const engagements = [
		{
			title: "Tech'Work & Tech & Wine — Organisateur bénévole",
			description: "Depuis 2 ans, organisation d'événements tech à Lyon avec Maxime Deroullers de Cloud Alpes. Des événements authentiques, loin des conférences corporate classiques.",
			since: '2023'
		},
		{
			title: 'CTO de Lyon — Co-créateur de la communauté',
			description: "Co-créateur de la communauté CTO de Lyon. Un espace d'échange indépendant et bénévole pour les CTO et leaders tech lyonnais.",
			since: '2023'
		},
		{
			title: 'Digital League — Animateur du club tech4tech',
			description: "Animation mensuelle du club tech4tech de Digital League. Organisation d'événements pour la communauté tech locale.",
			since: '2022'
		},
		{
			title: 'Eden School — Parrain',
			description: "Parrainage d'enfants de l'école Eden School. Engagement pour l'éducation et l'accompagnement d'enfants en difficulté.",
			since: '2018'
		}
	];
</script>

<SEO
	title="Bénévolat"
	description="Mes engagements bénévoles auprès de différentes associations. Donner du sens à mon expertise."
	url="https://kevin.delfour.co/benevolat/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Bénévolat</h1>
		<p class="page-description">
			Le bénévolat, c'est l'occasion de mettre mes compétences au service d'autres que mon employeur ou mes clients. C'est aussi une façon de rester connecté au terrain.
		</p>
	</header>

	<div class="engagements-list">
		{#each engagements as engagement}
			<article class="engagement-card">
				<h2 class="engagement-title">{engagement.title}</h2>
				<p class="engagement-desc">{engagement.description}</p>
				<span class="engagement-since">Depuis {engagement.since}</span>
			</article>
		{/each}
	</div>
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; line-height: 1.6; }

	.engagements-list {
		display: flex;
		flex-direction: column;
		gap: calc(var(--gap) * 1.5);
	}

	.engagement-card {
		padding: calc(var(--gap) * 1.5);
		border: 1px solid var(--border);
		border-radius: 12px;
	}

	.engagement-title {
		font-size: 1.15rem;
		margin: 0 0 8px 0;
	}

	.engagement-desc {
		color: var(--secondary);
		font-size: 0.95rem;
		margin: 0 0 12px 0;
		line-height: 1.5;
	}

	.engagement-since {
		font-family: var(--font-ui);
		font-size: 12px;
		color: var(--accent);
		font-weight: 500;
	}
</style>
