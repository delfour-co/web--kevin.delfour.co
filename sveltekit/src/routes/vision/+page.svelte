<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Vision"
	description="Ce qui guide ce site et mon travail. Des convictions forgées par 17 ans de terrain."
	url="https://kevin.delfour.co/vision/"
/>

<div class="page-container">
	<header class="page-header">
		<h1>Vision</h1>
		<p class="page-description">Ce qui guide ce site et mon travail. Des convictions forgées par 17 ans de terrain.</p>
	</header>

	<div class="post-content">
		<h2>Ce que je crois</h2>

		<p>Après 17 ans dans la tech, certaines convictions se sont solidifiées. Pas des vérités absolues. Des repères qui tiennent, vérifiés sur le terrain.</p>

		<h3>Le code est un outil, jamais le centre du discours</h3>
		<p>La technique est au service d'un projet, d'une équipe, d'une ambition. Quand la technique devient le sujet, on perd de vue pourquoi on fait ce qu'on fait.</p>

		<h3>Donner des repères, pas des leçons</h3>
		<p>Chaque contexte est différent. Ce qui a marché pour moi ne marchera pas forcément pour toi. Mais des repères bien posés permettent de prendre de meilleures décisions, plus vite.</p>

		<h3>La transmission gratuite quand ça aide à grande échelle</h3>
		<p>Les <a href="/articles/">articles</a>, les <a href="/livres/">livres</a> complets en ligne, les ressources structurées — tout cela est gratuit et accessible. Quand un contenu peut aider cent personnes, il n'a pas de raison d'être derrière un mur.</p>

		<h3>Un cadre clair quand ça demande du temps individuel</h3>
		<p>L'accompagnement personnalisé, le mentorat, la consultation — ça demande du temps, de l'attention, de l'énergie. Mon temps est limité, et je dois le protéger pour rester utile. Si tu as un besoin précis, <a href="/contact/">contacte-moi</a>.</p>

		<h3>Le droit à l'erreur n'est pas un slogan</h3>
		<p>C'est une pratique quotidienne. On ne construit rien de solide dans un environnement où les gens ont peur de se tromper. La sécurité psychologique n'est pas un luxe, c'est un prérequis.</p>

		<hr />

		<p>Pour en savoir plus sur mon parcours : <a href="/a-propos/">À propos</a>.</p>
	</div>
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
	.page-description { color: var(--secondary); font-size: 1.1rem; }
</style>
