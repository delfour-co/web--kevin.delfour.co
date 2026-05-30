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
