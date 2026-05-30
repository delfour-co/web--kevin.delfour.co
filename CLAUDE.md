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
