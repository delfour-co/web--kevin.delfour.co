<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { IDENTITY, CONTACT } from '$lib/data/profile';
	import { PILLARS } from '$lib/data/leadership';

	let { data } = $props();
</script>

<SEO
	description="Kevin Delfour — Engineering Leader, 17 ans d'expérience, Lyon. Je construis des organisations d'ingénierie où les gens et les produits s'épanouissent."
	url="https://kevin.delfour.co/"
/>

<div class="page">
	<section class="hero">
		<figure class="portrait">
			<picture>
				<source srcset="/images/kevin-delfour-portrait.webp" type="image/webp" />
				<img
					src="/images/kevin-delfour-portrait.jpg"
					alt="Portrait de Kevin Delfour"
					width="560"
					height="560"
					fetchpriority="high"
				/>
			</picture>
		</figure>
		<div class="hero-text">
			<span class="kicker">{IDENTITY.role} · {IDENTITY.location}</span>
			<h1>{IDENTITY.name}</h1>
			<p class="role">{IDENTITY.targetRoles}</p>
			<p class="tagline">{IDENTITY.tagline}</p>
			<p class="subline">{IDENTITY.subline}</p>
			<div class="btn-row">
				<a class="btn btn--primary" href="/cv/">Voir mon parcours</a>
				<a class="btn btn--secondary" href="/contact/">Échanger</a>
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="visually-hidden">En quelques mots</h2>
		<div class="intro">
			<p>
				17 ans d’ingénierie logicielle. J’ai mené une organisation d’une trentaine d’ingénieurs,
				recruté plus de 30 personnes au fil de centaines d’entretiens, monté une agence
				d’ingénierie de 0 à 12 consultants, et co-fondé une startup deep-tech dont je suis reparti
				avec un brevet.
			</p>
			<p>
				Ce que ces contextes ont en commun, ce n’est presque jamais la technologie. C’est d’avoir dû
				trancher sans information complète, puis l’assumer devant des gens dont le travail dépendait
				de la décision. C’est le métier que j’ai appris, et celui que je cherche à continuer.
			</p>
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Comment je travaille</h2>
			<p>
				Dix-sept ans de terrain, dont dix à porter des responsabilités d’organisation. Quatre choses
				résument ma façon de faire.
			</p>
		</div>
		<div class="card-grid card-grid--2">
			<a class="card" href="/leadership/#construire-les-equipes">
				<h3 class="card-title">Des équipes construites, pas héritées</h3>
				<p class="card-text">
					J’ai monté des équipes à partir de rien, recruté plus de trente ingénieurs et créé une
					agence d’ingénierie de zéro à douze consultants. Je sais ce que coûte un recrutement raté,
					et ce que rapporte un onboarding sérieux.
				</p>
			</a>
			<a class="card" href="/communaute/">
				<h3 class="card-title">Des gens qui grandissent</h3>
				<p class="card-text">
					Career ladders conçus et appliqués, mentorat de Tech Leads et de CTO, co-création de la
					communauté CTO de Lyon. Faire grandir les autres est la partie du métier que je ne délègue
					pas.
				</p>
			</a>
			<a class="card" href="/outils/">
				<h3 class="card-title">Resté hands-on</h3>
				<p class="card-text">
					Je code encore, je relis du code encore : quarante pull requests revues sur mon premier
					mois en poste. Les vingt et un outils de ce site sont faits main et servent à mon
					quotidien de manager.
				</p>
			</a>
			<a class="card" href="/leadership/#ia-dans-l-ingenierie">
				<h3 class="card-title">L’IA sans esbroufe</h3>
				<p class="card-text">
					J’emmène mon équipe vers l’IA sur une plateforme B2B en production. Elle augmente le débit
					du jugement d’ingénierie — donc elle rend la revue et la traçabilité plus importantes, pas
					moins.
				</p>
			</a>
		</div>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Ce que je crois</h2>
			<p>Cinq piliers, adossés à des postes précis et à des contraintes précises.</p>
		</div>
		<div class="card-grid card-grid--2">
			{#each PILLARS as pillar}
				<a class="card" href="/leadership/#{pillar.id}">
					<h3 class="card-title">{pillar.title}</h3>
					<p class="card-text">{pillar.themes.join(' · ')}</p>
				</a>
			{/each}
		</div>
		<a class="section-link" href="/leadership/">Le détail de chaque pilier</a>
	</section>

	<section class="section">
		<div class="section-head">
			<h2>Ce que j’écris</h2>
			<p>J’écris pour transmettre ce que le terrain m’a appris. Deux livres, gratuits, en ligne.</p>
		</div>
		<div class="books">
			{#each data.books as book}
				<a class="book" href="/livres/{book.slug}/">
					{#if book.cover}
						<img class="book-cover" src={book.cover} alt="Couverture de {book.title}" loading="lazy" />
					{/if}
					<div>
						<h3 class="card-title">{book.title}</h3>
						<p class="card-text">{book.subtitle}</p>
						<p class="book-meta">{book.chapterCount} chapitres · gratuit</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="case-card">
			<h2>Parlons-en</h2>
			<p>
				Je suis ouvert aux échanges sur des rôles de direction d’ingénierie. Si vous construisez ou
				transformez une organisation technique, je serai curieux de comprendre votre contexte.
			</p>
			<div class="btn-row">
				<a class="btn btn--primary" href="mailto:{CONTACT.email}">{CONTACT.email}</a>
				<a class="btn btn--secondary" href="/cv/">Mon parcours</a>
			</div>
		</div>
	</section>
</div>

<style>
	.hero {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: clamp(28px, 5vw, 64px);
		padding-block: clamp(24px, 5vw, 48px) 0;
		margin-bottom: var(--space-section);
	}
	.hero-text {
		max-width: 68ch;
	}
	.portrait {
		margin: 0;
		width: clamp(168px, 24vw, 260px);
	}
	.portrait img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		/* L'anneau d'accent tient la photo en thème clair, où le fond quasi noir
		   du portrait ne se fond plus dans la page. */
		box-shadow: var(--accent-glow), var(--shadow-card);
	}

	/* Deux colonnes plutôt qu'un bloc contraint à 68ch : le texte occupe la largeur
	   disponible sans que les lignes dépassent la longueur lisible. */
	.intro {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(24px, 4vw, 56px);
	}
	.intro p {
		font-size: var(--text-lg);
		color: var(--secondary);
		margin-bottom: 0;
	}
	.intro p:first-child {
		color: var(--content);
	}

	/* Sous 760px le portrait garde sa place en tête et se réduit. */
	@media (max-width: 760px) {
		.hero {
			grid-template-columns: 1fr;
			justify-items: start;
		}
		.portrait {
			width: clamp(120px, 34vw, 168px);
		}
		.intro {
			grid-template-columns: 1fr;
		}
	}

	.hero h1 {
		font-size: var(--text-display);
		margin-bottom: 12px;
	}
	.role {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--accent);
		margin-bottom: 28px;
	}
	.tagline {
		font-size: clamp(1.125rem, 0.9rem + 1vw, 1.5rem);
		line-height: 1.45;
		color: var(--primary);
		font-family: var(--font-heading);
		letter-spacing: var(--tracking-tight);
		margin-bottom: 10px;
	}
	.subline {
		font-size: var(--text-lg);
		color: var(--secondary);
		margin-bottom: 32px;
	}

	.books {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 16px;
	}
	.book {
		display: flex;
		gap: 18px;
		align-items: flex-start;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 20px 22px;
		transition: var(--transition);
	}
	.book:hover {
		border-color: var(--border-hover);
		background: var(--surface-hover);
		transform: translateY(-1px);
		text-decoration: none;
	}
	.book-cover {
		width: 56px;
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}
	.book-meta {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--tertiary);
		margin: 10px 0 0;
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
