# Contexte — kevin.delfour.co

## Ce qu'est ce site

L'extension web du CV exécutif de **Kevin Delfour**, Engineering Leader, 17 ans
d'expérience, basé à Lyon. Le site existe pour répondre en trente secondes à une
seule question :

> Pourquoi confier une organisation d'ingénierie à Kevin ?

**Audience primaire :** CEO, CTO, fondateurs, VP Engineering, recruteurs de
postes de direction d'ingénierie. **Audience secondaire :** Engineering Managers,
Tech Leads, développeurs seniors.

Ce n'est ni un portfolio de développeur, ni un blog technique.

## Identité — non négociable

Kevin est **Engineering Leader** (en français : leader d'ingénierie). Il vise des
postes **Engineering Manager · Senior EM · Head of Engineering · VP Engineering**.

- Ne jamais le présenter comme « CTO » ni comme « Lead Tech » — ce sont des rôles
  qu'il a tenus, pas son positionnement actuel.
- Exceptions légitimes (noms propres et contenus) : le livre « Être ou ne pas
  être CTO », la communauté « CTO de Lyon », l'outil « Diagnostic Maturité CTO »,
  et les intitulés de postes passés sur la page CV.
- Les intitulés de fonctions restent en anglais (Engineering Manager, Head of
  Engineering, VP Engineering, CTO) : ce sont les termes recherchés. Le discours
  autour reste en français.

**Message central :**

> Je construis des organisations d'ingénierie où les gens et les produits
> s'épanouissent. La technologie compte. Elle ne fait rien toute seule.

Ne pas réduire les gens à une fonction instrumentale (« les gens sont le
multiplicateur », « les gens sont la ressource ») : Kevin s'y refuse.

**Vocabulaire du leadership.** Kevin ne « dirige » pas et ne « pilote » pas des
gens : il emmène, il donne une direction, il ne donne pas d'ordres. Écrire
« mener », « emmener », « porter », « accompagner ». Proscrire « diriger »,
« piloter », « encadrer », « à la tête de » appliqués à des personnes. Restent
légitimes : les emplois techniques (« graphes dirigés », « développement piloté
par les tests », « données pilotées par un JSON ») et « direction » au sens du
poste visé (« rôles de direction d'ingénierie », « comité de direction »).

## Faits canoniques

`src/lib/data/profile.ts` est la **source unique** des faits publiés : identité,
contacts, chiffres clés, parcours, compétences, communauté, sujets de conférence.
Ces données reflètent le CV (`static/cv/kevin-delfour-cv.pdf`).

**Règle :** toute affirmation publiée sur le site doit être adossée à ce fichier.
Pas d'arrondi flatteur, pas de superlatif ajouté, pas de réalisation inventée. Si
un chiffre change, il change dans `profile.ts` — jamais en dur dans une page.

## Architecture

- **Framework :** SvelteKit (Svelte 5, runes) + adapter-static (site statique).
- **Langage :** TypeScript. **Langue :** français.
- **Contenu livres :** Markdown via mdsvex (`src/content/livres/`).
- **Recherche :** Pagefind (post-build). **Déploiement :** GitHub Pages via Actions (push sur `main`).

### Sections du site

- **Accueil** (`/`) — la réponse en 30 s : positionnement, chiffres clés, façon de travailler, écrits, contact.
- **Leadership** (`/leadership/`) — le cœur : cinq piliers de convictions et de pratiques, avec renvois vers les outils et les chapitres de livres. Données dans `src/lib/data/leadership.ts`.
- **Livres** (`/livres/`) — deux livres gratuits en ligne. Tient lieu de section « Écrits ».
- **Conférences** (`/conferences/`) — sujets proposés et rendez-vous animés.
- **Communauté** (`/communaute/`) — CTO de Lyon, meetups, mentorat.
- **À propos** (`/a-propos/`) — quel leader il est, pas une biographie chronologique.
- **CV** (`/cv/`) — miroir web du CV exécutif, imprimable, avec le PDF en téléchargement.
- **Contact** (`/contact/`) — mise en relation professionnelle.
- **Projets** (`/projets/`) — la preuve du hands-on. Données dans `src/lib/data/projects.json`.
- **Boîte à outils** (`/outils/`) — hors navigation principale, accessible par le pied de page et les renvois contextuels.

**Pas de section articles** tant qu'il n'y a pas d'articles : Kevin écrit ses
livres et contribue à l'open source. Ne pas créer de route `/articles/` vide. Le
jour où des articles existent, l'entrée de nav « Livres » devient « Écrits ».

## Design system

- **Esthétique :** sobre, épurée, très lisible. Registre Linear / Stripe / Vercel.
  Pas de métaphore terminal, pas de néon. Le parti pris « aucun effet décoratif »
  datait de la refonte, quand il fallait d'abord assainir le contenu : il ne
  tient plus. Une intention visuelle est bienvenue tant qu'elle reste sobre,
  qu'elle sert la lecture et qu'elle ne dégrade aucun contraste sous le seuil
  AA (4,5:1) — les décors se retirent en `data-contrast='high'`.
- **Thèmes :** deux seulement — sombre (défaut) et clair, bascule dans l'en-tête,
  persistée en `localStorage`, appliquée avant peinture (anti-FOUC dans `app.html`).
- **Typographie :** Space Grotesk (titres), Inter (corps et interface), JetBrains
  Mono (labels, méta, code). Auto-hébergées dans `static/fonts/`. Le monospace est
  un accent, jamais le corps de texte.
- **Tokens :** variables CSS sémantiques dans `src/app.css`. Les composants
  consomment les tokens, jamais de couleur codée en dur.
- **Accessibilité :** panneau conservé (`AccessibilityPanel`) — taille, interlignage,
  espacement, largeur, contraste élevé, police dyslexie — appliqué via `data-*` sur
  `documentElement`, indépendant du thème. Ne rien casser de ce mécanisme.
- **Primitives partagées** (`src/app.css`) : `.page`, `.page-hero`, `.kicker`,
  `.section`, `.card`, `.stat-grid`, `.timeline`, `.case-card`, `.btn`, `.tag`.
  Les primitives héritées `.term-*` et `.tool-*` restent en place : les 21 outils
  et les pages projet en dépendent.

## Ton

Première personne, humble, concret, ancré dans le vécu. Zéro buzzword, zéro
promesse exagérée — et zéro auto-dépréciation : « des trucs que je bricole » est
aussi interdit que « expert reconnu ». On décrit ce qui a été fait, avec le
contexte et le résultat.

## Format des commits

Conventionnel : `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `perf:`.
