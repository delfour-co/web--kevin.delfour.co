<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { CONTACT } from '$lib/data/profile';
</script>

<SEO
	title="À propos"
	description="Ce qui a façonné ma manière de mener une organisation d'ingénierie, le type de leader que je suis, et ce que je change concrètement dans une équipe."
	url="https://kevin.delfour.co/a-propos/"
	breadcrumbs={[{ label: 'À propos' }]}
/>

<div class="page">
	<div class="page-hero">
		<span class="kicker">À propos</span>
		<h1>Quel leader je suis, et pourquoi</h1>
		<p class="lead">
			Pas une biographie chronologique — le parcours est sur la page CV. Ici, ce qui a façonné ma
			façon de mener, et ce que ça donne au quotidien.
		</p>
	</div>

	<section class="section prose-max">
		<h2>Ce qui m’a façonné</h2>
		<p>
			J’ai passé les premières années de ma carrière à faire : du logiciel d’entreprise, de
			l’architecture, des systèmes distribués. Puis j’ai co-fondé une startup deep-tech qui
			construisait l’une des premières caméras sous-marines autonomes. Porter un produit du concept
			au marché — et jusqu’au brevet — m’a appris quelque chose que le code seul ne m’aurait pas
			appris : la qualité d’une décision technique se mesure à ce qu’elle rend possible pour les
			autres, pas à son élégance.
		</p>
		<p>
			Le vrai basculement est venu quand j’ai commencé à répondre de l’ingénierie plutôt qu’à en
			produire. Mener l’ingénierie pendant une acquisition internationale, avec une trentaine d’ingénieurs et
			une organisation qui change de propriétaire, ne laisse pas de place à l’improvisation : il
			faut des décisions écrites, des indicateurs partagés, et des gens à qui on a dit la vérité.
			Ensuite j’ai construit une agence d’ingénierie de zéro à douze consultants, et j’ai découvert
			le métier par l’autre bout — recruter, rémunérer, faire progresser, arbitrer un budget.
		</p>
		<p>
			De tout ça je retiens une chose simple : mon meilleur code ne pèsera jamais autant qu’une
			équipe qui fonctionne.
		</p>
	</section>

	<section class="section prose-max">
		<h2>Ce que je crois</h2>

		<h3>Le code est un outil, jamais le centre</h3>
		<p>
			La technique sert un projet, une équipe, une ambition. Quand elle devient le sujet, on perd de
			vue le pourquoi — et on optimise des choses qui n’ont d’importance que pour nous.
		</p>

		<h3>Le droit à l’erreur n’est pas un slogan</h3>
		<p>
			C’est une pratique quotidienne, et elle se vérifie à des détails : est-ce qu’on écrit des
			post-mortems sans chercher de coupable ? Est-ce qu’un junior peut dire « je ne comprends pas »
			en réunion ? On ne construit rien de solide là où les gens ont peur de se tromper.
		</p>

		<h3>L’équipe passe avant l’architecture</h3>
		<p>
			La technologie compte, et je ne l’ai jamais lâchée. Mais la meilleure architecture du monde ne
			survit pas à une équipe qui se délite, alors qu’une bonne équipe rattrape une architecture
			moyenne. Cette asymétrie décide de la plupart de mes arbitrages.
		</p>
	</section>

	<section class="section prose-max">
		<h2>Le leader que je suis</h2>
		<p>
			Je recrute lentement et j’onboarde sérieusement. Je préfère un career ladder écrit à une
			promesse orale, parce que l’écrit engage et que l’oral s’oublie. Je documente les décisions
			structurantes — ADR, RFC, post-mortems — non par goût du process, mais parce qu’une décision
			non écrite se rejoue tous les six mois.
		</p>
		<p>
			Je garde les mains dans le code, parce qu’on ne mène bien que ce qu’on comprend, et parce
			que relire le travail de son équipe reste la façon la plus honnête de savoir où elle en est.
			Et je dis les choses : sur un projet qui s’arrête, sur un recrutement qui ne se fera pas, sur
			une estimation à laquelle je ne crois pas.
		</p>
	</section>

	<section class="section prose-max">
		<h2>Ce que je change dans une organisation</h2>
		<ul class="outcomes">
			<li>
				Des cadres de progression et de rémunération explicites, pour que « comment j’évolue ici »
				ait une réponse écrite.
			</li>
			<li>
				Un recrutement outillé et régulier plutôt que des campagnes d’urgence : plus de trente
				ingénieurs recrutés, des centaines d’entretiens menés.
			</li>
			<li>
				Une gouvernance légère mais réelle — décisions tracées, indicateurs partagés, budget
				assumé.
			</li>
			<li>
				Une adoption de l’IA menée à l’échelle de l’organisation, avec la revue et la traçabilité
				qui doivent l’accompagner.
			</li>
		</ul>
		<div class="btn-row">
			<a class="btn btn--primary" href="/leadership/">Mes convictions en détail</a>
			<a class="btn btn--secondary" href="/cv/">Mon parcours</a>
		</div>
	</section>

	<section class="section prose-max">
		<h2>Me joindre</h2>
		<p>
			Par e-mail à <a href="mailto:{CONTACT.email}">{CONTACT.email}</a>, ou sur
			<a href={CONTACT.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>. Mon code
			public vit sur <a href={CONTACT.github} rel="noopener noreferrer" target="_blank">GitHub</a>.
		</p>
	</section>
</div>

<style>
	.section h2 {
		font-size: var(--text-2xl);
		margin-bottom: 20px;
	}
	.section h3 {
		font-size: var(--text-lg);
		margin-top: 32px;
		margin-bottom: 10px;
	}
	.section p {
		color: var(--content);
	}

	.outcomes {
		margin: 0 0 28px;
		padding: 0;
		list-style: none;
	}
	.outcomes li {
		position: relative;
		padding-left: 22px;
		margin-bottom: 12px;
		color: var(--content);
	}
	.outcomes li::before {
		content: '';
		position: absolute;
		left: 4px;
		top: 0.62em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}
</style>
