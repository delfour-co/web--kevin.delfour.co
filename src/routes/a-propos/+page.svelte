<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="À propos"
	description="CTO avec 17 ans d'expérience, basé à Lyon. Je donne des repères aux CTO et leaders tech, et j'aide la nouvelle génération à trouver sa place."
	url="https://kevin.delfour.co/a-propos/"
/>

<div class="page-container">
	<header class="page-header">
		<span class="badge">Parcours</span>
		<h1>À propos</h1>
	</header>

	<div class="post-content">
		<h2>Donner des repères. Pas des leçons.</h2>

		<p>Je suis Kevin Delfour, CTO avec 17 ans d'expérience, basé à Lyon.</p>
		<p>Je partage mes repères aux CTO et leaders tech pour mieux décider et mieux durer, et j'aide la nouvelle génération à trouver sa place sans se raconter d'histoires.</p>
		<p>Je m'appuie sur le terrain, des cadres clairs, et une culture du droit à l'erreur.</p>

		<h2>Ce que je partage</h2>
		<p>Sur ce site, tu trouveras :</p>
		<ul>
			<li><strong>Des repères structurants</strong> sur le rôle du CTO, la gouvernance technique, la culture d'équipe</li>
			<li><strong>Des ressources complètes</strong> : livres disponibles gratuitement en ligne</li>
			<li><strong>Des réflexions</strong> basées sur l'expérience de terrain, sans posture de donneur de leçons</li>
		</ul>
		<p>Le code est un outil, jamais le centre du discours.</p>

		<h2>Ligne morale</h2>
		<p><strong>Je transmets gratuitement quand cela aide à grande échelle.</strong></p>
		<p>Les articles, les livres complets en ligne, les ressources structurées — tout cela est gratuit et accessible à tous.</p>
		<p><strong>Je mets un cadre quand cela demande du temps individuel.</strong></p>
		<p>Si tu cherches un accompagnement personnalisé, une consultation, ou un mentorat individuel, je mets un cadre clair. Mon temps est limité, et je dois le protéger pour rester efficace.</p>
		<p>Pour toute demande d'accompagnement individuel, contacte-moi avec :</p>
		<ul>
			<li>Ton contexte et ton besoin précis</li>
			<li>Ta disponibilité et tes contraintes</li>
			<li>Ton budget si applicable</li>
		</ul>

		<h2>Bénévolat</h2>
		<p>Depuis plusieurs années, je m'engage bénévolement auprès de différentes associations. Ces engagements sont pour moi une façon de donner du sens à mon expertise et de contribuer à des causes qui me tiennent à cœur.</p>
		<p><strong><a href="/benevolat/">Découvrir mes engagements bénévoles →</a></strong></p>

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
