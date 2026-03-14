<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="À propos"
	description="CTO avec 17 ans d'expérience, basé à Lyon. Convictions, parcours et ligne morale. Je donne des repères. Pas des leçons."
	url="https://kevin.delfour.co/a-propos/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Parcours & convictions</span>
		<h1>À propos</h1>
	</header>

	<div class="post-content">
		<h2>Donner des repères. Pas des leçons.</h2>

		<p>Je suis Kevin Delfour, CTO avec 17 ans d'expérience, basé à Lyon.</p>
		<p>Je partage mes repères aux CTO et leaders tech pour mieux décider et mieux durer, et j'aide la nouvelle génération à trouver sa place sans se raconter d'histoires.</p>
		<p>Je m'appuie sur le terrain, des cadres clairs, et une culture du droit à l'erreur.</p>

		<h2>Ce que je crois</h2>

		<p>Après 17 ans dans la tech, certaines convictions se sont solidifiées. Pas des vérités absolues. Des repères qui tiennent, vérifiés sur le terrain.</p>

		<h3>Le code est un outil, jamais le centre du discours</h3>
		<p>La technique est au service d'un projet, d'une équipe, d'une ambition. Quand la technique devient le sujet, on perd de vue pourquoi on fait ce qu'on fait.</p>

		<h3>Donner des repères, pas des leçons</h3>
		<p>Chaque contexte est différent. Ce qui a marché pour moi ne marchera pas forcément pour toi. Mais des repères bien posés permettent de prendre de meilleures décisions, plus vite.</p>

		<h3>Le droit à l'erreur n'est pas un slogan</h3>
		<p>C'est une pratique quotidienne. On ne construit rien de solide dans un environnement où les gens ont peur de se tromper. La sécurité psychologique n'est pas un luxe, c'est un prérequis.</p>

		<h2>Ce que je partage</h2>
		<p>Sur ce site, tu trouveras :</p>
		<ul>
			<li><strong>Des repères structurants</strong> sur le rôle du CTO, la gouvernance technique, la culture d'équipe</li>
			<li><strong>Des ressources complètes</strong> : <a href="/livres/">livres</a> disponibles gratuitement en ligne</li>
			<li><strong>Des <a href="/outils/">outils</a> d'aide à la décision</strong> pour les arbitrages du quotidien</li>
			<li><strong>Des <a href="/articles/">réflexions</a></strong> basées sur l'expérience de terrain, sans posture de donneur de leçons</li>
		</ul>

		<h2>Ligne morale</h2>
		<p><strong>Je transmets gratuitement quand cela aide à grande échelle.</strong></p>
		<p>Les articles, les livres complets en ligne, les ressources structurées — tout cela est gratuit et accessible à tous.</p>
		<p><strong>Je mets un cadre quand cela demande du temps individuel.</strong></p>
		<p>Si tu cherches un accompagnement personnalisé, une consultation, ou un mentorat individuel, je mets un cadre clair. Mon temps est limité, et je dois le protéger pour rester efficace.</p>
		<p>Pour toute demande d'accompagnement individuel, <a href="/contact/">contacte-moi</a> avec :</p>
		<ul>
			<li>Ton contexte et ton besoin précis</li>
			<li>Ta disponibilité et tes contraintes</li>
			<li>Ton budget si applicable</li>
		</ul>

		<h2>Projets open source</h2>
		<p>Je partage également des projets open source sur GitHub : katas de programmation, applications web et outils de développement.</p>
		<p><strong><a href="/projets/">Voir mes projets →</a></strong></p>

		<h2>Contact</h2>
		<ul>
			<li><strong>LinkedIn</strong> : <a href="https://linkedin.com/in/kevindelfour" target="_blank" rel="noopener">kevindelfour</a></li>
			<li><strong>GitHub</strong> : <a href="https://github.com/kdelfour" target="_blank" rel="noopener">kdelfour</a></li>
		</ul>

		<hr />
		<p><em>17 ans d'expérience. CTO basé à Lyon. Donner des repères. Pas des leçons.</em></p>
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
