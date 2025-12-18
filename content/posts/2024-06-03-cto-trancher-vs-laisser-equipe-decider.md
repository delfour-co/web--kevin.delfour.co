---
author: ["Kevin Delfour"]
title: "Quand le CTO doit-il trancher vs laisser l'équipe décider"
date: 2024-06-03
slug: "cto-trancher-vs-laisser-equipe-decider"
description: "L'art de savoir quand intervenir et quand laisser faire : ni micro-management ni abandon."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["decision", "delegation", "leadership", "autonomie"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

L'équipe débat depuis 3 jours sur le choix entre PostgreSQL et MongoDB. Deux camps s'opposent, aucun consensus n'émerge. Dois-je trancher ou laisser le débat continuer ?

Ce que j'ai observé : savoir quand intervenir est l'une des compétences les plus difficiles du rôle. Intervenir trop tôt déresponsabilise l'équipe. Intervenir trop tard laisse pourrir des situations bloquantes.

## Le faux problème

Le faux problème serait de croire qu'il existe une règle universelle. En réalité, la décision d'intervenir dépend du contexte : urgence, impact, maturité de l'équipe, nature du conflit.

Un autre faux problème : penser que trancher détruit toujours l'autonomie. En réalité, trancher au bon moment peut débloquer et renforcer la confiance.

## Le vrai enjeu CTO

Le vrai enjeu est de développer le discernement pour savoir quand intervenir :

**Quand laisser l'équipe décider** :
- Décision réversible (coût retour arrière < 1 semaine)
- Impact limité (1 équipe, 1 projet)
- Équipe compétente sur le sujet
- Pas d'urgence (temps disponible pour consensus)
- Opportunité d'apprentissage (même si erreur, impact gérable)

**Quand trancher comme CTO** :
- Débat qui dure >1 semaine sans convergence
- Décision irréversible ou à fort impact (architecture globale, infra)
- Urgence business (délai incompatible avec consensus)
- Risque majeur (sécurité, compliance, légal)
- Conflit qui devient toxique (attaques personnelles, blocage)

**Les signaux qu'il faut trancher** :
- Débat qui tourne en rond (mêmes arguments répétés)
- Ton qui se dégrade (frustration, attaques personnelles)
- Vélocité qui baisse (équipe bloquée en attente)
- Business frustré (délais qui glissent)

**Comment trancher sans détruire** :
- Reconnaître la qualité des deux positions
- Expliquer pourquoi il faut trancher maintenant
- Partager le raisonnement de la décision
- Donner des critères de révision (quand reconsidérer)

## Cadre de décision

Voici ma grille pour décider d'intervenir ou non :

**1. La matrice urgence × impact**
- Faible urgence + faible impact → laisser l'équipe
- Faible urgence + fort impact → guider sans trancher
- Forte urgence + faible impact → laisser l'équipe avec deadline
- Forte urgence + fort impact → trancher rapidement

**2. Le test des 3 jours**
Si débat dure >3 jours sans convergence, intervention. Soit faciliter (poser questions, recentrer), soit trancher.

**3. Observer le processus, pas juste le contenu**
Débat sain (écoute, arguments, respect) → laisser continuer. Débat toxique (ego, attaques, blocage) → intervenir.

**4. La question test**
"Si je tranche, est-ce que l'équipe comprendra pourquoi ?" Si oui, trancher est légitime. Si non, laisser mûrir.

**5. Documenter la décision**
Quand je tranche, ADR expliquant : le contexte, les options considérées, la décision, le raisonnement, les critères de révision.

## Retour terrain

Ce que j'ai observé dans différentes situations :

**Le CTO qui tranche trop tôt** : Intervient dès qu'un débat apparaît. Résultat : équipe déresponsabilisée, attend toujours qu'on décide pour elle, perte de compétences décisionnelles.

**Le CTO qui ne tranche jamais** : Laisse les débats durer des semaines. Résultat : paralysie, frustration, business bloqué, conflits qui pourrissent.

**L'intervention qui débloquer** : Débat postgres vs mongo depuis 5 jours, 2 camps égaux. CTO tranche : "Postgres parce que X, Y, Z. On réévalue dans 6 mois si problèmes." Résultat : équipe soulagée, exécution reprend, respect de la décision.

**La facilitation qui évite de trancher** : Débat sur architecture. CTO pose des questions, recentre sur critères objectifs. Équipe converge seule. Résultat : meilleure décision, ownership partagé.

## Erreurs fréquentes

**Micro-management décisionnel**
Trancher toutes les décisions, même mineures. Résultat : équipe passive, attend validation pour tout, perte d'autonomie.

**Laisser pourrir**
Ne jamais trancher, même quand débat devient toxique. Résultat : conflits qui empirent, vélocité qui s'effondre, départs.

**Trancher sans expliquer**
"On fait comme ça, point." Résultat : décision appliquée sans conviction, résistance passive.

**Ne pas documenter**
Trancher oralement sans trace écrite. Résultat : contexte perdu, débat qui revient 3 mois plus tard.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Définir des timeboxes dès le début**
"Vous avez 3 jours pour converger. Si pas de consensus, j'arbitre." Cette clarté évite les débats interminables.

**Faciliter avant de trancher**
Quand débat bloque, d'abord essayer de faciliter (questions, recadrage, critères objectifs). Trancher seulement si facilitation échoue.

**Toujours expliquer le raisonnement**
Même quand je tranche rapidement, prendre 5 minutes pour expliquer pourquoi. Cette transparence maintient la confiance.

**Documenter systématiquement**
Chaque décision tranchée → ADR. Cette documentation évite les débats récurrents et partage le contexte.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment différents CTOs gèrent l'équilibre entre délégation et intervention.

Pour approfondir, tu peux aussi consulter l'article ["Autonomie des équipes"](/posts/autonomie-equipes-jusquou-comment/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
