---
author: ["Kevin Delfour"]
title: "ADR : documenter pour ne pas répéter les erreurs"
date: 2024-07-22
slug: "adr-documenter-decisions-architecture"
description: "Architecture Decision Records : garder la mémoire des décisions importantes et leur contexte."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["adr", "documentation", "architecture", "decision"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"Pourquoi on a choisi cette architecture ?" Cette question revient 6 mois après chaque décision importante. Sans documentation, le contexte est perdu, et on refait les mêmes débats.

Ce que j'ai observé : les ADR (Architecture Decision Records) sont l'outil le plus sous-utilisé et le plus utile pour la gouvernance technique. Ils coûtent 30 minutes à écrire et économisent des heures de débats futurs.

## Le faux problème

Le faux problème serait de croire que "le code se documente lui-même". En réalité, le code explique le "comment", pas le "pourquoi" ni les alternatives considérées.

Un autre faux problème : penser que documenter prend trop de temps. En réalité, 30 minutes d'ADR évitent 3h de réunion 6 mois plus tard.

## Le vrai enjeu CTO

Le vrai enjeu est de documenter juste assez pour préserver le contexte sans créer de la bureaucratie :

**Qu'est-ce qu'un ADR** : Document court (1-2 pages) qui enregistre une décision architecturale importante avec son contexte, les alternatives, et le raisonnement. Immuable une fois écrit.

**Quand créer un ADR** :
- Décision architecturale structurante (Type 1)
- Choix de stack ou techno majeure
- Pattern ou standard adopté
- Décision controversée ou débattue
Ne PAS créer pour : décisions mineures, choix évidents, détails d'implémentation.

**Structure ADR minimale** :
```
# ADR-XXX : Titre de la décision

Date : YYYY-MM-DD
Statut : [Proposed | Accepted | Superseded | Deprecated]
Décideurs : [Noms]

## Contexte
Quel problème on résout, quelles contraintes

## Décision
Ce qu'on a décidé

## Alternatives considérées
Options qu'on a évaluées et pourquoi rejetées

## Conséquences
Positives et négatives de cette décision
```

**Les règles d'or des ADR** :
1. Immuable : on ne modifie jamais un ADR existant, on en crée un nouveau qui supersede
2. Court : 1-2 pages maximum
3. Factuel : pas de justification émotionnelle, des faits
4. Daté : toujours dater pour comprendre le contexte temporel
5. Accessible : dans le repo, pas dans un wiki externe

## Cadre de décision

Voici comment j'implémente les ADR :

**1. Template simple dans le repo**
Fichier `docs/adr/template.md` avec structure minimale. Facile à copier, pas intimidant.

**2. Numérotation séquentielle**
ADR-001, ADR-002, etc. Facilite les références croisées.

**3. Écriture obligatoire pour décisions Type 1**
Toute décision structurante = ADR obligatoire. Cette règle évite l'oubli.

**4. Review comme une PR**
ADR proposé en PR, reviewé, puis merged. Ce processus assure qualité.

**5. Index des ADR**
Fichier `README.md` dans `/adr` listant tous les ADR avec statut. Navigation facile.

## Retour terrain

Ce que j'ai observé dans différentes organisations :

**L'absence d'ADR** : Décisions importantes prises, rien de documenté. 6 mois plus tard : "Pourquoi on a choisi Kafka ?" Personne ne se souvient du contexte. Débat refait, temps perdu.

**L'ADR bureaucratique** : Template de 5 pages, 10 sections obligatoires, review par 5 personnes. Résultat : personne ne les écrit, contournement.

**L'ADR qui marche** : Template 1 page, 4 sections, écrit en 30 min, reviewé comme PR. Résultat : 50+ ADR sur 2 ans, contexte préservé, débats évités.

**L'exemple concret** : ADR-023 "Migration vers microservices". Contexte : monolithe ralentit delivery. Alternatives : optimiser monolithe (rejeté : impact limité), microservices (choisi), modulith (considéré pour futur). Conséquences : +complexité ops, +autonomie équipes, -couplage. 18 mois plus tard : débat "pourquoi microservices ?". ADR répond en 2 min.

## Erreurs fréquentes

**Ne jamais écrire d'ADR**
"Pas le temps de documenter." Résultat : contexte perdu, débats répétés, nouvelles personnes perdues.

**ADR trop long**
Vouloir documenter chaque détail. Résultat : personne ne lit, effort trop élevé, abandon du processus.

**Modifier les ADR existants**
Changer un ADR après qu'il soit merged. Résultat : historique perdu, confusion sur "qu'est-ce qui était décidé quand".

**ADR dans un outil externe**
Mettre ADR dans Notion/Confluence séparé du code. Résultat : désynchronisation, personne ne regarde.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Implémenter ADR dès le début**
Premier ADR : "Pourquoi on utilise ADR". Meta mais utile. Puis documenter chaque décision majeure.

**Template ultra-minimal**
V1 : 4 sections, 1 page max. Ne pas commencer avec template complexe. Affiner progressivement.

**Lier ADR et RFC**
RFC proposée → approuvée → devient ADR. Cette continuité évite duplication.

**Faire des ADR rétroactifs**
Pour décisions passées importantes : écrire ADR rétroactif pour capturer le contexte tant qu'on s'en souvient.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) montre des exemples concrets d'ADR et comment les utiliser efficacement.

Pour approfondir, tu peux aussi consulter l'article ["RFC : décider en équipe"](/posts/rfc-decider-equipe-sans-bloquer/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
