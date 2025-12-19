---
author: ["Kevin Delfour"]
title: "Arbitrer entre vitesse et qualité"
date: 2024-07-29
slug: "arbitrer-vitesse-vs-qualite"
description: "Le dilemme permanent du CTO : livrer vite ou bien ? Comprendre qu'il n'y a pas de bonne réponse universelle."
categories: ["leadership"]
series: ["Gouvernance"]
tags: ["qualite", "verite", "dette-technique", "arbitrage"]
pillar: "gouvernance-decision"
pillars: ["gouvernance-decision"]
audience: "cto"
audiences: ["cto"]
featured: false
ShowToc: true
TocOpen: false
---

## Situation réelle

"On livre maintenant avec de la dette, ou on prend 2 semaines de plus pour faire propre ?" Ce dilemme, tout CTO le rencontre quotidiennement. Et il n'y a jamais de bonne réponse universelle.

Ce que j'ai observé : ni "toujours la qualité" ni "toujours la vitesse" ne marchent. L'arbitrage dépend du contexte, et le CTO porte la responsabilité de cet arbitrage.

## Le faux problème

Le faux problème serait de croire qu'on peut toujours avoir les deux. En réalité, vitesse et qualité sont souvent en tension. L'enjeu est de choisir consciemment selon le contexte.

Un autre faux problème : penser que "dette technique" est toujours mauvaise. En réalité, la dette intentionnelle et documentée peut être un choix stratégique valide.

## Le vrai enjeu CTO

Le vrai enjeu est de développer les critères pour arbitrer selon les situations :

**Les 4 contextes d'arbitrage** :

**Contexte 1 - MVP / Validation marché** : Arbitrage : vitesse >> qualité. Rationale : 90% des MVP échouent, pas de sens à optimiser ce qui sera peut-être jeté. Dette acceptable si documentée. Timing : 2-4 semaines maximum pour valider.

**Contexte 2 - Feature produit standard** : Arbitrage : équilibre vitesse-qualité. Rationale : code qui va durer, doit être maintenable. Mais pas over-engineer. Standard : tests coverage 70%+, code review, pas de dette majeure.

**Contexte 3 - Fonctionnalité critique** : Arbitrage : qualité >> vitesse. Rationale : paiement, sécurité, données sensibles. Zéro compromis. Standard : tests exhaustifs, reviews multiples, monitoring, rollback plan.

**Contexte 4 - Dette technique existante** : Arbitrage : ralentir pour rembourser. Rationale : dette qui ralentit delivery. Investir 20-30% capacité pour rembourser sinon vélocité s'effondre.

**Le framework de décision** :

Questions à se poser :
1. Quel est le risque si ça casse ? (Paiement qui casse = catastrophe, feature secondaire = ennui)
2. Quelle est la durée de vie probable ? (MVP 1 mois = dette OK, core product = dette NOK)
3. Quel est le coût de remboursement futur ? (×3 le coût initial ?)
4. Y a-t-il une fenêtre temporelle critique ? (concurrence, événement, levée)

## Cadre de décision

Voici comment j'arbitre concrètement :

**1. Classifier chaque feature selon contexte**
Avant de commencer : "C'est un MVP, une feature standard, ou critique ?" Cette classification définit les standards.

**2. Standards par contexte**
MVP : pas de tests automatisés, code review optionnelle, librairies whatever works.
Standard : 70% test coverage, code review obligatoire, patterns cohérents.
Critique : 90%+ coverage, double review, tests charge, monitoring.

**3. Dette intentionnelle documentée**
Si on prend de la dette : ADR qui documente pourquoi, quel coût remboursement, timeline remboursement. Cette doc rend la dette gérable.

**4. Capacité dédiée remboursement dette**
20% capacité sprint pour rembourser dette existante. Cette allocation évite l'explosion.

**5. Mesurer vélocité ET qualité**
Métriques : vélocité (story points/sprint), qualité (bug rate, incidents, dette technique). Les deux doivent être saines.

## Retour terrain

Ce que j'ai observé dans différentes situations :

**Toujours optimiser (qualité >> vitesse)** : Équipe perfectionnniste, chaque feature prend 3× le temps. **Résultat :**  concurrence livre 3× plus vite, market timing raté, startup qui meurt avec du beau code.

**Toujours rusher (vitesse >> qualité)** : Livrer vite sans jamais rembourser dette. **Résultat :**  après 18 mois, vélocité divisée par 3, bugs constants, refonte forcée.

**L'arbitrage contextuel** : MVP en 3 semaines avec dette, validation marché positive, puis 2 sprints de refonte propre. **Résultat :**  rapidité validation + qualité durable.

**La dette documentée** : Feature urgente livrée avec dette intentionnelle. ADR documente : "Dette prise pour deadline X, coût remboursement estimé 1 semaine, planning remboursement dans 2 sprints." 2 sprints plus tard : dette remboursée comme prévu.

## Erreurs fréquentes

**Perfectionnisme systématique**
"On ne livre que du code parfait." **Résultat :**  lenteur excessive, opportunités ratées, frustration business.

**Rush permanent**
"On verra plus tard pour la qualité." **Résultat :**  dette qui explose, vélocité qui s'effondre, refonte forcée.

**Dette non documentée**
Prendre de la dette sans la documenter. **Résultat :**  oubli, dette qui s'accumule silencieusement, surprise 12 mois plus tard.

**Pas de capacité de remboursement**
100% capacité sur features, 0% sur dette. **Résultat :**  dette qui grandit sans limite jusqu'à paralysie.

## Si c'était à refaire

Avec le recul, voici ce que je ferais différemment :

**Classifier systématiquement chaque feature**
Avant de commencer : "MVP, standard, ou critique ?" Cette classification définit les standards et évite les débats.

**Documenter la dette intentionnelle**
Chaque fois qu'on prend de la dette consciemment : ADR minimal (pourquoi, coût, timeline remboursement). Ces 5 minutes évitent l'oubli.

**Allouer 20% capacité dette technique**
Capacité fixe dédiée au remboursement. Cette discipline évite l'explosion de dette.

**Mesurer les deux dimensions**
Dashboard avec vélocité ET qualité (bug rate, dette tech, incidents). Les deux doivent rester dans le vert.

## Pour approfondir

Le livre ["Être ou ne pas être CTO"](/guides-livres/etre-ou-ne-pas-etre-cto/) explore comment différents CTOs arbitrent selon leur contexte et maturité.

Pour approfondir, tu peux aussi consulter l'article ["Dette technique"](/posts/dette-technique-cto-gestion-compromis-strategies/) ou les autres contenus du pilier ["Gouvernance & décision"](/gouvernance-decision/).
