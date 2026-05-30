<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="À propos"
	description="Kevin Delfour — Lead Tech (avec une dimension management), 17 ans de terrain, basé à Lyon. Qui je suis et ce que je construis."
	url="https://kevin.delfour.co/a-propos/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">$ whoami</span>
		<h1>À propos</h1>
	</header>

	<div class="post-content">
		<p>Je suis Kevin Delfour, <strong>Lead Tech</strong> avec une dimension management, 17 ans de terrain, basé à Lyon.</p>
		<p>Ce site est mon lieu. J'y dépose ce que je construis : des projets, des outils que je bricole et que j'utilise, des livres que j'ai (co-)écrits. Pas une mission, pas une promesse — juste chez moi.</p>

		<h2>Ce que je crois</h2>
		<p>Après 17 ans dans la tech, quelques convictions tiennent. Pas des vérités absolues — des repères vérifiés sur le terrain.</p>

		<h3>Le code est un outil, jamais le centre</h3>
		<p>La technique sert un projet, une équipe, une ambition. Quand elle devient le sujet, on perd de vue le pourquoi.</p>

		<h3>Le droit à l'erreur n'est pas un slogan</h3>
		<p>C'est une pratique quotidienne. On ne construit rien de solide là où les gens ont peur de se tromper.</p>

		<h2>Ce que tu trouveras ici</h2>
		<ul>
			<li><strong><a href="/projets/">Des projets</a></strong> — ce que je construis, à différents stades.</li>
			<li><strong><a href="/outils/">Des outils</a></strong> — des aides à la décision que j'ai faites et que j'utilise.</li>
			<li><strong><a href="/livres/">Des livres</a></strong> — disponibles gratuitement en ligne.</li>
		</ul>

		<h2>Me joindre</h2>
		<ul>
			<li><strong>GitHub</strong> : <a href="https://github.com/kdelfour" target="_blank" rel="noopener">kdelfour</a></li>
			<li><strong>LinkedIn</strong> : <a href="https://linkedin.com/in/kevindelfour" target="_blank" rel="noopener">kevindelfour</a></li>
		</ul>
	</div>
</div>

<style>
	.page-container {
		max-width: var(--main-width-a11y);
		margin: 0 auto;
		padding: calc(var(--gap) * 2) var(--gap);
	}
	.page-header { margin-bottom: calc(var(--gap) * 2); }
</style>
