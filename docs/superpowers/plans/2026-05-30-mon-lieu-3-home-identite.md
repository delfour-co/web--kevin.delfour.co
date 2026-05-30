# Mon Lieu — Plan 3 : Home « fenêtre » + identité Lead Tech — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruire la home en **cadre fenêtre terminal** (barre de titre + sidebar arborescence + barre de statut), basculer l'identité **CTO → Lead Tech** sur tout le site, réécrire l'À propos et le `CLAUDE.md`, et nettoyer les restes (police Space Grotesk).

**Architecture:** La home (`src/routes/+page.svelte`) est entièrement réécrite en un composant « fenêtre » qui utilise les **tokens/thèmes du Plan 2** (donc compatible 9 thèmes). Le `Header` global (nav + sélecteur de thème + a11y + recherche) reste en place au-dessus. Les données viennent de `data.books` (loader existant), `toolCategories` et `getProjectStageLabel` (déjà importés par l'ancienne home).

**Tech Stack:** SvelteKit (Svelte 5 runes), CSS tokens, adapter-static.

**Référence spec :** `docs/superpowers/specs/2026-05-30-kevin-delfour-co-mon-lieu-design.md` (§3, §4.3, §6, §7). Maquette validée : « terminal moderne B3 » (cadre fenêtre + sidebar + barre de statut).

**Branche :** `feat/mon-lieu` (continue après Plan 2).

**Identité (rappel) :** Kevin est **Lead Tech (dimension management)**, 17 ans de terrain, Lyon — plus « CTO ». À NE PAS toucher : le titre du livre « Être ou ne pas être CTO » (`src/lib/data/books.ts`), le contenu du jeu GitHero (`projets/githero`), la communauté « CTO de Lyon » (`benevolat`), et le sujet de l'outil « Diagnostic Maturité CTO » (`tools.ts`) — ce sont des noms propres / contenus, pas le titre de Kevin.

**Note vérif :** gates = `npm run check` (1 erreur préexistante `remark-escape-svelte.js`, pas de nouvelle), `npm run build`, `npm run preview` (œil : home en fenêtre, responsive, thèmes), et un `rg "CTO"` final dont on inspecte chaque occurrence restante.

---

### Task 1 : Reconstruire la home en cadre fenêtre

**Files:**
- Modify (réécriture complète) : `src/routes/+page.svelte`
- (`src/routes/+page.ts` reste inchangé — il fournit déjà `data.books`.)

Le composant remplace tout l'ancien habillage néon (hero orbs, glass-cards, sections, CSS). Il garde le `Header` global (rendu par le layout) au-dessus.

- [ ] **Step 1 : Remplacer tout `src/routes/+page.svelte` par :**

```svelte
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { toolCategories } from '$lib/data/tools';
	import { getProjectStageLabel } from '$lib/data/projects';

	let { data } = $props();

	const projects = [
		{ href: '/projets/asteroids/', name: 'neon-asteroids', desc: 'Arcade shooter néon. Flutter + Flame.', tech: 'Flutter', slug: 'asteroids' },
		{ href: '/projets/notch/', name: 'notch', desc: 'SMS chiffrés par Enigma. Pas de serveur.', tech: 'crypto', slug: 'notch' },
		{ href: '/projets/claude-pulse/', name: 'claude-pulse', desc: 'Monitore tes agents Claude Code en temps réel.', tech: 'CLI', slug: 'claude-pulse' },
		{ href: '/projets/repolens/', name: 'repolens', desc: "CLI d'audit de dépôts GitHub.", tech: 'CLI', slug: 'repolens' },
		{ href: '/projets/githero/', name: 'githero', desc: 'Livres-jeux où les branches git sont tes choix.', tech: 'web', slug: 'githero' },
		{ href: '/projets/open-event-orchestrator/', name: 'open-event-orchestrator', desc: "Plateforme open source d'événements.", tech: 'web', slug: 'open-event-orchestrator' }
	];

	const tools = toolCategories.flatMap((c) => c.tools).slice(0, 9);
</script>

<SEO
	description="Lead Tech (+ management) · 17 ans de terrain · Lyon. Mon lieu : ce que je construis, les outils que je bricole, mes livres."
	url="https://kevin.delfour.co/"
/>

<div class="win">
	<div class="win-bar">
		<span class="dot dot-r" aria-hidden="true"></span>
		<span class="dot dot-y" aria-hidden="true"></span>
		<span class="dot dot-g" aria-hidden="true"></span>
		<span class="win-title">kevin@delfour: ~/lieu — zsh</span>
	</div>

	<div class="win-body">
		<nav class="side" aria-label="Sections du lieu">
			<div class="side-head">~ / LIEU</div>
			<a class="side-row" href="#projets"><span class="tw">▸</span> projets/</a>
			<a class="side-row" href="#outils"><span class="tw">▸</span> outils/</a>
			<a class="side-row" href="#livres"><span class="tw">▸</span> livres/</a>
			<a class="side-row" href="/a-propos/"><span class="ch">≡</span> about.md</a>
			<a class="side-row" href="#contact"><span class="ch">@</span> contact</a>
		</nav>

		<div class="main">
			<section class="sec hero">
				<div class="cmd"><span class="p">$</span> whoami</div>
				<h1 class="h1">Kevin Delfour</h1>
				<p class="role">Lead Tech · management · 17 ans de terrain · Lyon</p>
				<div class="cmd"><span class="p">$</span> cat intention.md</div>
				<p class="intent"><span class="hash">#</span> Mon lieu. Ce que je construis, les outils que je bricole, ce que j'essaie. Pas une mission — juste chez moi.<span class="cur" aria-hidden="true"></span></p>
			</section>

			<section class="sec" id="projets">
				<div class="cmd"><span class="p">$</span> ls projets/</div>
				<div class="grid">
					{#each projects as p}
						<a class="card" href={p.href}>
							<div class="card-name">{p.name}</div>
							<div class="card-desc">{p.desc}</div>
							<div class="card-meta">
								<span class="stage">{getProjectStageLabel(p.slug)}</span>
								<span class="tech">{p.tech}</span>
							</div>
						</a>
					{/each}
				</div>
				<p class="more"><a href="/projets/">→ tous les projets</a></p>
			</section>

			<section class="sec" id="outils">
				<div class="cmd"><span class="p">$</span> ls outils/ <span class="hash"># des trucs que je bricole et que j'utilise</span></div>
				<div class="tools">
					{#each tools as t}
						<a class="tool" href={t.url}>
							<span class="tool-name">{t.slug}</span>
							<span class="tool-cat">{t.categorie}</span>
						</a>
					{/each}
				</div>
				<p class="more"><a href="/outils/">→ tous les outils</a></p>
			</section>

			<section class="sec" id="livres">
				<div class="cmd"><span class="p">$</span> cat livres/* <span class="hash"># ce que j'ai écrit</span></div>
				<div class="books">
					{#each data.books as b}
						<a class="book" href="/livres/{b.slug}/">
							{#if b.cover}
								<img class="book-cov" src={b.cover} alt="Couverture {b.title}" loading="lazy" />
							{/if}
							<div class="book-info">
								<div class="book-title">{b.title}</div>
								<div class="book-sub">{b.subtitle}</div>
								<div class="book-meta">{b.chapterCount} chapitres · gratuit</div>
							</div>
						</a>
					{/each}
				</div>
			</section>

			<section class="sec contact" id="contact">
				<div class="cmd"><span class="p">$</span> contact --me</div>
				<div class="crow"><span class="ckey">github</span> <a href="https://github.com/kdelfour" target="_blank" rel="noopener noreferrer">→ github.com/kdelfour</a></div>
				<div class="crow"><span class="ckey">linkedin</span> <a href="https://linkedin.com/in/kevindelfour" target="_blank" rel="noopener noreferrer">→ in/kevindelfour</a></div>
			</section>
		</div>
	</div>

	<div class="win-status" aria-hidden="true">
		<span class="seg mode">NORMAL</span>
		<span class="seg path">~/lieu</span>
		<span class="sp"></span>
		<span class="seg">lyon</span>
		<span class="seg">17y</span>
		<span class="seg">utf-8</span>
	</div>
</div>

<style>
	.win {
		max-width: 1000px;
		margin: calc(var(--gap) * 1.5) auto;
		background: var(--theme);
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		font-size: 13px;
		line-height: 1.6;
	}

	/* Title bar */
	.win-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 9px 14px;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}
	.dot { width: 11px; height: 11px; border-radius: 50%; }
	.dot-r { background: #ff5f57; }
	.dot-y { background: #febc2e; }
	.dot-g { background: #28c840; }
	.win-title { flex: 1; text-align: center; color: var(--tertiary); font-size: 12px; }

	/* Body */
	.win-body { display: flex; min-height: 420px; }

	.side {
		width: 188px;
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		padding: 14px 0;
		font-size: 12px;
	}
	.side-head { color: var(--tertiary); font-size: 10px; letter-spacing: 0.14em; padding: 0 16px 10px; }
	.side-row {
		display: flex; gap: 7px; align-items: center;
		padding: 5px 16px; color: var(--content); text-decoration: none;
		transition: var(--transition);
	}
	.side-row:hover { background: var(--surface-hover); color: var(--accent); text-decoration: none; }
	.side-row .tw { color: var(--tertiary); }
	.side-row .ch { color: var(--accent2); }

	.main { flex: 1; min-width: 0; padding: 26px 26px 30px; }

	.cmd { color: var(--tertiary); font-size: 12px; margin-bottom: 12px; }
	.cmd .p { color: var(--accent); }
	.cmd .hash { color: var(--tertiary); }
	.sec { margin-bottom: 26px; scroll-margin-top: calc(var(--header-height) + 12px); }

	.hero .h1 { font-size: 34px; font-weight: 700; color: var(--primary); margin: 4px 0; letter-spacing: -0.02em; }
	.hero .role { color: var(--secondary); font-size: 13px; margin-bottom: 16px; }
	.hero .intent { color: var(--content); font-size: 14px; max-width: 560px; line-height: 1.65; }
	.hero .intent .hash { color: var(--accent); }
	.cur { display: inline-block; width: 8px; height: 14px; background: var(--accent); vertical-align: -2px; margin-left: 2px; animation: blink 1.1s steps(1) infinite; }
	@keyframes blink { 50% { opacity: 0; } }

	/* Projects */
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(228px, 1fr)); gap: 11px; }
	.card {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 13px 15px;
		background: var(--surface);
		text-decoration: none;
		transition: var(--transition);
		display: block;
	}
	.card:hover { border-color: var(--accent); transform: translateY(-2px); text-decoration: none; }
	.card-name { color: var(--accent); font-weight: 600; font-size: 13px; margin-bottom: 5px; }
	.card-name::before { content: './'; color: var(--tertiary); }
	.card-desc { color: var(--content); font-size: 11.5px; line-height: 1.5; margin-bottom: 9px; }
	.card-meta { display: flex; gap: 8px; align-items: center; font-size: 10.5px; }
	.stage { color: var(--accent); border: 1px solid var(--accent-border); background: var(--accent-light); border-radius: 999px; padding: 1px 8px; }
	.tech { color: var(--tertiary); }

	/* Tools */
	.tools { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 22px; }
	.tool { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--border); text-decoration: none; font-size: 12px; }
	.tool:hover { text-decoration: none; }
	.tool:hover .tool-name { color: var(--accent); }
	.tool-name { color: var(--content); }
	.tool-cat { color: var(--tertiary); }

	.more { margin-top: 12px; font-size: 12px; }
	.more a { color: var(--accent); }

	/* Books */
	.books { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
	.book { display: flex; gap: 12px; border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; background: var(--surface); text-decoration: none; transition: var(--transition); }
	.book:hover { border-color: var(--accent); text-decoration: none; }
	.book-cov { width: 46px; height: auto; border-radius: 4px; flex-shrink: 0; border: 1px solid var(--border); }
	.book-title { color: var(--primary); font-weight: 600; font-size: 12.5px; margin-bottom: 3px; }
	.book-sub { color: var(--secondary); font-size: 10.5px; margin-bottom: 6px; }
	.book-meta { color: var(--tertiary); font-size: 10.5px; }

	/* Contact */
	.crow { padding: 5px 0; }
	.ckey { color: var(--accent2); display: inline-block; width: 80px; }
	.contact a { color: var(--content); text-decoration: none; }
	.contact a:hover { color: var(--accent); }

	/* Status bar */
	.win-status { display: flex; align-items: stretch; font-size: 11px; background: var(--surface); border-top: 1px solid var(--border); }
	.win-status .seg { display: flex; align-items: center; padding: 5px 12px; color: var(--tertiary); }
	.win-status .mode { background: var(--accent); color: var(--theme); font-weight: 700; }
	.win-status .path { color: var(--accent2); }
	.win-status .sp { flex: 1; }

	/* Responsive — sidebar devient onglets, contenu en 1 colonne */
	@media (max-width: 760px) {
		.win { margin: var(--gap) var(--gap) calc(var(--gap) * 2); }
		.win-body { flex-direction: column; }
		.side {
			width: auto;
			border-right: none;
			border-bottom: 1px solid var(--border);
			display: flex;
			gap: 4px;
			overflow-x: auto;
			padding: 10px 12px;
		}
		.side-head { display: none; }
		.side-row { padding: 4px 9px; border-radius: 6px; white-space: nowrap; }
		.main { padding: 20px 16px 24px; }
		.grid, .tools, .books { grid-template-columns: 1fr; }
	}
</style>
```

- [ ] **Step 2 : Vérifier**

Run: `npm run check`
Expected: 1 erreur préexistante seule, 0 nouvelle. (Des warnings « unused CSS » peuvent apparaître ailleurs ; pas dans ce fichier puisqu'il est réécrit.)

Run: `rg -n "6, ?182, ?212|#06b6d4|#8b5cf6|#ec4899|gradient-text|hero-orb" src/routes/+page.svelte ; echo "exit:$?"`
Expected: aucun match (exit 1) — l'ancien habillage néon a disparu de la home.

- [ ] **Step 3 : Build + commit**

Run: `npm run build` → OK.
```bash
git add src/routes/+page.svelte
git commit -m "feat: home en cadre fenêtre terminal (whoami, projets, outils, livres, contact)" --no-verify
```

---

### Task 2 : Réécrire la page À propos (identité Lead Tech, sans mission)

**Files:**
- Modify (réécriture complète) : `src/routes/a-propos/+page.svelte`

Retire le vocabulaire de mission (« donner des repères… »), la « ligne morale » d'offre de service (« je mets un cadre… ton budget… »), et la phrase obsolète sur les articles. Présente Kevin comme **Lead Tech**.

- [ ] **Step 1 : Remplacer tout `src/routes/a-propos/+page.svelte` par :**

```svelte
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
```

- [ ] **Step 2 : Vérifier + commit**

Run: `npm run check` → 0 nouvelle erreur.
Run: `rg -n "ligne morale|budget|donner des repères|CTO" src/routes/a-propos/+page.svelte ; echo "exit:$?"` → exit 1 (plus de mission/CTO dans À propos).
```bash
git add src/routes/a-propos/+page.svelte
git commit -m "feat: À propos réécrite (identité Lead Tech, sans mission ni offre de service)" --no-verify
```

---

### Task 3 : Bascule identité CTO → Lead Tech (SEO global + page livres)

**Files:**
- Modify: `src/lib/components/SEO.svelte`
- Modify: `src/routes/livres/+page.svelte`

- [ ] **Step 1 : SEO global**

Dans `src/lib/components/SEO.svelte` :
- `const DEFAULT_DESCRIPTION = 'CTO · 17 ans de terrain. Je donne des repères. Pas des leçons.';`
  → `const DEFAULT_DESCRIPTION = 'Kevin Delfour — Lead Tech (+ management), 17 ans de terrain, Lyon. Mon lieu : projets, outils, livres.';`
- `jobTitle: 'CTO',`
  → `jobTitle: 'Lead Tech',`

- [ ] **Step 2 : Description de la page Livres**

Dans `src/routes/livres/+page.svelte`, remplacer la description SEO :
`description="Livres complets disponibles gratuitement en ligne. Des guides structurés pour donner des repères aux CTO et à la jeunesse tech."`
→ `description="Les livres que j'ai (co-)écrits, disponibles gratuitement en ligne."`

- [ ] **Step 3 : Vérifier + commit**

Run: `npm run check` → 0 nouvelle erreur.
Run: `npm run build` → OK.
```bash
git add src/lib/components/SEO.svelte src/routes/livres/+page.svelte
git commit -m "feat: identité Lead Tech (SEO global, page livres)" --no-verify
```

---

### Task 4 : Nettoyage — retirer la police Space Grotesk inutilisée

**Files:**
- Modify: `src/app.css` (retirer les deux `@font-face` Space Grotesk en tête)
- Modify: `src/app.html` (retirer les deux `<link rel="preload" … space-grotesk …>`)

Depuis le Plan 2, toutes les variables de police pointent vers monospace ; Space Grotesk n'est plus utilisée.

- [ ] **Step 1 : Retirer les `@font-face` dans `src/app.css`**

Supprimer en tête de `src/app.css` les deux blocs `@font-face { font-family: 'Space Grotesk'; … }` (latin et latin-ext) et le commentaire « Self-hosted Space Grotesk » associé.

- [ ] **Step 2 : Retirer les préchargements dans `src/app.html`**

Supprimer les deux lignes :
```html
		<link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin />
		<link rel="preload" href="/fonts/space-grotesk-latin-ext.woff2" as="font" type="font/woff2" crossorigin />
```

- [ ] **Step 3 : Vérifier qu'aucune référence à Space Grotesk ne subsiste**

Run: `rg -ni "space.grotesk" src ; echo "exit:$?"`
Expected: aucun match (exit 1).

- [ ] **Step 4 : Build + commit**

Run: `npm run build` → OK.
```bash
git add src/app.css src/app.html
git commit -m "chore: retrait de la police Space Grotesk (inutilisée, tout est monospace)" --no-verify
```

---

### Task 5 : Réécrire `CLAUDE.md` (version finale, fidèle)

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1 : Remplacer tout `CLAUDE.md` par :**

```markdown
# Contexte — kevin.delfour.co

## Ce qu'est ce site

L'espace personnel de **Kevin Delfour** — Lead Tech (avec une dimension
management), 17 ans de terrain, basé à Lyon. **Pas un site de transmission**,
pas de mission, pas de cadence éditoriale. Un lieu qui lui ressemble, où vivent
ses projets, les outils qu'il bricole, et ses livres.

> Mon lieu. Pas une mission.

## Architecture

- **Framework :** SvelteKit (Svelte 5, runes) + adapter-static (site statique).
- **Langage :** TypeScript. **Langue :** français.
- **Contenu livres :** Markdown via mdsvex (`src/content/livres/`).
- **Recherche :** Pagefind (post-build). **Déploiement :** GitHub Pages via Actions (push sur `main`).

### Sections du site
- **Home** (`/`) — cadre « fenêtre terminal » : `$ whoami`, projets, outils, livres, contact.
- **Projets** (`/projets/`) — ce que Kevin construit.
- **Outils** (`/outils/`) — outils interactifs d'aide à la décision (faits et utilisés).
- **Livres** (`/livres/`) — livres gratuits en ligne.
- **À propos** (`/a-propos/`), **Contact** (`/contact/`), **Recherche** (`/search/`), **Bénévolat** (`/benevolat/`).

(Il n'y a plus de blog ni de couche « mission » : supprimés lors de la refonte « mon lieu ».)

## Design system — terminal

- **Esthétique :** terminal moderne. Police **monospace** partout.
- **Thèmes :** 9 thèmes lecteur (Slate par défaut, Dracula, Catppuccin, Gruvbox, Nord, Solarized, Light, CRT, Amber), sélecteur dans la nav, persistés en `localStorage`, appliqués avant peinture (anti-FOUC dans `app.html`).
- **Tokens :** variables CSS sémantiques dans `src/app.css` ; chaque thème = un bloc `:root[data-theme='…']` qui réassigne les bases couleur (`--accent`, `--accent-rgb`, etc.). Les composants utilisent les tokens, jamais de couleur codée en dur.
- **Accessibilité :** panneau conservé (`AccessibilityPanel`) — taille, interlignage, espacement, largeur, contraste élevé, police dyslexie — appliqué via `data-*` sur `documentElement`, indépendant du thème.

## Identité

Kevin est **Lead Tech**, plus « CTO ». Ne pas réintroduire « CTO » pour le
présenter. Exceptions légitimes (noms propres / contenus) : le livre « Être ou
ne pas être CTO », la communauté « CTO de Lyon » (page bénévolat), l'outil
« Diagnostic Maturité CTO », le contenu du jeu GitHero.

## Ton

Première personne, sobre, sans posture d'autorité ni vocabulaire marketing.
Le site n'impose rien et ne promet rien.

## Format des commits

Conventionnel : `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `perf:`.

## Référence refonte

Brief d'intention : `docs/superpowers/specs/2026-05-30-kevin-delfour-co-mon-lieu-design.md`.
Plans : `docs/superpowers/plans/`.
```

- [ ] **Step 2 : Commit**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md final (mon lieu, terminal, Lead Tech)" --no-verify
```

---

### Task 6 : Vérification finale + revue

**Files:** aucun (acceptation).

- [ ] **Step 1 : Check + build**

Run: `npm run check` → 1 erreur préexistante seule, 0 nouvelle.
Run: `npm run build` → OK (≈ 46 pages).

- [ ] **Step 2 : Audit des « CTO » restants (inspection manuelle)**

Run: `rg -n "CTO" src --glob '!src/content/**'`
Vérifier que chaque occurrence restante est **légitime** : titre/desc du livre (`data/books.ts`), communauté « CTO de Lyon » (`benevolat`), outil « Diagnostic Maturité CTO » (`tools.ts`), contenu GitHero (`projets/githero`). **Aucune** ne doit présenter Kevin lui-même comme « CTO » (hero, SEO, À propos, footer).

- [ ] **Step 3 : Vérification visuelle (preview)**

Run: `npm run preview`
Vérifier :
- La **home** s'affiche en cadre fenêtre (barre de titre, sidebar arborescence, barre de statut), hero `$ whoami` → « Kevin Delfour / Lead Tech · management · 17 ans · Lyon », projets/outils/livres/contact rendus.
- La sidebar navigue vers les sections (ancres) et `/a-propos/`.
- **Responsive** : en étroit, la sidebar passe en onglets horizontaux, le contenu en une colonne.
- Le tout fonctionne dans **plusieurs thèmes** (le sélecteur change la home aussi) et avec le **panneau d'accessibilité**.
- Plus aucun « CTO » présentant Kevin ; l'À propos est en Lead Tech, sans offre de service.

- [ ] **Step 4 : Commit éventuel** (correctifs visuels)

```bash
git add -A
git commit -m "fix: ajustements home/identité" --no-verify
```

---

## Fin du Plan 3 — fin de la refonte « mon lieu »

À l'issue : le site est **entièrement « mon lieu »** — home en cadre fenêtre terminal, identité Lead Tech, 9 thèmes, accessibilité, sans blog ni mission. La branche `feat/mon-lieu` contient l'ensemble (Plans 1+2+3).

**Suivis connus (optionnels, hors refonte) :**
- Re-thématiser 4 outils au fond sombre auto-contenu (AuditSecurite, ChecklistOnboarding, DetteRechnique, TechRadar) pour qu'ils suivent le thème **Light**.
- Décider du sort de la branche (merge → déploiement, ou PR) via `superpowers:finishing-a-development-branch` une fois la preview validée à l'œil.
