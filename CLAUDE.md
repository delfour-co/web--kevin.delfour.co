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

**Générateur :** Hugo (v0.147.8+extended)
**Thème :** Custom (basé sur PaperMod, fortement personnalisé)
**Langue :** Français

### Structure des dossiers

```
.
├── content/                      # Contenus markdown
│   ├── _index.md                # Page d'accueil (hero + sections)
│   ├── articles/_index.md       # Page liste articles (alias /posts/)
│   ├── livres/_index.md         # Vitrine livres (alias /guides-livres/)
│   ├── projets/_index.md        # Page projets
│   ├── vision/_index.md         # Convictions et posture
│   ├── contact/_index.md        # Contact et liens sociaux
│   ├── about.md                 # À propos (alias /a-propos/)
│   ├── start-here.md            # Guide de démarrage (legacy)
│   ├── le-role-du-cto/          # Pilier 1 (legacy, accessible via URL)
│   ├── gouvernance-decision/    # Pilier 2 (legacy, accessible via URL)
│   ├── culture-management/      # Pilier 3 (legacy, accessible via URL)
│   ├── trouver-sa-place/        # Pilier 4 (legacy, accessible via URL)
│   ├── guides-livres/           # Livres complets (contenu source)
│   └── posts/                   # Articles (550+)
├── layouts/                      # Templates Hugo personnalisés
├── assets/css/extended/         # CSS personnalisés
├── themes/custom/               # Thème custom
├── hugo.yaml                     # Configuration Hugo
├── LIGNE_EDITORIALE.md          # Ligne éditoriale (référence absolue)
├── CLAUDE.md                    # Ce fichier
└── .claude/                     # Kit éditorial (templates, prompts, guides)
```

---

## Architecture de contenu

### Navigation principale

Le site est structuré autour de 6 sections :

1. **Articles** (`/articles/`) — Liste filtrable par catégorie
2. **Livres** (`/livres/`) — Vitrine des livres gratuits en ligne
3. **Projets** (`/projets/`) — Projets open source et katas
4. **Vision** (`/vision/`) — Convictions et posture
5. **À propos** (`/a-propos/`) — Parcours et ligne morale
6. **Contact** (`/contact/`) — Liens sociaux et accompagnement

### Catégories d'articles

Les articles sont classés en 6 catégories :

- **Leadership** — Posture CTO, rôle, dilemmes, responsabilité
- **Décision** — Gouvernance technique, arbitrages, RFC, ADR, Build vs Buy
- **Craft** — Stack, code, infra, technologies, architecture logicielle
- **Organisation** — Culture, management, sécurité psychologique, équipe
- **Pratiques** — Code review, testing, pair programming, CI/CD, documentation
- **Parcours** — Débuts, reconversion, carrière, trajectoires réalistes

### Pages pilier (legacy)

Les anciennes pages pilier restent accessibles à leurs URLs historiques :
- `/le-role-du-cto/`, `/gouvernance-decision/`, `/culture-management/`, `/trouver-sa-place/`

---

## Structure standard d'une page pilier

Chaque page pilier suit cette structure (NON NÉGOCIABLE) :

**Référence complète :** `.claude/PILLAR_TEMPLATE.md`

Structure minimale :
- Intention (1-2 paragraphes max)
- À qui s'adresse (principalement / secondairement / ce que ce n'est pas)
- Grandes tensions (4 à 6 tensions structurantes)
- Où commencer (6-8 liens max, organisés par situations)
- Derniers articles (3-5 maximum)
- Aller plus loin (lien vers /posts)

**Règle d'or :** Une page pilier est une **carte**, pas un article. Elle oriente, elle ne développe pas.

---

## Ton & style (NON NÉGOCIABLE)

### ✅ À faire

- Ton calme, sobre, lucide
- Tutoiement assumé
- Formulations : "Ce que j'ai observé", "Avec le recul", "Un cadre possible"
- Repères proposés, jamais imposés
- Respect de l'autonomie du lecteur

### ❌ À éviter ABSOLUMENT

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
- Projets
- Vision
- À propos
- Contact
```

### Design system

- **Typographie :** Fraunces (titres), Source Serif 4 (corps), Inter/system-ui (UI)
- **Couleur accent :** Ambre/doré `#D4920B` (clair) / `#F0B840` (sombre)
- **Largeur homepage :** 1080px (`--home-width`)
- **Style :** Clair épuré, espaces généreux, style éditorial craft
- **Tokens :** `themes/custom/assets/css/core/theme-vars.css`

---

## Taxonomies Hugo

```yaml
taxonomies:
  tag: "tags"
  category: "categories"
  pillar: "pillars"      # legacy, conservé pour compatibilité
  audience: "audiences"
```

Chaque article doit avoir :
- `categories:` (leadership | décision | craft | organisation | pratiques | parcours)
- `pillar:` (le-role-du-cto | gouvernance-decision | culture-management | trouver-sa-place) — legacy
- `audience:` (cto | jeunesse-tech | tous)
- `featured:` (true | false)

---

## Commandes utiles

```bash
# Build local
hugo server

# Build production
hugo --minify

# Check git status
git status

# Commit standard
git add .
git commit -m "Message"
git push origin main
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

❌ Ajouter des niveaux de navigation
❌ Créer de nouvelles taxonomies sans validation
❌ Modifier le ton (voir section "Ton & style")
❌ Ajouter des promesses de résultats
❌ Transformer les piliers en "méthode"
❌ Multiplier les CTA
❌ Créer des fichiers markdown de documentation non demandés

### 3. Modifications autorisées

✅ Micro-copy (1-2 phrases maximum)
✅ Corrections de friction UX réelle et identifiée
✅ Ajustements de hiérarchie visuelle légère
✅ Reformulations minimales respectant le ton
✅ Ajout d'articles respectant la ligne éditoriale
✅ Ajustements CSS légers

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

### Front matter minimal

```yaml
---
title: "Titre de l'article"
description: "Description courte (150-160 caractères)"
date: 2025-01-15
categories: ["leadership"]  # ou décision, craft, organisation, pratiques, parcours
pillar: "le-role-du-cto"    # legacy, conservé pour compatibilité
audience: "cto"              # ou jeunesse-tech, tous
featured: false              # ou true
tags: ["tag1", "tag2"]
---
```

### Structure canonique (CTO)

1. Situation réelle
2. Le faux problème
3. Le vrai enjeu du rôle
4. Cadre de décision (3 à 5 principes max)
5. Retour terrain
6. Erreurs fréquentes
7. Si c'était à refaire
8. Pour approfondir (liens internes uniquement)

**Chaque article doit renvoyer vers sa page pilier.**

### Structure canonique (Jeunesse tech)

1. Dédramatisation
2. Le réel (sans filtre)
3. Repères clairs
4. Erreurs classiques
5. Message de responsabilité
6. Pour aller plus loin (liens internes uniquement)

**Chaque article doit renvoyer vers sa page pilier.**

---

## Historique des modifications majeures

- **2025-01-XX** : Création du kit éditorial `.claude/`
  - Templates pour piliers et articles
  - Prompts de refactoring et création
  - Checklists de publication
  - Guide de ton et ligne éditoriale validée

- **2025-12-16** : Retouche UX — Amélioration continuité cognitive menu → piliers
  - Ajout bandeau de navigation
  - Standardisation des 4 pages piliers
  - Ajout micro-descriptions dans hugo.yaml

- **2025-12-16** : Ajustements UX minimalistes
  - Titre "Par où commencer ?" → "Selon ta situation"
  - Ajout ancres #cto et #jeunesse-tech
  - Liens raccourcis sur la home

- **2026-02-28** : Refonte complète du site
  - Nouvelle identité visuelle : Fraunces + Source Serif 4, accent ambre #D4920B
  - Nouvelle navigation : Articles, Livres, Projets, Vision, À propos, Contact
  - Nouvelle homepage : hero + sections thématiques (1080px)
  - Migration piliers → catégories (leadership, architecture, organisation, parcours)
  - Suppression système 4 couleurs pilier, bandeau navigation, watermark dinosaure
  - Pages dédiées : /vision/, /contact/, /articles/ avec filtres JS

---

## Contact & maintenance

**Propriétaire :** Kevin Delfour
**Repo :** github.com/delfour-co/web--kevin.delfour.co (privé)
**Branche principale :** main
**Déploiement :** Automatique sur push (via GitHub Actions ou Netlify)

---

## Pour les assistants IA

### Avant toute intervention

1. Lire `LIGNE_EDITORIALE.md` en entier (ou `.claude/LINE_EDITORIALE.md`)
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
- **`LINE_EDITORIALE.md`** — Ligne éditoriale complète (version validée)
- **`TONE_GUIDE.md`** — Guide de ton et formulations
- **`NAVIGATION_MODEL.md`** — Modèle de navigation (piliers → articles)

### Templates
- **`PILLAR_TEMPLATE.md`** — Template pour pages piliers
- **`ARTICLE_TEMPLATE_CTO.md`** — Template pour articles CTO
- **`ARTICLE_TEMPLATE_JEUNESSE.md`** — Template pour articles jeunesse tech

### Prompts de travail
- **`PROMPT_PILLAR_REFACTOR.md`** — Refactorer une page pilier
- **`PROMPT_BATCH_REFACTOR_ARTICLES.md`** — Refactorer un lot d'articles
- **`PROMPT_CREATE_PILLAR_CORPUS.md`** — Créer un corpus complet pour un pilier
- **`PROMPT_UNIFY_SITE.md`** — Unifier le site (fin du "double univers")

### Checklists & maintenance
- **`CHECKLIST_PUBLICATION.md`** — Checklist avant publication (2 minutes)
- **`MAINTENANCE_LINKS.md`** — Audit et corrections des liens internes

### Documentation
- **`README.md`** — Vue d'ensemble du kit éditorial

**Règle :** Avant toute création ou refactoring majeur, consulter les templates et prompts correspondants dans `.claude/`.

---

## Ressources complémentaires

- **Ligne éditoriale complète :** `LIGNE_EDITORIALE.md` (et `.claude/LINE_EDITORIALE.md`)
- **Kit éditorial :** `.claude/` (templates, prompts, guides)
- **Configuration Hugo :** `hugo.yaml`
- **Page d'accueil :** `content/_index.md`
- **Design tokens :** `themes/custom/assets/css/core/theme-vars.css`
- **Homepage CSS :** `assets/css/extended/homepage.css`
- **Thème custom :** `themes/custom/`

---

Fin du document.
