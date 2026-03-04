# Context — kevin.delfour.co

Ce fichier sert de référence pour les assistants IA travaillant sur ce projet.

---

## Vue d'ensemble

**Projet :** Site personnel de Kevin Delfour, CTO avec 17 ans d'expérience
**URL :** https://kevin.delfour.co
**Intention :** Donner des repères. Pas des leçons.

**Publics :**
1. CTO et leaders tech (prioritaire)
2. Jeunesse tech : juniors, alternants, reconversions (pilier moral)

---

## Architecture technique

**Framework :** SvelteKit (Svelte 5) avec adapter-static (site statique)
**Langage :** TypeScript
**Contenu :** Markdown via mdsvex
**Recherche :** Pagefind (post-build)
**Langue :** Français
**Déploiement :** GitHub Pages via GitHub Actions

### Structure des dossiers

```
.
├── src/
│   ├── routes/                   # Pages SvelteKit (file-based routing)
│   │   ├── +layout.svelte       # Layout principal
│   │   ├── articles/            # Liste + [slug] articles
│   │   ├── livres/              # Vitrine + [book]/[chapter]
│   │   ├── outils/              # Outils interactifs
│   │   ├── projets/             # Page projets
│   │   ├── vision/              # Convictions et posture
│   │   ├── a-propos/            # Parcours et ligne morale
│   │   ├── contact/             # Liens sociaux
│   │   ├── search/              # Recherche Pagefind
│   │   ├── archives/            # Archives chronologiques
│   │   ├── categories/[category]/ # Filtrage par catégorie
│   │   ├── posts/[slug]/        # Redirections legacy
│   │   └── le-role-du-cto/ etc. # Redirections pages pilier legacy
│   ├── content/                 # Contenus markdown
│   │   ├── posts/               # Articles (~172)
│   │   └── livres/              # Chapitres des livres
│   ├── lib/
│   │   ├── components/          # Composants Svelte
│   │   │   ├── tools/           # Outils interactifs (BuildVsBuy, etc.)
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── SEO.svelte
│   │   │   ├── ThemeToggle.svelte
│   │   │   ├── ScrollProgress.svelte
│   │   │   ├── TableOfContents.svelte
│   │   │   ├── Breadcrumbs.svelte
│   │   │   ├── BookNav.svelte
│   │   │   └── AccessibilityPanel.svelte
│   │   ├── data/                # Données structurées (books, projects, tools)
│   │   ├── stores/              # Stores Svelte (accessibility)
│   │   ├── content.ts           # Chargement des articles markdown
│   │   └── books.ts             # Chargement des chapitres de livres
│   ├── app.css                  # Styles globaux
│   ├── app.html                 # Template HTML racine
│   └── app.d.ts                 # Types TypeScript
├── static/                      # Assets statiques (images, favicons)
├── svelte.config.js             # Configuration SvelteKit
├── vite.config.ts               # Configuration Vite
├── tsconfig.json                # Configuration TypeScript
├── package.json                 # Dépendances et scripts
├── LIGNE_EDITORIALE.md          # Ligne éditoriale (référence absolue)
├── CLAUDE.md                    # Ce fichier
└── .claude/                     # Kit éditorial (templates, prompts, guides)
```

---

## Architecture de contenu

### Navigation principale

Le site est structuré autour de 7 sections :

1. **Articles** (`/articles/`) — Liste filtrable par catégorie
2. **Livres** (`/livres/`) — Vitrine des livres gratuits en ligne
3. **Outils** (`/outils/`) — Outils interactifs pour décisions techniques
4. **Projets** (`/projets/`) — Projets open source et katas
5. **Vision** (`/vision/`) — Convictions et posture
6. **À propos** (`/a-propos/`) — Parcours et ligne morale
7. **Contact** (`/contact/`) — Liens sociaux et accompagnement

### Catégories d'articles

Les articles sont classés en 6 catégories :

- **Leadership** — Posture CTO, rôle, dilemmes, responsabilité
- **Décision** — Gouvernance technique, arbitrages, RFC, ADR, Build vs Buy
- **Craft** — Stack, code, infra, technologies, architecture logicielle
- **Organisation** — Culture, management, sécurité psychologique, équipe
- **Pratiques** — Code review, testing, pair programming, CI/CD, documentation
- **Parcours** — Débuts, reconversion, carrière, trajectoires réalistes

### Outils interactifs

8 outils Svelte dans `src/lib/components/tools/` :
- Build vs Buy, Générateur ADR, Diagnostic CTO, Boussole Carrière
- Tech Radar, Générateur RFC, Matrice Décision, Checklist Code Review

---

## Ton & style (NON NÉGOCIABLE)

### À faire

- Ton calme, sobre, lucide
- Tutoiement assumé
- Formulations : "Ce que j'ai observé", "Avec le recul", "Un cadre possible"
- Repères proposés, jamais imposés
- Respect de l'autonomie du lecteur

### À éviter ABSOLUMENT

- "Il faut", "Tu dois", "La bonne solution est"
- Jargon UX/marketing
- Injonctions
- Promesses de résultats
- Posture d'expert surplombant
- Sur-explication
- Emojis (sauf si explicitement demandé)

**Règle d'or :** Avant toute modification, se demander :

> Est-ce que cette modification aide quelqu'un à se repérer
> sans lui dire quoi faire ?

Si la réponse est non → ne pas faire.

---

## Menu principal (structure actuelle)

```yaml
- Articles
- Livres
- Outils
- Projets
- Vision
- À propos
- Contact
```

### Design system

- **Typographie :** Fraunces (titres), Source Serif 4 (corps), Inter/system-ui (UI)
- **Couleur accent :** Ambre/doré `#B37A08` (clair, WCAG AA) / `#F0B840` (sombre)
- **Largeur homepage :** 1080px (`--home-width`)
- **Style :** Clair épuré, espaces généreux, style éditorial craft

---

## Front matter des articles

Chaque article markdown dans `src/content/posts/` doit avoir :

```yaml
---
title: "Titre de l'article"
description: "Description courte (150-160 caractères)"
date: 2025-01-15
categories: ["leadership"]  # ou décision, craft, organisation, pratiques, parcours
audience: "cto"              # ou jeunesse-tech, tous
featured: false              # ou true
tags: ["tag1", "tag2"]
---
```

---

## Commandes utiles

```bash
# Installer les dépendances
npm install

# Serveur de développement
npm run dev

# Build production (+ Pagefind)
npm run build

# Preview du build
npm run preview

# Vérification TypeScript
npm run check

# Check git status
git status
```

### Format des messages de commit

Les messages de commit suivent le format conventionnel avec préfixe :

**Format :** `<type>: <description>`

**Types disponibles :**
- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `refactor:` — Refactoring de code
- `chore:` — Tâches de maintenance (dépendances, config, etc.)
- `docs:` — Documentation uniquement
- `style:` — Formatage, style (pas de changement de code)
- `perf:` — Amélioration de performance

**Exemples :**
```bash
git commit -m "feat: ajout barre de progression de défilement"
git commit -m "fix: correction largeur barre de progression"
git commit -m "chore: mise à jour des dépendances"
git commit -m "docs: ajout section format commit dans CLAUDE.md"
```

**Règle :** Toujours utiliser le format conventionnel pour maintenir la cohérence de l'historique git.

---

## Règles de contribution (NON NÉGOCIABLES)

### 1. Ligne éditoriale

**Référence absolue :** `LIGNE_EDITORIALE.md`

Toute modification doit :
- Respecter l'intention centrale
- Préserver la posture
- Ne pas créer de dépendance
- Ne pas alourdir le site
- Ne pas ajouter de marketing

### 2. Modifications interdites

- Ajouter des niveaux de navigation
- Modifier le ton (voir section "Ton & style")
- Ajouter des promesses de résultats
- Multiplier les CTA
- Créer des fichiers markdown de documentation non demandés

### 3. Modifications autorisées

- Micro-copy (1-2 phrases maximum)
- Corrections de friction UX réelle et identifiée
- Ajustements de hiérarchie visuelle légère
- Reformulations minimales respectant le ton
- Ajout d'articles respectant la ligne éditoriale
- Ajustements CSS légers

### 4. Process de validation

Avant toute modification, vérifier :

1. Est-ce que ça aide à se repérer sans dire quoi faire ?
2. Est-ce que ça respecte la ligne éditoriale ?
3. Est-ce que ça reste calme, sobre et non prescriptif ?
4. Est-ce strictement nécessaire ?

Si une seule réponse est "non" → ne pas faire.

---

## Structure d'un nouvel article

**Templates complets disponibles :**
- `.claude/ARTICLE_TEMPLATE_CTO.md` — Structure canonique pour articles CTO
- `.claude/ARTICLE_TEMPLATE_JEUNESSE.md` — Structure canonique pour articles jeunesse tech

### Structure canonique (CTO)

1. Situation réelle
2. Le faux problème
3. Le vrai enjeu du rôle
4. Cadre de décision (3 à 5 principes max)
5. Retour terrain
6. Erreurs fréquentes
7. Si c'était à refaire
8. Pour approfondir (liens internes uniquement)

### Structure canonique (Jeunesse tech)

1. Dédramatisation
2. Le réel (sans filtre)
3. Repères clairs
4. Erreurs classiques
5. Message de responsabilité
6. Pour aller plus loin (liens internes uniquement)

---

## Contact & maintenance

**Propriétaire :** Kevin Delfour
**Repo :** github.com/delfour-co/web--kevin.delfour.co (privé)
**Branche principale :** main
**Déploiement :** Automatique sur push via GitHub Actions → GitHub Pages

---

## Pour les assistants IA

### Avant toute intervention

1. Lire `LIGNE_EDITORIALE.md` en entier
2. Lire ce fichier (`CLAUDE.md`)
3. Consulter les templates pertinents dans `.claude/` si création/refactoring
4. Identifier les frictions réelles (pas supposées)
5. Proposer uniquement le strict nécessaire

### En cas de doute

Privilégier :
- La retenue
- La simplicité
- Le respect du ton existant
- La question plutôt que l'affirmation

### Auto-contrôle continu

Se demander régulièrement :
- Est-ce que je respecte la ligne éditoriale ?
- Est-ce que je suis en train d'alourdir le site ?
- Est-ce que je reste calme et non prescriptif ?
- Est-ce strictement nécessaire ?

---

## Kit éditorial (.claude/)

Le dossier `.claude/` contient les ressources de référence pour maintenir la cohérence du site :

### Documents de référence
- **`TONE_GUIDE.md`** — Guide de ton et formulations
- **`NAVIGATION_MODEL.md`** — Modèle de navigation
- **`DESIGN_SYSTEM.md`** — Tokens, typographie, breakpoints, conventions CSS

### Templates
- **`PILLAR_TEMPLATE.md`** — Template pour pages piliers
- **`ARTICLE_TEMPLATE_CTO.md`** — Template pour articles CTO
- **`ARTICLE_TEMPLATE_JEUNESSE.md`** — Template pour articles jeunesse tech

### Prompts de travail
- **`PROMPT_PILLAR_REFACTOR.md`** — Refactorer une page pilier
- **`PROMPT_BATCH_REFACTOR_ARTICLES.md`** — Refactorer un lot d'articles
- **`PROMPT_CREATE_PILLAR_CORPUS.md`** — Créer un corpus complet pour un pilier

### Checklists & maintenance
- **`CHECKLIST_PUBLICATION.md`** — Checklist avant publication (2 minutes)
- **`MAINTENANCE_LINKS.md`** — Audit et corrections des liens internes

**Règle :** Avant toute création ou refactoring majeur, consulter les templates et prompts correspondants dans `.claude/`.

---

## Ressources complémentaires

- **Ligne éditoriale complète :** `LIGNE_EDITORIALE.md` (source unique)
- **Kit éditorial :** `.claude/` (templates, prompts, guides)
- **Styles globaux :** `src/app.css`
- **Composants :** `src/lib/components/`
- **Données :** `src/lib/data/`
- **Contenu :** `src/content/`

---

Fin du document.
