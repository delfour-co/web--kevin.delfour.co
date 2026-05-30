# Mon Lieu — Plan 1 : Élagage (blog + couche mission) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retirer entièrement le blog (172 articles + tout l'échafaudage) et la couche « mission » du site, en laissant un site qui build proprement (encore stylé « néon » — le restyle vient au Plan 2).

**Architecture:** SvelteKit + adapter-static. La suppression touche des routes, le chargeur de contenu (`src/lib/content.ts`), la home, le sitemap, la nav/footer et des docs. Le gate de validation est `npm run check` (types/imports) puis `npm run build` (prérendu — détecte les liens morts vers les routes supprimées).

**Tech Stack:** SvelteKit (Svelte 5), TypeScript, mdsvex, Pagefind, adapter-static.

**Référence spec :** `docs/superpowers/specs/2026-05-30-kevin-delfour-co-mon-lieu-design.md` (§4.2).

**Branche :** `feat/mon-lieu` (déjà créée).

**Note TDD :** ce plan est une suppression/refactor sans logique unitaire nouvelle. Le « test » de chaque tâche est une vérification réelle : `npm run check`, `npm run build`, et des `rg` qui doivent ne rien retourner. C'est l'équivalent du « run it and watch it fail/pass ».

---

### Task 1 : Baseline — build de référence

**Files:** aucun (vérification seule).

- [ ] **Step 1 : Vérifier que le check passe avant toute modif**

Run: `npm run check`
Expected: termine sans erreur (0 errors). S'il y a des erreurs préexistantes, les noter — elles ne devront pas augmenter.

- [ ] **Step 2 : Vérifier que le build passe avant toute modif**

Run: `npm run build`
Expected: build OK, dossier `build/` généré, postbuild Pagefind OK.

---

### Task 2 : Supprimer les routes du blog + le flux RSS

**Files:**
- Delete: `src/routes/articles/` (tout le dossier : `+page.svelte`, `+page.ts`, `[slug]/+page.svelte`, `[slug]/+page.ts`)
- Delete: `src/routes/categories/` (tout, dont `[category]/`)
- Delete: `src/routes/archives/` (`+page.svelte`, `+page.ts`)
- Delete: `src/routes/posts/` (redirection legacy `[slug]/+page.ts`)
- Delete: `src/routes/index.xml/` (`+server.ts` — flux RSS articles)

- [ ] **Step 1 : Supprimer les dossiers**

```bash
git rm -r src/routes/articles src/routes/categories src/routes/archives src/routes/posts src/routes/index.xml
```

- [ ] **Step 2 : Vérifier qu'aucun import ne pointe encore vers ces routes**

Run: `rg -n "routes/(articles|categories|archives|posts|index\.xml)" src ; echo "exit:$?"`
Expected: aucune ligne de code source (exit 1 = pas de match). (Les liens `/articles` dans la nav/footer/contenu sont traités aux tâches 4, 7.)

- [ ] **Step 3 : Commit**

```bash
git add -A
git commit -m "chore: suppression des routes blog (articles, catégories, archives, posts, RSS)" --no-verify
```

---

### Task 3 : Supprimer les redirections legacy de la couche mission

**Files:**
- Delete: `src/routes/le-role-du-cto/`
- Delete: `src/routes/culture-management/`
- Delete: `src/routes/gouvernance-decision/`
- Delete: `src/routes/trouver-sa-place/`
- Delete: `src/routes/start-here/`
- Delete: `src/routes/travailler-avec-moi/`
- Delete: `src/routes/vision/`

**Conserver** `src/routes/guides-livres/` (redirige vers `/livres/` — contenu gardé ; on préserve les anciennes URLs de livres).

- [ ] **Step 1 : Supprimer les dossiers de redirection mission**

```bash
git rm -r \
  src/routes/le-role-du-cto \
  src/routes/culture-management \
  src/routes/gouvernance-decision \
  src/routes/trouver-sa-place \
  src/routes/start-here \
  src/routes/travailler-avec-moi \
  src/routes/vision
```

- [ ] **Step 2 : Vérifier qu'aucun lien interne ne pointe vers ces routes**

Run: `rg -n "/(le-role-du-cto|culture-management|gouvernance-decision|trouver-sa-place|start-here|travailler-avec-moi|vision)/" src ; echo "exit:$?"`
Expected: aucun match dans le code des pages gardées (exit 1). (Des occurrences dans `src/content/posts/*` sont sans effet — ce dossier est supprimé en Task 6.)

- [ ] **Step 3 : Commit**

```bash
git add -A
git commit -m "chore: suppression des redirections legacy de la couche mission" --no-verify
```

---

### Task 4 : Nettoyer la home (chargeur + sections blog)

**Files:**
- Modify: `src/routes/+page.ts`
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1 : Retirer `getAllPosts`/`latestPosts` du chargeur**

Dans `src/routes/+page.ts`, remplacer tout le fichier par :

```ts
import { getAllBooks } from '$lib/books';

export function load() {
	const books = getAllBooks();

	return {
		books: books.map((b) => ({
			slug: b.slug,
			title: b.data.title,
			subtitle: b.data.subtitle,
			cover: b.data.cover,
			chapterCount: b.chapters.length
		}))
	};
}
```

- [ ] **Step 2 : Retirer la section « Derniers articles » de la home**

Dans `src/routes/+page.svelte`, supprimer le bloc complet (la section conditionnelle sur `data.latestPosts`) :

```svelte
	<!-- Derniers articles -->
	{#if data.latestPosts.length > 0}
		<section class="home-section reveal">
			<span class="section-badge badge">Blog</span>
			<h2>Derniers articles</h2>
			<div class="articles-list">
				{#each data.latestPosts.slice(0, 4) as post, i}
					<article class="post-entry reveal reveal-delay-{(i % 4) + 1}">
						<a href="/articles/{post.slug}/" class="entry-link">
							<h3 class="entry-title">{post.title}</h3>
							<p class="entry-desc">{post.description}</p>
							<footer class="entry-meta">
								<time datetime={post.date}>{formatDate(post.date)}</time>
								{#if post.readingTime}
									<span>{post.readingTime} min</span>
								{/if}
								{#each post.categories as cat}
									<span class="entry-pill pill">{cat}</span>
								{/each}
							</footer>
						</a>
					</article>
				{/each}
			</div>
			<p class="section-more"><a href="/articles/">Voir tous les articles →</a></p>
		</section>
	{/if}
```

- [ ] **Step 3 : Retirer la section « Suivre » (cadence mensuelle)**

Dans `src/routes/+page.svelte`, supprimer le bloc :

```svelte
	<!-- Suivre -->
	<section class="home-section reveal">
		<span class="section-badge badge">Connexion</span>
		<h2>Suivre</h2>
		<p class="follow-text">Un nouvel article chaque mois. Pas de spam, pas d'algorithme.</p>
		<div class="hero-actions" style="justify-content: flex-start; margin-top: 1rem;">
			<a href="https://github.com/kdelfour" class="btn-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
			<a href="https://linkedin.com/in/kevindelfour" class="btn-secondary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
		</div>
	</section>
```

- [ ] **Step 4 : Retirer la fonction `formatDate` devenue inutile**

Dans `src/routes/+page.svelte` (bloc `<script>`), supprimer la fonction `formatDate` (elle ne servait qu'aux articles) :

```ts
	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
```

- [ ] **Step 5 : Vérifier le check**

Run: `npm run check`
Expected: 0 erreur. En particulier, aucune référence résiduelle à `latestPosts` ou `formatDate`.

Run: `rg -n "latestPosts|formatDate" src/routes/+page.svelte src/routes/+page.ts ; echo "exit:$?"`
Expected: aucun match (exit 1).

- [ ] **Step 6 : Commit**

```bash
git add src/routes/+page.ts src/routes/+page.svelte
git commit -m "feat: home sans sections blog ni cadence" --no-verify
```

---

### Task 5 : Nettoyer le sitemap

**Files:**
- Modify: `src/routes/sitemap.xml/+server.ts`

- [ ] **Step 1 : Réécrire le sitemap sans articles/catégories/routes supprimées**

Remplacer tout `src/routes/sitemap.xml/+server.ts` par :

```ts
import { getAllBooks } from '$lib/books';

const SITE_URL = 'https://kevin.delfour.co';

export const prerender = true;

export function GET() {
	const books = getAllBooks();

	const staticPages = [
		{ path: '/', priority: '1.0' },
		{ path: '/livres/', priority: '0.8' },
		{ path: '/outils/', priority: '0.8' },
		{ path: '/projets/', priority: '0.7' },
		{ path: '/a-propos/', priority: '0.7' },
		{ path: '/contact/', priority: '0.6' },
		{ path: '/benevolat/', priority: '0.5' },
		{ path: '/search/', priority: '0.4' }
	];

	const urls: string[] = [];

	for (const page of staticPages) {
		urls.push(`
	<url>
		<loc>${SITE_URL}${page.path}</loc>
		<priority>${page.priority}</priority>
		<changefreq>weekly</changefreq>
	</url>`);
	}

	for (const book of books) {
		urls.push(`
	<url>
		<loc>${SITE_URL}/livres/${book.slug}/</loc>
		<priority>0.7</priority>
		<changefreq>monthly</changefreq>
	</url>`);

		for (const chapter of book.chapters) {
			urls.push(`
	<url>
		<loc>${SITE_URL}/livres/${book.slug}/${chapter.slug}/</loc>
		<priority>0.6</priority>
		<changefreq>monthly</changefreq>
	</url>`);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
```

- [ ] **Step 2 : Vérifier qu'il n'importe plus `getAllPosts`**

Run: `rg -n "getAllPosts|content" src/routes/sitemap.xml/+server.ts ; echo "exit:$?"`
Expected: aucun match (exit 1).

- [ ] **Step 3 : Commit**

```bash
git add src/routes/sitemap.xml/+server.ts
git commit -m "chore: sitemap sans articles ni catégories" --no-verify
```

---

### Task 6 : Supprimer le chargeur d'articles + le contenu

**Files:**
- Delete: `src/lib/content.ts`
- Delete: `src/content/posts/` (172 `.md`)

**Pré-requis :** après les Tasks 2/4/5, plus aucun fichier ne doit importer `$lib/content`.

- [ ] **Step 1 : Confirmer qu'aucun consommateur ne reste**

Run: `rg -n "lib/content" src ; echo "exit:$?"`
Expected: aucun match (exit 1). Si un match subsiste, le corriger avant de continuer.

- [ ] **Step 2 : Supprimer le chargeur et le contenu**

```bash
git rm src/lib/content.ts
git rm -r src/content/posts
```

- [ ] **Step 3 : Vérifier le check**

Run: `npm run check`
Expected: 0 erreur.

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "chore: suppression de content.ts et des 172 articles" --no-verify
```

---

### Task 7 : Nettoyer la navigation et les liens morts vers `/articles`

**Files:**
- Modify: `src/lib/components/Header.svelte`
- Modify: `src/lib/components/Footer.svelte`
- Modify: `src/routes/a-propos/+page.svelte`

- [ ] **Step 1 : Header — retirer l'entrée Articles**

Dans `src/lib/components/Header.svelte`, dans `navItems`, supprimer la ligne :

```ts
		{ label: 'Articles', href: '/articles/' },
```

- [ ] **Step 2 : Header — retirer le lien RSS**

Dans `src/lib/components/Header.svelte`, supprimer le bloc `<a href="/index.xml" …>` complet :

```svelte
				<a
					href="/index.xml"
					class="search-toggle"
					aria-label="Flux RSS"
					title="Flux RSS"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
				</a>
```

- [ ] **Step 3 : Footer — retirer le lien Articles**

Dans `src/lib/components/Footer.svelte`, colonne « Explorer », supprimer la ligne :

```svelte
				<a href="/articles/">Articles</a>
```

- [ ] **Step 4 : Footer — retirer le lien RSS**

Dans `src/lib/components/Footer.svelte`, colonne « Suivre », supprimer le bloc `<a href="/index.xml" …>Flux RSS</a>` complet :

```svelte
				<a href="/index.xml" class="footer-social-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
					Flux RSS
				</a>
```

- [ ] **Step 5 : À propos — retirer le lien mort vers les articles**

Dans `src/routes/a-propos/+page.svelte`, supprimer la puce qui pointe vers `/articles/` :

```svelte
				<li><strong>Des <a href="/articles/">réflexions</a></strong> basées sur l'expérience de terrain, sans posture de donneur de leçons</li>
```

(La réécriture complète de la page À propos — identité Lead Tech, suppression du ton mission — est faite au Plan 3. Ici on retire seulement le lien cassé.)

- [ ] **Step 6 : Vérifier qu'il ne reste aucun lien vers `/articles` ou `/index.xml` dans les pages gardées**

Run: `rg -n "/articles|/index\.xml" src/lib src/routes ; echo "exit:$?"`
Expected: aucun match (exit 1). (Rappel : `src/content/posts` n'existe plus.)

- [ ] **Step 7 : Commit**

```bash
git add src/lib/components/Header.svelte src/lib/components/Footer.svelte src/routes/a-propos/+page.svelte
git commit -m "chore: nav/footer/à-propos sans liens blog ni RSS" --no-verify
```

---

### Task 8 : Retirer les documents de la couche mission

**Files:**
- Delete: `LIGNE_EDITORIALE.md`
- Delete (kit éditorial dans `.claude/`) : `ARTICLE_TEMPLATE_CTO.md`, `ARTICLE_TEMPLATE_JEUNESSE.md`, `CHECKLIST_PUBLICATION.md`, `DESIGN_SYSTEM.md`, `LAYOUTS_REFERENCE.md`, `LINE_EDITORIALE.md`, `MAINTENANCE_LINKS.md`, `NAVIGATION_MODEL.md`, `PILLAR_TEMPLATE.md`, `PROMPT_BATCH_REFACTOR_ARTICLES.md`, `PROMPT_CREATE_PILLAR_CORPUS.md`, `PROMPT_PILLAR_REFACTOR.md`, `PROMPT_UNIFY_SITE.md`, `TONE_GUIDE.md`
- **Conserver** : `.claude/commands/` (commandes Claude Code), `.claude/README.md`
- Modify: `CLAUDE.md` (stub intérimaire — la réécriture complète et fidèle est une tâche du Plan 3, une fois la nouvelle architecture en place)

- [ ] **Step 1 : Supprimer la ligne éditoriale et le kit mission**

```bash
git rm LIGNE_EDITORIALE.md
git rm .claude/ARTICLE_TEMPLATE_CTO.md .claude/ARTICLE_TEMPLATE_JEUNESSE.md \
  .claude/CHECKLIST_PUBLICATION.md .claude/DESIGN_SYSTEM.md .claude/LAYOUTS_REFERENCE.md \
  .claude/LINE_EDITORIALE.md .claude/MAINTENANCE_LINKS.md .claude/NAVIGATION_MODEL.md \
  .claude/PILLAR_TEMPLATE.md .claude/PROMPT_BATCH_REFACTOR_ARTICLES.md \
  .claude/PROMPT_CREATE_PILLAR_CORPUS.md .claude/PROMPT_PILLAR_REFACTOR.md \
  .claude/PROMPT_UNIFY_SITE.md .claude/TONE_GUIDE.md
```

- [ ] **Step 2 : Remplacer `CLAUDE.md` par un stub intérimaire fidèle**

Remplacer tout `CLAUDE.md` par :

```markdown
# Contexte — kevin.delfour.co

> Refonte en cours (« mon lieu »). Ce fichier est volontairement court le temps
> de la refonte ; il sera réécrit en détail à la fin du Plan 3.

## Ce qu'est ce site

L'espace personnel de Kevin Delfour — **Lead Tech** (avec une dimension
management), 17 ans de terrain. Pas un site de transmission, pas de mission,
pas de cadence éditoriale. Un lieu qui lui ressemble, où vivent ses projets,
ses outils et ses livres.

## Brief de référence

Toute décision de refonte est cadrée par :
`docs/superpowers/specs/2026-05-30-kevin-delfour-co-mon-lieu-design.md`

Plans d'implémentation : `docs/superpowers/plans/`.

## Stack

SvelteKit (Svelte 5) · TypeScript · mdsvex (livres) · Pagefind · adapter-static.
Déploiement GitHub Pages via GitHub Actions. Langue : français.

## Direction visuelle

Terminal moderne (thème « Slate » par défaut), cadre fenêtre (barre de titre +
sidebar arborescence + barre de statut), 9 thèmes lecteur persistés
(localStorage), panneau d'accessibilité conservé. Détails en §7 du brief.

## Format des commits

Conventionnel : `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `perf:`.
```

- [ ] **Step 3 : Vérifier que rien dans le code ne dépend des fichiers supprimés**

Run: `rg -n "LIGNE_EDITORIALE|TONE_GUIDE|NAVIGATION_MODEL|PILLAR_TEMPLATE" src ; echo "exit:$?"`
Expected: aucun match (exit 1).

- [ ] **Step 4 : Commit**

```bash
git add -A
git commit -m "docs: retrait de la couche mission (ligne éditoriale, kit), CLAUDE.md intérimaire" --no-verify
```

---

### Task 9 : Vérification finale (build complet + liens morts)

**Files:** aucun (acceptation).

- [ ] **Step 1 : Check TypeScript/Svelte**

Run: `npm run check`
Expected: 0 erreur (pas plus qu'à la baseline de Task 1).

- [ ] **Step 2 : Build complet (prérendu — détecte les liens morts)**

Run: `npm run build`
Expected: build OK. Aucune erreur de prérendu type « 404 » vers `/articles/`, `/categories/`, `/archives/`, `/vision/`, etc. Si une erreur de lien apparaît, identifier la page source et retirer le lien (même principe que Task 7).

- [ ] **Step 3 : Aucune référence résiduelle au blog/mission**

Run:
```bash
rg -n "getAllPosts|lib/content|/index\.xml|/articles|/categories|/archives" src ; echo "exit:$?"
```
Expected: aucun match (exit 1).

- [ ] **Step 4 : Sanity preview (optionnel mais recommandé)**

Run: `npm run preview`
Vérifier à l'œil : home sans section articles ni « Suivre », nav sans Articles ni RSS, footer idem, `/a-propos` sans lien cassé. Les pages `/livres`, `/outils`, `/projets`, `/contact` répondent.

- [ ] **Step 5 : Commit final éventuel**

Si des correctifs de liens ont été nécessaires au Step 2 :

```bash
git add -A
git commit -m "fix: liens résiduels après élagage" --no-verify
```

---

## Fin du Plan 1

À l'issue : le site build, sans blog ni couche mission, toujours en habillage « néon ». Prochaines étapes (plans séparés) :

- **Plan 2 — Design system terminal + thèmes + accessibilité** : refonte de `src/app.css` en système de tokens terminal, 9 thèmes (CSS variables), sélecteur de thème + persistance localStorage, conservation du panneau d'accessibilité.
- **Plan 3 — Home « fenêtre » + identité Lead Tech** : cadre fenêtre (barre de titre + sidebar arborescence + barre de statut), reconstruction de la home (`$ whoami`, projets, outils, livres, contact), responsive mobile, bascule copy CTO → Lead Tech (hero, À propos, SEO, footer), réécriture complète de `CLAUDE.md`.
