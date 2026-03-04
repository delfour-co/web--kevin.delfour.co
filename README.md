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

- **Framework :** SvelteKit (Svelte 5) avec adapter-static
- **Langage :** TypeScript
- **Contenu :** Markdown via mdsvex
- **Recherche :** Pagefind
- **Hébergement :** GitHub Pages
- **Déploiement :** Automatique sur push vers `main` via GitHub Actions

---

## Installation

### Prérequis

- Node.js 22+
- npm

### Setup local

```bash
# Cloner le repo
git clone [URL_DU_REPO]
cd web--kevin.delfour.co

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Accéder au site
# http://localhost:5173
```

### Build production

```bash
npm run build
```

Les fichiers générés sont dans le dossier `build/`.

### Preview

```bash
npm run preview
```

---

## Structure du projet

```
.
├── src/
│   ├── routes/              # Pages (file-based routing)
│   ├── content/             # Contenus markdown (articles, livres)
│   ├── lib/                 # Composants, données, utilitaires
│   ├── app.css              # Styles globaux
│   └── app.html             # Template HTML racine
├── static/                  # Assets statiques (images, favicons)
├── svelte.config.js         # Configuration SvelteKit
├── vite.config.ts           # Configuration Vite
├── LIGNE_EDITORIALE.md      # Ligne éditoriale (référence absolue)
├── CLAUDE.md                # Context pour assistants IA
└── README.md                # Ce fichier
```

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

---

**Maintenu par Kevin Delfour**
CTO basé à Lyon — 17 ans d'expérience
