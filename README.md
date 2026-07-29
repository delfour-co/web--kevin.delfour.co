# kevin.delfour.co

Site personnel de Kevin Delfour, Engineering Leader — 17 ans d'expérience, Lyon.

> Construire des organisations d'ingénierie où les gens et les produits s'épanouissent.

**URL :** https://kevin.delfour.co

---

## Vue d'ensemble

Le site est l'extension web du CV exécutif de Kevin. Il s'adresse d'abord aux CEO,
CTO, fondateurs et recruteurs de postes de direction d'ingénierie, et répond à une
question : pourquoi lui confier une organisation d'ingénierie ?

On y trouve ses convictions de leader et les pratiques associées, son parcours,
ses interventions, ses engagements communautaires, ses livres gratuits et une
boîte à outils de management d'ingénierie en accès libre.

---

## Stack technique

- **Framework :** SvelteKit (Svelte 5, runes) avec adapter-static
- **Langage :** TypeScript
- **Contenu :** Markdown via mdsvex
- **Recherche :** Pagefind (indexation post-build)
- **Hébergement :** GitHub Pages
- **Déploiement :** automatique sur push vers `main` via GitHub Actions

---

## Installation

Prérequis : Node.js 22+ et npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # génère build/ puis indexe avec Pagefind
npm run preview    # sert le build local
npm run check      # svelte-check (types et accessibilité)
```

---

## Structure du projet

```
.
├── src/
│   ├── routes/              # Pages (routage par fichiers)
│   ├── content/livres/      # Chapitres des livres (markdown)
│   ├── lib/
│   │   ├── components/      # Composants partagés (SEO, Footer, panneau a11y…)
│   │   └── data/            # Données du site
│   │       ├── profile.ts   # Faits canoniques (identité, chiffres, parcours)
│   │       ├── leadership.ts# Les cinq piliers du hub Leadership
│   │       ├── tools.ts     # Les 21 outils
│   │       └── projects.json# Les projets
│   ├── app.css              # Design system (tokens, primitives)
│   └── app.html             # Template HTML racine
├── static/
│   ├── fonts/               # Polices auto-hébergées (Inter, Space Grotesk, JetBrains Mono)
│   └── cv/                  # CV en PDF
├── CLAUDE.md                # Contexte, identité et règles de contribution
└── README.md                # Ce fichier
```

---

## Contribuer

Lecture préalable : [`CLAUDE.md`](./CLAUDE.md) — positionnement, identité, ton et
règles de design.

### Règles non négociables

- **Les faits viennent de `src/lib/data/profile.ts`.** Toute affirmation publiée
  doit y être adossée. Aucun chiffre en dur dans une page.
- **Ton** : première personne, humble, concret. Pas de buzzword, pas de promesse
  exagérée, pas d'auto-dépréciation.
- **Identité** : Kevin est Engineering Leader. Ni « CTO » ni « Lead Tech » pour le
  présenter (voir les exceptions dans `CLAUDE.md`).
- **Design** : les composants consomment les tokens CSS, jamais de couleur codée
  en dur. Le panneau d'accessibilité doit continuer de fonctionner.

---

**Maintenu par Kevin Delfour** — Engineering Leader, Lyon.
