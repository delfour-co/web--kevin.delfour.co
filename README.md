# kevin.delfour.co

Site personnel de Kevin Delfour, CTO avec 17 ans d'expérience.

> Donner des repères. Pas des leçons.

---

## Vue d'ensemble

Ce site existe pour donner des repères :
- aux **CTO et leaders tech** qui portent des responsabilités réelles,
- à celles et ceux qui **cherchent leur place dans la tech**, sans se raconter d'histoires.

**URL :** https://kevin.delfour.co

---

## Stack technique

- **Générateur :** Hugo v0.147.8+ (extended)
- **Thème :** Custom (basé sur PaperMod, fortement personnalisé)
- **Langue :** Français
- **Hébergement :** [À compléter selon config]
- **Déploiement :** Automatique sur push vers `main`

---

## Structure du projet

```
.
├── content/              # Contenus markdown
├── layouts/              # Templates Hugo personnalisés
├── assets/               # CSS, images
├── themes/custom/        # Thème custom
├── hugo.yaml            # Configuration Hugo
├── LIGNE_EDITORIALE.md  # Ligne éditoriale (référence absolue)
├── CLAUDE.md            # Context pour assistants IA
└── README.md            # Ce fichier
```

---

## Installation

### Prérequis

- Hugo v0.147.8+ (extended version)
- Git

### Setup local

```bash
# Cloner le repo
git clone [URL_DU_REPO]
cd web--kevin.delfour.co

# Lancer le serveur de développement
hugo server

# Accéder au site
# http://localhost:1313
```

### Build production

```bash
hugo --minify
```

Les fichiers générés sont dans le dossier `public/`.

---

## Organisation éditoriale

Le site est structuré autour de **4 piliers** :

1. **Le rôle du CTO** — Ce que porte un CTO, au-delà du titre
2. **Gouvernance & décision** — Prendre des décisions qui tiennent la route dans le temps
3. **Culture & management** — Construire une culture d'équipe qui fait grandir, pas qui épuise
4. **Trouver sa place** — Des repères pour s'orienter sans se raconter d'histoires

Chaque pilier contient des articles et des ressources structurées.

---

## Contribuer

### Avant toute contribution

**Lecture obligatoire :**
1. `LIGNE_EDITORIALE.md` — Ligne éditoriale complète (non négociable)
2. `CLAUDE.md` — Context et règles de contribution

### Règles non négociables

- Respecter le ton : calme, sobre, lucide, non prescriptif
- Pas de jargon UX/marketing
- Pas d'injonctions ("Il faut", "Tu dois")
- Pas de promesses de résultats
- Pas d'alourdissement du site

**Règle d'or :** Avant toute modification, se demander :

> Est-ce que cette modification aide quelqu'un à se repérer
> sans lui dire quoi faire ?

Si la réponse est non → ne pas faire.

### Workflow Git

```bash
# Créer une branche
git checkout -b type/description-courte

# Faire les modifications
# ...

# Commit
git add .
git commit -m "Description claire du changement"

# Push
git push origin type/description-courte

# Créer une pull request
```

---

## Ajouter un article

### 1. Créer le fichier

```bash
hugo new posts/yyyy-mm-dd-titre-de-l-article.md
```

### 2. Remplir le front matter

```yaml
---
title: "Titre de l'article"
description: "Description courte (150-160 caractères)"
date: 2025-01-15
pillar: "le-role-du-cto"  # ou gouvernance-decision, culture-management, trouver-sa-place
audience: "cto"            # ou jeunesse-tech, tous
featured: false            # ou true pour mettre en avant
tags: ["tag1", "tag2"]
---
```

### 3. Respecter la structure

**Pour CTO :**
1. Situation réelle
2. Faux problème
3. Vrai enjeu du rôle
4. Cadre de décision (3-5 principes)
5. Retour terrain
6. Erreurs fréquentes
7. Si c'était à refaire
8. Pour approfondir

**Pour Jeunesse tech :**
1. Dédramatisation
2. Le réel (sans filtre)
3. Repères clairs
4. Erreurs classiques
5. Message de responsabilité
6. Pour aller plus loin

---

## Commandes utiles

```bash
# Lancer le serveur local
hugo server

# Build production
hugo --minify

# Nettoyer le dossier public
rm -rf public

# Vérifier la config Hugo
hugo config

# Lister tous les contenus
hugo list all
```

---

## Configuration Hugo

La configuration principale est dans `hugo.yaml`.

**Éléments clés :**
- Menu principal avec micro-descriptions
- Taxonomies : `pillar`, `audience`, `tags`
- Paramètres du thème custom
- URLs canoniques

**⚠️ Important :** Ne pas modifier la structure du menu sans validation.

---

## Maintenance

### Mise à jour Hugo

```bash
# Vérifier la version actuelle
hugo version

# Mettre à jour (selon OS)
# macOS
brew upgrade hugo

# Linux
# [Selon distribution]
```

### Mise à jour des dépendances

Ce projet n'a pas de dépendances npm/yarn.
Seul Hugo est nécessaire.

---

## Ligne éditoriale

**Référence absolue :** `LIGNE_EDITORIALE.md`

**Promesse éditoriale :**

> Je donne des repères aux CTO et leaders tech pour mieux décider et mieux durer,
> et j'aide la nouvelle génération à trouver sa place sans se raconter d'histoires.
> Je m'appuie sur le terrain, des cadres clairs, et une culture du droit à l'erreur.

**Tagline :** Donner des repères. Pas des leçons.

---

## Support

Pour toute question ou suggestion :
- Consulter `LIGNE_EDITORIALE.md`
- Consulter `CLAUDE.md`
- Ouvrir une issue GitHub (si repo public)
- Contact direct : [À compléter selon préférence]

---

## Licence

[À compléter]

---

**Maintenu par Kevin Delfour**
CTO basé à Lyon — 17 ans d'expérience
