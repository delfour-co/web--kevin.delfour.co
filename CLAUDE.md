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
│   ├── _index.md                # Page d'accueil
│   ├── start-here.md            # Guide de démarrage
│   ├── le-role-du-cto/          # Pilier 1
│   ├── gouvernance-decision/    # Pilier 2
│   ├── culture-management/      # Pilier 3
│   ├── trouver-sa-place/        # Pilier 4
│   ├── guides-livres/           # Livres complets
│   └── posts/                   # Articles (550+)
├── layouts/                      # Templates Hugo personnalisés
│   ├── _default/baseof.html     # Template de base
│   └── partials/                # Composants réutilisables
├── assets/css/extended/         # CSS personnalisés
├── themes/custom/               # Thème custom
├── hugo.yaml                     # Configuration Hugo
├── LIGNE_EDITORIALE.md          # Ligne éditoriale (référence absolue)
└── CLAUDE.md                    # Ce fichier
```

---

## Piliers éditoriaux

Le site est structuré autour de 4 piliers (voir `LIGNE_EDITORIALE.md`) :

1. **Le rôle du CTO** (`/le-role-du-cto/`)
   - Responsabilité réelle, limites, solitude, arbitrages

2. **Gouvernance & décision** (`/gouvernance-decision/`)
   - Qui décide quoi, cadres de décision, autonomie vs chaos

3. **Culture & management** (`/culture-management/`)
   - Droit à l'erreur, sécurité psychologique, valeurs vécues

4. **Trouver sa place** (`/trouver-sa-place/`)
   - Débuts, reconversion, environnements sains, trajectoires réalistes

---

## Structure standard d'une page pilier

Chaque page pilier suit cette structure (NON NÉGOCIABLE) :

```markdown
---
title: "[Titre du pilier]"
description: "[Micro-description courte]"
---

## [Titre du pilier]

**[Accroche courte]**

**Public principal :** [audience 1]
**Public concerné :** [audience 2]

---

### À qui s'adresse cette page

[2-3 lignes concrètes sur les situations où ce pilier aide]

---

### Par où commencer

**Si tu découvres ce sujet :**

1. **[Article 1]** — Fondamental (temps)
2. **[Article 2]** — Posture (temps)
3. **[Article 3]** — Terrain (temps)

## Articles

### [Thème 1]
- [Article...]

### [Thème 2]
- [Article...]

---

## Pour approfondir

[Livre recommandé + lien]

[Autres ressources]

---

## Explorer les autres piliers

- **[Pilier 1]** — [micro-description]
- **[Pilier 2]** — [micro-description]
- **[Pilier 3]** — [micro-description]

---

*[Signature personnalisée selon le pilier]. Basé sur 17 ans d'expérience.*
```

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
- Par où commencer ?
- Le rôle du CTO
- Gouvernance & décision
- Culture & management
- Trouver sa place
- Guides & livres
- À propos
```

Les 4 piliers centraux ont un attribut `group: "reperes"` et des micro-descriptions dans `hugo.yaml`.

---

## Bandeau de navigation

Un bandeau apparaît sur la home et les pages piliers :

```
Ce site est organisé par repères, pas par ordre chronologique.
Tu peux explorer librement selon ta situation.
```

**Fichier :** `layouts/partials/navigation_hint.html`
**CSS :** `assets/css/extended/navigation-hint.css`

---

## Taxonomies Hugo

```yaml
taxonomies:
  tag: "tags"
  pillar: "pillars"
  audience: "audiences"
```

Chaque article doit être taggé avec :
- `pillar:` (le-role-du-cto | gouvernance-decision | culture-management | trouver-sa-place)
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

### Front matter minimal

```yaml
---
title: "Titre de l'article"
description: "Description courte (150-160 caractères)"
date: 2025-01-15
pillar: "le-role-du-cto"  # ou gouvernance-decision, culture-management, trouver-sa-place
audience: "cto"            # ou jeunesse-tech, tous
featured: false            # ou true
tags: ["tag1", "tag2"]
---
```

### Structure recommandée (CTO)

1. Situation réelle
2. Faux problème
3. Vrai enjeu du rôle
4. Cadre de décision (3 à 5 principes)
5. Retour terrain
6. Erreurs fréquentes
7. Si c'était à refaire
8. Pour approfondir

### Structure recommandée (Jeunesse tech)

1. Dédramatisation
2. Le réel (sans filtre)
3. Repères clairs
4. Erreurs classiques
5. Message de responsabilité
6. Pour aller plus loin

---

## Historique des modifications majeures

- **2025-12-16** : Retouche UX — Amélioration continuité cognitive menu → piliers
  - Ajout bandeau de navigation
  - Standardisation des 4 pages piliers
  - Ajout micro-descriptions dans hugo.yaml

- **2025-12-16** : Ajustements UX minimalistes
  - Titre "Par où commencer ?" → "Selon ta situation"
  - Ajout ancres #cto et #jeunesse-tech
  - Liens raccourcis sur la home

---

## Contact & maintenance

**Propriétaire :** Kevin Delfour
**Repo :** github.com/delfour-co/web--kevin.delfour.co (privé)
**Branche principale :** main
**Déploiement :** Automatique sur push (via GitHub Actions ou Netlify)

---

## Pour les assistants IA

### Avant toute intervention

1. Lire `LIGNE_EDITORIALE.md` en entier
2. Lire ce fichier (`CLAUDE.md`)
3. Identifier les frictions réelles (pas supposées)
4. Proposer uniquement le strict nécessaire

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

## Ressources complémentaires

- **Ligne éditoriale complète :** `LIGNE_EDITORIALE.md`
- **Configuration Hugo :** `hugo.yaml`
- **Page d'accueil :** `content/_index.md`
- **Guide de démarrage :** `content/start-here.md`
- **Thème custom :** `themes/custom/`

---

Fin du document.
